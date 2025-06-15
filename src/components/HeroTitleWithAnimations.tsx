
import React from "react";

// Utility: floating emoji style generator
const floatVariants = [
  "animate-float-slow",
  "animate-float-medium",
  "animate-float-fast"
];

// Hearts/stars: diverse, with float+fade, balanced for visual harmony
const heartsAndStars = [
  // Orig 5, visually pleasing random placements and sizes
  { emoji: "⭐", className: "text-yellow-400 text-xl left-8 top-8", float: floatVariants[0], delay: "delay-[0ms]" },
  { emoji: "💖", className: "text-pink-400 text-base right-10 top-12", float: floatVariants[1], delay: "delay-[200ms]" },
  { emoji: "💜", className: "text-purple-400 text-lg left-1/2 top-2", float: floatVariants[0], delay: "delay-[350ms]" },
  { emoji: "⭐", className: "text-yellow-400 text-sm right-1/3 bottom-6", float: floatVariants[2], delay: "delay-[600ms]" },
  { emoji: "💖", className: "text-pink-300 text-xl left-1/4 bottom-8", float: floatVariants[1], delay: "delay-[800ms]" },
  // Extras for new richness
  { emoji: "💛", className: "text-yellow-300 text-[13px] left-12 bottom-20", float: floatVariants[1], delay: "delay-[650ms]" },
  { emoji: "💜", className: "text-purple-500 text-[17px] right-16 top-6", float: floatVariants[2], delay: "delay-[400ms]" },
  { emoji: "⭐", className: "text-yellow-400 text-[10px] left-6 top-1/2", float: floatVariants[1], delay: "delay-[300ms]" },
];

const HeroTitleWithAnimations = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-[50vh] text-center overflow-hidden px-4">
      {/* Анимированные сердечки/звёздочки. z-0: ниже текста */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        {heartsAndStars.map((item, idx) => (
          <span
            key={idx}
            className={
              `absolute ${item.className} ${item.float} animate-fade-pop ${item.delay} pointer-events-none select-none`
            }
            style={{
              animationDelay: item.delay?.replace("delay-[", "").replace("ms]", "ms") || undefined,
            }}
            aria-hidden="true"
          >
            {item.emoji}
          </span>
        ))}
      </div>

      {/* Заголовок */}
      <h1
        className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-transparent bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text drop-shadow-xl font-poppins hero-gel-highlight"
        style={{
          lineHeight: "1.2",
          paddingBottom: "12px",
          textShadow:
            "0 4px 10px rgba(160, 90, 255, 0.3), 0 1px 0 rgba(0, 0, 0, 0.2)", // двойная тень
          filter: "drop-shadow(0 2px 6px rgba(168,85,247,0.4))", // "гель"-эффект
        }}
      >
        Bring your dreams to life
      </h1>

      {/* Подзаголовок */}
      <p className="relative z-10 mt-4 text-gray-600 dark:text-gray-300 max-w-xl animate-fade-pop">
        Share your dreams with the world and inspire others to chase theirs
      </p>
    </div>
  );
};

export default HeroTitleWithAnimations;
