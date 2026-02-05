
import React from 'react';

const Order: React.FC = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/201091931466', '_blank');
  };

  const handleTikTokClick = () => {
    window.open('https://www.tiktok.com/@mohamed_edge/', '_blank');
  };

  const TikTokIcon = () => (
    <svg viewBox="0 0 24 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Cyan Shadow (Left-Top offset) */}
      <path 
        d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.59-1.01-.01 2.62-.02 5.24-.04 7.86-.03 1.35-.36 2.73-1.12 3.84-1.3 1.96-3.72 2.72-5.94 2.26-1.92-.37-3.56-1.76-4.21-3.6-.58-1.59-.44-3.41.47-4.85.9-1.4 2.5-2.22 4.14-2.26.12 0 .24 0 .36.01V15.5c-1.38.27-2.31 1.65-2.06 3.03.18 1.05.9 1.95 1.9 2.24 1.25.37 2.68-.13 3.32-1.22.42-.69.49-1.52.48-2.32V.02z" 
        fill="#25F4EE"
        transform="translate(-0.8, -0.8)"
      />
      {/* Red Shadow (Right-Bottom offset) */}
      <path 
        d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.59-1.01-.01 2.62-.02 5.24-.04 7.86-.03 1.35-.36 2.73-1.12 3.84-1.3 1.96-3.72 2.72-5.94 2.26-1.92-.37-3.56-1.76-4.21-3.6-.58-1.59-.44-3.41.47-4.85.9-1.4 2.5-2.22 4.14-2.26.12 0 .24 0 .36.01V15.5c-1.38.27-2.31 1.65-2.06 3.03.18 1.05.9 1.95 1.9 2.24 1.25.37 2.68-.13 3.32-1.22.42-.69.49-1.52.48-2.32V.02z" 
        fill="#FE2C55"
        transform="translate(0.8, 0.8)"
      />
      {/* Main Logo (Black) */}
      <path 
        d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.59-1.01-.01 2.62-.02 5.24-.04 7.86-.03 1.35-.36 2.73-1.12 3.84-1.3 1.96-3.72 2.72-5.94 2.26-1.92-.37-3.56-1.76-4.21-3.6-.58-1.59-.44-3.41.47-4.85.9-1.4 2.5-2.22 4.14-2.26.12 0 .24 0 .36.01V15.5c-1.38.27-2.31 1.65-2.06 3.03.18 1.05.9 1.95 1.9 2.24 1.25.37 2.68-.13 3.32-1.22.42-.69.49-1.52.48-2.32V.02z" 
        fill="black" 
      />
    </svg>
  );

  return (
    <div className="space-y-12 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700 text-center font-['Cairo']">
      <div className="space-y-6 px-4">
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 flex items-center justify-center gap-3">
          <span>🚀</span> جاهز تبهرهم؟
        </h2>
        <div className="text-lg sm:text-xl font-bold text-slate-600 leading-relaxed max-w-xs mx-auto">
          اطلب هديتك الرقمية دلوقتي 🎁 <br />
          وسيب الباقي علينا ❤️
        </div>
      </div>

      <div className="space-y-4 max-w-sm mx-auto px-4 w-full">
        <button 
          onClick={handleWhatsAppClick}
          className="w-full py-6 bg-emerald-500 text-white rounded-[2.5rem] font-black text-xl sm:text-2xl flex items-center justify-center gap-4 shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all active:scale-95"
        >
          اطلب عبر الواتساب
          <svg 
            viewBox="0 0 24 24" 
            className="h-8 w-8 sm:h-9 sm:w-9" 
            fill="currentColor" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.393 0 12.03a11.782 11.782 0 001.583 5.96L0 24l6.117-1.604a11.764 11.764 0 005.925 1.585h.005c6.634 0 12.032-5.391 12.036-12.03a11.83 11.83 0 00-3.515-8.417z" />
          </svg>
        </button>

        <button 
          onClick={handleTikTokClick}
          className="w-full py-6 bg-slate-100 text-slate-800 border border-slate-200 rounded-[2.5rem] font-black text-xl sm:text-2xl flex items-center justify-center gap-4 hover:bg-slate-200 transition-all active:scale-95 shadow-sm"
        >
          شاهد باقي أعمالنا
          <div className="w-8 h-8 sm:w-10 sm:h-10">
            <TikTokIcon />
          </div>
        </button>
      </div>

      <div className="pt-12 space-y-4">
        <p className="text-red-600 font-black tracking-widest text-sm uppercase">R LOVE LINK</p>
        <p className="text-[10px] text-slate-400 font-bold uppercase">ALL RIGHTS RESERVED 2026 ©</p>
      </div>
    </div>
  );
};

export default Order;
