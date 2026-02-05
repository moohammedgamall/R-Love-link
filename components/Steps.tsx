
import React from 'react';
import { LandingStep } from '../types';

interface Props {
  steps: LandingStep[];
}

const Steps: React.FC<Props> = ({ steps }) => {
  return (
    <div className="space-y-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-center gap-3 mb-12">
        <h2 className="text-3xl font-black text-slate-900">اعمل هديتك في 3 خطوات</h2>
        <span className="text-3xl">🪄</span>
      </div>

      <div className="space-y-6 relative">
        <div className="absolute top-0 bottom-0 right-[4.5rem] w-0.5 bg-slate-100 hidden md:block"></div>
        {steps.map((step, i) => (
          <div key={i} className="bg-white border border-slate-100 p-8 rounded-[2.5rem] flex items-center justify-between gap-6 group shadow-sm hover:shadow-md transition-all">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-2xl font-black text-white shadow-xl shadow-red-500/20">
              {i + 1}
            </div>
            
            <div className="text-right flex-1">
              <h4 className="text-xl font-black mb-2 text-slate-800">{step.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
            </div>

            <div className="text-3xl transition-transform duration-300 group-hover:scale-125">
              {step.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-8 text-center">
        <p className="text-red-600 font-black text-lg animate-pulse">✨ بكل سهولة وبأعلى جودة ✨</p>
      </div>
    </div>
  );
};

export default Steps;
