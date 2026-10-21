import React from 'react';
import { ASSURANCE_STATE_COLORS, ASSURANCE_STATE_NAMES } from '../../engine/evaluation';
import { AssuranceStateIndex } from '../../types';

interface StateBadgeProps {
  stateIndex: AssuranceStateIndex;
  size?: 'sm' | 'md' | 'lg';
  showWhyAffordance?: boolean;
  onWhyClick?: (e: React.MouseEvent) => void;
  className?: string;
}

export const StateBadge: React.FC<StateBadgeProps> = ({
  stateIndex,
  size = 'md',
  showWhyAffordance = false,
  onWhyClick,
  className = '',
}) => {
  const name = ASSURANCE_STATE_NAMES[stateIndex] || 'UNKNOWN';
  const color = ASSURANCE_STATE_COLORS[stateIndex] || '#6B7684';

  const sizeClasses = {
    sm: 'text-[10px] px-1.5 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2',
  };

  return (
    <span
      className={`inline-flex items-center font-mono font-medium rounded-full border border-current/20 select-none whitespace-nowrap ${sizeClasses[size]} ${className}`}
      style={{
        backgroundColor: `${color}14`,
        borderColor: `${color}40`,
        color: color,
      }}
      title={`[${stateIndex}] ${name}: Click or inspect for policy evaluation trace`}
    >
      {/* Shape glyph: Circle for ladder state */}
      <span
        className="w-1.5 h-1.5 rounded-full inline-block"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />
      <span className="opacity-75 font-semibold">{stateIndex}</span>
      <span className="tracking-wide font-sans text-[11px] font-semibold">{name}</span>

      {showWhyAffordance && (
        <button
          type="button"
          onClick={onWhyClick}
          className="ml-1 opacity-70 hover:opacity-100 underline decoration-dotted text-[10px] font-sans transition-opacity cursor-pointer"
          title="Why this state?"
        >
          Why?
        </button>
      )}
    </span>
  );
};
