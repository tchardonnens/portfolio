import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { landDots } from '../../lib/land-dots';

export type GlobePoint = { id: string; geo: [number, number] };

/** The hovered destination, plus any waypoints its route is routed through. */
export type GlobeFocus = {
  geo: [number, number];
  via?: [number, number][];
  /** Where the leg took off from. Defaults to home. */
  from?: [number, number];
};

/** A marker under the pointer, with where it sits on screen in CSS pixels. */
export type GlobeHit = { id: string; x: number; y: number };

type Props = {
  /** Every place on the board, drawn as a marker. */
  points: GlobePoint[];
  /** Where flights leave from — the origin of every arc. */
  homeGeo: [number, number];
  /** The hovered row's destination. Null spins the globe idly. */
  focus: GlobeFocus | null;
  /** Allows dragging the globe around and picking out markers. */
  interactive?: boolean;
  /** Fires as the pointer moves on or off a marker. */
  onHoverPoint?: (hit: GlobeHit | null) => void;
  className?: string;
};

const RADIUS = 1;
const IDLE_SPIN = 0.055; // radians per second
const DRAG_SPEED = 0.005; // radians per pixel dragged
const PITCH_LIMIT = Math.PI / 3;
/** How close the pointer has to get to a marker, in CSS pixels. */
const HIT_RADIUS = 18;

/** Lon/lat in degrees to a point on the sphere, with lon 0 / lat 0 facing the camera. */
function toVector(lon: number, lat: number, radius = RADIUS): THREE.Vector3 {
  const phi = THREE.MathUtils.degToRad(lat);
  const theta = THREE.MathUtils.degToRad(lon);
  return new THREE.Vector3(
    radius * Math.cos(phi) * Math.sin(theta),
    radius * Math.sin(phi),
    radius * Math.cos(phi) * Math.cos(theta)
  );
}

const ARC_SAMPLES = 96;

/**
 * The flight path, lifted off the surface — longer flights arch higher, the way
 * route maps draw them. With no waypoints this is the great circle, which is
 * what aircraft actually fly on most routes. Waypoints bend it leg by leg, for
 * the routes where airspace makes the real track deviate.
 */
function arcCurve(anchors: THREE.Vector3[]): THREE.CatmullRomCurve3 {
  const legs = anchors.slice(0, -1).map((point, i) => point.angleTo(anchors[i + 1]));
  const total = legs.reduce((sum, angle) => sum + angle, 0);
  if (total < 1e-6) return new THREE.CatmullRomCurve3([anchors[0], anchors[anchors.length - 1]]);

  const lift = 0.12 + (total / Math.PI) * 0.34;
  const points: THREE.Vector3[] = [];
  let travelled = 0;

  legs.forEach((angle, leg) => {
    // Give each leg a share of the samples proportional to its length, so the
    // curve stays evenly spaced however the waypoints are distributed.
    const steps = Math.max(2, Math.round(ARC_SAMPLES * (angle / total)));
    for (let step = leg === 0 ? 0 : 1; step <= steps; step += 1) {
      const along = step / steps;
      const point = anchors[leg]
        .clone()
        .lerp(anchors[leg + 1], along)
        .normalize();
      // Height follows progress along the whole path, not the current leg.
      const t = (travelled + angle * along) / total;
      point.multiplyScalar(RADIUS + Math.sin(Math.PI * t) * lift);
      points.push(point);
    }
    travelled += angle;
  });

  return new THREE.CatmullRomCurve3(points);
}

const THEMES = {
  light: { land: 0x9a9a9a, sphere: 0xfafafa, accent: 0xf97316, glow: 0xf97316, landOpacity: 0.9 },
  dark: { land: 0x6e6e6e, sphere: 0x0a0a0a, accent: 0xf97316, glow: 0xf97316, landOpacity: 1 },
};

const DOT_VERTEX = `
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uScale;
  uniform float uCameraZ;
  varying float vFade;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    // uSize is in CSS pixels at the reference canvas size; uScale keeps the dots
    // proportional when the panel resizes, and the depth term adds a little
    // perspective so the near face reads as closer.
    gl_PointSize = uSize * uPixelRatio * uScale * (uCameraZ / -mv.z);
    // Fade toward the limb so the cloud reads as a curved surface.
    vec3 n = normalize(mat3(modelViewMatrix) * position);
    vFade = smoothstep(-0.12, 0.4, n.z);
  }
`;

