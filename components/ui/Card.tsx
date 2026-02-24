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
      bg-white rounded-2xl p-8 shadow-md
      ${highlight ? 'ring-2 ring-blue-500 shadow-lg' : 'border border-blue-100'}
      ${className}
    `}>
      {children}
    </div>
  );
}
