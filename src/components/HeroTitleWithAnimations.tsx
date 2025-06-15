
import React from "react";

const HeroTitleWithAnimations = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-[50vh] text-center overflow-hidden px-4">
      {/* Анимированные сердечки/звёздочки */}
      <span className="absolute text-yellow-400 text-xl animate-float-slow left-8 top-8 pointer-events-none select-none">⭐</span>
      <span className="absolute text-pink-400 text-base animate-float-medium right-10 top-12 pointer-events-none select-none">💖</span>
      <span className="absolute text-purple-400 text-lg animate-float-slow left-1/2 top-2 pointer-events-none select-none">💜</span>
      <span className="absolute text-yellow-400 text-sm animate-float-fast right-1/3 bottom-6 pointer-events-none select-none">⭐</span>
      <span className="absolute text-pink-300 text-xl animate-float-medium left-1/4 bottom-8 pointer-events-none select-none">💖</span>

      {/* Заголовок */}
      <h1
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-transparent bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text drop-shadow-xl font-poppins"
        style={{
          lineHeight: "1.2",
          paddingBottom: "12px",
          textShadow: "0 4px 10px rgba(160, 90, 255, 0.3), 0 1px 0 rgba(0, 0, 0, 0.2)",
        }}
      >
        Bring your dreams to life
      </h1>

      {/* Подзаголовок */}
      <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-xl">
        Share your dreams with the world and inspire others to chase theirs
      </p>
    </div>
  );
};

export default HeroTitleWithAnimations;
