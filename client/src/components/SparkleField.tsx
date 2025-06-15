
import React, { memo } from 'react';
import Sparkle from './Sparkle';

const SparkleField = memo(() => {
  return (
    <div 
      style={{ 
        position: 'absolute', 
        inset: 0, 
        pointerEvents: 'none', 
        zIndex: 0,
        willChange: 'transform' // Оптимизация для анимаций
      }}
    >
      <Sparkle top="10%" left="15%" size="28px" />
      <Sparkle top="23%" left="28%" size="33px" />
      <Sparkle top="18%" left="67%" size="36px" />
      <Sparkle top="8%" left="82%" size="29px" />
      <Sparkle top="70%" left="65%" size="45px" />
      <Sparkle top="60%" left="18%" size="39px" />
      <Sparkle top="44%" left="48%" size="40px" />
      <Sparkle top="78%" left="80%" size="27px" />
      <Sparkle top="85%" left="22%" size="35px" />
      <Sparkle top="50%" left="86%" size="33px" />
    </div>
  );
});

SparkleField.displayName = 'SparkleField';

export default SparkleField;
