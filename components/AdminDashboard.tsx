
import React, { useState, useEffect } from 'react';
import { dbAPI } from '../services/dbService';
import { AdminConfig, UserPageData } from '../types';

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
  };

  const deleteUser = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الصفحة نهائياً؟')) {
      const newConfig = { ...config, users: config.users.filter(u => u.id !== id) };
      await saveToDB(newConfig);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 pt-24 pb-32 text-right" dir="rtl">
      {/* Saving Overlay */}
      {isSaving && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[500] flex items-center justify-center">
          <div className="bg-white p-6 rounded-3xl shadow-2xl flex items-center gap-4">
            <div className="w-6 h-6 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="font-black text-slate-800">جاري حفظ البيانات في السحابة...</span>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-12 flex-row-reverse bg-slate-900/50 p-6 rounded-[2rem] border border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-xl shadow-xl">⚙️</div>
          <h1 className="text-3xl font-black text-white">لوحة التحكم</h1>
        </div>
        <button onClick={onLogout} className="px-6 py-2 bg-red-600/10 text-red-500 border border-red-500/20 rounded-xl hover:bg-red-600 hover:text-white transition-all">
          خروج
        </button>
      </div>

      <div className="flex gap-2 mb-8 bg-slate-900/40 p-2 rounded-2xl border border-slate-800">
        <button 
          onClick={() => setActiveTab('users')}
          className={`flex-1 py-3 rounded-xl font-bold transition-all ${activeTab === 'users' ? 'bg-red-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
        >
          العملاء ({config.users.length})
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          className={`flex-1 py-3 rounded-xl font-bold transition-all ${activeTab === 'settings' ? 'bg-red-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
        >
          أمان النظام
        </button>
      </div>

      <div className="animate-in fade-in duration-500 text-white">
        {activeTab === 'users' && (
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 bg-slate-900/40 p-6 rounded-[2rem] border border-slate-800 h-fit">
              <h2 className="text-xl font-bold mb-6 text-red-400 flex items-center justify-between">
                <span>قاعدة البيانات</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full">Online</span>
              </h2>
              <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
                {config.users.length === 0 && <p className="text-center text-slate-500 py-4">لا توجد بيانات</p>}
                {config.users.map(u => (
                  <div key={u.id} className="p-4 bg-slate-950 rounded-xl flex items-center justify-between border border-slate-800 group hover:border-red-500/30 transition-all">
                    <button onClick={() => deleteUser(u.id)} className="text-red-500 hover:scale-110 transition-transform p-2">🗑️</button>
                    <div className="text-right">
                      <div className="font-bold">{u.targetName}</div>
                      <div className="text-[10px] text-slate-600">ID: {u.id.slice(-5)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8 bg-slate-900/40 p-8 rounded-[2.5rem] border border-slate-800 space-y-6">
               <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
                <span className="text-red-500">➕</span> إضافة سجل جديد
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500">اسم العميل</label>
                  <input 
                    placeholder="مثال: أحمد وسارة" 
                    className="w-full px-4 py-3 bg-slate-950 rounded-xl border border-slate-800 outline-none focus:border-red-500 transition-all"
                    value={editingUser.targetName}
                    onChange={e => setEditingUser({...editingUser, targetName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500">رمز الدخول المخصص</label>
                  <input 
                    placeholder="كلمة السر للعميل" 
                    className="w-full px-4 py-3 bg-slate-950 rounded-xl border border-slate-800 outline-none focus:border-red-500 transition-all"
                    value={editingUser.password}
                    onChange={e => setEditingUser({...editingUser, password: e.target.value})}
                  />
                </div>
              </div>
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
                <p className="text-sm font-bold mb-4">رفع الصور لقاعدة البيانات</p>
                <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="text-xs text-slate-500 file:bg-red-600 file:text-white file:border-none file:px-4 file:py-2 file:rounded-lg file:mr-4 file:cursor-pointer" />
                <div className="flex flex-wrap gap-2 mt-4">
                  {editingUser.images?.map((img, i) => (
                    <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-700 shadow-lg">
                      <img src={img} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={addUser} className="w-full py-4 bg-red-600 rounded-[1.5rem] font-black text-xl mt-6 shadow-xl shadow-red-600/20 active:scale-95 transition-all">تخزين في قاعدة البيانات 💾</button>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-md mx-auto bg-slate-900/40 p-8 rounded-[2.5rem] border border-slate-800 space-y-6">
            <h2 className="text-2xl font-black mb-4 text-white flex items-center gap-2">
              <span className="text-amber-500">🛡️</span> أمان الإدارة
            </h2>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500">كلمة مرور لوحة التحكم الجديدة</label>
              <input 
                type="text" 
                defaultValue={config.adminPass}
                className="w-full px-4 py-3 bg-slate-950 rounded-xl border border-slate-800 focus:border-red-500 outline-none text-white"
              />
            </div>
            <button className="w-full py-3 bg-amber-600 rounded-xl font-bold shadow-lg shadow-amber-600/20">تحديث مفاتيح الأمان</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
