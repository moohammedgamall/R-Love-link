
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
  const [newAdminPass, setNewAdminPass] = useState(config.adminPass);

  const saveToDB = async (newConfig: AdminConfig) => {
    setIsSaving(true);
    const success = await dbAPI.saveConfig(newConfig);
    if (success) {
      setConfig(newConfig);
      setIsSaving(false);
      return true;
    } else {
      alert('خطأ في حفظ البيانات في قاعدة البيانات');
      setIsSaving(false);
      return false;
    }
  };

  const handleLandingUpdate = async () => {
    const newConfig = { ...config, landing: landingContent };
    const ok = await saveToDB(newConfig);
    if (ok) alert('تم تحديث محتوى الموقع بنجاح! 🎉');
  };

  const handlePasswordUpdate = async () => {
    if (!newAdminPass.trim()) return alert('الباسورد لا يمكن أن يكون فارغاً');
    const newConfig = { ...config, adminPass: newAdminPass.trim() };
    const ok = await saveToDB(newConfig);
    if (ok) alert('تم تحديث رمز دخول الإدارة! 🔐');
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
    
    const finalDate = editingUser.startDate ? new Date(editingUser.startDate).toISOString() : new Date().toISOString();

    const user = { 
      id: Date.now().toString(),
      targetName: editingUser.targetName.trim(),
      password: editingUser.password.trim(),
      startDate: finalDate,
      songUrl: editingUser.songUrl || '',
      images: editingUser.images || [],
      bottomMessage: editingUser.bottomMessage || ''
    } as UserPageData;
    
    const newConfig = { ...config, users: [...config.users, user] };
    const ok = await saveToDB(newConfig);
    if (ok) {
      setEditingUser({ id: '', targetName: '', password: '', startDate: '', songUrl: '', images: [], bottomMessage: '' });
      alert('تم إضافة العميل بنجاح ومزامنته! ✅');
    }
  };

  const deleteUser = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الصفحة نهائياً؟ ستختفي من السحاب فوراً.')) {
      setIsSaving(true);
      const cloudOk = await dbAPI.deleteUser(id);
      if (cloudOk) {
        const newConfig = { ...config, users: config.users.filter(u => u.id !== id) };
        setConfig(newConfig);
        alert('تم الحذف بنجاح من قاعدة البيانات.');
      }
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-['Cairo'] pb-32 overflow-x-hidden" dir="rtl">
      {isSaving && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[500] flex items-center justify-center">
          <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl border border-slate-800 flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-rose-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="font-black text-rose-500 animate-pulse text-lg">جاري تحديث السحاب...</span>
          </div>
        </div>
      )}

      <nav className="fixed top-0 left-0 right-0 z-[100] bg-slate-950/80 backdrop-blur-2xl border-b border-white/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-rose-600/20 rotate-3">👑</div>
            <div>
              <h1 className="text-xl font-black tracking-tight">لوحة الإدارة</h1>
              <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Cloud Sync Active</p>
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
            <span>📝</span> المحتوى
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'settings' ? 'bg-rose-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
          >
            <span>⚙️</span> الإعدادات
          </button>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {activeTab === 'users' && (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-slate-900/40 p-6 rounded-[2rem] border border-white/5">
                  <h3 className="text-lg font-black mb-6 text-slate-400">قائمة الصفحات السحابية ({config.users.length})</h3>
                  <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                    {config.users.map(u => (
                      <div key={u.id} className="p-4 bg-slate-950/50 border border-white/5 rounded-2xl flex items-center justify-between group hover:border-rose-600/50 transition-all">
                        <button onClick={() => deleteUser(u.id)} className="w-8 h-8 rounded-lg bg-rose-600/10 text-rose-500 flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all">🗑️</button>
                        <div className="text-right">
                          <p className="font-black text-sm">{u.targetName}</p>
                          <p className="text-[10px] text-slate-500">الرمز: {u.password}</p>
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
                    <div className="space-y-2 text-right">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest">اسم المهدى إليه</label>
                      <input 
                        type="text"
                        placeholder="الاسم"
                        className="w-full px-5 py-4 bg-slate-950 border border-white/5 rounded-2xl focus:border-rose-600 outline-none transition-all text-white font-bold"
                        value={editingUser.targetName}
                        onChange={e => setEditingUser({...editingUser, targetName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2 text-right">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest">رمز الدخول (الباسورد)</label>
                      <input 
                        type="text"
                        placeholder="كلمة السر"
                        className="w-full px-5 py-4 bg-slate-950 border border-white/5 rounded-2xl focus:border-rose-600 outline-none transition-all text-white font-bold"
                        value={editingUser.password}
                        onChange={e => setEditingUser({...editingUser, password: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 text-right">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">تاريخ البداية (اختياري)</label>
                    <input 
                      type="date"
                      className="w-full px-5 py-4 bg-slate-950 border border-white/5 rounded-2xl focus:border-rose-600 outline-none transition-all text-white"
                      value={editingUser.startDate?.split('T')[0]}
                      onChange={e => setEditingUser({...editingUser, startDate: e.target.value})}
                    />
                  </div>

                  <div className="space-y-4 text-right">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">الصور</label>
                    <div className="p-10 border-2 border-dashed border-white/10 rounded-[2rem] bg-slate-950/50 text-center space-y-4 hover:border-rose-600/50 transition-all cursor-pointer relative">
                      <input 
                        type="file" multiple accept="image/*" 
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleImageUpload}
                      />
                      <div className="text-4xl">📸</div>
                      <p className="text-sm font-bold text-slate-400">ارفع صور الذكريات</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {editingUser.images?.map((img, i) => (
                        <div key={i} className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-xl border border-white/10 group">
                           <img src={img} className="w-full h-full object-cover" />
                           <button 
                            onClick={() => setEditingUser(prev => ({...prev, images: prev.images?.filter((_, idx) => idx !== i)}))}
                            className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                           >❌</button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 text-right">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">رسالة النهاية</label>
                    <textarea 
                      placeholder="كلمة حلوة تظهر في أسفل الصفحة.." rows={3}
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

          {activeTab === 'content' && (
            <div className="bg-slate-900/40 p-8 rounded-[2.5rem] border border-white/5 space-y-8 max-w-4xl mx-auto">
              <h2 className="text-2xl font-black">تعديل محتوى الصفحة الرئيسية</h2>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2 text-right">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest">العنوان الرئيسي</label>
                  <input 
                    className="w-full px-5 py-4 bg-slate-950 border border-white/5 rounded-2xl focus:border-rose-600 outline-none text-white font-bold"
                    value={landingContent.heroTitle}
                    onChange={e => setLandingContent({...landingContent, heroTitle: e.target.value})}
                  />
                </div>
                <div className="space-y-2 text-right">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest">العنوان الفرعي (المتحرك)</label>
                  <input 
                    className="w-full px-5 py-4 bg-slate-950 border border-white/5 rounded-2xl focus:border-rose-600 outline-none text-white font-bold"
                    value={landingContent.heroSubtitle}
                    onChange={e => setLandingContent({...landingContent, heroSubtitle: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2 text-right">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">نص زر الدعوة (Hero CTA)</label>
                <input 
                  className="w-full px-5 py-4 bg-slate-950 border border-white/5 rounded-2xl focus:border-rose-600 outline-none text-white font-bold"
                  value={landingContent.heroCta}
                  onChange={e => setLandingContent({...landingContent, heroCta: e.target.value})}
                />
              </div>

              <button 
                onClick={handleLandingUpdate}
                className="w-full py-5 bg-emerald-600 text-white rounded-[1.8rem] font-black text-xl hover:bg-emerald-700 transition-all"
              >
                تحديث المحتوى العام 💾
              </button>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-slate-900/40 p-8 rounded-[2.5rem] border border-white/5 space-y-8 max-w-2xl mx-auto text-right">
              <h2 className="text-2xl font-black">إعدادات النظام</h2>
              
              <div className="space-y-4">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">رمز دخول الإدارة الجديد</label>
                <input 
                  type="text"
                  className="w-full px-5 py-4 bg-slate-950 border border-white/5 rounded-2xl focus:border-rose-600 outline-none text-white font-bold text-center text-2xl tracking-[0.2em]"
                  value={newAdminPass}
                  onChange={e => setNewAdminPass(e.target.value)}
                />
                <p className="text-xs text-slate-500 font-bold">هذا الرمز هو الذي تستخدمه للدخول لهذه اللوحة. احفظه جيداً!</p>
              </div>

              <button 
                onClick={handlePasswordUpdate}
                className="w-full py-5 bg-rose-600 text-white rounded-[1.8rem] font-black text-xl hover:bg-rose-700 transition-all shadow-xl shadow-rose-600/20"
              >
                تغيير كلمة السر 🔒
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
