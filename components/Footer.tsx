
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-slate-950 text-white pt-20 pb-12">
      <div className="max-w-xl mx-auto px-6" dir="rtl">
        <div className="space-y-12">
          <div className="space-y-6 text-center">
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-red-600 rounded-2xl flex items-center justify-center shadow-2xl">
                ❤️
              </div>
              <span className="text-2xl font-black tracking-tighter">R <span className="text-red-600">Love</span></span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              نحن هنا لتمكين المشاعر عبر التكنولوجيا الإبداعية والذكريات الرقمية. انضم إلينا لتوثيق أجمل لحظاتك.
            </p>
            <div className="flex flex-col items-center gap-2 pt-4">
              <a 
                href="https://wa.me/201091931466" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-400 font-bold hover:text-emerald-300 transition-colors group"
              >
                <span>تواصل معنا عبر الواتساب:</span>
                <span dir="ltr" className="group-hover:underline">+20 109 193 1466</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 text-right">
            <div>
              <h5 className="text-lg font-black mb-6 text-red-500">روابط</h5>
              <ul className="space-y-4 text-slate-400 font-bold text-xs">
                <li><a href="/" className="hover:text-white transition-colors">الرئيسية</a></li>
                <li><a href="/links" className="hover:text-white transition-colors">روابط التواصل</a></li>
                <li><a href="/#examples" className="hover:text-white transition-colors">أعمالنا</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-black mb-6 text-red-500">الإدارة</h5>
              <ul className="space-y-4 text-slate-400 font-bold text-xs">
                <li><a href="/admin" className="hover:text-rose-500 transition-colors flex items-center gap-1 opacity-50 hover:opacity-100"><span>🔒</span> لوحة التحكم</a></li>
                <li><a href="#" className="hover:text-white transition-colors">الخصوصية</a></li>
                <li><a href="https://wa.me/201091931466" className="hover:text-white transition-colors">اتصل بنا</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-16 pt-8 text-center text-slate-500 text-[10px] font-bold">
          <p>© 2026 منصة R Love. جميع الحقوق محفوظة. صُنع بكل حب.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
