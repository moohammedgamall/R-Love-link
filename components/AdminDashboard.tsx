
import React, { useState } from 'react';
import { dbAPI } from '../services/dbService';
import { AdminConfig, UserPageData, LandingContent } from '../types';

interface Props {
  config: AdminConfig;
  setConfig: React.Dispatch<React.SetStateAction<AdminConfig | null>>;
  onLogout: () => void;
}

const AdminDashboard: React.FC<Props> = ({ config, setConfig, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'users' | 'content' | 'settings'>('users');
  const [isSaving, setIsSaving] = useState(false);
  const [editingUser, setEditingUser] = useState<Partial<UserPageData>>({
    id: '', targetName: '', password: '', startDate: '', songUrl: '', images: [], bottomMessage: ''
  });
  const [landingContent, setLandingContent] = useState<LandingContent>(config.landing);

  const saveToDB = async (newConfig: AdminConfig) => {
    setIsSaving(true);
    const success = await dbAPI.saveConfig(newConfig);
    if (success) {
      setConfig(newConfig);
      setIsSaving(false);
    } else {
      alert('خطأ في حفظ البيانات');
      setIsSaving(false);
    }
  };

  const handleLandingUpdate = async () => {
    const newConfig = { ...config, landing: landingContent };
    await saveToDB(newConfig);
    alert('تم تحديث محتوى الموقع بنجاح! 🎉');
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files) as File[];
      const base64Images = await Promise.all(files.map(file => fileToBase64(file)));
      setEditingUser(prev => ({ ...prev, images: [...(prev.images || []), ...base64Images] }));
    }
    e.target.value = '';
  };

  const addUser = async () => {
    if (!editingUser.targetName || !editingUser.password) {
      alert('الرجاء إدخال الاسم وكلمة المرور على الأقل');
      return;
    }
    const user = { 
      id: Date.now().toString(),
      targetName: editingUser.targetName || '',
      password: editingUser.password || '',
      startDate: editingUser.startDate || new Date().toISOString(),
      songUrl: editingUser.songUrl || '',
      images: editingUser.images || [],
      bottomMessage: editingUser.bottomMessage || ''
    } as UserPageData;
    
    const newConfig = { ...config, users: [...config.users, user] };
    await saveToDB(newConfig);
    setEditingUser({ id: '', targetName: '', password: '', startDate: '', songUrl: '', images: [], bottomMessage: '' });
    alert('تم إضافة العميل بنجاح! ✅');
  };

  const deleteUser = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الصفحة نهائياً؟')) {
      const newConfig = { ...config, users: config.users.filter(u => u.id !== id) };
      await saveToDB(newConfig);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-['Cairo'] pb-32 overflow-x-hidden">
      {/* Saving Overlay */}
      {isSaving && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[500] flex items-center justify-center">
          <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl border border-slate-800 flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-rose-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="font-black text-rose-500 animate-pulse text-lg">جاري المزامنة مع السحابة...</span>
          </div>
        </div>
      )}

      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-slate-950/80 backdrop-blur-2xl border-b border-white/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-rose-600/20 rotate-3">👑</div>
            <div>
              <h1 className="text-xl font-black tracking-tight">لوحة الإدارة</h1>
              <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">System Online</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="px-5 py-2.5 bg-white/5 hover:bg-rose-600 hover:text-white rounded-xl text-sm font-bold border border-white/10 transition-all active:scale-95"
          >
            تسجيل الخروج
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-32">
        {/* Navigation Tabs */}
        <div className="flex p-1.5 bg-slate-900/50 rounded-2xl border border-white/5 mb-10 w-full max-w-2xl mx-auto">
          <button 
            onClick={() => setActiveTab('users')}
            className={`flex-1 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'users' ? 'bg-rose-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
          >
            <span>👥</span> العملاء
          </button>
          <button 
            onClick={() => setActiveTab('content')}
            className={`flex-1 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'content' ? 'bg-rose-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
          >
            <span>📝</span> محتوى الموقع
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'settings' ? 'bg-rose-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
          >
            <span>⚙️</span> الإعدادات
          </button>
        </div>

        {/* Tab Content */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* USERS TAB */}
          {activeTab === 'users' && (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-slate-900/40 p-6 rounded-[2rem] border border-white/5">
                  <h3 className="text-lg font-black mb-6 text-slate-400">قائمة الصفحات ({config.users.length})</h3>
                  <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                    {config.users.map(u => (
                      <div key={u.id} className="p-4 bg-slate-950/50 border border-white/5 rounded-2xl flex items-center justify-between group hover:border-rose-600/50 transition-all">
                        <button onClick={() => deleteUser(u.id)} className="w-8 h-8 rounded-lg bg-rose-600/10 text-rose-500 flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all">🗑️</button>
                        <div className="text-right">
                          <p className="font-black text-sm">{u.targetName}</p>
                          <p className="text-[10px] text-slate-500">كلمة السر: {u.password}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-slate-900/40 p-8 rounded-[2.5rem] border border-white/5 space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-rose-600/10 text-rose-500 rounded-2xl flex items-center justify-center text-2xl">✨</div>
                    <h2 className="text-2xl font-black">إضافة صفحة عميل جديد</h2>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest">اسم الشخص المهدى إليه</label>
                      <input 
                        type="text"
                        placeholder="مثال: سارة محمد"
                        className="w-full px-5 py-4 bg-slate-950 border border-white/5 rounded-2xl focus:border-rose-600 outline-none transition-all text-white font-bold"
                        value={editingUser.targetName}
                        onChange={e => setEditingUser({...editingUser, targetName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest">كلمة سر الدخول (الرمز)</label>
                      <input 
                        type="text"
                        placeholder="مثال: 10/10"
                        className="w-full px-5 py-4 bg-slate-950 border border-white/5 rounded-2xl focus:border-rose-600 outline-none transition-all text-white font-bold"
                        value={editingUser.password}
                        onChange={e => setEditingUser({...editingUser, password: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">تاريخ البداية (اختياري)</label>
                    <input 
                      type="date"
                      className="w-full px-5 py-4 bg-slate-950 border border-white/5 rounded-2xl focus:border-rose-600 outline-none transition-all text-white"
                      value={editingUser.startDate?.split('T')[0]}
                      onChange={e => setEditingUser({...editingUser, startDate: new Date(e.target.value).toISOString()})}
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">صور الذكريات</label>
                    <div className="p-10 border-2 border-dashed border-white/10 rounded-[2rem] bg-slate-950/50 text-center space-y-4 hover:border-rose-600/50 transition-all cursor-pointer relative">
                      <input 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleImageUpload}
                      />
                      <div className="text-4xl">📸</div>
                      <p className="text-sm font-bold text-slate-400">اضغط هنا أو اسحب الصور لرفعها</p>
                      <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">JPEG, PNG - MAX 10 PHOTOS</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {editingUser.images?.map((img, i) => (
                        <div key={i} className="relative w-20 h-20 rounded-2xl overflow-hidden group shadow-xl">
                          <img src={img} className="w-full h-full object-cover" />
                          <button 
                            onClick={() => setEditingUser(prev => ({ ...prev, images: prev.images?.filter((_, idx) => idx !== i) }))}
                            className="absolute top-1 right-1 bg-black/50 text-white rounded-lg p-1 opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">رسالة النهاية (Bottom Message)</label>
                    <textarea 
                      placeholder="كلمة حلوة في نهاية الصفحة.."
                      rows={3}
                      className="w-full px-5 py-4 bg-slate-950 border border-white/5 rounded-2xl focus:border-rose-600 outline-none transition-all text-white font-bold resize-none"
                      value={editingUser.bottomMessage}
                      onChange={e => setEditingUser({...editingUser, bottomMessage: e.target.value})}
                    ></textarea>
                  </div>

                  <button 
                    onClick={addUser}
                    className="w-full py-5 bg-rose-600 text-white rounded-[1.8rem] font-black text-xl shadow-2xl shadow-rose-600/20 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    حفظ ونشر الصفحة 🚀
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* CONTENT TAB */}
          {activeTab === 'content' && (
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="bg-slate-900/40 p-10 rounded-[2.5rem] border border-white/5 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-600/10 text-emerald-500 rounded-2xl flex items-center justify-center text-2xl">📝</div>
                  <h2 className="text-2xl font-black">إدارة نصوص الموقع</h2>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500">العنوان الرئيسي (Hero Title)</label>
                    <input 
                      type="text"
                      className="w-full px-5 py-4 bg-slate-950 border border-white/5 rounded-2xl focus:border-emerald-600 outline-none transition-all text-white font-bold"
                      value={landingContent.heroTitle}
                      onChange={e => setLandingContent({...landingContent, heroTitle: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500">العنوان الفرعي (Hero Subtitle)</label>
                    <input 
                      type="text"
                      className="w-full px-5 py-4 bg-slate-950 border border-white/5 rounded-2xl focus:border-emerald-600 outline-none transition-all text-white font-bold"
                      value={landingContent.heroSubtitle}
                      onChange={e => setLandingContent({...landingContent, heroSubtitle: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500">زر الطلب (CTA Button Text)</label>
                    <input 
                      type="text"
                      className="w-full px-5 py-4 bg-slate-950 border border-white/5 rounded-2xl focus:border-emerald-600 outline-none transition-all text-white font-bold"
                      value={landingContent.heroCta}
                      onChange={e => setLandingContent({...landingContent, heroCta: e.target.value})}
                    />
                  </div>
                </div>

                <button 
                  onClick={handleLandingUpdate}
                  className="w-full py-5 bg-emerald-600 text-white rounded-[1.8rem] font-black text-xl shadow-2xl shadow-emerald-600/20 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  تحديث المحتوى الآن 💾
                </button>
              </div>
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="max-w-xl mx-auto">
              <div className="bg-slate-900/40 p-10 rounded-[2.5rem] border border-white/5 space-y-8 text-center">
                <div className="w-20 h-20 bg-amber-600/10 text-amber-500 rounded-[2rem] flex items-center justify-center text-4xl mx-auto shadow-xl">🛡️</div>
                <div>
                  <h2 className="text-2xl font-black mb-2">أمان النظام</h2>
                  <p className="text-slate-500 text-sm font-bold">تغيير كلمة مرور لوحة التحكم</p>
                </div>

                <div className="space-y-4">
                  <input 
                    type="text"
                    defaultValue={config.adminPass}
                    className="w-full px-5 py-4 bg-slate-950 border border-white/5 rounded-2xl focus:border-amber-600 outline-none transition-all text-white text-center font-mono text-xl tracking-widest"
                  />
                  <p className="text-[10px] text-slate-600 font-bold uppercase">الرجاء الحفاظ على سرية هذا الرمز لضمان أمن الموقع</p>
                </div>

                <button className="w-full py-4 bg-amber-600 text-white rounded-2xl font-black shadow-xl shadow-amber-600/20 active:scale-95 transition-all">
                  تحديث الرمز السري
                </button>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
