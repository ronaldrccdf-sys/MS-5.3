
import React, { useState } from 'react';

// Logo oficial atualizado
const LOGO_URL = "/assets/firm-logo.jpg";

export const Logo = ({ 
  className = "h-12", 
  showText = false, 
  textSize = "text-2xl md:text-3xl",
  subtitleSize = "text-[0.6rem] md:text-[0.7rem]",
  id = "main" 
}: { 
  className?: string, 
  showText?: boolean, 
  textSize?: string,
  subtitleSize?: string,
  id?: string 
}) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="relative aspect-square h-full flex items-center justify-center">
        <img 
          src={LOGO_URL} 
          alt="Logo Marques & Serra" 
          className="w-full h-full object-contain mix-blend-screen"
        />
      </div>
      
      {showText && (
         <div className="flex flex-col justify-center animate-fade-in">
            <span className={`${textSize} font-serif text-white tracking-widest leading-none`}>Marques & Serra</span>
            <span className={`${subtitleSize} text-gold-500 uppercase tracking-[0.3em] mt-2`}>Sociedade de Advogados</span>
         </div>
      )}
    </div>
  );
};

export const LogoDark = ({ className = "h-12" }: { className?: string }) => {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="relative aspect-square h-full flex items-center justify-center">
          <img 
            src={LOGO_URL} 
            alt="Logo Marques & Serra" 
            className="w-full h-full object-contain mix-blend-screen"
          />
        </div>
      </div>
    );
};