const DOT_FRAGMENT = `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vFade;
  void main() {
    if (length(gl_PointCoord - 0.5) > 0.5) discard;
    gl_FragColor = vec4(uColor, uOpacity * vFade);
  }
`;

const ATMOSPHERE_VERTEX = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const ATMOSPHERE_FRAGMENT = `
  uniform vec3 uColor;
  uniform float uStrength;
  varying vec3 vNormal;
  void main() {
    // Only the band between the globe's limb and this shell's silhouette is
    // visible, and across it the facing term runs ~0.42 down to 0. Normalising
    // by that puts the glow hard against the limb and fades it outward, rather
    // than lighting up the outer edge.
    float facing = abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
    float rim = pow(clamp(facing / 0.42, 0.0, 1.0), 1.6);
    gl_FragColor = vec4(uColor, rim * uStrength);
  }
`;

/** Progress-gated arc: uv.x runs along the tube, so we reveal it end to end. */
const ARC_FRAGMENT = `
  uniform vec3 uColor;
  uniform float uProgress;
  varying vec2 vUv;
  void main() {
    if (vUv.x > uProgress) discard;
    // Brighten the leading edge so the arc reads as being drawn, not switched on.
    float head = smoothstep(uProgress - 0.08, uProgress, vUv.x);
    gl_FragColor = vec4(uColor, 0.35 + head * 0.65);
  }
`;

