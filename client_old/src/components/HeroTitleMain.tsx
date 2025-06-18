import React from "react";
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Головний великий адаптивний заголовок з вручну заданим переносом та тінню
 */
const HeroTitleMain = () => {
  const { language } = useLanguage();
  
  const titleText = language === 'ua' ? 'Втілюй свої\nмрії в життя' : 'Bring your\ndreams to life';
  
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[48vh] sm:min-h-[58vh] md:min-h-[62vh] text-center px-4">
      <h1
        className="
          font-extrabold font-poppins
          text-transparent bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text 
          drop-shadow-xl
          relative z-10
          select-none
        "
        style={{
          fontSize: "clamp(48px, 8vw, 88px)",
          lineHeight: "1.08",
          textShadow: `
            0 4px 10px rgba(160, 90, 255, 0.3),
            0 2px 4px rgba(0, 0, 0, 0.25)
          `,
          fontWeight: 800,
          paddingBottom: "12px",
        }}
      >
        {titleText.split('\n').map((line, index) => (
          <span key={index}>
            {line}
            {index < titleText.split('\n').length - 1 && <br />}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default HeroTitleMain;