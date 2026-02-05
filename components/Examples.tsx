
import React from 'react';
import { LandingExample } from '../types';

interface Props {
  items: LandingExample[];
  onItemClick: (pass: string) => void;
}

const Examples: React.FC<Props> = ({ items, onItemClick }) => {
  return (
    <div className="space-y-6 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700" dir="rtl">
      <div className="flex items-center justify-start gap-3 mb-8">
        <span className="text-3xl">📁</span>
        <h2 className="text-3xl font-black text-slate-900">نماذج من أعمالنا</h2>
      </div>

      <div className="space-y-4">
        {items.map((sample, i) => (
          <div 
            key={i} 
            onClick={() => onItemClick(sample.pass)}
            className="bg-white border border-slate-100 p-5 rounded-[2.5rem] flex items-center justify-between group hover:border-red-400 hover:shadow-xl hover:shadow-red-500/10 transition-all cursor-pointer active:scale-95 shadow-sm"
          >
            <div className={`w-14 h-14 ${sample.color} rounded-2xl flex items-center justify-center shadow-lg text-white group-hover:scale-110 transition-transform`}>
              {sample.icon ? <span className="text-2xl">{sample.icon}</span> : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </div>
            
            <div className="text-right flex-1 pr-4">
              <h4 className="text-xl font-bold text-slate-800 group-hover:text-red-600 transition-colors">{sample.title}</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">اضغط للمشاهدة الحية</p>
            </div>

            <div className="text-slate-300 group-hover:text-red-400 transition-colors transform rotate-180">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-8 text-center space-y-8">
         <p className="text-red-600 font-black flex items-center justify-center gap-2">
           <span className="text-xl">🎨</span> الدقة هي لعبتنا!
         </p>
         <div className="grid grid-cols-2 gap-4">
           <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] flex flex-col items-center gap-3 shadow-sm">
              <span className="text-3xl text-red-500">🪄</span>
              <span className="font-bold text-slate-700">تصميم احترافي</span>
           </div>
           <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] flex flex-col items-center gap-3 shadow-sm">
              <span className="text-3xl text-red-500">✅</span>
              <span className="font-bold text-slate-700">دعم متواصل</span>
           </div>
         </div>
      </div>
    </div>
  );
};

export default Examples;
