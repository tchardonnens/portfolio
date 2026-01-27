import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';

type AnimationVariant = 'fade' | 'slide' | 'scale' | 'blur' | 'sophisticated';

interface AnimatedElementProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
  variant?: AnimationVariant;
  useScrollTrigger?: boolean;
}

const animationVariants = {
  fade: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
  slide: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
  },
  blur: {
    initial: { opacity: 0, filter: 'blur(10px)' },
    animate: { opacity: 1, filter: 'blur(0px)' },
  },
  sophisticated: {
    initial: { opacity: 0, y: 30, scale: 0.95, filter: 'blur(5px)' },
    animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
  },
};

export default function AnimatedElement({
  children,
  delay = 0,
  className = '',
  as = 'div',
  variant = 'fade',
  useScrollTrigger = false,
}: AnimatedElementProps) {
  const MotionComponent = motion[as];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const selectedVariant = animationVariants[variant];
  const shouldAnimate = useScrollTrigger ? isInView : true;

  return (
    <MotionComponent
      ref={ref}
      initial={selectedVariant.initial}
      animate={shouldAnimate ? selectedVariant.animate : selectedVariant.initial}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}
