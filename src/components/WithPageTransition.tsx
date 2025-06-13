import React from 'react';
import { motion } from 'framer-motion';
import { usePageTransition } from '@/hooks';

interface WithPageTransitionProps {
  children: React.ReactNode;
  className?: string;
  transitionType?: 'slide' | 'fade' | 'scale';
}

const WithPageTransition: React.FC<WithPageTransitionProps> = ({
  children,
  className,
  transitionType = 'slide',
}) => {
  const { direction } = usePageTransition();

  const getPageVariants = () => {
    switch (transitionType) {
      case 'fade':
        return {
          initial: { opacity: 0 },
          in: { opacity: 1 },
          out: { opacity: 0 },
        };
      case 'scale':
        return {
          initial: { opacity: 0, scale: 0.95 },
          in: { opacity: 1, scale: 1 },
          out: { opacity: 0, scale: 1.05 },
        };
      case 'slide':
      default:
        return {
          initial: { opacity: 0, x: direction === 'right' ? -20 : 20 },
          in: { opacity: 1, x: 0 },
          out: { opacity: 0, x: direction === 'right' ? 20 : -20 },
        };
    }
  };

  const pageVariants = getPageVariants();

  const pageTransition = {
    type: 'tween' as const,
    ease: 'easeInOut' as const,
    duration: 0.4,
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
      variants={pageVariants}
      transition={pageTransition}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default WithPageTransition;