const ARC_VERTEX = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export default function Globe({
  points,
  homeGeo,
  focus,
  interactive = false,
  onHoverPoint,
  className = '',
}: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  // The render loop reads these through refs so prop changes never rebuild the scene.
  const focusRef = useRef(focus);
  const pointsRef = useRef(points);
  const hoverCallbackRef = useRef(onHoverPoint);
  focusRef.current = focus;
  pointsRef.current = points;
  hoverCallbackRef.current = onHoverPoint;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.z = 3.6;

    const world = new THREE.Group();
    // Tilt the axis so the globe never looks like a flat spinning disc.
    world.rotation.z = THREE.MathUtils.degToRad(-14);
    scene.add(world);

    const spin = new THREE.Group();
    world.add(spin);

    const theme = () => (darkQuery.matches ? THEMES.dark : THEMES.light);

    // --- the body, which occludes everything on the far side -----------------
    const bodyMaterial = new THREE.MeshBasicMaterial({ color: theme().sphere });
    const body = new THREE.Mesh(new THREE.SphereGeometry(RADIUS * 0.985, 48, 48), bodyMaterial);
    spin.add(body);

    const gridMaterial = new THREE.LineBasicMaterial({
      color: theme().land,
      transparent: true,
      opacity: 0.12,
    });
    const grid = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.SphereGeometry(RADIUS * 0.99, 18, 12)),
      gridMaterial
    );
    spin.add(grid);

    // --- land ----------------------------------------------------------------
    const flat = landDots();
    const landPositions = new Float32Array((flat.length / 2) * 3);
    for (let i = 0; i < flat.length / 2; i += 1) {
      const v = toVector(flat[i * 2], flat[i * 2 + 1]);
      landPositions.set([v.x, v.y, v.z], i * 3);
    }
    const landGeometry = new THREE.BufferGeometry();
    landGeometry.setAttribute('position', new THREE.BufferAttribute(landPositions, 3));
    const landMaterial = new THREE.ShaderMaterial({
      vertexShader: DOT_VERTEX,
      fragmentShader: DOT_FRAGMENT,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uSize: { value: 2.1 },
        uPixelRatio: { value: renderer.getPixelRatio() },
        uScale: { value: 1 },
        uCameraZ: { value: camera.position.z },
        uColor: { value: new THREE.Color(theme().land) },
        uOpacity: { value: theme().landOpacity },
      },
    });
    spin.add(new THREE.Points(landGeometry, landMaterial));

    // --- city markers --------------------------------------------------------
    const markerPositions = new Float32Array(pointsRef.current.length * 3);
    pointsRef.current.forEach((point, i) => {
      const v = toVector(point.geo[0], point.geo[1], RADIUS * 1.005);
      markerPositions.set([v.x, v.y, v.z], i * 3);
    });
    const markerGeometry = new THREE.BufferGeometry();
    markerGeometry.setAttribute('position', new THREE.BufferAttribute(markerPositions, 3));
    const markerMaterial = new THREE.ShaderMaterial({
      vertexShader: DOT_VERTEX,
      fragmentShader: DOT_FRAGMENT,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uSize: { value: 5.5 },
        uPixelRatio: { value: renderer.getPixelRatio() },
        uScale: { value: 1 },
        uCameraZ: { value: camera.position.z },
        uColor: { value: new THREE.Color(theme().accent) },
        uOpacity: { value: 0.95 },
      },
    });
    spin.add(new THREE.Points(markerGeometry, markerMaterial));

    // Ring drawn around whichever marker the pointer is on.
    const hoverMaterial = new THREE.MeshBasicMaterial({
      color: theme().accent,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
    });
    const hoverRing = new THREE.Mesh(new THREE.RingGeometry(0.028, 0.038, 24), hoverMaterial);
    hoverRing.visible = false;
    spin.add(hoverRing);

    // --- atmosphere ----------------------------------------------------------
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: ATMOSPHERE_VERTEX,
      fragmentShader: ATMOSPHERE_FRAGMENT,
      transparent: true,
      side: THREE.BackSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uColor: { value: new THREE.Color(theme().glow) },
        uStrength: { value: darkQuery.matches ? 0.5 : 0.28 },
      },
    });
    world.add(new THREE.Mesh(new THREE.SphereGeometry(RADIUS * 1.1, 48, 48), atmosphereMaterial));

    // --- the flight arc, rebuilt whenever the focus changes ------------------
    const arcMaterial = new THREE.ShaderMaterial({
      vertexShader: ARC_VERTEX,
      fragmentShader: ARC_FRAGMENT,
      transparent: true,
      depthWrite: false,
      uniforms: { uColor: { value: new THREE.Color(theme().accent) }, uProgress: { value: 0 } },
    });
    let arcMesh: THREE.Mesh | null = null;
    let arcCurrent: THREE.CatmullRomCurve3 | null = null;

    const travellerMaterial = new THREE.MeshBasicMaterial({ color: theme().accent });
    const traveller = new THREE.Mesh(new THREE.SphereGeometry(0.022, 12, 12), travellerMaterial);
    traveller.visible = false;
    spin.add(traveller);

    const home = toVector(homeGeo[0], homeGeo[1]);

    const clearArc = () => {
      if (!arcMesh) return;
      spin.remove(arcMesh);
      arcMesh.geometry.dispose();
      arcMesh = null;
      arcCurrent = null;
      traveller.visible = false;
    };

    const buildArc = (next: GlobeFocus) => {
      clearArc();
      const start = next.from ? toVector(next.from[0], next.from[1]) : home;
      const waypoints = (next.via ?? []).map(([lon, lat]) => toVector(lon, lat));
      arcCurrent = arcCurve([start, ...waypoints, toVector(next.geo[0], next.geo[1])]);
      arcMesh = new THREE.Mesh(
        new THREE.TubeGeometry(arcCurrent, 120, 0.008, 8, false),
        arcMaterial
      );
      spin.add(arcMesh);
      arcMaterial.uniforms.uProgress.value = 0;
    };

    // --- rotation ------------------------------------------------------------
    // Bringing (lon, lat) to face the camera means yawing by -lon and pitching
    // by +lat. Tracked as continuous angles so we always take the short way round.
    const target = new THREE.Vector2(0, 0);
    const current = new THREE.Vector2(0, 0);
    let idleYaw = 0;
    let lastFocusKey = '';

    const setTarget = (geo: [number, number]) => {
      const wantY = THREE.MathUtils.degToRad(-geo[0]);
      const wantX = THREE.MathUtils.degToRad(geo[1]);
      // Unwrap toward the nearest equivalent angle.
      const twoPi = Math.PI * 2;
      target.y = wantY + Math.round((current.y - wantY) / twoPi) * twoPi;
      target.x = THREE.MathUtils.clamp(wantX, -PITCH_LIMIT, PITCH_LIMIT);
    };

    // --- pointer -------------------------------------------------------------
    // Dragging takes the globe off its target until the next row is pointed at,
    // and hovering a marker holds it still so the tooltip stays put.
    let dragging = false;
    let steered = false;
    let hoveredId: string | null = null;
    let lastHit: GlobeHit | null = null;
    let lastPointer = { x: 0, y: 0 };
    const velocity = { x: 0, y: 0 };

    const viewCentre = new THREE.Vector3();
    const scratch = new THREE.Vector3();

    const pickAt = (clientX: number, clientY: number): GlobeHit | null => {
      const rect = renderer.domElement.getBoundingClientRect();
      if (!rect.width || !rect.height) return null;
      const px = clientX - rect.left;
      const py = clientY - rect.top;

      // The globe's centre in view space — anything behind it is on the far
      // side and hidden by the body, so it must not be pickable.
      viewCentre.set(0, 0, 0).applyMatrix4(camera.matrixWorldInverse);

      let best: GlobeHit | null = null;
      let bestDistance = HIT_RADIUS;
      for (let i = 0; i < pointsRef.current.length; i += 1) {
        scratch.fromArray(markerPositions, i * 3).applyMatrix4(spin.matrixWorld);
        if (scratch.clone().applyMatrix4(camera.matrixWorldInverse).z < viewCentre.z) continue;
        const ndc = scratch.clone().project(camera);
        const x = (ndc.x * 0.5 + 0.5) * rect.width;
        const y = (-ndc.y * 0.5 + 0.5) * rect.height;
        const distance = Math.hypot(x - px, y - py);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = { id: pointsRef.current[i].id, x, y };
        }
      }
      return best;
    };

    const setHover = (hit: GlobeHit | null) => {
      const index = hit ? pointsRef.current.findIndex((p) => p.id === hit.id) : -1;
      if (index >= 0) {
        hoverRing.position.fromArray(markerPositions, index * 3).multiplyScalar(1.01);
        // Lay the ring flat against the surface.
        hoverRing.lookAt(0, 0, 0);
        hoverRing.visible = true;
      } else {
        hoverRing.visible = false;
      }
      // Only tell React when something it would render actually changed.
      const moved =
        hit && lastHit && (Math.abs(hit.x - lastHit.x) > 0.5 || Math.abs(hit.y - lastHit.y) > 0.5);
      if ((hit?.id ?? null) !== hoveredId || moved) {
        hoveredId = hit?.id ?? null;
        lastHit = hit;
        hoverCallbackRef.current?.(hit);
      }
      renderer.domElement.style.cursor = dragging ? 'grabbing' : hit ? 'pointer' : 'grab';
    };

    const onPointerDown = (event: PointerEvent) => {
      dragging = true;
      steered = true;
      velocity.x = 0;
      velocity.y = 0;
      lastPointer = { x: event.clientX, y: event.clientY };
      renderer.domElement.setPointerCapture(event.pointerId);
      renderer.domElement.style.cursor = 'grabbing';
    };

    const onPointerMove = (event: PointerEvent) => {
      if (dragging) {
        const dx = event.clientX - lastPointer.x;
        const dy = event.clientY - lastPointer.y;
        lastPointer = { x: event.clientX, y: event.clientY };
        velocity.y = dx * DRAG_SPEED;
        velocity.x = dy * DRAG_SPEED;
        current.y += velocity.y;
        current.x = THREE.MathUtils.clamp(current.x + velocity.x, -PITCH_LIMIT, PITCH_LIMIT);
        return;
      }
      setHover(pickAt(event.clientX, event.clientY));
    };

    const endDrag = (event: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      if (renderer.domElement.hasPointerCapture(event.pointerId)) {
        renderer.domElement.releasePointerCapture(event.pointerId);
      }
      setHover(pickAt(event.clientX, event.clientY));
    };

    const onPointerLeave = () => {
      if (!dragging) setHover(null);
    };

    if (interactive) {
      const canvas = renderer.domElement;
      canvas.style.cursor = 'grab';
      // Let the page keep scrolling vertically on touch; horizontal drags spin.
      canvas.style.touchAction = 'pan-y';
      canvas.addEventListener('pointerdown', onPointerDown);
      canvas.addEventListener('pointermove', onPointerMove);
      canvas.addEventListener('pointerup', endDrag);
      canvas.addEventListener('pointercancel', endDrag);
      canvas.addEventListener('pointerleave', onPointerLeave);
    }

    const applyTheme = () => {
      const t = theme();
      bodyMaterial.color.set(t.sphere);
      gridMaterial.color.set(t.land);
      landMaterial.uniforms.uColor.value.set(t.land);
      landMaterial.uniforms.uOpacity.value = t.landOpacity;
      markerMaterial.uniforms.uColor.value.set(t.accent);
      atmosphereMaterial.uniforms.uColor.value.set(t.glow);
      atmosphereMaterial.uniforms.uStrength.value = darkQuery.matches ? 0.5 : 0.28;
      arcMaterial.uniforms.uColor.value.set(t.accent);
      travellerMaterial.color.set(t.accent);
    };

    const resize = () => {
      const { clientWidth, clientHeight } = mount;
      if (!clientWidth || !clientHeight) return;
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      const scale = clientHeight / 360;
      [landMaterial, markerMaterial].forEach((material) => {
        material.uniforms.uPixelRatio.value = renderer.getPixelRatio();
        material.uniforms.uScale.value = scale;
      });
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);

    // Don't burn a frame budget on a globe nobody is looking at.
    let onScreen = true;
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(mount);

    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      // rAF hands back the timestamp of the frame's start, which can predate the
      // performance.now() taken while this effect was setting up — so the first
      // delta can be negative. Clamp both ends before anything integrates it.
      const delta = THREE.MathUtils.clamp((now - last) / 1000, 0, 0.1);
      last = now;
      if (!onScreen || document.hidden) return;

      const focus = focusRef.current;
      // The whole route identifies the arc, not just its endpoint — two trips
      // can land in the same city from different places.
      const key = focus ? `${focus.from ?? ''}>${focus.via ?? ''}>${focus.geo}` : '';
      if (key !== lastFocusKey) {
        lastFocusKey = key;
        // A new destination takes the globe back from the pointer.
        steered = false;
        if (focus) {
          setTarget(focus.geo);
          buildArc(focus);
        } else {
          clearArc();
        }
      }

      if (focus) {
        // Draw the flight along the arc, however the globe is being aimed.
        const progress = arcMaterial.uniforms.uProgress.value as number;
        arcMaterial.uniforms.uProgress.value = motionQuery.matches
          ? 1
          : THREE.MathUtils.clamp(progress + delta * 0.9, 0, 1);
        if (arcCurrent) {
          const at = arcMaterial.uniforms.uProgress.value as number;
          traveller.visible = at > 0.02 && at < 0.999;
          arcCurrent.getPointAt(THREE.MathUtils.clamp(at, 0, 1), traveller.position);
        }
      }

      if (dragging) {
        // The pointer is driving; nothing else gets a say.
      } else if (steered) {
        // Coast to a stop after a drag, then hold wherever it was left.
        current.y += velocity.y;
        current.x = THREE.MathUtils.clamp(current.x + velocity.x, -PITCH_LIMIT, PITCH_LIMIT);
        velocity.x *= 0.92;
        velocity.y *= 0.92;
        if (Math.abs(velocity.x) < 1e-5) velocity.x = 0;
        if (Math.abs(velocity.y) < 1e-5) velocity.y = 0;
        idleYaw = current.y;
      } else if (focus) {
        const ease = motionQuery.matches ? 1 : 1 - Math.pow(0.0016, delta);
        current.lerp(target, ease);
        idleYaw = current.y;
      } else if (hoveredId) {
        // Hold still while a marker is being inspected, so the tooltip stays put.
        target.set(current.x, current.y);
      } else {
        if (!motionQuery.matches) idleYaw += delta * IDLE_SPIN;
        current.y = idleYaw;
        current.x += (0.16 - current.x) * (1 - Math.pow(0.002, delta));
        target.set(current.x, current.y);
      }

      spin.rotation.y = current.y;
      spin.rotation.x = current.x;
      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(tick);

    darkQuery.addEventListener('change', applyTheme);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      darkQuery.removeEventListener('change', applyTheme);
      if (interactive) {
        const canvas = renderer.domElement;
        canvas.removeEventListener('pointerdown', onPointerDown);
        canvas.removeEventListener('pointermove', onPointerMove);
        canvas.removeEventListener('pointerup', endDrag);
        canvas.removeEventListener('pointercancel', endDrag);
        canvas.removeEventListener('pointerleave', onPointerLeave);
      }
      clearArc();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          object.geometry.dispose();
        }
        if (object instanceof THREE.LineSegments) object.geometry.dispose();
      });
      [
        bodyMaterial,
        gridMaterial,
        landMaterial,
        markerMaterial,
        hoverMaterial,
        atmosphereMaterial,
        arcMaterial,
        travellerMaterial,
      ].forEach((material) => material.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
    // The scene is built once; live values are read through refs inside the loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homeGeo, interactive]);

  return <div ref={mountRef} aria-hidden="true" className={className} />;
}
