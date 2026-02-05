
import React, { useState, useEffect } from 'react';
import { UserPageData } from '../types';

interface Props {
  data: UserPageData;
  onLogout: () => void;
}

const PersonalPage: React.FC<Props> = ({ data, onLogout }) => {
  const [timeLeft, setTimeLeft] = useState<any>(null);

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

  if (!timeLeft) return null;

  const labels: Record<string, string> = {
    years: 'سنة', months: 'شهر', days: 'يوم',
    hours: 'ساعة', minutes: 'دقيقة', seconds: 'ثانية'
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] pb-40">
      <nav className="p-6 flex justify-between items-center max-w-2xl mx-auto sticky top-0 bg-white/80 backdrop-blur-2xl z-[100] border-b border-slate-50">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 bg-rose-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-rose-200 animate-pulse">❤️</div>
           <h1 className="text-xl font-black text-slate-800">{data.targetName}</h1>
        </div>
        <button onClick={onLogout} className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-rose-600 active:scale-90 transition-all border border-slate-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </nav>

      <div className="max-w-2xl mx-auto px-4 space-y-12 mt-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
        <div className="text-center space-y-4">
           <div className="inline-block px-4 py-1.5 rounded-full bg-rose-50 text-rose-600 font-black text-[10px] uppercase tracking-[0.2em] border border-rose-100">Our Forever Story</div>
           <h2 className="text-3xl font-black text-slate-800 leading-tight">كل ثانية وإنتِ <br/><span className="text-rose-600">في قلبي ❤️</span></h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {Object.entries(timeLeft).map(([unit, val]: any) => (
            <div key={unit} className="ios-card p-6 flex flex-col items-center justify-center text-center group">
              <span className="text-4xl font-black text-slate-800 mb-1 group-hover:scale-110 group-hover:text-rose-600 transition-all">{val}</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{labels[unit]}</span>
            </div>
          ))}
        </div>

        {data.songUrl && (
          <div className="ios-card p-8 bg-slate-900 text-white overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="flex flex-col items-center gap-6 relative z-10">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-[2rem] flex items-center justify-center text-4xl shadow-2xl animate-spin-slow">🎵</div>
              <div className="w-full">
                <p className="text-center text-[10px] font-bold text-rose-400 mb-4 uppercase tracking-[0.3em]">Playing Your Memory</p>
                <audio controls className="w-full h-10 rounded-full opacity-90 brightness-200">
                  <source src={data.songUrl} />
                </audio>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          {data.images.map((img, idx) => (
            <div key={idx} className="ios-card overflow-hidden aspect-square border-4 border-white group">
              <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
            </div>
          ))}
        </div>

        <div className="ios-card p-10 bg-rose-600 text-white text-center space-y-6 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="text-5xl group-hover:scale-110 transition-transform duration-500">💌</div>
          <p className="text-xl sm:text-2xl font-black leading-relaxed">
            "{data.bottomMessage || "حكايتنا هي أجمل قدر حصل في حياتي.."}"
          </p>
          <p className="text-[10px] font-bold text-rose-200 uppercase tracking-widest">Love Forever</p>
        </div>
      </div>
    </div>
  );
};

export default PersonalPage;
