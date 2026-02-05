
import React, { useState, useEffect } from 'react';

interface Props {
  onLogin: (pass: string) => void;
  onBack: () => void;
  prefilled?: string;
}

const LoginGate: React.FC<Props> = ({ onLogin, onBack, prefilled }) => {
  const [pass, setPass] = useState(prefilled || '');

  useEffect(() => {
    if (prefilled) {
      setPass(prefilled);
    }
  }, [prefilled]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass.trim()) {
      onLogin(pass.trim());
    }
  };

  return (
    <div className="flex items-center justify-center w-full max-w-md animate-in zoom-in-95 duration-500 font-['Cairo']" dir="rtl">
      <div className="bg-slate-900 p-10 md:p-14 rounded-[3.5rem] shadow-2xl shadow-red-500/10 w-full border border-slate-800 text-center relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="w-24 h-24 bg-red-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-red-600/30 rotate-3 animate-in slide-in-from-top-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-black text-white mb-3 tracking-tight">الدخول الآمن</h1>
        <p className="text-slate-500 mb-10 font-bold text-base">أدخل رمز الوصول الخاص بك للمعاينة</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input 
              type="text"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="الرمز السري هنا.."
              className="w-full bg-slate-800/50 border-2 border-slate-700 text-white text-center py-5 px-6 rounded-2xl focus:border-red-600 outline-none transition-all font-mono text-2xl tracking-[0.2em] placeholder:text-slate-600 placeholder:font-sans placeholder:tracking-normal"
              autoFocus
            />
            {prefilled && (
              <div className="absolute -top-3 right-4 bg-emerald-500 text-white px-2 py-0.5 rounded-lg text-[10px] font-black animate-pulse">
                تم الملء تلقائياً ✨
              </div>
            )}
          </div>

          <button 
            type="submit"
            className="w-full py-5 bg-red-600 text-white rounded-2xl font-black text-xl shadow-xl shadow-red-600/20 hover:bg-red-700 active:scale-95 transition-all"
          >
            عرض الصفحة الآن
          </button>
        </form>

        <button 
          onClick={onBack}
          className="mt-8 text-slate-500 hover:text-white font-bold text-sm transition-colors"
        >
          رجوع للرئيسية
        </button>
      </div>
    </div>
  );
};

export default LoginGate;
