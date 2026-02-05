
import React from 'react';
import { LandingContent } from '../types';

interface Props {
  content: LandingContent;
  onCategoryClick: () => void;
}

const Hero: React.FC<Props> = ({ content, onCategoryClick }) => {
  const cards = [
    { title: 'أصحاب', icon: '👥', color: 'bg-blue-50 text-blue-600' },
    { title: 'أعياد ميلاد', icon: '🎂', color: 'bg-orange-50 text-orange-600' },
    { title: 'ذكرى بينكم', icon: '∞', color: 'bg-purple-50 text-purple-600' },
    { title: 'سنة جديدة', icon: '📅', color: 'bg-emerald-50 text-emerald-600' },
  ];

  return (
    <div className="space-y-8 py-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm animate-bounce">
          <span className="text-rose-500">❤️</span>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Digital Love Experience</span>
        </div>
        
        <div className="space-y-4 px-2">
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-600 tracking-tight leading-snug">
            {content.heroTitle}
          </h1>
          {/* تم تعديل ارتفاع السطر هنا Line Height لضمان عدم قص النقاط */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black gradient-text py-2" style={{ lineHeight: '1.5' }}>
            {content.heroSubtitle}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-6 px-2">
        {cards.map((card, i) => (
          <div 
            key={i} 
            onClick={onCategoryClick}
            className="ios-card p-6 sm:p-8 flex flex-col items-center justify-center gap-4 cursor-pointer group"
          >
            <div className={`w-14 h-14 sm:w-16 sm:h-16 ${card.color} rounded-[1.2rem] sm:rounded-[1.5rem] flex items-center justify-center text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-500`}>
              {card.icon}
            </div>
            <span className="text-base sm:text-lg font-bold text-slate-700">{card.title}</span>
          </div>
        ))}
      </div>

      <div 
        onClick={onCategoryClick}
        className="mx-2 ios-card bg-rose-50 border-rose-100 p-6 sm:p-8 flex items-center justify-between group cursor-pointer overflow-hidden"
      >
        <div className="bg-rose-600 w-14 h-14 sm:w-16 sm:h-16 rounded-[1.2rem] sm:rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-rose-200 group-hover:rotate-12 transition-transform shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-8 sm:w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <div className="text-right pr-4">
          <p className="text-xl sm:text-2xl font-black text-rose-700 leading-tight">
            {content.heroCta}
          </p>
          <p className="text-rose-400 text-[10px] font-bold mt-1 uppercase tracking-widest">ابدأ قصتكم الآن</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
