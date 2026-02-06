
import React from 'react';
import { LandingContent } from '../types';
import { Users, Cake, Heart, Calendar, Sparkles, ChevronLeft } from 'lucide-react';

interface Props {
  content: LandingContent;
  onCategoryClick: () => void;
}

const Hero: React.FC<Props> = ({ content, onCategoryClick }) => {
  const cards = [
    { title: 'أصحاب', icon: <Users size={28} />, color: 'bg-blue-50 text-blue-600' },
    { title: 'أعياد ميلاد', icon: <Cake size={28} />, color: 'bg-orange-50 text-orange-600' },
    { title: 'ذكرى بينكم', icon: <Heart size={28} />, color: 'bg-rose-50 text-rose-600' },
    { title: 'سنة جديدة', icon: <Calendar size={28} />, color: 'bg-emerald-50 text-emerald-600' },
  ];

  return (
    <div className="space-y-12 py-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm animate-bounce mb-2">
          <Sparkles className="text-rose-500" size={16} />
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">The Ultimate Digital Memory</span>
        </div>
        
        <div className="space-y-4 px-2">
          <h1 className="text-2xl font-extrabold text-slate-400 tracking-tight leading-tight">
            {content.heroTitle}
          </h1>
          <h2 className="text-5xl font-black gradient-text leading-[1.2] py-1">
            {content.heroSubtitle}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 px-1">
        {cards.map((card, i) => (
          <div 
            key={i} 
            onClick={onCategoryClick}
            className="ios-card p-6 flex flex-col items-center justify-center gap-4 cursor-pointer group hover:border-rose-200 transition-all border border-transparent shadow-md"
          >
            <div className={`w-14 h-14 ${card.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
              {card.icon}
            </div>
            <span className="text-sm font-black text-slate-700">{card.title}</span>
          </div>
        ))}
      </div>

      <div 
        onClick={onCategoryClick}
        className="ios-card bg-slate-900 border-none p-8 flex items-center justify-between group cursor-pointer overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-rose-600/20 to-transparent opacity-50"></div>
        <div className="bg-white/10 backdrop-blur-md w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-transform shrink-0 relative z-10 text-white">
          <Heart fill="currentColor" size={28} />
        </div>
        <div className="text-right pr-4 relative z-10">
          <p className="text-xl font-black text-white leading-tight">
            {content.heroCta}
          </p>
          <p className="text-rose-400 text-[10px] font-bold mt-1 uppercase tracking-widest">ابدأ حكايتكم في ثواني</p>
        </div>
        <ChevronLeft className="text-white/30 group-hover:text-white transition-colors" size={24} />
      </div>
    </div>
  );
};

export default Hero;
