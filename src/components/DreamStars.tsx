
import React from "react";
import DreamStarSVG from "./DreamStarSVG";

const stars = [
  { left: "8%",  top: "22%", size: 48, delay: "0s", opacity: 0.92, rotate: -10 },
  { right: "12%", top: "27%", size: 40, delay: "0.5s", opacity: 0.85, rotate: 8 },
  { left: "18%", bottom: "18%", size: 36, delay: "1.2s", opacity: 0.72, rotate: 4 },
  { right: "23%", bottom: "15%", size: 52, delay: "1.7s", opacity: 0.87, rotate: -6 },
  { left: "50%", top: "16%", size: 38, delay: "0.3s", opacity: 0.78, rotate: 17 },
  { left: "42%", bottom: "13%", size: 32, delay: "2.1s", opacity: 0.76, rotate: -18 },
  { right: "50%", bottom: "19%", size: 30, delay: "1.4s", opacity: 0.6, rotate: 12 },
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
          opacity: s.opacity,
          position: "absolute",
          animationDelay: s.delay,
          transform: `rotate(${s.rotate}deg)`,
        }}
      >
        <DreamStarSVG size={s.size} />
      </span>
    ))}
  </div>
);

export default DreamStars;
