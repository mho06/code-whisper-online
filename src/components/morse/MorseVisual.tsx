
import React from 'react';

interface MorseVisualProps {
  code: string;
}

const MorseVisual: React.FC<MorseVisualProps> = ({ code }) => {
  return (
    <div className="flex items-center justify-center my-2">
      {code.split('').map((symbol, index) => {
        if (symbol === '.') {
          return <span key={index} className="morse-dot"></span>;
        } else if (symbol === '-') {
          return <span key={index} className="morse-dash"></span>;
        } else if (symbol === ' ') {
          return <span key={index} className="morse-space"></span>;
        } else if (symbol === '/') {
          return <span key={index} className="inline-block w-8 h-3 bg-transparent mx-1"></span>;
        }
        return null;
      })}
    </div>
  );
};

export default MorseVisual;
