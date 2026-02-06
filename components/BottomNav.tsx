
import React from 'react';
import { Home, PlayCircle, Sparkles, ListChecks, Zap } from 'lucide-react';

interface Props {
  active: 'home' | 'examples' | 'features' | 'steps' | 'order';
  setActive: (s: 'home' | 'examples' | 'features' | 'steps' | 'order') => void;
}

const BottomNav: React.FC<Props> = ({ active, setActive }) => {
  const tabs = [
    { id: 'home', label: 'الرئيسية', icon: <Home size={22} strokeWidth={2.5} /> },
    { id: 'examples', label: 'أعمالنا', icon: <PlayCircle size={22} strokeWidth={2.5} /> },
    { id: 'features', label: 'المميزات', icon: <Sparkles size={22} strokeWidth={2.5} /> },
    { id: 'steps', label: 'الخطوات', icon: <ListChecks size={22} strokeWidth={2.5} /> },
    { id: 'order', label: 'اطلب', icon: <Zap size={22} strokeWidth={2.5} /> },
  ];

  return (
    <div className="fixed bottom-5 left-0 right-0 z-[200] px-4 flex justify-center pointer-events-none">
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
