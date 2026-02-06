
import React from 'react';
import { ServiceCard as IServiceCard } from '../types';
import { Sparkles, Gift, Wand2, ShieldCheck } from 'lucide-react';

const services: IServiceCard[] = [
  {
    title: 'صفحات ذكريات',
    description: 'نوثق أجمل لحظاتكم في صفحة إلكترونية خاصة بكلمة سر وموسيقى تحبونها.',
    icon: '✨',
    color: 'bg-rose-50 text-rose-600',
  },
  {
    title: 'هدايا تفاعلية',
    description: 'أفكار مبتكرة للهدايا الرقمية التي تفاجئ أحباءك بطريقة لم يتوقعوها.',
    icon: '🎁',
    color: 'bg-slate-50 text-slate-900',
  },
  {
    title: 'تصميم مخصص',
    description: 'عندك فكرة في خيالك؟ بنحولها لواقع إلكتروني ملموس ومبهر.',
    icon: '🪄',
    color: 'bg-rose-50 text-rose-600',
  },
  {
    title: 'دعم وخصوصية',
    description: 'بياناتك وذكرياتك محفوظة بأعلى درجات الأمان والخصوصية التامة.',
    icon: '🔒',
    color: 'bg-slate-50 text-slate-900',
  },
];

const Services: React.FC = () => {
  const renderIcon = (iconStr: string) => {
    const props = { size: 30, strokeWidth: 2.5 };
    switch (iconStr) {
      case '✨': return <Sparkles {...props} />;
      case '🎁': return <Gift {...props} />;
      case '🪄': return <Wand2 {...props} />;
      case '🔒': return <ShieldCheck {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  return (
    <section id="services" className="py-12">
      <div className="max-w-xl mx-auto px-4">
        <div className="text-center mb-12" dir="rtl">
          <h2 className="text-rose-600 font-black tracking-widest uppercase text-[10px] mb-2">خدماتنا الإبداعية</h2>
          <h3 className="text-3xl font-black text-slate-900 tracking-tight">كيف نصنع التغيير؟</h3>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {services.map((svc, idx) => (
            <div 
              key={idx} 
              className="group bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-rose-200 transition-all duration-500 border border-slate-100 text-right"
              dir="rtl"
            >
              <div className={`w-14 h-14 ${svc.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                {renderIcon(svc.icon)}
              </div>
              <h4 className="text-xl font-black text-slate-900 mb-3">{svc.title}</h4>
              <p className="text-slate-500 text-sm font-bold leading-relaxed">
                {svc.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
