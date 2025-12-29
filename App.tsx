
import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { Logo } from './components/Logo';
import { About, PracticeAreas, Differentials, Team, Contact, Experience, Recognitions, PracticeNews } from './components/Sections';
import { Footer } from './components/Footer';
import { Intranet } from './components/Intranet';
import { Menu, X, Lock, MessageCircle } from 'lucide-react';
import { LanguageProvider, useLanguage } from './components/LanguageContext';

// URL da Logo para animação
const LOGO_URL = "https://lh3.googleusercontent.com/d/1JRdyc9wmAc3m6oL-SC4kvy_uThOmzF8v";

const AppContent = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);
  const [showBlackScreen, setShowBlackScreen] = useState(true);
  const [showIntranet, setShowIntranet] = useState(false);
  const [selectedNewsArea, setSelectedNewsArea] = useState<string | null>(null);
  
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const blackScreenTimer = setTimeout(() => {
      setShowBlackScreen(false);
    }, 3000);

    const animTimer = setTimeout(() => {
      setIntroFinished(true);
    }, 3500);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(blackScreenTimer);
      clearTimeout(animTimer);
    };
  }, []);

  const navLinks = [
    { label: t('nav.office'), href: '#sobre' },
    { label: t('nav.team'), href: '#equipe' }, 
    { label: t('nav.awards'), href: '#reconhecimentos' },
    { label: t('nav.practice'), href: '#atuacao' },
    { label: t('nav.differentials'), href: '#diferenciais' },
    { label: t('nav.experience'), href: '#experiencia' },
    { label: t('nav.contact'), href: '#contato' },
  ];

  if (showIntranet) {
    return <Intranet onLogout={() => setShowIntranet(false)} />;
  }

  return (
    <div className={`relative ${showBlackScreen ? 'overflow-hidden h-screen' : ''}`}>
       {/* Intro Animation Layer */}
       { !introFinished && (
         <div className={`fixed inset-0 z-[100] bg-black transition-opacity duration-1000 flex items-center justify-center ${showBlackScreen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
             <div className="absolute animate-intro-container w-24 h-24 flex items-center justify-center">
                <img 
                  src={LOGO_URL} 
                  alt="Logo Left" 
                  className="absolute w-full h-full object-contain animate-intro-m"
                  style={{ clipPath: 'inset(0 50% 0 0)' }}
                />
                <img 
                  src={LOGO_URL} 
                  alt="Logo Right" 
                  className="absolute w-full h-full object-contain animate-intro-s"
                  style={{ clipPath: 'inset(0 0 0 50%)' }}
                />
             </div>
         </div>
       )}

       {/* Navbar */}
       <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-black/90 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-6'}`}>
          <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
             <a href="#home" className={`relative z-50 transition-opacity duration-1000 ${introFinished ? 'opacity-100' : 'opacity-0'}`}>
                <Logo className={`transition-all duration-300 ${isScrolled ? 'h-10' : 'h-14'}`} /> 
             </a>
             
             {/* Desktop Menu */}
             <div className="hidden md:flex items-center gap-6">
                {navLinks.map((link, idx) => (
                   <a 
                    key={idx} 
                    href={link.href} 
                    className="text-white text-[10px] uppercase tracking-[0.2em] hover:text-gold-500 transition-colors relative group"
                   >
                      {link.label}
                      <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-gold-500 transition-all duration-300 group-hover:w-full"></span>
                   </a>
                ))}
                
                {/* Clean white flag-only language buttons */}
                <div className="flex items-center gap-2 border-l border-white/20 pl-6 ml-2">
                   <button 
                    onClick={() => setLanguage('pt')} 
                    title="Português"
                    className={`w-10 h-10 rounded-full text-xl transition-all duration-300 flex items-center justify-center ${language === 'pt' ? 'bg-white shadow-[0_0_15px_rgba(255,255,255,0.4)] scale-110' : 'opacity-40 grayscale hover:grayscale-0 hover:opacity-100 hover:scale-110'}`}
                   >
                    🇧🇷
                   </button>
                   <button 
                    onClick={() => setLanguage('en')} 
                    title="English"
                    className={`w-10 h-10 rounded-full text-xl transition-all duration-300 flex items-center justify-center ${language === 'en' ? 'bg-white shadow-[0_0_15px_rgba(255,255,255,0.4)] scale-110' : 'opacity-40 grayscale hover:grayscale-0 hover:opacity-100 hover:scale-110'}`}
                   >
                    🇺🇸
                   </button>
                   <button 
                    onClick={() => setLanguage('es')} 
                    title="Español"
                    className={`w-10 h-10 rounded-full text-xl transition-all duration-300 flex items-center justify-center ${language === 'es' ? 'bg-white shadow-[0_0_15px_rgba(255,255,255,0.4)] scale-110' : 'opacity-40 grayscale hover:grayscale-0 hover:opacity-100 hover:scale-110'}`}
                   >
                    🇪🇸
                   </button>
                   <button 
                    onClick={() => setLanguage('zh')} 
                    title="Chinese"
                    className={`w-10 h-10 rounded-full text-xl transition-all duration-300 flex items-center justify-center ${language === 'zh' ? 'bg-white shadow-[0_0_15px_rgba(255,255,255,0.4)] scale-110' : 'opacity-40 grayscale hover:grayscale-0 hover:opacity-100 hover:scale-110'}`}
                   >
                    🇨🇳
                   </button>
                </div>

                <button 
                  onClick={() => setShowIntranet(true)} 
                  className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-sm hover:border-gold-500 hover:text-gold-500 transition-all ml-2"
                >
                   <Lock size={12} />
                   <span className="text-[9px] uppercase tracking-widest">{t('nav.intranet')}</span>
                </button>
             </div>

             <button 
               className="md:hidden text-white z-50"
               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
             >
               {isMobileMenuOpen ? <X /> : <Menu />}
             </button>
          </div>

          {/* Mobile Menu Overlay */}
          <div className={`fixed inset-0 bg-black z-40 flex flex-col items-center justify-center space-y-6 transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
             {navLinks.map((link, idx) => (
                <a 
                  key={idx} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white text-xl font-display hover:text-gold-500 transition-colors"
                >
                   {link.label}
                </a>
             ))}
             
             {/* Mobile flags only */}
             <div className="flex gap-6 mt-8 p-4">
                 <button onClick={() => { setLanguage('pt'); setIsMobileMenuOpen(false); }} className={`text-3xl transition-all ${language === 'pt' ? 'scale-125 brightness-110' : 'opacity-40 grayscale'}`}>🇧🇷</button>
                 <button onClick={() => { setLanguage('en'); setIsMobileMenuOpen(false); }} className={`text-3xl transition-all ${language === 'en' ? 'scale-125 brightness-110' : 'opacity-40 grayscale'}`}>🇺🇸</button>
                 <button onClick={() => { setLanguage('es'); setIsMobileMenuOpen(false); }} className={`text-3xl transition-all ${language === 'es' ? 'scale-125 brightness-110' : 'opacity-40 grayscale'}`}>🇪🇸</button>
                 <button onClick={() => { setLanguage('zh'); setIsMobileMenuOpen(false); }} className={`text-3xl transition-all ${language === 'zh' ? 'scale-125 brightness-110' : 'opacity-40 grayscale'}`}>🇨🇳</button>
             </div>

             <button onClick={() => { setShowIntranet(true); setIsMobileMenuOpen(false); }} className="text-gold-500 text-sm uppercase tracking-widest mt-8 flex items-center gap-2 px-6 py-3 border border-gold-500/30 rounded">
               <Lock size={16} /> {t('nav.intranet')}
             </button>
          </div>
       </nav>

       <main>
          <Hero />
          <About />
          <Team />
          <Recognitions />
          <PracticeAreas onSelectArea={(area) => setSelectedNewsArea(area)} />
          <Differentials />
          <Experience />
          <Contact />
       </main>

       {selectedNewsArea && (
         <PracticeNews 
           area={selectedNewsArea} 
           onClose={() => setSelectedNewsArea(null)} 
         />
       )}
       
       <Footer />
       
       <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 animate-fade-in pointer-events-none">
          <div className="bg-green-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-2 rounded-sm shadow-lg relative after:content-[''] after:absolute after:top-full after:right-4 after:border-[6px] after:border-transparent after:border-t-green-600 pointer-events-auto">
             {t('nav.talk')}
          </div>
          <a 
            href="https://wa.me/5561998112434" 
            target="_blank" 
            rel="noreferrer"
            className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:bg-green-500 transition-colors pointer-events-auto"
          >
            <MessageCircle className="text-white" size={24} />
          </a>
       </div>
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
