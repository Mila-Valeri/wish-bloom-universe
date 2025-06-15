
import React from "react";

/**
 * Опис для анімованих декоративних зірок навколо заголовка Hero
 * left/right, top/bottom - позиція; size - px; color - "#FFC107"/"#FF9800"
 */
const stars = [
  { left: "8%",  top: "22%", size: 48, color: "#FFC107", delay: "0s", opacity: 0.92 },
  { right: "12%", top: "27%", size: 40, color: "#FFC107", delay: "0.5s", opacity: 0.85 },
  { left: "18%", bottom: "18%", size: 36, color: "#FF9800", delay: "1.2s", opacity: 0.72 },
  { right: "23%", bottom: "15%", size: 52, color: "#FFC107", delay: "1.7s", opacity: 0.87 },
  { left: "50%", top: "16%", size: 38, color: "#FF9800", delay: "0.3s", opacity: 0.78 },
  { left: "42%", bottom: "13%", size: 32, color: "#FFC107", delay: "2.1s", opacity: 0.76 },
  { right: "50%", bottom: "19%", size: 30, color: "#FF9800", delay: "1.4s", opacity: 0.6 },
];

const DreamStars = () => (
  <div className="pointer-events-none absolute inset-0 z-0">
    {stars.map((s, i) => (
      <span
        key={i}
        className="dream-star-hero"
        aria-hidden="true"
        style={{
          ...("left" in s ? { left: s.left } : {}),
          ...("right" in s ? { right: s.right } : {}),
          ...("top" in s ? { top: s.top } : {}),
          ...("bottom" in s ? { bottom: s.bottom } : {}),
          fontSize: `${s.size}px`,
          color: s.color,
          opacity: s.opacity,
          filter: "drop-shadow(0 5px 16px rgba(255,193,7,0.25))",
          animationDelay: s.delay,
        }}
      >
        ★
      </span>
    ))}
  </div>
);

export default DreamStars;
