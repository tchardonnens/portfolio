import React from 'react';

const SiriSphereLogo = ({ size = 75 }) => {
  return (
    <div className="siri-sphere" style={{ width: size, height: size }}>
      <div className="fluid-body"></div>
      <div className="fluid-body"></div>
      <div className="fluid-body"></div>
      <div className="outer-glow"></div>
    </div>
  );
};

export default SiriSphereLogo;

// CSS-in-JS styles
const styles = `
  .siri-sphere {
    position: relative;
    animation: pulsate 4s ease-in-out infinite alternate;
  }
  .fluid-body {
    position: absolute;
    border-radius: 50%;
    filter: blur(3px);
    mix-blend-mode: screen;
    animation: float 10s ease-in-out infinite alternate;
  }
  .fluid-body:nth-child(1) {
    width: 75%;
    height: 75%;
    background: radial-gradient(circle at 30% 30%, #4B0082, #1E90FF);
    top: 5%;
    left: 5%;
    animation-delay: -2s;
  }
  .fluid-body:nth-child(2) {
    width: 60%;
    height: 60%;
    background: radial-gradient(circle at 70% 70%, #6A5ACD, #0000CD);
    top: 20%;
    left: 20%;
    animation-delay: -1s;
  }
  .fluid-body:nth-child(3) {
    width: 45%;
    height: 45%;
    background: radial-gradient(circle at 40% 60%, #8A2BE2, #4169E1);
    top: 35%;
    left: 35%;
    animation-delay: -3s;
  }
  .outer-glow {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: radial-gradient(circle at center, rgba(138, 43, 226, 0.2) 0%, rgba(70, 130, 180, 0.1) 50%, rgba(0,0,0,0) 70%);
    filter: blur(5px);
  }
  @keyframes float {
    0%, 100% { transform: translate(0, 0); }
    25% { transform: translate(-5%, 5%); }
    50% { transform: translate(5%, -5%); }
    75% { transform: translate(5%, 5%); }
  }
  @keyframes pulsate {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
`;

// Inject styles into the document
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}