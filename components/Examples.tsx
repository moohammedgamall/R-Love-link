
import React from 'react';
import { LandingExample } from '../types';
import { Heart, Cake, Gift, Star, Sparkles, ChevronLeft, Lock } from 'lucide-react';

interface Props {
  items: LandingExample[];
  onItemClick: (pass?: string) => void;
}

const Examples: React.FC<Props> = ({ items, onItemClick }) => {
  const renderIcon = (iconStr?: string) => {
    const props = { size: 28, strokeWidth: 2.5 };
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
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-rose-600 shadow-xl shadow-rose-100 border border-rose-50 mb-2 rotate-2 hover:rotate-0 transition-transform">
          <Sparkles size={32} />
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">معرض الذكريات</h2>
        <p className="text-slate-400 text-sm font-bold max-w-xs leading-relaxed">
          تصفح أعمالنا السابقة.. بعض الأعمال محمية بكلمة سر للحفاظ على خصوصية أصحابها 🔒
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 px-2">
        {items.map((sample, i) => (
          <div 
            key={i} 
            onClick={() => onItemClick(sample.showPass ? sample.pass : undefined)}
            className="group relative bg-white border border-slate-100 p-5 rounded-[2.2rem] flex items-center justify-between hover:border-rose-200 hover:shadow-2xl hover:shadow-rose-500/5 transition-all duration-500 cursor-pointer active:scale-[0.97] shadow-sm"
          >
            {/* Password Badge for Public Demos */}
            {sample.showPass && (
              <div className="absolute -top-3 right-6 z-20 bg-emerald-500 text-white px-3 py-1 rounded-full text-[10px] font-black shadow-lg border-2 border-white flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                رمز الدخول: {sample.pass}
              </div>
            )}

            <div className={`w-14 h-14 ${sample.color || 'bg-rose-600'} rounded-2xl flex items-center justify-center shadow-lg text-white group-hover:scale-110 transition-transform shrink-0`}>
              {renderIcon(sample.icon)}
            </div>
            
            <div className="text-right flex-1 pr-5">
              <h4 className="text-lg font-black text-slate-800 group-hover:text-rose-600 transition-colors">
                {sample.title}
              </h4>
              
              <div className="mt-1">
                {sample.showPass ? (
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">معاينة مفتوحة</span>
                ) : (
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                    <Lock size={10} />
                    <span>تحتاج لرمز الدخول</span>
                  </div>
                )}
              </div>
            </div>

            <div className="text-slate-200 group-hover:text-rose-400 transition-colors">
              <ChevronLeft size={24} strokeWidth={3} />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6 text-center">
         <div className="inline-flex items-center gap-3 px-6 py-3 bg-slate-900 rounded-full text-white shadow-xl hover:bg-rose-600 transition-colors cursor-pointer group">
            <span className="font-black text-sm">اصنع ذكرياتك الخاصة</span>
            <Gift size={18} className="group-hover:rotate-12 transition-transform" />
         </div>
      </div>
    </div>
  );
};

export default Examples;
