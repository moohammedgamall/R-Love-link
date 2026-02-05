
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-12 bg-white overflow-hidden">
      <div className="max-w-xl mx-auto px-6">
        <div className="flex flex-col items-center gap-12">
          <div className="w-full relative group">
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-[6px] border-white transform rotate-2 group-hover:rotate-0 transition-all duration-700">
              <img 
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1000&q=80" 
                alt="Digital Memories" 
                className="w-full h-auto object-cover aspect-video"
              />
            </div>
          </div>

          <div className="space-y-8 text-right" dir="rtl">
            <div className="space-y-2">
              <h2 className="text-red-600 font-black tracking-[0.2em] uppercase text-[10px]">من نحن؟</h2>
              <h3 className="text-3xl font-black text-slate-900 leading-tight">
                منصة مبنية على <br />
                <span className="text-red-600">الحب والابتكار.</span>
              </h3>
            </div>
            
            <p className="text-lg text-slate-500 leading-relaxed font-semibold">
              تأسست R Love برؤية بسيطة: جعل الهدايا الرقمية والذكريات متاحة ومميزة للجميع. نحن نؤمن بأن ربط القلوب بلمسات إلكترونية ذكية يبني علاقات أقوى وأجمل.
            </p>
            
            <div className="grid gap-4">
              {[
                { t: 'تصميم مخصص لكل عميل', d: 'هديتك تعبر عنك وعن مشاعرك.' },
                { t: 'خصوصية وأمان تام', d: 'بياناتك وذكرياتك في أمان تام.' },
                { t: 'مساعد ذكي يعمل بالذكاء الاصطناعي', d: 'دعم على مدار الساعة.' }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <div className="text-base font-black text-slate-800">{item.t}</div>
                    <div className="text-slate-500 text-xs font-medium">{item.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
