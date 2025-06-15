
import React from "react";

interface DreamStarSVGProps {
  size?: number;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Вытянутая мечтательная звезда софт-градиентом, как на PNG
 */
const DreamStarSVG = ({
  size = 38,
  style,
  className = "",
}: DreamStarSVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    style={style}
    aria-hidden="true"
  >
    <defs>
      <radialGradient
        id="dream-star-grad"
        cx="50%"
        cy="50%"
        r="67%"
        fx="50%"
        fy="50%"
      >
        <stop offset="0%" stopColor="#FFFBBC" stopOpacity="1" />
        <stop offset="72%" stopColor="#FFD835" stopOpacity="0.95" />
        <stop offset="92%" stopColor="#FFC107" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#FF9800" stopOpacity="0.82" />
      </radialGradient>
      <filter id="glow" x="-25%" y="-25%" width="150%" height="150%">
        <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#FF9800" floodOpacity="0.35"/>
        <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#FFD835" floodOpacity="0.27"/>
      </filter>
    </defs>
    <path
      d="
        M24 4
        Q27.7 16.5 44 24
        Q27.7 31.5 24 44
        Q20.3 31.5 4 24
        Q20.3 16.5 24 4
        Z
      "
      fill="url(#dream-star-grad)"
      filter="url(#glow)"
    />
  </svg>
);

export default DreamStarSVG;

