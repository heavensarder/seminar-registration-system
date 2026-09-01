import React from 'react';

interface TsiLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const TsiLogo: React.FC<TsiLogoProps> = ({ className = '', size = 'md' }) => {
  const height = size === 'sm' ? 24 : size === 'lg' ? 44 : 32;

  return (
    <div className={`inline-flex flex-col items-center justify-center font-bold tracking-tight select-none ${className}`}>
      {/* Top red bar */}
      <div className="w-full h-1 bg-[#d90429] rounded-xs mb-0.5"></div>
      <div className="flex items-center justify-center px-1">
        <span
          className="text-[#0284c7] font-black tracking-tighter"
          style={{ fontSize: `${height * 0.75}px`, lineHeight: 1, fontFamily: 'Oswald, sans-serif' }}
        >
          TSI
        </span>
      </div>
      {/* Bottom red bar */}
      <div className="w-full h-1 bg-[#d90429] rounded-xs mt-0.5"></div>
    </div>
  );
};
