import React from "react";
import AnimatedStar from "./AnimatedStar";
import "./AnimatedStar.css";

const stars = [
  { left: "8%",  top: "22%", size: 48, delay: "0s", opacity: 0.92 },
  { right: "12%", top: "27%", size: 40, delay: "0.5s", opacity: 0.83 },
  { left: "18%", bottom: "18%", size: 36, delay: "1.5s", opacity: 0.72 },
  { right: "23%", bottom: "15%", size: 52, delay: "1.8s", opacity: 0.87 },
  { left: "50%", top: "13%", size: 38, delay: "0.8s", opacity: 0.79 },
  { left: "42%", bottom: "13%", size: 32, delay: "2.1s", opacity: 0.74 },
  { right: "50%", bottom: "19%", size: 30, delay: "1.1s", opacity: 0.68 },
];

const DreamStars = () => (
  <div className="pointer-events-none absolute inset-0 z-0">
    {stars.map((s, i) => (
      <AnimatedStar
        key={i}
        top={s.top}
        left={s.left}
        right={s.right}
        bottom={s.bottom}
        size={s.size}
        style={{
          opacity: s.opacity,
          animationDelay: s.delay,
        }}
      />
    ))}
  </div>
);

export default DreamStars;
