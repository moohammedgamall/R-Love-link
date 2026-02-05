
import React, { useState, useRef } from 'react';

interface Props {
  onLoginClick: () => void;
  hideLogin?: boolean;
}

const Navbar: React.FC<Props> = ({ onLoginClick, hideLogin }) => {
  const [clickCount, setClickCount] = useState(0);
  // Fix: Use ReturnType<typeof setTimeout> to avoid dependency on NodeJS namespace in browser environment
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
      }, 500); // يجب أن تكون النقرات متتالية في أقل من نصف ثانية
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-4 py-5 bg-white/80 backdrop-blur-xl border-b border-slate-100">
      <div className="max-w-xl mx-auto grid grid-cols-3 items-center">
        {/* الجانب الأيمن - فارغ للحفاظ على التنسيق بعد حذف زر الدخول */}
        <div className="flex justify-start">
          {!hideLogin && (
            <button 
              onClick={onLoginClick}
              className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-red-50 hover:text-red-600 transition-all duration-300 border border-slate-100 shadow-sm active:scale-90"
              aria-label="تسجيل الدخول"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </button>
          )}
        </div>
        
        {/* المنتصف - اللوجو (التفاعل بـ 3 نقرات) */}
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

        {/* الجانب الأيسر - فارغ تماماً لإخفاء أي وصول للإدارة */}
        <div className="flex justify-end">
          {/* تم حذف أيقونة القفل من هنا */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
