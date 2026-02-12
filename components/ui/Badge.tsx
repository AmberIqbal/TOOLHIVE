'use client';

interface BadgeProps {
  children: string;
  variant?: 'free' | 'ai' | 'soon';
}

export default function Badge({ children, variant = 'free' }: BadgeProps) {
  const variants = {
    free: 'bg-green-500/20 text-green-300 border border-green-500/30',
    ai: 'bg-gradient-to-r from-primary-500 to-pink-500 text-white',
    soon: 'bg-gray-600 text-gray-300',
  };

  return (
    <span className={`
      inline-block px-4 py-1.5 rounded-full text-xs font-bold
      ${variants[variant]}
    `}>
      {children}
    </span>
  );
}
