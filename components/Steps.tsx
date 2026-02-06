
import React from 'react';
import { LandingStep } from '../types';
import { Lightbulb, Wand2, Gift, Sparkles } from 'lucide-react';

interface Props {
  steps: LandingStep[];
}

const Steps: React.FC<Props> = ({ steps }) => {
  const renderIcon = (iconStr: string) => {
    const props = { size: 28, strokeWidth: 2.5 };
    switch (iconStr) {
      case '💡': return <Lightbulb {...props} />;
      case '🪄': return <Wand2 {...props} />;
      case '🎁': return <Gift {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  return (
    <div className="space-y-12 py-10 animate-in fade-in slide-in-from-bottom-4 duration-700" id="steps">
      <div className="flex flex-col items-center text-center gap-3 mb-4">
        <div className="bg-rose-50 text-rose-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-2 border border-rose-100">
          How it works
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">هديتك في 3 خطوات</h2>
        <div className="w-12 h-1.5 bg-rose-600 rounded-full mt-1"></div>
      </div>

      <div className="space-y-8 relative px-2">
        {/* الخط الرأسي الواصل - تم ضبطه ليكون خلف الأرقام تماماً */}
        <div className="absolute top-10 bottom-10 right-[3.7rem] w-1 bg-slate-100/80 rounded-full hidden md:block"></div>
        
        {steps.map((step, i) => (
          <div key={i} className="relative bg-white border border-slate-100 p-6 md:p-8 rounded-[2.5rem] flex items-center justify-between gap-6 group shadow-sm hover:shadow-xl hover:border-rose-100 transition-all duration-500">
            {/* دائرة الرقم المحسنة */}
            <div className="w-14 h-14 md:w-16 md:h-16 bg-rose-600 rounded-full flex items-center justify-center text-2xl font-black text-white shadow-xl shadow-rose-600/20 shrink-0 border-4 border-white relative z-10">
              <span className="leading-none mt-1">{i + 1}</span>
            </div>
            
            <div className="text-right flex-1">
              <h4 className="text-lg md:text-xl font-black mb-1 text-slate-800 group-hover:text-rose-600 transition-colors">{step.title}</h4>
              <p className="text-[11px] md:text-xs text-slate-500 leading-relaxed font-bold">{step.desc}</p>
            </div>

            <div className="text-slate-200 transition-all duration-500 group-hover:scale-110 group-hover:text-rose-500 shrink-0">
              {renderIcon(step.icon)}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 text-center">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-100 rounded-2xl shadow-sm">
           <Sparkles size={18} className="text-rose-500 animate-pulse" />
           <p className="text-slate-600 font-black text-sm">بكل سهولة وبأعلى جودة تنفيذ</p>
           <Sparkles size={18} className="text-rose-500 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default Steps;
