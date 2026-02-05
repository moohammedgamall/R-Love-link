
import React, { useState } from 'react';

interface Props {
  onLogin: (pass: string) => void;
  onBack: () => void;
}

const LoginGate: React.FC<Props> = ({ onLogin, onBack }) => {
  const [pass, setPass] = useState('');

  return (
    <div className="flex items-center justify-center w-full max-w-md animate-in zoom-in-95 duration-500">
      <div className="bg-slate-900 p-10 md:p-14 rounded-[3.5rem] shadow-2xl shadow-red-500/10 w-full border border-slate-800 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="w-24 h-24 bg-red-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-red-600/30 rotate-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        
        <h1 className="text-4xl font-black text-white mb-3 tracking-tight">الدخول الآمن</h1>
        <p className="text-slate-500 mb-10 font-bold text-lg">أدخل رمز الوصول الخاص بك</p>
        
        <form onSubmit={(e) => { e.preventDefault(); onLogin(pass); }} className="space-y-5">
          <input
            type="password"
            placeholder="رمز الدخول"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="w-full px-8 py-5 rounded-3xl bg-slate-950 border-2 border-slate-800 focus:border-red-500 focus:bg-slate-900 outline-none transition-all text-center text-2xl font-mono tracking-widest placeholder:font-sans placeholder:tracking-normal text-white"
          />
          <button
            type="submit"
            className="w-full py-5 bg-red-600 text-white rounded-3xl font-black text-xl hover:bg-red-700 shadow-2xl shadow-red-600/20 transition-all active:scale-95 hover:-translate-y-1"
          >
            دخول للمنصة
          </button>
        </form>
        
        <button onClick={onBack} className="mt-8 text-slate-500 text-sm font-bold hover:text-white transition-colors">
          العودة للرئيسية
        </button>
      </div>
    </div>
  );
};

export default LoginGate;
