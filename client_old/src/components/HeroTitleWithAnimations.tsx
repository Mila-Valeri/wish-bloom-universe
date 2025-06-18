
import React from "react";
import DreamStars from "./DreamStars";

// Utility: floating emoji style generator (оставим для других эмодзи)
const floatVariants = [
  "animate-float-slow",
  "animate-float-medium",
  "animate-float-fast"
];

const heartsAndStars = [
  { emoji: "💖", className: "text-pink-400 text-base right-10 top-12", float: floatVariants[1], delay: "200ms" },
  { emoji: "💜", className: "text-purple-400 text-lg left-1/2 top-2", float: floatVariants[0], delay: "350ms" },
  { emoji: "💛", className: "text-yellow-300 text-[13px] left-12 bottom-20", float: floatVariants[1], delay: "650ms" },
  { emoji: "💜", className: "text-purple-500 text-[17px] right-16 top-6", float: floatVariants[2], delay: "400ms" },
  { emoji: "⭐", className: "text-yellow-400 text-[10px] left-6 top-1/2", float: floatVariants[1], delay: "300ms" },
];

const HeroTitleWithAnimations = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[56vh] sm:min-h-[62vh] md:min-h-[66vh] text-center overflow-visible px-4">
      {/* Декоративные основные жёлтые звёздочки, за эмодзи и текстом */}
      <DreamStars />

      {/* Анимированные сердечки/малые звезды, тоже позади текста */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        {heartsAndStars.map((item, idx) => (
          <span
            key={idx}
            className={
              `absolute ${item.className} ${item.float} animate-fade-pop pointer-events-none select-none`
            }
            style={{
              animationDelay: item.delay,
            }}
            aria-hidden="true"
          >
            {item.emoji}
          </span>
        ))}
      </div>

      {/* Заголовок: крупнее, из двух строк, всё адаптивно */}
      <h1
        className="
          relative z-10 
          font-extrabold
          leading-tight 
          font-poppins
          text-transparent
          bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text
          drop-shadow-xl
          hero-gel-highlight
        "
        style={{
          fontSize: "clamp(42px, 8vw, 68px)",
          lineHeight: "1.14",
          paddingBottom: "12px",
          textShadow:
            "0 4px 10px rgba(160,90,255,0.3), 0 1px 0 rgba(0,0,0,0.2)",
          filter: "drop-shadow(0 2px 6px rgba(168,85,247,0.4))",
        }}
      >
        Bring your<br className="sm:hidden" /> dreams to life
      </h1>

      {/* Подзаголовок */}
      <p className="relative z-10 mt-4 text-gray-600 dark:text-gray-300 max-w-xl animate-fade-pop">
        Share your dreams with the world and inspire others to chase theirs
      </p>
    </div>
  );
};

export default HeroTitleWithAnimations;
