import React from 'react';

const GiftIcon: React.FC = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3" y="8" width="18" height="4" rx="1" fill="#D62828" />
      <rect x="5" y="4" width="14" height="4" rx="1" fill="#D62828" />
      <path d="M12 4V8" stroke="#FFFFFF" strokeWidth="2" />
      <path d="M8 8V12" stroke="#FFFFFF" strokeWidth="2" />
      <path d="M16 8V12" stroke="#FFFFFF" strokeWidth="2" />
      <rect x="7" y="12" width="10" height="2" rx="1" fill="#D62828" />
      <path d="M12 12V14" stroke="#FFFFFF" strokeWidth="2" />
      <circle cx="12" cy="18" r="2" fill="#FFD700" />
      <path d="M12 16V18" stroke="#FFD700" strokeWidth="2" />
    </svg>
  );
};

export default GiftIcon;