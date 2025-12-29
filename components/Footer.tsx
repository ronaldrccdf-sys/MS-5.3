
import React from 'react';
import { LogoDark, Logo } from './Logo';
import { useLanguage } from './LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();

  const footerLinks = [
    { label: 'Home', href: '/' },
    { label: t('nav.office'), href: '/?view=sobre' },
    { label: t('nav.team'), href: '/?view=equipe' },
    { label: t('nav.practice'), href: '/?view=atuacao' },
    { label: t('nav.contact'), href: '/?view=contato' },
  ];

  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-white/10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col items-center">
        
        <div className="mb-12">
            <Logo className="h-24" />
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12 text-xs uppercase tracking-[0.2em] text-gray-400">
          {footerLinks.map((link, idx) => (
            <a 
              key={idx} 
              href={link.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-gold-500 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="w-full h-[1px] bg-white/10 mb-8 max-w-4xl"></div>

        <div className="text-center space-y-2">
          <p className="text-gray-500 text-[10px] uppercase tracking-wider">
            Marques & Serra {t('hero.sub3')} &copy; {new Date().getFullYear()}
          </p>
          <p className="text-gray-600 text-[10px] uppercase tracking-wider">
            SAUS Quadra 1 BL. M Sala 1301 - Edifício Libertas - Brasília-DF
          </p>
          <p className="text-gray-600 text-[10px] uppercase tracking-wider">
             {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};
