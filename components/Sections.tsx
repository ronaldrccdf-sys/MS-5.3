
import React, { useState, useEffect } from 'react';
import { Scale, Zap, Flame, Pickaxe, Building2, FileText, Gavel, CheckCircle2, MapPin, Mail, Phone, ArrowRight, Briefcase, X, Car, UserCheck, Calendar, ShieldCheck, Award, UserCircle, Medal, Star, Shield, ExternalLink, Loader2, Newspaper, AlertCircle, Share2, Check } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { GeminiLegalService, NewsItem } from './Services';

/* --- SECTION 2: ABOUT --- */
export const About = () => {
  const { t } = useLanguage();
  return (
    <section id="sobre" className="py-24 bg-white relative overflow-hidden scroll-mt-20">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/2 relative">
          <div className="aspect-[4/5] bg-gray-900 relative overflow-hidden rounded-sm">
             <img 
               src="https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxAX5AGPAK5t2nWpejkTWctMaiU4WeseGTZoZYZMdZlYvaPV74-oX5Dd0r_SUGY_zmX0rgAgfNyjSFTJ3TW7XetzpoNzowjGoC0Yqlq4lWSmmRSi922n8aC7bPSQksiJ4X9E7l0=s1360-w1360-h1020-rw" 
               alt="Sede Corporativa - Marques & Serra" 
               className="object-cover object-[center_35%] w-full h-full opacity-90 hover:scale-105 transition-transform duration-700 grayscale contrast-125 brightness-90"
             />
             <div className="absolute inset-0 border-[1px] border-gold-500/30 m-4"></div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-gold-500"></div>
            <span className="text-gold-600 uppercase tracking-[0.2em] text-xs font-semibold">{t('about.label')}</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 leading-tight">
            {t('about.title')} <span className="italic text-gold-600">{t('about.title_italic')}</span>
          </h2>

          <div className="space-y-4 pt-4 mt-4">
            <p className="text-gray-600 font-light leading-relaxed text-sm text-justify">
              {t('about.p1')}
            </p>
            <p className="text-gray-600 font-light leading-relaxed text-sm text-justify">
              {t('about.p2')}
            </p>
            <p className="text-gray-600 font-light leading-relaxed text-sm text-justify">
              {t('about.p3')}
            </p>
            <p className="text-gray-600 font-light leading-relaxed text-sm text-justify">
              {t('about.p4')}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-6 border-t border-gray-100 mt-2">
            <div className="space-y-2">
              <h3 className="text-3xl font-serif text-gold-600">+20</h3>
              <p className="text-xs uppercase tracking-widest text-gray-500">{t('about.exp')}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-serif text-gold-600">R$ 1B</h3>
              <p className="text-xs uppercase tracking-widest text-gray-500">{t('about.value')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* --- SECTION 3: PRACTICE AREAS --- */
export const PracticeAreas = ({ onSelectArea }: { onSelectArea: (area: string) => void }) => {
  const { t } = useLanguage();
  
  const practices = [
    {
      id: 'Empresarial',
      icon: <Briefcase className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
      title: t('practice.corp'),
      desc: t('practice.corp_desc')
    },
    {
      id: 'Contencioso / Tribunais Superiores',
      icon: <Gavel className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&q=80&w=800",
      title: t('practice.lit'),
      desc: t('practice.lit_desc')
    },
    {
      id: 'Tributário',
      icon: <FileText className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
      title: t('practice.tax'),
      desc: t('practice.tax_desc')
    },
    {
      id: 'Energia',
      icon: <Zap className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=800",
      title: t('practice.energy'),
      desc: t('practice.energy_desc')
    },
    {
      id: 'Óleo & Gás',
      icon: <Flame className="w-8 h-8" />,
      image: "https://images.pexels.com/photos/257700/pexels-photo-257700.jpeg",
      title: t('practice.oil'),
      desc: t('practice.oil_desc')
    },
    {
      id: 'Mineração',
      icon: <Pickaxe className="w-8 h-8" />,
      image: "https://images.pexels.com/photos/2101137/pexels-photo-2101137.jpeg",
      title: t('practice.mining'),
      desc: t('practice.mining_desc')
    }
  ];

  return (
    <section id="atuacao" className="py-24 bg-gray-50 scroll-mt-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-gold-600 uppercase tracking-[0.2em] text-xs font-semibold">{t('practice.label')}</span>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900">{t('practice.title')}</h2>
          <div className="w-24 h-[1px] bg-gold-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {practices.map((area, idx) => (
            <div key={idx} className="group bg-white border border-gray-100 hover:border-gold-500/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden rounded-sm flex flex-col h-full">
              <div className="h-48 w-full relative overflow-hidden">
                <img 
                  src={area.image} 
                  alt={area.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-4 left-6 text-white group-hover:text-gold-400 transition-colors">
                  {area.icon}
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                 <div className="w-0 h-0.5 bg-gold-500 mb-4 transition-all duration-500 group-hover:w-12"></div>
                 <h3 className="text-xl font-serif text-gray-900 mb-3 group-hover:text-gold-600 transition-colors">
                    {area.title}
                 </h3>
                 <p className="text-gray-500 font-light text-sm leading-relaxed mb-6">
                    {area.desc}
                 </p>
                 <button 
                   onClick={() => onSelectArea(area.id)}
                   className="mt-auto flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gold-600 hover:text-gold-700 transition-colors"
                 >
                   {t('practice.learn_more')} <ArrowRight size={12} />
                 </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* --- NEW SECTION: PRACTICE NEWS (BLUE/STREAMING/CENTURY) --- */
export const PracticeNews = ({ area, onClose }: { area: string, onClose: () => void }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    setNews([]);
    GeminiLegalService.getPracticeNewsStream(area, (updatedNews) => {
      // Updates one-by-one as the stream grows
      setNews(updatedNews);
      if (updatedNews.length > 0) setLoading(false);
    }).finally(() => {
      setLoading(false);
    });
  }, [area]);

  const handleShare = async (item: NewsItem, index: number) => {
    const shareText = `${item.headline}\nFonte: ${item.source}\nLink: ${item.link}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.headline,
          text: shareText,
          url: item.link
        });
      } catch (err) {
        console.error("Share failed", err);
      }
    } else {
      navigator.clipboard.writeText(shareText);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  return (
    <section className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8 animate-fade-in font-century">
      <div className="bg-white w-full max-w-5xl h-full max-h-[90vh] rounded-sm shadow-2xl overflow-hidden flex flex-col">
        {/* Header - Marking in BLUE */}
        <header className="px-8 py-6 border-b-4 border-legalBlue-500 bg-white flex justify-between items-center shrink-0">
          <div className="flex items-center gap-4">
            <Newspaper className="text-legalBlue-500 w-8 h-8" />
            <div>
              <h2 className="text-2xl font-century font-bold text-gray-900 tracking-tight">Notícias Recentes — {area}</h2>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-black transition-all"
          >
            <X size={24} />
          </button>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-10 bg-gray-50/30">
          {loading && news.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center space-y-6 opacity-80">
              <Loader2 className="w-12 h-12 animate-spin text-legalBlue-500" />
              <div className="text-center space-y-4 max-w-md">
                <p className="font-century font-bold text-gray-800 text-lg tracking-tight">Sincronizando com veículos globais...</p>
                <div className="bg-legalBlue-500/10 p-5 rounded border border-legalBlue-500/20 shadow-sm">
                   <p className="text-xs text-legalBlue-700 font-bold uppercase tracking-widest flex items-center justify-center gap-2 mb-2">
                     <AlertCircle size={14}/> Aviso de Sistema
                   </p>
                   <p className="text-[13px] text-gray-700 leading-snug font-medium">
                     O carregamento pode levar até <strong>1 minuto</strong>.
                   </p>
                </div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Monitorando fontes de prestígio em tempo real.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {news.map((item, idx) => (
                <div 
                  key={idx} 
                  className="group bg-white border-l-4 border-legalBlue-500 p-6 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="flex justify-between items-start gap-6">
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center gap-3">
                         <span className="text-[10px] font-bold text-legalBlue-500 uppercase tracking-widest bg-legalBlue-500/5 px-2 py-1 rounded">
                           {item.source}
                         </span>
                         <span className="text-[10px] text-gray-400 font-mono">#{idx + 1}</span>
                      </div>
                      
                      <h3 className="text-lg md:text-xl font-century font-bold text-gray-900 group-hover:text-legalBlue-500 transition-colors leading-snug">
                        {item.headline}
                      </h3>
                      
                      <div className="flex items-center gap-4 pt-2">
                        <a 
                          href={item.link} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="inline-flex items-center gap-2 text-[10px] font-bold text-white bg-legalBlue-500 hover:bg-legalBlue-600 px-4 py-2 rounded transition-all shadow-sm"
                        >
                          LER MATÉRIA COMPLETA <ExternalLink size={12} />
                        </a>
                        
                        <button 
                          onClick={() => handleShare(item, idx)}
                          className={`inline-flex items-center gap-2 text-[10px] font-bold px-4 py-2 rounded border transition-all ${
                            copiedIndex === idx 
                            ? 'bg-green-500 border-green-500 text-white' 
                            : 'bg-white border-gray-200 text-gray-500 hover:border-legalBlue-500 hover:text-legalBlue-500'
                          }`}
                        >
                          {copiedIndex === idx ? <Check size={12}/> : <Share2 size={12}/>}
                          {copiedIndex === idx ? 'COPIADO' : 'COMPARTILHAR'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {loading && news.length > 0 && (
                <div className="flex flex-col items-center justify-center py-6 gap-3 text-gray-400">
                  <div className="flex items-center gap-3">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Carregando próximas notícias...</span>
                  </div>
                </div>
              )}

              <div className="bg-legalBlue-500/5 p-8 rounded border border-legalBlue-500/10 mt-12">
                 <p className="text-[11px] text-gray-500 text-center leading-relaxed font-century">
                   <strong className="text-legalBlue-500">AVISO LEGAL:</strong> As notícias acima são provenientes de veículos jornalísticos independentes e consolidados. 
                   O escritório Marques & Serra atua como curador e não possui vínculo editorial com os conteúdos externos, prezando exclusivamente pela transparência e informação estratégica de seus clientes.
                 </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

/* --- SECTION 4: EXCLUSIVIDADE --- */
export const Experience = () => {
  const { t } = useLanguage();
  return (
    <section id="experiencia" className="py-24 bg-white relative scroll-mt-20 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="space-y-4 mb-12">
             <span className="text-gold-600 uppercase tracking-[0.2em] text-xs font-semibold">{t('experience.label')}</span>
             <h2 className="text-4xl md:text-5xl font-serif text-gray-900 leading-tight">
                {t('experience.title')} <span className="italic text-gold-600">{t('experience.title_italic')}</span>
             </h2>
             <div className="w-24 h-[1px] bg-gold-500 mx-auto"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {[
            {
              icon: <MapPin className="text-gold-500 w-10 h-10" />,
              title: t('experience.parking'),
              desc: t('experience.parking_desc')
            },
            {
              icon: <Car className="text-gold-500 w-10 h-10" />,
              title: t('experience.transport'),
              desc: t('experience.transport_desc')
            },
            {
              icon: <Calendar className="text-gold-500 w-10 h-10" />,
              title: t('experience.schedule'),
              desc: t('experience.schedule_desc')
            }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-6 group p-8 bg-gray-50/50 hover:bg-gray-50 transition-colors duration-500 rounded-sm">
               <div className="shrink-0 p-5 bg-white border border-gray-100 rounded-full group-hover:bg-gold-500/10 group-hover:border-gold-500/30 transition-all duration-500 shadow-sm">
                  {item.icon}
               </div>
               <div className="space-y-3">
                  <h3 className="text-2xl font-serif text-gray-900">{item.title}</h3>
                  <p className="text-gray-500 font-light text-sm leading-relaxed max-w-xs">{item.desc}</p>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* --- SECTION 5: DIFFERENTIALS --- */
export const Differentials = () => {
  const { t } = useLanguage();

  return (
    <section id="diferenciais" className="py-24 bg-[#0a0a0a] text-white relative scroll-mt-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
             <span className="text-gold-500 uppercase tracking-[0.2em] text-xs font-semibold">{t('diff.label')}</span>
             <h2 className="text-4xl md:text-5xl font-serif text-white">{t('diff.title')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <ShieldCheck className="text-gold-500 w-8 h-8 mb-6" />,
                title: t('diff.tech'),
                desc: t('diff.tech_desc')
              },
              {
                icon: <Award className="text-gold-500 w-8 h-8 mb-6" />,
                title: t('diff.result'),
                desc: t('diff.result_desc')
              },
              {
                icon: <UserCircle className="text-gold-500 w-8 h-8 mb-6" />,
                title: t('diff.boutique'),
                desc: t('diff.boutique_desc')
              }
            ].map((item, i) => (
              <div key={i} className="bg-[#111] p-10 border border-white/5 hover:border-gold-500/30 transition-all duration-500 group">
                <div className="transform transition-transform duration-500 group-hover:scale-110">{item.icon}</div>
                <h3 className="text-2xl font-serif text-white mb-4">{item.title}</h3>
                <p className="text-gray-400 font-light text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* --- SECTION 6: RECOGNITIONS --- */
export const Recognitions = () => {
  const { t } = useLanguage();

  const awards = [
    {
      title: t('awards.naval.title'),
      date: t('awards.naval.date'),
      grade: t('awards.naval.grade'),
      desc: t('awards.naval.desc'),
      icon: <Medal className="w-10 h-10 text-gold-500" />
    },
    {
      title: t('awards.defense.title'),
      date: t('awards.defense.date'),
      grade: t('awards.defense.grade'),
      desc: t('awards.defense.desc'),
      icon: <Shield className="w-10 h-10 text-gold-500" />
    },
    {
      title: t('awards.rio_branco.title'),
      date: t('awards.rio_branco.date'),
      grade: t('awards.rio_branco.grade'),
      desc: t('awards.rio_branco.desc'),
      icon: <Star className="w-10 h-10 text-gold-500" />
    },
    {
      title: t('awards.forces.title'),
      date: t('awards.forces.date'),
      desc: t('awards.forces.desc'),
      icon: <Award className="text-gold-500 w-10 h-10" />
    },
    {
      title: t('awards.maua.title'),
      date: t('awards.maua.date'),
      grade: t('awards.maua.grade'),
      desc: t('awards.maua.desc'),
      icon: <Briefcase className="text-gold-500 w-10 h-10" />
    }
  ];

  return (
    <section id="reconhecimentos" className="py-24 bg-gray-50 scroll-mt-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-4">
          <span className="text-gold-600 uppercase tracking-[0.2em] text-xs font-semibold">{t('awards.label')}</span>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 leading-tight">
            {t('awards.title')} <span className="italic text-gold-600">{t('awards.title_italic')}</span>
          </h2>
          <p className="text-gray-500 font-light tracking-widest uppercase text-[10px] mt-4">
            {t('awards.intro')}
          </p>
          <div className="w-24 h-[1px] bg-gold-500 mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {awards.map((item, idx) => (
            <div key={idx} className="bg-white border border-gray-100 p-8 md:p-10 hover:shadow-2xl transition-all duration-500 relative group overflow-hidden">
               <div className="absolute top-0 right-0 w-16 h-16 bg-gold-500/5 group-hover:bg-gold-500/10 transition-colors -rotate-45 translate-x-8 -translate-y-8"></div>
               
               <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500 inline-block">
                 {item.icon}
               </div>

               <div className="space-y-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-gold-600 uppercase tracking-[0.15em]">{item.date}</span>
                    <h3 className="text-xl font-serif text-gray-900 leading-snug group-hover:text-gold-600 transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  {item.grade && (
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest border-l-2 border-gold-500/30 pl-3">
                      {item.grade}
                    </p>
                  )}

                  <p className="text-gray-600 font-light text-sm leading-relaxed text-justify pt-2">
                    {item.desc}
                  </p>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* --- SECTION 7: TEAM --- */
export const Team = () => {
  const { t } = useLanguage();
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const team = [
    {
      name: "Pedro N. Marques",
      img: "https://lh3.googleusercontent.com/d/1iv6se1-Apx_vc7LqFUZTx5OGjspGZhHi",
      bio: t('team.bio_pedro'),
    },
    {
      name: "Ronald Serra",
      img: "https://lh3.googleusercontent.com/d/1L0mwxnH-sDJ_qwdLN03Z2Nv5f_uAV9jc",
      bio: t('team.bio_ronald'),
    },
  ];

  return (
    <section id="equipe" className="py-24 bg-white scroll-mt-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16 space-y-4">
          <span className="text-gold-600 uppercase tracking-[0.2em] text-xs font-semibold">{t('team.label')}</span>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900">{t('team.title')}</h2>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-16 mb-20">
          {team.map((member, i) => (
            <div 
              key={i} 
              className="group flex flex-col items-center text-center cursor-pointer"
              onClick={() => setSelectedMember(member)}
            >
              <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-gray-100 group-hover:border-gold-500 transition-all duration-500 mb-6 shadow-lg group-hover:shadow-2xl">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                <div className="absolute inset-0 bg-gold-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <span className="bg-black/50 text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">{t('team.view_profile')}</span>
                </div>
              </div>
              <h3 className="text-2xl font-serif text-gray-900 mb-6 group-hover:text-gold-600 transition-colors px-4">{member.name}</h3>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto relative mt-12 pt-12 border-t border-gray-100">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-6">
                <Briefcase className="text-gold-500" />
             </div>
             <div className="bg-gray-50 border border-gray-100 p-10 md:p-14 rounded-sm text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-full blur-2xl translate-x-10 -translate-y-10"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold-500/5 rounded-full blur-2xl -translate-x-10 translate-y-10"></div>
                <h3 className="text-2xl md:text-3xl font-serif text-gray-900 mb-6 relative z-10">{t('team.general_title')}</h3>
                <p className="text-gray-600 font-light leading-relaxed text-sm md:text-base relative z-10">{t('team.general_desc')}</p>
                <div className="flex flex-wrap justify-center gap-3 mt-8 relative z-10">
                   {['Energia', 'Óleo & Gás', 'Mineração', 'Tributário', 'Contencioso'].map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-wider font-bold text-gray-400 border border-gray-200 px-3 py-1 rounded-full">{tag}</span>
                   ))}
                </div>
             </div>
        </div>
      </div>

      {selectedMember && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4" onClick={() => setSelectedMember(null)}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
          <div className="bg-white max-w-4xl w-full relative z-10 rounded-lg overflow-hidden shadow-2xl animate-fade-in-up flex flex-col md:flex-row max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors z-20 bg-white/50 rounded-full p-1" onClick={() => setSelectedMember(null)}>
              <X size={24} />
            </button>
            <div className="w-full md:w-1/3 h-64 md:h-auto relative shrink-0">
               <img src={selectedMember.img} className="absolute inset-0 w-full h-full object-cover" alt={selectedMember.name} />
               <div className="absolute inset-0 bg-gold-500/10"></div>
            </div>
            <div className="w-full md:w-2/3 p-8 md:p-10 overflow-y-auto">
               <h3 className="text-3xl font-serif text-gray-900 mb-6">{selectedMember.name}</h3>
               <div className="text-gray-600 font-light leading-relaxed text-sm space-y-4 text-justify">
                 {selectedMember.bio.split('\n\n').map((paragraph: string, idx: number) => (
                    <p key={idx}>{paragraph}</p>
                 ))}
               </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

/* --- SECTION 8: CONTACT --- */
export const Contact = () => {
  const { t } = useLanguage();
  return (
    <section id="contato" className="bg-[#0a0a0a] text-white py-24 relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#C9A44C 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/2 space-y-10">
            <div>
               <span className="text-gold-500 uppercase tracking-[0.2em] text-xs font-semibold">{t('contact.label')}</span>
               <h2 className="text-4xl md:text-5xl font-serif mt-2 mb-6">{t('contact.title1')} <br /><span className="text-gold-400 italic">{t('contact.title2')}</span></h2>
               <p className="text-gray-400 font-light max-w-md">{t('contact.desc')}</p>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-full text-gold-500 border border-white/10"><MapPin size={20} /></div>
                <div>
                  <h4 className="text-white font-serif text-lg">Sede Brasília</h4>
                  <p className="text-gray-400 font-light text-sm">SAUS Quadra 1 BL. M Sala 1301<br/>Edifício Libertas - Brasília-DF</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                 <div className="p-3 bg-white/5 rounded-full text-gold-500 border border-white/10"><Phone size={20} /></div>
                <div>
                  <h4 className="text-white font-serif text-lg">{t('contact.phone')}</h4>
                  <p className="text-gray-400 font-light text-sm">+55 (61) 9 9811-2434</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                 <div className="p-3 bg-white/5 rounded-full text-gold-500 border border-white/10"><Mail size={20} /></div>
                <div>
                  <h4 className="text-white font-serif text-lg">{t('contact.form_email')}</h4>
                  <p className="text-gray-400 font-light text-sm">contato@marqueseserra.adv.br</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 bg-white/5 backdrop-blur-sm p-8 md:p-12 border border-white/10">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-400">{t('contact.form_name')}</label>
                  <input type="text" className="w-full bg-transparent border-b border-gray-600 py-2 text-white focus:border-gold-500 outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-400">{t('contact.form_email')}</label>
                  <input type="email" className="w-full bg-transparent border-b border-gray-600 py-2 text-white focus:border-gold-500 outline-none transition-colors" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-400">{t('contact.form_subject')}</label>
                <select className="w-full bg-transparent border-b border-gray-600 py-2 text-white focus:border-gold-500 outline-none transition-colors">
                  <option className="bg-black text-gray-300">Consulta Jurídica</option>
                  <option className="bg-black text-gray-300">Assessoria Empresarial</option>
                  <option className="bg-black text-gray-300">Parcerias</option>
                  <option className="bg-black text-gray-300">Outros</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-400">{t('contact.form_msg')}</label>
                <textarea rows={4} className="w-full bg-transparent border-b border-gray-600 py-2 text-white focus:border-gold-500 outline-none transition-colors resize-none"></textarea>
              </div>
              <button className="px-8 py-3 bg-gold-500 text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-white transition-all duration-300 w-full md:w-auto">
                {t('contact.btn_send')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
