
import React, { useState, useRef } from 'react';
import { User } from 'lucide-react';

interface Props {
  onLoginClick: () => void;
  hideLogin?: boolean;
}

const Navbar: React.FC<Props> = ({ onLoginClick, hideLogin }) => {
  const [clickCount, setClickCount] = useState(0);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goToAdmin = () => {
    window.history.pushState({}, '', '/admin');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    if (newCount === 3) {
      goToAdmin();
      setClickCount(0);
    } else {
      clickTimeoutRef.current = setTimeout(() => {
        setClickCount(0);
      }, 500);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-4 py-5 bg-white/80 backdrop-blur-xl border-b border-slate-100">
      <div className="max-w-xl mx-auto flex justify-center items-center relative">
        {/* تم حذف زر تسجيل الدخول من هنا */}
        
        <div 
          className="text-center flex flex-col items-center cursor-default select-none active:scale-95 transition-transform"
          onClick={handleLogoClick}
        >
          <div className="flex items-center gap-1.5">
            <span className="text-base font-black text-slate-900 whitespace-nowrap tracking-tight">منصة للهدايا الرقمية</span>
            <span className="text-lg">👑</span>
          </div>
          <p className="text-[9px] text-red-600 font-black uppercase tracking-[0.2em] leading-none mt-1">R LOVE LINK</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
