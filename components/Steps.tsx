
import React from 'react';
import { LandingStep } from '../types';
import { Lightbulb, Wand2, Gift, Sparkles } from 'lucide-react';

interface Props {
  steps: LandingStep[];
}

const Steps: React.FC<Props> = ({ steps }) => {
  const renderIcon = (iconStr: string) => {
    const props = { size: 32, strokeWidth: 2.5 };
    switch (iconStr) {
      case '💡': return <Lightbulb {...props} />;
      case '🪄': return <Wand2 {...props} />;
      case '🎁': return <Gift {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  return (
    <div className="space-y-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700" id="steps">
      <div className="flex flex-col items-center text-center gap-3 mb-12">
        <h2 className="text-3xl font-black text-slate-900">اعمل هديتك في 3 خطوات</h2>
        <div className="w-12 h-1 bg-rose-600 rounded-full mt-2"></div>
      </div>

      <div className="space-y-6 relative">
        <div className="absolute top-0 bottom-0 right-[4.5rem] w-0.5 bg-slate-100 hidden md:block"></div>
        {steps.map((step, i) => (
          <div key={i} className="bg-white border border-slate-100 p-8 rounded-[2.5rem] flex items-center justify-between gap-6 group shadow-sm hover:shadow-md transition-all">
            <div className="w-16 h-16 bg-rose-600 rounded-full flex items-center justify-center text-2xl font-black text-white shadow-xl shadow-rose-500/20 shrink-0">
              {i + 1}
            </div>
            
            <div className="text-right flex-1">
              <h4 className="text-xl font-black mb-2 text-slate-800">{step.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-bold">{step.desc}</p>
            </div>

            <div className="text-rose-600 transition-transform duration-300 group-hover:scale-125 shrink-0">
              {renderIcon(step.icon)}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-8 text-center">
        <p className="text-rose-600 font-black text-lg animate-pulse flex items-center justify-center gap-2">
          <Sparkles size={20} /> بكل سهولة وبأعلى جودة <Sparkles size={20} />
        </p>
      </div>
    </div>
  );
};

export default Steps;
