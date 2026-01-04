
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface Slide {
  id: number;
  type: string;
  src?: string;
  videos?: string[];
  poster: string;
  title: string;
  subtitle: string;
  desc: string;
  cta: string;
  link: string;
}

const WHATSAPP_LINK = "https://wa.me/5561998112434";

export const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [subVideoIndex, setSubVideoIndex] = useState(0);
  const [videoErrors, setVideoErrors] = useState<Record<number, boolean>>({});
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const slide1Initialized = useRef(false);
  const { t } = useLanguage();

  const handleVideoError = (id: number) => {
    console.warn(`Video ${id} failed to load. Showing fallback image.`);
    setVideoErrors(prev => ({ ...prev, [id]: true }));
  };

  const slides: Slide[] = [
    {
      id: 1,
      type: 'video',
      src: 'https://nmarques.adv.br/images/video2.mp4',
      poster: 'https://images.pexels.com/photos/414860/pexels-photo-414860.jpeg',
      title: "Marques & Serra",
      subtitle: t('hero.sub'),
      desc: t('hero.desc1'),
      cta: t('hero.cta'),
      link: WHATSAPP_LINK
    },
    {
      id: 2,
      type: 'video',
      src: 'https://videos.pexels.com/video-files/1851190/1851190-hd_1920_1080_25fps.mp4',
      poster: 'https://images.pexels.com/photos/842959/pexels-photo-842959.jpeg', 
      title: "Marques & Serra",
      subtitle: t('hero.sub'),
      desc: t('hero.desc2'),
      cta: t('hero.cta'),
      link: WHATSAPP_LINK
    },
    {
      id: 3,
      type: 'video',
      src: 'https://www.pexels.com/download/video/9136352',
      poster: 'https://images.pexels.com/videos/9136352/free-video-9136352.jpg?auto=compress&cs=tinysrgb&fit=crop&h=1080&w=1920',
      title: t('hero.title3'),
      subtitle: t('hero.sub3'),
      desc: t('hero.desc3'),
      cta: t('hero.cta'),
      link: WHATSAPP_LINK
    }
  ];

  useEffect(() => {
    // Slide 1 (index 0) dura 18 segundos, outros duram 6 segundos
    let duration = current === 0 ? 18000 : 6000;

    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      setSubVideoIndex(0);
    }, duration);

    return () => clearTimeout(timer);
  }, [current, slides.length]);

  useEffect(() => {
    const activeSlide = slides[current];
    if (activeSlide.type === 'sequence') {
      const interval = setInterval(() => {
        setSubVideoIndex((prev) => (prev + 1) % (activeSlide.videos?.length || 1));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [current, slides]);

  useEffect(() => {
    const activeVideo = videoRefs.current[current];
    if (activeVideo && !videoErrors[slides[current].id]) {
      // Configuração especial para o primeiro vídeo (index 0)
      if (current === 0 && !slide1Initialized.current) {
        activeVideo.currentTime = 3; // Começa em 3 segundos
        slide1Initialized.current = true;
      }
      
      // Se não for o primeiro vídeo, ou se quisermos manter outros vídeos contínuos também,
      // evitamos resetar o currentTime para 0. 
      // Para o primeiro hero, garantimos que ele NÃO reseta (play contínuo).
      if (current !== 0) {
        // Opcional: manter outros vídeos resetando ou também contínuos.
        // O usuário pediu especificamente "o video" (singular) do "primeiro hero".
        activeVideo.currentTime = 0; 
      }

      const playPromise = activeVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, [current, videoErrors, slides]);

  return (
    <section id="home" className="relative w-full h-screen bg-black overflow-hidden">
      {slides.map((slide, index) => {
        const isSequence = slide.type === 'sequence';
        const hasError = videoErrors[slide.id];
        const isActive = index === current;

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <div className="absolute inset-0 w-full h-full bg-black">
              {isSequence ? (
                <>
                  {slide.videos?.map((videoUrl, vIdx) => (
                    <video
                      key={vIdx}
                      src={videoUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                        vIdx === subVideoIndex ? 'opacity-60' : 'opacity-0'
                      }`}
                    />
                  ))}
                </>
              ) : slide.type === 'video' && !hasError ? (
                <video
                  ref={el => { videoRefs.current[index] = el; }}
                  poster={slide.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover opacity-60"
                  onError={() => handleVideoError(slide.id)}
                >
                    <source src={slide.src} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={slide.poster}
                  alt={slide.title}
                  className="w-full h-full object-cover opacity-60"
                />
              )}
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent z-20" />

            <div className="absolute inset-0 z-30 container mx-auto px-6 md:px-12 flex flex-col justify-center items-start">
              <div className="max-w-2xl text-left animate-fade-in-up pt-12 md:pt-0">
                <h1 className="text-5xl md:text-7xl font-medium font-serif text-white mb-4 drop-shadow-md leading-none tracking-wide" style={ { fontFamily: "'Cormorant Garamond', serif" } }>
                  {slide.title}
                </h1>

                <div className="w-16 h-[1px] bg-gold-400 mb-4"></div>

                <span className="text-[10px] md:text-xs block font-normal text-yellow-400 tracking-[0.35em] uppercase font-sans mb-4">
                  {slide.subtitle}
                </span>

                <p className="text-base md:text-lg text-gray-200 font-light mb-8 leading-relaxed max-w-lg drop-shadow-sm">
                  {slide.desc}
                </p>

                <a
                  href={slide.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-transparent border border-white text-white font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] hover:bg-gold-500 hover:border-gold-500 hover:text-black transition-all duration-300 shadow-xl rounded-sm backdrop-blur-sm"
                >
                  {slide.cta}
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        );
      })}

      <div className="absolute bottom-10 left-6 md:left-12 z-40 flex gap-4">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrent(idx);
              setSubVideoIndex(0);
            }}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              idx === current
                ? 'w-12 bg-gold-500'
                : 'w-3 bg-white/40 hover:bg-white'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      <div className="absolute bottom-8 right-8 md:right-12 z-40 animate-bounce opacity-80 hidden md:block">
        <ChevronDown className="text-white w-8 h-8" />
      </div>
    </section>
  );
};
