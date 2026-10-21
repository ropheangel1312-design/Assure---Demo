import React from 'react';
import { CONDITION_FLAG_COLORS } from '../../engine/evaluation';
import { ConditionFlag } from '../../types';

interface ConditionFlagChipProps {
  flag: ConditionFlag;
  size?: 'sm' | 'md';
  className?: string;
}

export const ConditionFlagChip: React.FC<ConditionFlagChipProps> = ({
  flag,
  size = 'md',
  className = '',
}) => {
  const color = CONDITION_FLAG_COLORS[flag] || '#C4483F';

  const sizeClasses = {
    sm: 'text-[10px] px-1.5 py-0.5 gap-1',
    md: 'text-xs px-2 py-0.5 gap-1.5',
  };

  // Distinct glyph per flag
  const renderGlyph = () => {
    switch (flag) {
      case 'CONTRADICTORY':
        return <span className="text-[10px] font-bold">▲</span>; // Warning triangle
      case 'STALE':
        return <span className="text-[10px]">⏱</span>;
      case 'EXPIRED':
        return <span className="text-[10px]">■</span>; // Terminal square
      case 'DISPUTED':
        return <span className="text-[10px]">◆</span>;
      case 'SUPERSEDED':
        return <span className="text-[10px]">↳</span>;
      default:
        return <span className="text-[10px]">▲</span>;
    }
  };

  return (
    <span
      className={`inline-flex items-center font-mono font-medium rounded border tracking-wider uppercase select-none whitespace-nowrap ${sizeClasses[size]} ${className}`}
      style={{
        backgroundColor: `${color}1A`,
        borderColor: `${color}60`,
        color: color,
      }}
      title={`Condition Flag: ${flag}`}
    >
      {renderGlyph()}
      <span className="font-sans font-semibold text-[10px]">{flag}</span>
    </span>
  );
};
