
import React from "react";

interface DreamStarSVGProps {
  size?: number;
  style?: React.CSSProperties;
  className?: string;
}

const DreamStarSVG = ({
  size = 38,
  style,
  className = "",
}: DreamStarSVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    className={className}
    style={style}
    aria-hidden="true"
  >
    <defs>
      <radialGradient id="dream-star-grad" cx="50%" cy="38%" r="60%">
        <stop offset="0%" stopColor="#FFFDE1" stopOpacity="1" />
        <stop offset="70%" stopColor="#FFD600" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#FF9800" stopOpacity="0.84" />
      </radialGradient>
    </defs>
    <path
      d="M16 2.5
        L19.5 11.5
        L29 12.3
        L21.3 18.3
        L23.8 27.2
        L16 22
        L8.2 27.2
        L10.7 18.3
        L3 12.3
        L12.5 11.5
        Z"
      fill="url(#dream-star-grad)"
      filter="drop-shadow(0 4px 16px #FF980066)"
    />
  </svg>
);

export default DreamStarSVG;
