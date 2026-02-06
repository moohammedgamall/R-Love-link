
import { Heart, Cake, Gift, Star, Sparkles, ChevronLeft, Lock, Key } from 'lucide-react';
import React from 'react';
import { LandingExample } from '../types';

interface Props {
  items: LandingExample[];
  onItemClick: (pass?: string) => void;
}

const Examples: React.FC<Props> = ({ items, onItemClick }) => {
  const renderIcon = (iconStr?: string) => {
    const props = { size: 24, strokeWidth: 2 };
    switch (iconStr) {
      case '❤️': return <Heart {...props} fill="currentColor" />;
      case '🎂': return <Cake {...props} />;
      case '🎁': return <Gift {...props} />;
      case '✨': return <Sparkles {...props} />;
      case '⭐': return <Star {...props} fill="currentColor" />;
      default: return <Heart {...props} fill="currentColor" />;
    }
  };

  return (
    <div className="space-y-12 py-6 animate-in fade-in slide-in-from-bottom-6 duration-1000" dir="rtl">
      <div className="flex flex-col items-center text-center gap-4 mb-10">
        <div className="w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center text-rose-600 shadow-xl shadow-rose-100 border border-rose-50 mb-2 rotate-2 hover:rotate-0 transition-transform">
          <Sparkles size={32} />
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">معرض الذكريات</h2>
        <p className="text-slate-400 text-sm font-bold max-w-xs leading-relaxed">
          تصفح أعمالنا السابقة.. خصوصيتك هي أولويتنا 🔒
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 px-2">
        {items.length === 0 ? (
          <div className="text-center py-20 bg-white/50 rounded-[2.5rem] border border-dashed border-slate-200">
             <div className="text-4xl mb-4">✨</div>
             <p className="text-slate-400 font-bold text-sm">لا يوجد أعمال حالياً.. كن أول من يوثق حكايته!</p>
          </div>
        ) : (
          items.map((sample, i) => (
            <div 
              key={i} 
              className="relative group pt-4"
            >
              {/* Password Badge - Always shown and styled prominently */}
              {sample.showPass && (
                <div className="absolute top-0 right-6 z-20 bg-rose-600 text-white px-4 py-1.5 rounded-full text-[11px] font-black shadow-lg border-2 border-white flex items-center gap-2 group-hover:scale-110 transition-transform">
                  <Key size={12} strokeWidth={3} />
                  <span>رمز الدخول:</span>
                  <span className="bg-white/20 px-2 py-0.5 rounded-md font-mono">{sample.pass}</span>
                </div>
              )}

              <div 
                onClick={() => onItemClick(sample.showPass ? sample.pass : undefined)}
                className="bg-white border border-slate-100 p-6 rounded-[2.2rem] flex items-center justify-between hover:border-rose-300 hover:shadow-2xl hover:shadow-rose-500/10 transition-all duration-500 cursor-pointer active:scale-[0.97] shadow-sm overflow-visible"
              >
                <div className={`w-14 h-14 ${sample.color || 'bg-rose-600'} rounded-2xl flex items-center justify-center shadow-md text-white group-hover:scale-110 transition-transform shrink-0`}>
                  {renderIcon(sample.icon)}
                </div>
                
                <div className="text-right flex-1 pr-6">
                  <h4 className="text-lg font-black text-slate-800 group-hover:text-rose-600 transition-colors leading-tight">
                    {sample.title}
                  </h4>
                  
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="text-[10px] text-rose-500 font-bold bg-rose-50 px-2.5 py-1 rounded-lg flex items-center gap-1">
                      <Sparkles size={10} />
                      معاينة حية
                    </span>
                  </div>
                </div>

                <div className="text-slate-200 group-hover:text-rose-400 transition-colors pl-2">
                  <ChevronLeft size={24} strokeWidth={2} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="pt-6 text-center">
         <div 
          onClick={() => {
            const orderEl = document.getElementById('order');
            if(orderEl) orderEl.scrollIntoView({behavior: 'smooth'});
          }}
          className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 rounded-full text-white shadow-xl hover:bg-rose-600 transition-all cursor-pointer group hover:scale-105 active:scale-95"
         >
            <span className="font-black text-sm">اصنع ذكرياتك الخاصة الآن</span>
            <Gift size={18} className="group-hover:rotate-12 transition-transform" />
         </div>
      </div>
    </div>
  );
};

export default Examples;
