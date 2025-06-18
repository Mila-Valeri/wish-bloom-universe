
import React, { memo } from 'react';
import './Sparkle.css';

interface SparkleProps {
  top: string;
  left: string;
  size?: string;
}

const Sparkle = memo(({ top, left, size = '30px' }: SparkleProps) => {
  return (
    <div
      className="sparkle"
      style={{
        position: 'absolute',
        top,
        left,
        width: size,
        height: size,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="url(#grad)"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          <radialGradient id="grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff17a" />
            <stop offset="100%" stopColor="#ffa600" />
          </radialGradient>
        </defs>
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
      </svg>
    </div>
  );
});

Sparkle.displayName = 'Sparkle';

export default Sparkle;
