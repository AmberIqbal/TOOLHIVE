'use client';

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  highlight?: boolean;
}

export default function Card({ children, className = '', highlight = false }: CardProps) {
  return (
    <div className={`
      bg-white/5 rounded-2xl p-8 
      ${highlight ? 'border border-primary-500/30' : 'border border-white/10'}
      ${className}
    `}>
      {children}
    </div>
  );
}
