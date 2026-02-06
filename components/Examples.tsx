
import React from 'react';
import { LandingExample } from '../types';
import { Heart, Cake, Gift, Star, Sparkles, ChevronLeft } from 'lucide-react';

interface Props {
  items: LandingExample[];
  onItemClick: (pass?: string) => void;
}

const Examples: React.FC<Props> = ({ items, onItemClick }) => {
  // دالة لتحويل الرموز النصية إلى أيقونات Lucide
  const renderIcon = (iconStr?: string) => {
    const props = { size: 32, strokeWidth: 2.5 };
    switch (iconStr) {
      case '❤️': return <Heart {...props} fill="currentColor" />;
      case '🎂': return <Cake {...props} />;
      case '🎁': return <Gift {...props} />;
      case '💝': return <Heart {...props} fill="currentColor" />;
      case '✨': return <Sparkles {...props} />;
      case '⭐': return <Star {...props} fill="currentColor" />;
      default: return <Heart {...props} />;
    }
  };

  return (
    <div className="space-y-12 py-6 animate-in fade-in slide-in-from-bottom-6 duration-1000" dir="rtl" id="examples">
      <div className="flex flex-col items-center text-center gap-4 mb-12">
        <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center text-rose-600 shadow-xl shadow-slate-100 border border-slate-50 mb-2 rotate-3 hover:rotate-0 transition-transform duration-500">
          <Sparkles size={40} strokeWidth={2.5} />
        </div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">معرض أعمالنا</h2>
        <p className="text-slate-400 text-base font-bold max-w-sm leading-relaxed px-4">
          استلهم فكرتك من نماذجنا الحقيقية.. جرب الدخول باستخدام الرمز المكتوب على الكرت ✨
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 px-2">
        {items.map((sample, i) => (
          <div 
            key={i} 
            onClick={() => onItemClick(sample.pass)}
            className="group relative bg-white border border-slate-100 p-6 rounded-[2.8rem] flex items-center justify-between hover:border-rose-300 hover:shadow-2xl hover:shadow-rose-500/10 transition-all duration-500 cursor-pointer active:scale-[0.97] shadow-sm overflow-visible"
          >
            {/* Password Tag */}
            {sample.showPass && (
              <div className="absolute -top-4 right-10 z-20 bg-rose-600 text-white px-4 py-1.5 rounded-2xl text-[11px] font-black shadow-lg shadow-rose-600/30 flex items-center gap-2 border-2 border-white animate-bounce-subtle">
                <span className="opacity-80">الرمز:</span>
                <span className="bg-white/20 px-2 py-0.5 rounded-lg uppercase font-mono tracking-widest">{sample.pass}</span>
              </div>
            )}

            <div className={`w-16 h-16 ${sample.color} rounded-3xl flex items-center justify-center shadow-xl text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shrink-0`}>
              {renderIcon(sample.icon)}
            </div>
            
            <div className="text-right flex-1 pr-6">
              <h4 className="text-xl font-black text-slate-800 group-hover:text-rose-600 transition-colors truncate">
                {sample.title}
              </h4>
              
              <div className="flex items-center gap-2 mt-1.5">
                {sample.showPass ? (
                  <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] text-emerald-700 font-black">متاح للمعاينة الفورية</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
                    <span className="w-2 h-2 bg-slate-300 rounded-full"></span>
                    <p className="text-[10px] text-slate-400 font-bold tracking-tight">طلب خاص تم تسليمه</p>
                  </div>
                )}
              </div>
            </div>

            <div className="text-slate-200 group-hover:text-rose-400 transition-all duration-300 transform rotate-180 mr-2">
              <ChevronLeft size={28} strokeWidth={3} />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s infinite ease-in-out;
        }
      `}</style>

      <div className="pt-10 text-center space-y-10">
         <div className="inline-block px-6 py-3 bg-white border border-slate-100 rounded-full shadow-sm hover:shadow-md transition-shadow">
            <p className="text-rose-600 font-black flex items-center justify-center gap-3 text-base">
              <Sparkles className="animate-pulse" size={20} /> صمم ذكرى لا تُنسى اليوم
            </p>
         </div>
         
         <div className="grid grid-cols-2 gap-6 px-2">
           <div className="bg-white border border-slate-100 p-10 rounded-[3rem] flex flex-col items-center gap-4 shadow-sm hover:shadow-xl hover:border-rose-100 transition-all group">
              <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 group-hover:scale-110 group-hover:rotate-6 transition-all">
                <Star size={30} strokeWidth={2.5} fill="currentColor" />
              </div>
              <span className="font-black text-slate-700 text-xs uppercase tracking-widest">تصميم مخصص</span>
           </div>
           <div className="bg-white border border-slate-100 p-10 rounded-[3rem] flex flex-col items-center gap-4 shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all group">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:scale-110 group-hover:-rotate-6 transition-all">
                <Gift size={30} strokeWidth={2.5} />
              </div>
              <span className="font-black text-slate-700 text-xs uppercase tracking-widest">خصوصية تامة</span>
           </div>
         </div>
      </div>
    </div>
  );
};

export default Examples;
