import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = '', hover = false, onClick }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -8, scale: 1.01 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
      className={`
        backdrop-blur-md bg-slate-900/80 border border-slate-800/50 rounded-2xl
        ${hover ? 'cursor-pointer hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/10' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

export function GlassCard({ children, className = '', onClick }: CardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={`
        backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/10
        border border-white/10 rounded-3xl shadow-2xl
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
