
import React, { useState } from 'react';

// Link atualizado para a nova imagem do Google Drive
const LOGO_URL = "https://lh3.googleusercontent.com/d/1JRdyc9wmAc3m6oL-SC4kvy_uThOmzF8v";

export const Logo = ({ 
  className = "h-12", 
  showText = false, 
  textSize = "text-2xl md:text-3xl", // Aumentado o tamanho padrão
  subtitleSize = "text-[0.6rem] md:text-[0.7rem]", // Aumentado proporcionalmente
  id = "main" 
}: { 
  className?: string, 
  showText?: boolean, 
  textSize?: string,
  subtitleSize?: string,
  id?: string 
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Symbol Container - Fundo transparente */}
      <div className="relative aspect-square h-full flex items-center justify-center">
        {!imgError ? (
            <img 
                src={LOGO_URL} 
                alt="Logo Marques & Serra" 
                className="w-full h-full object-contain"
                onError={() => setImgError(true)}
            />
        ) : (
            /* Fallback para SVG se a imagem falhar */
            <svg viewBox="0 0 100 100" className="w-full h-full p-1" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4AF37" />
                  <stop offset="50%" stopColor="#F4E285" />
                  <stop offset="100%" stopColor="#C9A44C" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="46" fill="none" stroke="url(#goldGradient)" strokeWidth="0.5" opacity="0.5" />
              <text 
                x="50" 
                y="65" 
                fontFamily="Cinzel, serif" 
                fontSize="40" 
                fill="url(#goldGradient)" 
                textAnchor="middle" 
                fontWeight="bold"
                letterSpacing="-1"
              >
                M&amp;S
              </text>
            </svg>
        )}
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
    const [imgError, setImgError] = useState(false);

    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {/* Symbol Container - Fundo transparente */}
        <div className="relative aspect-square h-full flex items-center justify-center">
            {!imgError ? (
                <img 
                    src={LOGO_URL} 
                    alt="Logo Marques & Serra" 
                    className="w-full h-full object-contain"
                    onError={() => setImgError(true)}
                />
            ) : (
                <svg viewBox="0 0 100 100" className="w-full h-full p-1" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="46" fill="none" stroke="#C9A44C" strokeWidth="0.5" opacity="0.5" />
                    <text 
                      x="50" 
                      y="65" 
                      fontFamily="Cinzel, serif" 
                      fontSize="40" 
                      fill="#1a1a1a" 
                      textAnchor="middle" 
                      fontWeight="bold"
                      letterSpacing="-1"
                    >
                      M&amp;S
                    </text>
                </svg>
            )}
        </div>
      </div>
    );
};
