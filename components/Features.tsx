
import React from 'react';
import { Lock, Link, Lightbulb, Share2 } from 'lucide-react';

interface Props {
  onCtaClick: () => void;
}

const Features: React.FC<Props> = ({ onCtaClick }) => {
  const items = [
    { title: 'خصوصية تامة', desc: 'موقعكم محمي بكلمة سر، إنتو بس اللي تقدروا تشوفوه.', icon: <Lock size={24} />, color: 'bg-red-50 text-red-600' },
    { title: 'رابط خاص بيكم', desc: 'لينك دائم ومميز ليكم لوحدكم.', icon: <Link size={24} />, color: 'bg-red-50 text-red-600' },
    { title: 'تنفيذ أي فكرة', desc: 'عندك فكرة معينة؟ بنصممهالك من الصفر.', icon: <Lightbulb size={24} />, color: 'bg-red-50 text-red-600', border: true },
  ];

  const smallCards = [
    { title: 'هدية رقمية مختلفة', icon: '🎁' },
    { title: 'استلام سريع ⏱️', icon: '⏱️' },
  ];

  return (
    <div className="space-y-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-center gap-3 mb-8">
        <h2 className="text-3xl font-black text-slate-900">ليه تختار R Love؟</h2>
        <span className="text-3xl">⭐</span>
      </div>

      <div className="space-y-4">
        {items.map((item, i) => (
          <div 
            key={i} 
            onClick={onCtaClick}
            className={`bg-white border ${item.border ? 'border-dashed border-red-200' : 'border-slate-100'} p-6 rounded-[2.5rem] flex items-center justify-between group transition-all shadow-sm cursor-pointer hover:border-red-400 hover:shadow-md active:scale-95`}
          >
            <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform`}>
              {item.icon}
            </div>
            <div className="text-right flex-1 pr-6" dir="rtl">
              <h4 className="text-lg font-bold text-slate-800">{item.title}</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {smallCards.map((card, i) => (
          <div 
            key={i} 
            onClick={onCtaClick}
            className="bg-white border border-slate-100 p-6 rounded-[2.5rem] flex flex-col items-center gap-3 shadow-sm cursor-pointer hover:border-red-200 active:scale-95"
          >
            <span className="text-3xl">{card.icon}</span>
            <span className="text-sm font-bold text-slate-600">{card.title}</span>
          </div>
        ))}
      </div>

      <div 
        onClick={onCtaClick}
        className="bg-white border border-slate-100 p-8 rounded-[2.5rem] relative overflow-hidden group shadow-sm cursor-pointer hover:border-red-400 transition-all active:scale-95"
      >
        <div className="absolute -left-10 bottom-0 w-24 h-24 bg-red-100 rounded-full blur-2xl"></div>
        <div className="flex items-center justify-between relative z-10" dir="rtl">
          <div className="text-red-600">
             <Share2 size={32} strokeWidth={2.5} />
          </div>
          <p className="text-sm font-bold text-center flex-1 text-slate-700">ينفع تبعته لينك او تطبيق حسب اختيارك</p>
        </div>
      </div>
    </div>
  );
};

export default Features;
