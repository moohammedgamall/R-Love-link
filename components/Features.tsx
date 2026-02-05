
import React from 'react';

interface Props {
  onCtaClick: () => void;
}

const Features: React.FC<Props> = ({ onCtaClick }) => {
  const items = [
    { title: 'خصوصية تامة', desc: 'موقعكم محمي بكلمة سر، إنتو بس اللي تقدروا تشوفوه.', icon: '🔒', color: 'bg-red-50 text-red-600' },
    { title: 'رابط خاص بيكم', desc: 'لينك دائم ومميز ليكم لوحدكم.', icon: '🔗', color: 'bg-red-50 text-red-600' },
    { title: 'تنفيذ أي فكرة', desc: 'عندك فكرة معينة؟ بنصممهالك من الصفر.', icon: '💡', color: 'bg-red-50 text-red-600', border: true },
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
            <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center text-2xl group-hover:rotate-6 transition-transform`}>
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
          <div className="text-2xl text-red-600">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </div>
          <p className="text-sm font-bold text-center flex-1 text-slate-700">ينفع تبعته لينك او تطبيق حسب اختيارك</p>
        </div>
      </div>
    </div>
  );
};

export default Features;
