
import React from 'react';
import { StatItem } from '../types';

const stats: StatItem[] = [
  { label: 'قصة حب وثقت', value: '1,500+', icon: '❤️' },
  { label: 'عميل سعيد', value: '950', icon: '👤' },
  { label: 'هدية رقمية', value: '2,200', icon: '🎁' },
  { label: 'فكرة إبداعية', value: '450', icon: '✨' },
];

const Stats: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-xl mx-auto px-2">
        <div className="bg-slate-50/50 rounded-[2.5rem] p-8 grid grid-cols-2 gap-6 border border-slate-100" dir="rtl">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center group">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-2xl text-red-600 text-2xl mb-4 shadow-xl shadow-slate-200 group-hover:bg-red-600 group-hover:text-white group-hover:-translate-y-1 transition-all duration-500">
                {stat.icon}
              </div>
              <div className="text-3xl font-black text-slate-900 mb-1 tracking-tighter">{stat.value}</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
