
import React from 'react';
import { LandingContent } from '../types';

interface Props {
  content: LandingContent;
  onCategoryClick: () => void;
}

const Hero: React.FC<Props> = ({ content, onCategoryClick }) => {
  const cards = [
    { title: 'أصحاب', icon: '👥' },
    { title: 'أعياد ميلاد', icon: '🎂' },
    { title: 'ذكرى بينكم', icon: '∞' },
    { title: 'سنة جديدة', icon: '📅' },
  ];

  return (
    <div className="space-y-8 sm:space-y-12 py-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-4 px-2">
        <h1 className="text-xl sm:text-2xl font-bold leading-tight text-slate-500 tracking-tight">
          {content.heroTitle}
        </h1>
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 flex items-center justify-center gap-3 flex-wrap">
            {content.heroSubtitle}
          </h2>
          <div className="w-20 h-1.5 bg-red-600 mx-auto rounded-full opacity-20"></div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6">
        {cards.map((card, i) => (
          <div 
            key={i} 
            onClick={onCategoryClick}
            className="bg-white border border-slate-100 p-6 sm:p-10 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 hover:border-red-200 hover:shadow-xl hover:shadow-red-500/5 transition-all group cursor-pointer active:scale-95 shadow-sm"
          >
            <div className="text-4xl sm:text-5xl group-hover:scale-110 transition-transform">{card.icon}</div>
            <span className="text-lg sm:text-xl font-bold text-slate-700">{card.title}</span>
          </div>
        ))}
      </div>

      <div className="text-center">
        <span className="text-xs sm:text-sm font-bold text-slate-400 flex items-center justify-center gap-2 bg-white w-fit mx-auto px-6 py-2.5 rounded-full border border-slate-100 shadow-sm">
          <span className="text-yellow-500">🌟</span> تنفع لجميع المناسبات
        </span>
      </div>

      <div 
        onClick={onCategoryClick}
        className="bg-red-50 border-2 border-dashed border-red-200 rounded-[2.5rem] p-6 sm:p-10 flex items-center justify-between group cursor-pointer hover:bg-red-100 transition-all active:scale-95 shadow-inner"
      >
        <div className="bg-red-600 rounded-2xl p-4 shadow-xl shadow-red-200 group-hover:rotate-12 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <span className="text-xl sm:text-2xl font-black text-red-700 text-right leading-tight max-w-[60%]">
          {content.heroCta}
        </span>
      </div>
    </div>
  );
};

export default Hero;
