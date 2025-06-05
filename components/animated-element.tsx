import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedElementProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
}

export default function AnimatedElement({
  children,
  delay = 0,
  className = '',
  as = 'div',
}: AnimatedElementProps) {
  const MotionComponent = motion[as];

  return (
    <MotionComponent
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}
