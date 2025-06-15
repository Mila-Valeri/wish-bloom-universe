
import React from "react";
import "./AnimatedStar.css";

interface AnimatedStarProps {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  size?: number;
  style?: React.CSSProperties;
}

const AnimatedStar: React.FC<AnimatedStarProps> = ({
  top,
  left,
  right,
  bottom,
  size = 36,
  style,
}) => {
  // Путь к картинке внутри src/assets
  const src = "/assets/sparkle.png"; // Статические ассеты публичны из public, иначе используйте import image от vite

  return (
    <img
      src={src}
      className="animated-star"
      style={{
        position: "absolute",
        top,
        left,
        right,
        bottom,
        width: `${size}px`,
        height: `${size}px`,
        pointerEvents: "none",
        ...style,
      }}
      alt="sparkle"
      draggable={false}
    />
  );
};

export default AnimatedStar;
