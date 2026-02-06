
import React from 'react';
import { LandingContent } from '../types';

interface Props {
  content: LandingContent;
  onCategoryClick: () => void;
}

const Hero: React.FC<Props> = ({ content, onCategoryClick }) => {
  const cards = [
    { title: 'أصحاب', icon: '👥', color: 'bg-blue-50 text-blue-600', shadow: 'shadow-blue-100' },
    { title: 'أعياد ميلاد', icon: '🎂', color: 'bg-orange-50 text-orange-600', shadow: 'shadow-orange-100' },
    { title: 'ذكرى بينكم', icon: '∞', color: 'bg-purple-50 text-purple-600', shadow: 'shadow-purple-100' },
    { title: 'سنة جديدة', icon: '📅', color: 'bg-emerald-50 text-emerald-600', shadow: 'shadow-emerald-100' },
  ];

  return (
    <div className="space-y-12 py-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="text-center space-y-8">
        <div className="inline-flex items-center gap-3 bg-white px-5 py-2.5 rounded-full border border-slate-100 shadow-sm animate-bounce">
          <span className="text-rose-500 text-lg">❤️</span>
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">The Ultimate Digital Memory</span>
        </div>
        
        <div className="space-y-6 px-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-500 tracking-tight leading-snug">
            {content.heroTitle}
          </h1>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black gradient-text leading-[1.3] py-2">
            {content.heroSubtitle}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 sm:gap-8 px-2">
        {cards.map((card, i) => (
          <div 
            key={i} 
            onClick={onCategoryClick}
            className={`ios-card p-8 sm:p-10 flex flex-col items-center justify-center gap-5 cursor-pointer group hover:shadow-2xl ${card.shadow} transition-all duration-500`}
          >
            <div className={`w-16 h-16 sm:w-20 sm:h-20 ${card.color} rounded-[1.8rem] flex items-center justify-center text-4xl sm:text-5xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-inner`}>
              {card.icon}
            </div>
            <span className="text-lg sm:text-xl font-black text-slate-700">{card.title}</span>
          </div>
        ))}
      </div>

      <div 
        onClick={onCategoryClick}
        className="mx-2 ios-card bg-rose-600 border-none p-8 sm:p-10 flex items-center justify-between group cursor-pointer overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="bg-white/20 backdrop-blur-md w-16 h-16 sm:w-20 sm:h-20 rounded-[1.8rem] flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-transform shrink-0 relative z-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <div className="text-right pr-6 relative z-10">
          <p className="text-2xl sm:text-3xl font-black text-white leading-tight">
            {content.heroCta}
          </p>
          <p className="text-rose-200 text-xs font-bold mt-2 uppercase tracking-[0.2em]">ابدأ حكايتكم في ثواني</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
