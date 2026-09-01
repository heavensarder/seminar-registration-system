import React from 'react';

interface QrCodeBadgeProps {
  value?: string;
  size?: number;
  className?: string;
  onClick?: () => void;
}

export const QrCodeBadge: React.FC<QrCodeBadgeProps> = ({
  value = 'https://kizuna2026.okayama-bangladesh.org/register',
  size = 120,
  className = '',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative bg-white p-2.5 rounded-2xl shadow-lg border border-teal-900/20 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 group ${className}`}
      style={{ width: size, height: size }}
      title={`Scan or click to register: ${value}`}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full text-[#083331]"
        fill="currentColor"
      >
        {/* Top-left position marker */}
        <rect x="5" y="5" width="28" height="28" fill="#083331" rx="4" />
        <rect x="9" y="9" width="20" height="20" fill="white" rx="2" />
        <rect x="13" y="13" width="12" height="12" fill="#083331" rx="2" />

        {/* Top-right position marker */}
        <rect x="67" y="5" width="28" height="28" fill="#083331" rx="4" />
        <rect x="71" y="9" width="20" height="20" fill="white" rx="2" />
        <rect x="75" y="13" width="12" height="12" fill="#083331" rx="2" />

        {/* Bottom-left position marker */}
        <rect x="5" y="67" width="28" height="28" fill="#083331" rx="4" />
        <rect x="9" y="71" width="20" height="20" fill="white" rx="2" />
        <rect x="13" y="75" width="12" height="12" fill="#083331" rx="2" />

        {/* Dynamic Pattern Matrix resembling real high-density QR */}
        <rect x="38" y="7" width="6" height="6" fill="#083331" />
        <rect x="48" y="7" width="6" height="6" fill="#083331" />
        <rect x="56" y="7" width="6" height="6" fill="#083331" />
        
        <rect x="38" y="17" width="6" height="6" fill="#083331" />
        <rect x="48" y="17" width="14" height="6" fill="#083331" />

        <rect x="7" y="38" width="6" height="6" fill="#083331" />
        <rect x="17" y="38" width="14" height="6" fill="#083331" />
        <rect x="38" y="38" width="8" height="8" fill="#083331" />
        <rect x="50" y="36" width="6" height="10" fill="#083331" />
        <rect x="62" y="38" width="12" height="6" fill="#083331" />
        <rect x="78" y="38" width="14" height="6" fill="#083331" />

        <rect x="7" y="48" width="14" height="6" fill="#083331" />
        <rect x="25" y="48" width="6" height="12" fill="#083331" />
        <rect x="36" y="50" width="12" height="6" fill="#083331" />
        <rect x="52" y="50" width="8" height="8" fill="#083331" />
        <rect x="68" y="48" width="6" height="14" fill="#083331" />
        <rect x="80" y="48" width="12" height="6" fill="#083331" />

        <rect x="7" y="58" width="6" height="6" fill="#083331" />
        <rect x="17" y="58" width="6" height="6" fill="#083331" />
        <rect x="38" y="62" width="6" height="14" fill="#083331" />
        <rect x="48" y="62" width="14" height="6" fill="#083331" />

        <rect x="38" y="80" width="12" height="12" fill="#083331" />
        <rect x="54" y="74" width="6" height="18" fill="#083331" />
        <rect x="66" y="68" width="12" height="6" fill="#083331" />
        <rect x="82" y="68" width="10" height="10" fill="#083331" />
        <rect x="66" y="80" width="26" height="12" fill="#083331" />
        
        {/* Center tiny decorative red dot for Kizuna touch */}
        <circle cx="50" cy="50" r="3" fill="#e62b32" />
      </svg>

      {/* Floating scan tooltip badge */}
      <span className="absolute -bottom-2 bg-[#e62b32] text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs tracking-wider opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all">
        SCAN / TAP
      </span>
    </div>
  );
};
