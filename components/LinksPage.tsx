
import React from 'react';

const LinksPage: React.FC = () => {
  const links = [
    { title: 'اطلب هديتك الآن (واتساب)', url: 'https://wa.me/201091931466', icon: '💬', color: 'bg-emerald-500' },
    { title: 'مشاهدة أعمالنا السابقة', url: '/#examples', icon: '🎨', color: 'bg-red-600' },
    { title: 'الموقع الرسمي للمنصة', url: '/', icon: '🌐', color: 'bg-slate-900' },
    { title: 'آراء العملاء وتقييماتهم', url: '#', icon: '⭐', color: 'bg-amber-500' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center px-6 py-16 font-['Cairo'] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-red-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-[-5%] left-[-5%] w-80 h-80 bg-slate-200 rounded-full blur-3xl opacity-30"></div>

      <div className="w-full max-w-md flex flex-col items-center relative z-10">
        {/* Profile Section */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-red-600 rounded-[2rem] flex items-center justify-center text-4xl shadow-2xl shadow-red-200 border-4 border-white rotate-3">
            ❤️
          </div>
          <div className="absolute -bottom-2 -right-2 bg-emerald-500 w-6 h-6 rounded-full border-4 border-white"></div>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-2xl font-black text-slate-900 mb-2">R Love Link</h1>
          <p className="text-slate-500 font-bold text-sm">حكايتكم تستاهل ذكرى تعيش للأبد ✨</p>
        </div>

        {/* Links Stack */}
        <div className="w-full space-y-4">
          {links.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target={link.url.startsWith('http') ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className="group flex items-center gap-4 bg-white/80 backdrop-blur-xl border border-slate-200 p-4 rounded-[1.8rem] transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-slate-200/50 hover:border-red-200 active:scale-95"
            >
              <div className={`w-12 h-12 ${link.color} rounded-2xl flex items-center justify-center text-xl text-white shadow-lg group-hover:rotate-6 transition-transform`}>
                {link.icon}
              </div>
              <span className="flex-1 text-right font-black text-slate-800 group-hover:text-red-600 transition-colors">
                {link.title}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-300 group-hover:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </a>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-[10px] font-black text-slate-400 tracking-[0.3em] uppercase">Powered by R Love Link</p>
        </div>
      </div>
    </div>
  );
};

export default LinksPage;
