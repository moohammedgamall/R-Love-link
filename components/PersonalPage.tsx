
import React, { useState, useEffect } from 'react';
import { UserPageData } from '../types';

interface Props {
  data: UserPageData;
  onLogout: () => void;
}

const PersonalPage: React.FC<Props> = ({ data, onLogout }) => {
  const [timeLeft, setTimeLeft] = useState<any>({});

  useEffect(() => {
    const timer = setInterval(() => {
      const start = new Date(data.startDate).getTime();
      const now = new Date().getTime();
      const diff = Math.abs(now - start);
      
      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
      const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
      const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeLeft({ years, months, days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(timer);
  }, [data.startDate]);

  const labels: Record<string, string> = {
    years: 'سنة', months: 'شهر', days: 'يوم',
    hours: 'ساعة', minutes: 'دقيقة', seconds: 'ثانية'
  };

  const TikTokIcon = () => (
    <svg viewBox="0 0 24 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.59-1.01-.01 2.62-.02 5.24-.04 7.86-.03 1.35-.36 2.73-1.12 3.84-1.3 1.96-3.72 2.72-5.94 2.26-1.92-.37-3.56-1.76-4.21-3.6-.58-1.59-.44-3.41.47-4.85.9-1.4 2.5-2.22 4.14-2.26.12 0 .24 0 .36.01V15.5c-1.38.27-2.31 1.65-2.06 3.03.18 1.05.9 1.95 1.9 2.24 1.25.37 2.68-.13 3.32-1.22.42-.69.49-1.52.48-2.32V.02z" 
        fill="#25F4EE"
        transform="translate(-0.8, -0.8)"
      />
      <path 
        d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.59-1.01-.01 2.62-.02 5.24-.04 7.86-.03 1.35-.36 2.73-1.12 3.84-1.3 1.96-3.72 2.72-5.94 2.26-1.92-.37-3.56-1.76-4.21-3.6-.58-1.59-.44-3.41.47-4.85.9-1.4 2.5-2.22 4.14-2.26.12 0 .24 0 .36.01V15.5c-1.38.27-2.31 1.65-2.06 3.03.18 1.05.9 1.95 1.9 2.24 1.25.37 2.68-.13 3.32-1.22.42-.69.49-1.52.48-2.32V.02z" 
        fill="#FE2C55"
        transform="translate(0.8, 0.8)"
      />
      <path 
        d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.59-1.01-.01 2.62-.02 5.24-.04 7.86-.03 1.35-.36 2.73-1.12 3.84-1.3 1.96-3.72 2.72-5.94 2.26-1.92-.37-3.56-1.76-4.21-3.6-.58-1.59-.44-3.41.47-4.85.9-1.4 2.5-2.22 4.14-2.26.12 0 .24 0 .36.01V15.5c-1.38.27-2.31 1.65-2.06 3.03.18 1.05.9 1.95 1.9 2.24 1.25.37 2.68-.13 3.32-1.22.42-.69.49-1.52.48-2.32V.02z" 
        fill="black" 
      />
    </svg>
  );

  return (
    <div className="min-h-screen bg-white pb-32 font-['Cairo']">
      <nav className="p-6 sm:p-8 flex justify-between items-center max-w-2xl mx-auto sticky top-0 bg-white/90 backdrop-blur-xl z-[100] border-b border-slate-50" dir="rtl">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-red-200">❤️</div>
           <h1 className="text-lg sm:text-2xl font-black text-slate-900">{data.targetName}</h1>
        </div>
        <button 
          onClick={onLogout} 
          className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all active:scale-90 border border-slate-100 shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </nav>

      <div className="max-w-2xl mx-auto px-4 sm:px-8 space-y-10 sm:space-y-14 mt-8 animate-in fade-in duration-1000">
        <div className="text-center space-y-4">
           <div className="inline-block px-5 py-2 rounded-full bg-red-50 border border-red-100 text-red-600 font-black text-[10px] sm:text-xs uppercase tracking-[0.2em]">ذكرى لا تُنسى</div>
           <h2 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">لقد مر على بدايتنا الجميلة</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4" dir="rtl">
          {Object.entries(timeLeft).map(([unit, val]: any) => (
            <div key={unit} className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-slate-100 text-center hover:border-red-400 hover:shadow-xl hover:shadow-red-500/5 transition-all shadow-sm group">
              <div className="text-3xl sm:text-4xl font-black text-red-600 mb-1 group-hover:scale-110 transition-transform">{val}</div>
              <div className="text-[10px] sm:text-xs uppercase font-black text-slate-400 tracking-widest">{labels[unit]}</div>
            </div>
          ))}
        </div>

        {data.songUrl && (
          <div className="bg-slate-50 p-6 sm:p-10 rounded-[2.5rem] border border-red-100 shadow-inner text-center space-y-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-[2rem] flex items-center justify-center mx-auto shadow-xl shadow-slate-200 animate-pulse p-4">
               <TikTokIcon />
            </div>
            <div className="space-y-3">
              <p className="text-xs sm:text-sm font-bold text-slate-400">موسيقى اللحظة</p>
              <div className="flex justify-center w-full">
                <audio controls className="w-full max-w-sm h-10 rounded-full opacity-80 hover:opacity-100 transition-opacity">
                  <source src={data.songUrl} />
                </audio>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6" dir="rtl">
          {data.images.map((img, idx) => (
            <div key={idx} className="rounded-[2.5rem] overflow-hidden border-4 border-white shadow-lg group relative aspect-square transition-all hover:scale-[1.02]">
              <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>

        {/* Message displayed at the bottom instead of floating button */}
        <div className="bg-red-600 p-8 sm:p-12 rounded-[3rem] text-center text-white shadow-2xl shadow-red-200 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
          <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500">💌</div>
          <p className="text-xl sm:text-2xl font-black leading-relaxed" dir="rtl">
            "{data.bottomMessage || "رسالة حب دافئة تعبر عن ما في القلب..."}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonalPage;
