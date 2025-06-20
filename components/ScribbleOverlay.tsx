'use client';

import React from 'react';

// This component is now ONLY for the 'destructive' style
const ScribbleOverlay = () => {
  return (
    <div
      className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none"
      aria-hidden="true"
    >
      <div 
        className="w-[90%] h-[90%]"
        style={{
          backgroundImage: 'url(/line.png)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          opacity: 0.9,
        }}
      />
    </div>
  );
};

export default ScribbleOverlay; 