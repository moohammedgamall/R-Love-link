
import React from 'react';

interface Props {
  active: 'home' | 'examples' | 'features' | 'steps' | 'order';
  setActive: (s: 'home' | 'examples' | 'features' | 'steps' | 'order') => void;
}

const BottomNav: React.FC<Props> = ({ active, setActive }) => {
  const tabs = [
    { id: 'home', label: 'الرئيسية', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    )},
    { id: 'examples', label: 'أعمالنا', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
      </svg>
    )},
    { id: 'features', label: 'المميزات', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    )},
    { id: 'steps', label: 'الخطوات', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
      </svg>
    )},
    { id: 'order', label: 'اطلب', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    )},
  ];

  return (
    <div className="fixed bottom-8 left-0 right-0 z-[200] px-4 flex justify-center pointer-events-none">
      <div className="bg-white/95 backdrop-blur-2xl rounded-[2.5rem] flex items-center shadow-[0_15px_50px_rgba(0,0,0,0.1)] pointer-events-auto w-full max-w-xl transition-all duration-500 h-[72px] sm:h-[82px] border border-slate-200/60 p-1.5">
        <div className="flex items-center justify-between w-full gap-1">
          {tabs.map(tab => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id as any)}
                className={`relative flex-1 flex flex-col items-center justify-center h-[60px] sm:h-[70px] rounded-[1.8rem] transition-all duration-300 group z-10 ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-red-500'
                }`}
              >
                {/* Pill Indicator - Red background for active state */}
                {isActive && (
                  <div className="absolute inset-y-1 inset-x-1 bg-red-600 rounded-[1.6rem] z-[-1] shadow-lg shadow-red-600/20 animate-in fade-in zoom-in-95 duration-200"></div>
                )}
                
                <div className={`relative transition-all duration-300 ${isActive ? 'scale-110 -translate-y-0.5' : 'scale-100'}`}>
                  {tab.icon}
                </div>
                <span className={`text-[8px] sm:text-[9.5px] font-black mt-1 whitespace-nowrap transition-all duration-300 ${
                  isActive ? 'opacity-100' : 'opacity-60'
                }`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
