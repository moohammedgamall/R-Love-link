
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
    // نقوم بالتحديث محلياً فوراً
    setConfig(newConfig);
    
    // المزامنة مع السحاب في الخلفية
    const success = await dbAPI.saveConfig(newConfig);
    if (success) {
      const finalConfig = await dbAPI.getConfig();
      setConfig(finalConfig);
    }
    
    setIsSaving(false);
    return true;
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
      // تحسين سرعة الرفع بتقليل حجم الصور برمجياً قد يكون أفضل مستقبلاً، حالياً نحولها لـ Base64
      const base64Images = await Promise.all(files.map(file => fileToBase64(file)));
      setEditingUser(prev => ({ ...prev, images: [...(prev.images || []), ...base64Images] }));
    }
    e.target.value = '';
  };

  const addUser = async () => {
    if (!editingUser.targetName || !editingUser.password) {
      alert('الرجاء إدخال الاسم وكلمة المرور');
      return;
    }
    
    const user = { 
      id: Date.now().toString(),
      targetName: editingUser.targetName.trim(),
      password: editingUser.password.trim(),
      startDate: editingUser.startDate || new Date().toISOString(),
      songUrl: editingUser.songUrl || '',
      images: editingUser.images || [],
      bottomMessage: editingUser.bottomMessage || ''
    } as UserPageData;
    
    const newConfig = { ...config, users: [...config.users, user] };
    await saveToDB(newConfig);
    setEditingUser({ id: '', targetName: '', password: '', startDate: '', songUrl: '', images: [], bottomMessage: '' });
    alert('تم النشر بنجاح! ✅');
  };

  const deleteUser = async (id: string) => {
    if (window.confirm('هل أنت متأكد من الحذف؟')) {
      setIsSaving(true);
      await dbAPI.deleteUser(id);
      const newConfig = { ...config, users: config.users.filter(u => u.id !== id) };
      await dbAPI.saveConfig(newConfig);
      setConfig(newConfig);
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-['Cairo'] pb-32 overflow-x-hidden" dir="rtl">
      {isSaving && (
        <div className="fixed top-4 left-4 bg-emerald-500 text-white px-4 py-2 rounded-full z-[600] flex items-center gap-3 shadow-xl animate-bounce">
          <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
          <span className="text-xs font-black">جاري مزامنة السحاب...</span>
        </div>
      )}

      <nav className="fixed top-0 left-0 right-0 z-[100] bg-slate-950/80 backdrop-blur-2xl border-b border-white/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-rose-600/20 rotate-3">👑</div>
            <h1 className="text-xl font-black tracking-tight">الإدارة</h1>
          </div>
          <button onClick={onLogout} className="px-5 py-2.5 bg-white/5 hover:bg-rose-600 hover:text-white rounded-xl text-sm font-bold border border-white/10 transition-all">خروج</button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-32">
        <div className="flex p-1.5 bg-slate-900/50 rounded-2xl border border-white/5 mb-10 w-full max-w-2xl mx-auto">
          <button onClick={() => setActiveTab('users')} className={`flex-1 py-3 rounded-xl font-bold transition-all ${activeTab === 'users' ? 'bg-rose-600 text-white' : 'text-slate-500'}`}>العملاء</button>
          <button onClick={() => setActiveTab('content')} className={`flex-1 py-3 rounded-xl font-bold transition-all ${activeTab === 'content' ? 'bg-rose-600 text-white' : 'text-slate-500'}`}>المحتوى</button>
          <button onClick={() => setActiveTab('settings')} className={`flex-1 py-3 rounded-xl font-bold transition-all ${activeTab === 'settings' ? 'bg-rose-600 text-white' : 'text-slate-500'}`}>الأمان</button>
        </div>

        {activeTab === 'users' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-slate-900/40 p-6 rounded-[2rem] border border-white/5 max-h-[70vh] overflow-y-auto">
               <h3 className="text-sm font-black text-slate-500 mb-4 uppercase">العملاء ({config.users.length})</h3>
               <div className="space-y-3">
                 {config.users.map(u => (
                   <div key={u.id} className="p-4 bg-slate-950/50 border border-white/5 rounded-2xl flex items-center justify-between">
                     <button onClick={() => deleteUser(u.id)} className="w-8 h-8 rounded-lg bg-rose-600/10 text-rose-500 hover:bg-rose-600 hover:text-white transition-all">🗑️</button>
                     <div className="text-right">
                       <p className="font-black text-sm">{u.targetName}</p>
                       <p className="text-[10px] text-slate-500">الباسورد: {u.password}</p>
                     </div>
                   </div>
                 ))}
               </div>
            </div>

            <div className="lg:col-span-2 bg-slate-900/40 p-8 rounded-[2.5rem] border border-white/5 space-y-8">
              <h2 className="text-2xl font-black">إضافة صفحة جديدة ✨</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                 <input placeholder="اسم العميل (سارة مثلاً)" className="w-full px-5 py-4 bg-slate-950 border border-white/5 rounded-2xl outline-none" value={editingUser.targetName} onChange={e => setEditingUser({...editingUser, targetName: e.target.value})} />
                 <input placeholder="رمز الدخول (الباسورد)" className="w-full px-5 py-4 bg-slate-950 border border-white/5 rounded-2xl outline-none" value={editingUser.password} onChange={e => setEditingUser({...editingUser, password: e.target.value})} />
              </div>
              <input type="date" className="w-full px-5 py-4 bg-slate-950 border border-white/5 rounded-2xl outline-none text-slate-400" value={editingUser.startDate?.split('T')[0]} onChange={e => setEditingUser({...editingUser, startDate: e.target.value})} />
              
              <div className="space-y-4">
                <label className="text-xs font-black text-slate-500">الصور</label>
                <div className="relative p-8 border-2 border-dashed border-white/10 rounded-2xl text-center bg-slate-950/50">
                  <input type="file" multiple accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageUpload} />
                  <p className="text-sm text-slate-500">اضغط هنا لرفع الصور</p>
                </div>
                <div className="flex flex-wrap gap-2">
                   {editingUser.images?.map((img, i) => (
                     <div key={i} className="w-16 h-16 rounded-xl overflow-hidden relative border border-white/10">
                       <img src={img} className="w-full h-full object-cover" />
                       <button onClick={() => setEditingUser({...editingUser, images: editingUser.images?.filter((_, idx) => idx !== i)})} className="absolute inset-0 bg-black/50 text-[10px] flex items-center justify-center">حذف</button>
                     </div>
                   ))}
                </div>
              </div>

              <textarea placeholder="رسالة النهاية..." rows={3} className="w-full px-5 py-4 bg-slate-950 border border-white/5 rounded-2xl outline-none resize-none" value={editingUser.bottomMessage} onChange={e => setEditingUser({...editingUser, bottomMessage: e.target.value})} />
              
              <button onClick={addUser} className="w-full py-5 bg-rose-600 text-white rounded-[1.8rem] font-black text-xl shadow-2xl hover:scale-[1.02] active:scale-95 transition-all">نشر العمل 🚀</button>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="bg-slate-900/40 p-8 rounded-[2.5rem] border border-white/5 space-y-8 max-w-4xl mx-auto">
             <h2 className="text-2xl font-black">المحتوى الرئيسي</h2>
             <div className="space-y-4">
                <input className="w-full px-5 py-4 bg-slate-950 border border-white/5 rounded-2xl outline-none" value={landingContent.heroTitle} onChange={e => setLandingContent({...landingContent, heroTitle: e.target.value})} />
                <input className="w-full px-5 py-4 bg-slate-950 border border-white/5 rounded-2xl outline-none" value={landingContent.heroSubtitle} onChange={e => setLandingContent({...landingContent, heroSubtitle: e.target.value})} />
             </div>
             <button onClick={() => saveToDB({...config, landing: landingContent})} className="w-full py-5 bg-emerald-600 text-white rounded-[1.8rem] font-black text-xl transition-all">حفظ التعديلات 💾</button>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-slate-900/40 p-8 rounded-[2.5rem] border border-white/5 space-y-8 max-w-2xl mx-auto">
             <h2 className="text-2xl font-black">إعدادات الإدارة</h2>
             <input type="text" className="w-full px-5 py-4 bg-slate-950 border border-white/5 rounded-2xl outline-none text-center font-bold" value={newAdminPass} onChange={e => setNewAdminPass(e.target.value)} />
             <button onClick={() => saveToDB({...config, adminPass: newAdminPass})} className="w-full py-5 bg-rose-600 text-white rounded-[1.8rem] font-black text-xl">تغيير الباسورد 🔒</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
