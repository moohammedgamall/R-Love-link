
import React, { useState } from 'react';
import { dbAPI } from '../services/dbService';
import { AdminConfig, UserPageData, LandingContent } from '../types';
import { Copy, Check, ExternalLink, Image as ImageIcon, Video, Music, Link as LinkIcon, Trash2, Plus } from 'lucide-react';

interface Props {
  config: AdminConfig;
  setConfig: React.Dispatch<React.SetStateAction<AdminConfig | null>>;
  onLogout: () => void;
}

const AdminDashboard: React.FC<Props> = ({ config, setConfig, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'users' | 'content' | 'settings'>('users');
  const [isSaving, setIsSaving] = useState(false);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const [mediaUrlInput, setMediaUrlInput] = useState({ type: 'image', url: '' });
  
  const [editingUser, setEditingUser] = useState<Partial<UserPageData>>({
    id: '', targetName: '', password: '', startDate: '', songUrl: '', images: [], videos: [], bottomMessage: ''
  });
  const [landingContent, setLandingContent] = useState<LandingContent>(config.landing);
  const [newAdminPass, setNewAdminPass] = useState(config.adminPass);

  const copyToClipboard = (pass: string) => {
    const url = `${window.location.origin}/v/${pass}`;
    navigator.clipboard.writeText(url);
    setCopyStatus(pass);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  const saveToDB = async (newConfig: AdminConfig) => {
    setIsSaving(true);
    setConfig(newConfig);
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

  // Fixed handleFileUpload to explicitly type the files as File[] to prevent 'unknown' property access errors
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video' | 'audio') => {
    if (e.target.files && e.target.files[0]) {
      const files = Array.from(e.target.files) as File[];
      for (const file of files) {
        if (type === 'video' && file.size > 15 * 1024 * 1024) {
          alert('الفيديو كبير جداً. يفضل استخدام رابط لضمان السرعة.');
          continue;
        }
        const base64 = await fileToBase64(file);
        if (type === 'image') setEditingUser(prev => ({ ...prev, images: [...(prev.images || []), base64] }));
        if (type === 'video') setEditingUser(prev => ({ ...prev, videos: [...(prev.videos || []), base64] }));
        if (type === 'audio') setEditingUser(prev => ({ ...prev, songUrl: base64 }));
      }
    }
    e.target.value = '';
  };

  const addMediaViaUrl = () => {
    if (!mediaUrlInput.url.trim()) return;
    const url = mediaUrlInput.url.trim();
    if (mediaUrlInput.type === 'image') setEditingUser(prev => ({ ...prev, images: [...(prev.images || []), url] }));
    if (mediaUrlInput.type === 'video') setEditingUser(prev => ({ ...prev, videos: [...(prev.videos || []), url] }));
    if (mediaUrlInput.type === 'audio') setEditingUser(prev => ({ ...prev, songUrl: url }));
    setMediaUrlInput({ ...mediaUrlInput, url: '' });
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
      videos: editingUser.videos || [],
      bottomMessage: editingUser.bottomMessage || ''
    } as UserPageData;
    
    const newConfig = { ...config, users: [...config.users, user] };
    await saveToDB(newConfig);
    setEditingUser({ id: '', targetName: '', password: '', startDate: '', songUrl: '', images: [], videos: [], bottomMessage: '' });
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
            <div className="lg:col-span-1 bg-slate-900/40 p-6 rounded-[2rem] border border-white/5 max-h-[80vh] overflow-y-auto">
               <h3 className="text-sm font-black text-slate-500 mb-4 uppercase tracking-widest">العملاء ({config.users.length})</h3>
               <div className="space-y-3">
                 {config.users.map(u => (
                   <div key={u.id} className="p-4 bg-slate-950/50 border border-white/5 rounded-2xl flex flex-col gap-3 group hover:border-rose-600/30 transition-all">
                     <div className="flex items-center justify-between w-full">
                        <button onClick={() => deleteUser(u.id)} className="w-8 h-8 rounded-lg bg-rose-600/10 text-rose-500 hover:bg-rose-600 hover:text-white transition-all flex items-center justify-center text-xs">🗑️</button>
                        <div className="text-right">
                          <p className="font-black text-sm">{u.targetName}</p>
                          <p className="text-[10px] text-slate-500 font-mono">ID: {u.password}</p>
                        </div>
                     </div>
                     <div className="flex gap-2">
                        <button 
                          onClick={() => copyToClipboard(u.password)}
                          className={`flex-1 py-2 rounded-xl text-[10px] font-black flex items-center justify-center gap-1.5 transition-all ${copyStatus === u.password ? 'bg-emerald-500 text-white' : 'bg-white/5 hover:bg-white/10 text-slate-400'}`}
                        >
                          {copyStatus === u.password ? <Check size={12} /> : <Copy size={12} />}
                          {copyStatus === u.password ? 'تم النسخ' : 'نسخ الرابط'}
                        </button>
                        <a 
                          href={`/v/${u.password}`} 
                          target="_blank" 
                          className="w-10 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 flex items-center justify-center transition-all"
                        >
                          <ExternalLink size={12} />
                        </a>
                     </div>
                   </div>
                 ))}
               </div>
            </div>

            <div className="lg:col-span-2 bg-slate-900/40 p-8 rounded-[2.5rem] border border-white/5 space-y-8">
              <h2 className="text-2xl font-black flex items-center gap-3">إنشاء تجربة جديدة <span className="text-rose-600 animate-pulse">✨</span></h2>
              
              <div className="grid sm:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-500 uppercase px-2">اسم صاحب الهدية</label>
                   <input placeholder="سارة، أحمد.." className="w-full px-5 py-4 bg-slate-950 border border-white/5 rounded-2xl outline-none focus:border-rose-600 transition-all" value={editingUser.targetName} onChange={e => setEditingUser({...editingUser, targetName: e.target.value})} />
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-500 uppercase px-2">كلمة السر (الرمز)</label>
                   <input placeholder="love2025" className="w-full px-5 py-4 bg-slate-950 border border-white/5 rounded-2xl outline-none focus:border-rose-600 transition-all" value={editingUser.password} onChange={e => setEditingUser({...editingUser, password: e.target.value})} />
                 </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase px-2">تاريخ البداية</label>
                <input type="date" className="w-full px-5 py-4 bg-slate-950 border border-white/5 rounded-2xl outline-none text-slate-400" value={editingUser.startDate?.split('T')[0]} onChange={e => setEditingUser({...editingUser, startDate: e.target.value})} />
              </div>

              {/* Media Section */}
              <div className="space-y-6 bg-slate-950/40 p-6 rounded-3xl border border-white/5">
                <h3 className="text-lg font-black border-r-4 border-rose-600 pr-4">إضافة الوسائط (صور / فيديو / صوت)</h3>
                
                {/* Tabs for Media Type */}
                <div className="flex bg-slate-900 p-1 rounded-xl">
                  {['image', 'video', 'audio'].map(t => (
                    <button 
                      key={t}
                      onClick={() => setMediaUrlInput({...mediaUrlInput, type: t as any})}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${mediaUrlInput.type === t ? 'bg-rose-600 text-white' : 'text-slate-500'}`}
                    >
                      {t === 'image' && <ImageIcon size={14}/>}
                      {t === 'video' && <Video size={14}/>}
                      {t === 'audio' && <Music size={14}/>}
                      {t === 'image' ? 'صور' : t === 'video' ? 'فيديو' : 'صوت'}
                    </button>
                  ))}
                </div>

                {/* Link Input */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <LinkIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input 
                      placeholder={`أضف رابط ${mediaUrlInput.type === 'image' ? 'صورة' : mediaUrlInput.type === 'video' ? 'فيديو' : 'ملف صوتي'}...`}
                      className="w-full pr-12 pl-4 py-4 bg-slate-950 border border-white/5 rounded-2xl outline-none focus:border-rose-600"
                      value={mediaUrlInput.url}
                      onChange={e => setMediaUrlInput({...mediaUrlInput, url: e.target.value})}
                    />
                  </div>
                  <button onClick={addMediaViaUrl} className="bg-rose-600 text-white px-6 rounded-2xl font-black hover:bg-rose-700 active:scale-95 transition-all">
                    <Plus size={20} />
                  </button>
                </div>

                <div className="text-center py-2 text-slate-500 text-xs font-bold">أو قم بالرفع من جهازك:</div>

                <div className="grid grid-cols-3 gap-4">
                  <label className="cursor-pointer bg-slate-900 border border-white/5 p-4 rounded-2xl flex flex-col items-center gap-2 hover:border-rose-600 transition-all">
                    <ImageIcon className="text-rose-500" />
                    <span className="text-[10px] font-black">رفع صور</span>
                    <input type="file" multiple accept="image/*" className="hidden" onChange={e => handleFileUpload(e, 'image')} />
                  </label>
                  <label className="cursor-pointer bg-slate-900 border border-white/5 p-4 rounded-2xl flex flex-col items-center gap-2 hover:border-rose-600 transition-all">
                    <Video className="text-blue-500" />
                    <span className="text-[10px] font-black">رفع فيديو</span>
                    <input type="file" accept="video/*" className="hidden" onChange={e => handleFileUpload(e, 'video')} />
                  </label>
                  <label className="cursor-pointer bg-slate-900 border border-white/5 p-4 rounded-2xl flex flex-col items-center gap-2 hover:border-rose-600 transition-all">
                    <Music className="text-emerald-500" />
                    <span className="text-[10px] font-black">رفع أغنية</span>
                    <input type="file" accept="audio/*" className="hidden" onChange={e => handleFileUpload(e, 'audio')} />
                  </label>
                </div>

                {/* Preview Lists */}
                <div className="space-y-4">
                  {editingUser.songUrl && (
                    <div className="p-4 bg-slate-900 rounded-2xl border border-emerald-500/20 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Music className="text-emerald-500" size={16} />
                        <span className="text-xs font-bold truncate max-w-[150px]">الأغنية مضافة بنجاح</span>
                      </div>
                      <button onClick={() => setEditingUser({...editingUser, songUrl: ''})} className="text-rose-500"><Trash2 size={14}/></button>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {editingUser.images?.map((img, i) => (
                      <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden group">
                        <img src={img} className="w-full h-full object-cover" />
                        <button 
                          onClick={() => setEditingUser({...editingUser, images: editingUser.images?.filter((_, idx) => idx !== i)})}
                          className="absolute inset-0 bg-rose-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    {editingUser.videos?.map((vid, i) => (
                      <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden border border-blue-500 group flex items-center justify-center bg-black">
                        <Video className="text-blue-500" size={20} />
                        <button 
                          onClick={() => setEditingUser({...editingUser, videos: editingUser.videos?.filter((_, idx) => idx !== i)})}
                          className="absolute inset-0 bg-rose-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase px-2">الرسالة النهائية</label>
                <textarea placeholder="رسالة النهاية..." rows={3} className="w-full px-5 py-4 bg-slate-950 border border-white/5 rounded-2xl outline-none resize-none focus:border-rose-600 transition-all" value={editingUser.bottomMessage} onChange={e => setEditingUser({...editingUser, bottomMessage: e.target.value})} />
              </div>
              
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
