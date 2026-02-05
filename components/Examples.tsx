
import React from 'react';
import { LandingExample } from '../types';

interface Props {
  items: LandingExample[];
  onItemClick: () => void;
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
            onClick={onItemClick}
            className="bg-white border border-slate-100 p-5 rounded-[2.5rem] flex items-center justify-between group hover:border-rose-400 hover:shadow-xl hover:shadow-rose-500/10 transition-all cursor-pointer active:scale-95 shadow-sm"
          >
            <div className={`w-14 h-14 ${sample.color} rounded-2xl flex items-center justify-center shadow-lg text-white group-hover:scale-110 transition-transform`}>
              {sample.icon ? <span className="text-2xl">{sample.icon}</span> : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              )}
            </div>
            
            <div className="text-right flex-1 pr-4">
              <h4 className="text-lg font-black text-slate-800 group-hover:text-rose-600 transition-colors">{sample.title}</h4>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse"></span>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">محمي بكلمة سر</p>
              </div>
            </div>

            <div className="text-slate-300 group-hover:text-rose-400 transition-colors transform rotate-180">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-slate-200">
           <p className="text-slate-400 font-bold">لا يوجد أعمال معروضة حالياً</p>
        </div>
      )}

      <div className="pt-8 text-center space-y-8">
         <p className="text-rose-600 font-black flex items-center justify-center gap-2">
           <span className="text-xl">🎨</span> نصمم لك ذكرى لا تُنسى
         </p>
         <div className="grid grid-cols-2 gap-4">
           <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] flex flex-col items-center gap-3 shadow-sm">
              <span className="text-3xl text-rose-500">🪄</span>
              <span className="font-bold text-slate-700 text-xs">تصميم احترافي</span>
           </div>
           <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] flex flex-col items-center gap-3 shadow-sm">
              <span className="text-3xl text-rose-500">✅</span>
              <span className="font-bold text-slate-700 text-xs">خصوصية تامة</span>
           </div>
         </div>
      </div>
    </div>
  );
};

export default Examples;
