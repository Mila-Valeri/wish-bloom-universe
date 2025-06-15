
import React from "react";

interface HeroTitleProps {
  children: React.ReactNode;
}

/**
 * Modern, centered h1 with fade-in and proper spacing/text rendering to prevent truncation.
 */
const HeroTitle = ({ children }: HeroTitleProps) => (
  <div className="flex justify-center items-center h-[40vh] text-center px-4">
    <h1
      className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight animate-fade-in bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-md font-poppins"
      style={{
        lineHeight: "1.2",
        paddingBottom: "12px",
      }}
    >
      {children}
    </h1>
  </div>
);

export default HeroTitle;
