
import React from 'react';
import sparkle from '../assets/sparkle.png';
import './Sparkle.css';

interface SparkleProps {
  top: string;
  left: string;
  size?: string;
  style?: React.CSSProperties;
}

const Sparkle: React.FC<SparkleProps> = ({ top, left, size = '30px', style }) => {
  return (
    <img
      src={sparkle}
      alt="sparkle"
      className="sparkle"
      style={{
        top,
        left,
        width: size,
        height: size,
        position: 'absolute',
        pointerEvents: 'none',
        animation: 'jump 3s ease-in-out infinite, blink 4s ease-in-out infinite',
        ...style,
      }}
      draggable={false}
    />
  );
};

export default Sparkle;
