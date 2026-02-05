
import React from 'react';
import { LandingExample } from '../types';

interface Props {
  items: LandingExample[];
  onItemClick: (pass?: string) => void;
}

const Examples: React.FC<Props> = ({ items, onItemClick }) => {
  return (
    <div className="space-y-8 py-4 animate-in fade-in slide-in-from-bottom-6 duration-1000" dir="rtl">
      <div className="flex flex-col items-center text-center gap-3 mb-10">
        <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-3xl shadow-sm border border-slate-100 mb-2">
          📁
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">معرض أعمالنا</h2>
        <p className="text-slate-400 text-sm font-bold max-w-xs leading-relaxed px-4">
          نقدم لك نماذج حقيقية وتجريبية، جرب الدخول باستخدام "الرمز" المكتوب ✨
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 px-2">
        {items.map((sample, i) => (
          <div 
            key={i} 
            onClick={() => onItemClick(sample.pass)}
            className="group relative bg-white border border-slate-100 p-5 rounded-[2.5rem] flex items-center justify-between hover:border-rose-400 hover:shadow-2xl hover:shadow-rose-500/10 transition-all duration-500 cursor-pointer active:scale-[0.98] shadow-sm overflow-visible"
          >
            {/* Password Label for Demos */}
            {sample.showPass && (
              <div className="absolute -top-3 right-8 z-20 bg-rose-600 text-white px-3 py-1 rounded-xl text-[10px] font-black shadow-lg shadow-rose-500/30 flex items-center gap-2 border-2 border-white animate-bounce-subtle">
                <span>الرمز:</span>
                <span className="bg-white/20 px-1.5 rounded uppercase font-mono tracking-wider">{sample.pass}</span>
              </div>
            )}

            <div className={`w-14 h-14 ${sample.color} rounded-2xl flex items-center justify-center shadow-md text-white group-hover:scale-110 transition-all duration-500 shrink-0`}>
              {sample.icon ? <span className="text-2xl">{sample.icon}</span> : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              )}
            </div>
            
            <div className="text-right flex-1 pr-4">
              <h4 className="text-lg font-black text-slate-800 group-hover:text-rose-600 transition-colors truncate">
                {sample.title}
              </h4>
              
              <div className="flex items-center gap-2 mt-0.5">
                {sample.showPass ? (
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-50 rounded-full border border-emerald-100">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span className="text-[9px] text-emerald-700 font-black">جاهز للمعاينة</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-slate-50 rounded-full border border-slate-100">
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                    <p className="text-[9px] text-slate-400 font-bold tracking-tight">طلب خاص لعميل</p>
                  </div>
                )}
              </div>
            </div>

            <div className="text-slate-200 group-hover:text-rose-400 transition-all duration-300 transform rotate-180 mr-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s infinite ease-in-out;
        }
      `}</style>

      <div className="pt-8 text-center space-y-8">
         <div className="inline-block px-5 py-2.5 bg-white border border-slate-100 rounded-full shadow-sm">
            <p className="text-rose-600 font-black flex items-center justify-center gap-2 text-sm">
              <span className="text-xl">🎨</span> صمم ذكرى لا تُنسى اليوم
            </p>
         </div>
         
         <div className="grid grid-cols-2 gap-4 px-2">
           <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] flex flex-col items-center gap-3 shadow-sm hover:shadow-md transition-all group">
              <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">🪄</div>
              <span className="font-black text-slate-700 text-[10px] uppercase">تصميم مخصص</span>
           </div>
           <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] flex flex-col items-center gap-3 shadow-sm hover:shadow-md transition-all group">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">✅</div>
              <span className="font-black text-slate-700 text-[10px] uppercase">خصوصية تامة</span>
           </div>
         </div>
      </div>
    </div>
  );
};

export default Examples;
