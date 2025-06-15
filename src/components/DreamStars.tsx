
import React from "react";

/**
 * Массив описаний звёзд — позиция, размер, задержка анимации
 */
const stars = [
  { left: "5%", top: "18%", size: 32, delay: "0s", opacity: 0.82 },
  { left: "18%", top: "5%", size: 28, delay: "0.4s", opacity: 0.7 },
  { right: "10%", top: "8%", size: 38, delay: "0.85s", opacity: 1 },
  { left: "30%", top: "30%", size: 20, delay: "1.2s", opacity: 0.6 },
  { right: "15%", top: "32%", size: 24, delay: "0.7s", opacity: 0.68 },
  { left: "9%", bottom: "15%", size: 26, delay: "2.1s", opacity: 0.8 },
  { right: "17%", bottom: "10%", size: 34, delay: "1.7s", opacity: 0.72 },
  { left: "50%", top: "12%", size: 22, delay: "0.28s", opacity: 0.7 },
  { right: "40%", top: "22%", size: 29, delay: "0.96s", opacity: 0.74 },
  { left: "44%", bottom: "10%", size: 25, delay: "1.5s", opacity: 0.62 },
];

const DreamStars = () => (
  <div className="pointer-events-none absolute inset-0 z-0">
    {stars.map((s, i) => (
      <span
        key={i}
        className="dream-star"
        aria-hidden="true"
        style={{
          ...("left" in s ? { left: s.left } : {}),
          ...("right" in s ? { right: s.right } : {}),
          ...("top" in s ? { top: s.top } : {}),
          ...("bottom" in s ? { bottom: s.bottom } : {}),
          fontSize: `${s.size}px`,
          opacity: s.opacity,
          filter: "drop-shadow(0 5px 12px rgba(246,224,94,0.16))",
          animationDelay: s.delay,
        }}
      >
        ⭐
      </span>
    ))}
  </div>
);

export default DreamStars;
