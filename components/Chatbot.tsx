
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiChatResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import { SendHorizontal, X, MessageSquareHeart } from 'lucide-react';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'أهلاً بك في R Love! ❤️\nأنا مساعدك الذكي، موجود هنا لمساعدتك في تصميم أفضل هدية رقمية أو توثيق أجمل ذكرياتكم. كيف أقدر أساعدك اليوم؟' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      
      const response = await getGeminiChatResponse(userMsg, history);
      setMessages(prev => [...prev, { role: 'model', text: response || "عذراً، لم أستطع معالجة طلبك حالياً." }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'model', text: "حدث خطأ في الاتصال. يرجى التأكد من إضافة API_KEY في إعدادات Vercel." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-[300] flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[85vw] sm:w-[380px] h-[550px] bg-white rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-slate-100 transition-all transform animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="p-6 bg-white border-b border-slate-50 flex justify-between items-center" dir="rtl">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 bg-rose-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-rose-100">
                  <MessageSquareHeart size={24} />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="text-right">
                <h5 className="font-black text-slate-800 text-sm">مساعد R Love الذكي</h5>
                <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">نشط الآن</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="bg-slate-50 text-slate-400 p-2.5 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-all active:scale-90 flex items-center justify-center"
            >
              <X size={18} strokeWidth={3} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#fcfcfd]" dir="rtl">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-rose-600 text-white rounded-tr-none shadow-rose-100' 
                    : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                }`}>
                  {msg.text.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-pulse">
                <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex gap-1.5">
                  <div className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-5 bg-white border-t border-slate-50 flex gap-3" dir="rtl">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="بفكر في هدية لـ..."
              className="flex-1 bg-slate-50 border-none rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-rose-500 transition-all outline-none text-slate-700 placeholder:text-slate-400"
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-rose-600 text-white w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-rose-700 disabled:opacity-50 transition-all shadow-lg shadow-rose-100 active:scale-90 shrink-0"
            >
              <SendHorizontal size={20} className="rotate-180" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-2xl transition-all duration-500 active:scale-95 group relative overflow-hidden ${
          isOpen ? 'bg-slate-800 rotate-180' : 'bg-rose-600 hover:scale-110'
        }`}
      >
        {!isOpen && (
          <div className="absolute inset-0 bg-gradient-to-tr from-rose-600 to-rose-400 animate-pulse group-hover:animate-none"></div>
        )}
        <span className="relative z-10 flex items-center justify-center">
          {isOpen ? <X size={24} strokeWidth={2.5} /> : <MessageSquareHeart size={24} strokeWidth={2.5} />}
        </span>
      </button>
    </div>
  );
};

export default Chatbot;
