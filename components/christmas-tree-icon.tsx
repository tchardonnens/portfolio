import React from 'react';

const ChristmasTreeIcon: React.FC = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L8 6H4L8 10L4 14H8L12 18L16 14H20L16 10H12L16 6H20L16 2H12Z"
        fill="#006400"
      />
      <rect x="11" y="18" width="2" height="4" fill="#8B4513" />
      <circle cx="6" cy="8" r="1" fill="#FFD700" />
      <circle cx="18" cy="8" r="1" fill="#FFD700" />
      <circle cx="10" cy="12" r="1" fill="#FFD700" />
      <circle cx="14" cy="12" r="1" fill="#FFD700" />
      <circle cx="12" cy="16" r="1" fill="#FFD700" />
    </svg>
  );
};

export default ChristmasTreeIcon;