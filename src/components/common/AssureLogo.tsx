import React from 'react';

interface AssureLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'mark' | 'badge';
  withSubtitle?: boolean;
  subtitleText?: string;
  className?: string;
}

export const AssureLogo: React.FC<AssureLogoProps> = ({
  size = 'md',
  variant = 'full',
  withSubtitle = true,
  subtitleText = 'COMMITMENT ASSURANCE',
  className = '',
}) => {
  // Dimensions per size
  const markDimensions = {
    xs: { box: 'w-6 h-6', svg: 24, iconSize: 'w-3.5 h-3.5' },
    sm: { box: 'w-8 h-8', svg: 32, iconSize: 'w-4.5 h-4.5' },
    md: { box: 'w-9 h-9', svg: 36, iconSize: 'w-5 h-5' },
    lg: { box: 'w-11 h-11', svg: 44, iconSize: 'w-6 h-6' },
    xl: { box: 'w-14 h-14', svg: 56, iconSize: 'w-8 h-8' },
  };

  const textStyles = {
    xs: { title: 'text-xs tracking-tight', sub: 'text-[7px]' },
    sm: { title: 'text-sm tracking-tight', sub: 'text-[8px]' },
    md: { title: 'text-base font-bold tracking-tight', sub: 'text-[9px]' },
    lg: { title: 'text-xl font-bold tracking-tight', sub: 'text-[10px]' },
    xl: { title: 'text-2xl font-bold tracking-tight', sub: 'text-xs' },
  };

  const { box, svg } = markDimensions[size];
  const { title, sub } = textStyles[size];

  // SVG Mark: Precision geometric "A" with interlocking hexagonal shield, sigma vector apex, and deterministic provenance nodes
  const LogoMark = (
    <div
      className={`relative ${box} shrink-0 rounded-2xl bg-gradient-to-b from-[#1E1B4B] via-[#111111] to-[#0A0A0A] p-[1px] shadow-lg shadow-indigo-950/40 border border-indigo-500/30 group-hover:border-indigo-400/60 transition-all duration-300 flex items-center justify-center overflow-hidden`}
    >
      {/* Dynamic ambient backlight */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/30 via-indigo-400/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

      {/* SVG Precision Geometry */}
      <svg
        width={svg}
        height={svg}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full h-full p-1.5"
      >
        <defs>
          <linearGradient id="assureGrad" x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#818CF8" />
            <stop offset="45%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#4338CA" />
          </linearGradient>
          <linearGradient id="assureAccent" x1="12" y1="12" x2="36" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#818CF8" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          <linearGradient id="shieldGrad" x1="24" y1="4" x2="24" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#4338CA" stopOpacity="0.05" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Faceted Shield Container */}
        <path
          d="M24 4L40 11V25C40 34 33 41.5 24 44C15 41.5 8 34 8 25V11L24 4Z"
          fill="url(#shieldGrad)"
          stroke="#6366F1"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.5"
        />

        {/* Convergent Vector Lines (Multi-Path Provenance) */}
        <path
          d="M14 18L24 24M34 18L24 24M24 38V24"
          stroke="#4F46E5"
          strokeWidth="1.2"
          strokeDasharray="2 2"
          strokeOpacity="0.7"
        />

        {/* Main Monogram: Architectural "A" + Sigma "Σ" Hybrid Structure */}
        {/* Left Strut */}
        <path
          d="M24 10L14 34H18.5L24 20.5L29.5 34H34L24 10Z"
          fill="url(#assureGrad)"
          stroke="#C7D2FE"
          strokeWidth="0.5"
        />

        {/* Horizontal Assurance Bar (Crossbar & Quantum Decision Gate) */}
        <path
          d="M17.5 27.5H30.5L32 30.5H16L17.5 27.5Z"
          fill="url(#assureAccent)"
        />

        {/* Sigma Crest (Deterministic Anchor at Apex) */}
        <path
          d="M20 13H28L24.5 17.5L28 22H20"
          stroke="#FFFFFF"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.4"
        />

        {/* Provenance Truth Nodes (Active Multi-Path Indicators) */}
        <circle cx="24" cy="10" r="2" fill="#38BDF8" filter="url(#glow)" />
        <circle cx="14" cy="34" r="1.5" fill="#10B981" />
        <circle cx="34" cy="34" r="1.5" fill="#818CF8" />
        <circle cx="24" cy="27.5" r="1.5" fill="#FFFFFF" />
      </svg>
    </div>
  );

  if (variant === 'mark') {
    return <div className={`inline-flex items-center ${className}`}>{LogoMark}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {LogoMark}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-sans font-extrabold text-[#EDEDED] uppercase tracking-wider ${title}`}>
            ASSURE
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
        </div>
        {withSubtitle && (
          <span className={`font-mono text-indigo-400 font-semibold uppercase tracking-widest mt-0.5 opacity-90 ${sub}`}>
            {subtitleText}
          </span>
        )}
      </div>
    </div>
  );
};
