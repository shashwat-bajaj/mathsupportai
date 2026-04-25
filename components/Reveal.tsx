'use client';

import type { CSSProperties, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

export default function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
  style,
  once = true,
  amount = 0.18
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
  once?: boolean;
  amount?: number;
}) {
  const reduceMotion = useReducedMotion();

  const nextClassName = className ? `revealShell ${className}` : 'revealShell';

  if (reduceMotion) {
    return (
      <div className={nextClassName} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={nextClassName}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.48, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}