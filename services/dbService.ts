
import { createClient } from '@supabase/supabase-js';
import { AdminConfig, UserPageData } from '../types';

const SUPABASE_URL: string = 'https://ppexeseppccfvfgzyree.supabase.co';
const SUPABASE_KEY: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwZXhlc2VwcGNjZnZmZ3p5cmVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyOTYyOTYsImV4cCI6MjA4NTg3MjI5Nn0.TaIvxn2ifbyAMC5jJlHixCOG5QeOQzCjUv5MDuob2R4';

const isSupabaseEnabled = SUPABASE_URL !== '' && SUPABASE_KEY !== '' && !SUPABASE_URL.includes('your-project');
const supabase = isSupabaseEnabled ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;

const DB_KEY = 'heartlink_v5_global';

const INITIAL_DATA: AdminConfig = {
  adminPass: 'Mmadmin890890',
  users: [
    {
      id: 'demo-valentine',
      targetName: 'نموذج عيد الحب',
      password: 'love',
      startDate: '2024-02-14T10:00:00Z',
      songUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      images: ['https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80'],
      bottomMessage: 'النموذج الأول لصفحاتنا الاحترافية.'
    }
  ],
  landing: {
    heroTitle: 'حكايتكم تستاهل',
    heroSubtitle: 'ذكرى تعيش للأبد..',
    heroCta: 'ابدأ تصميم هديتك الآن',
    steps: [
      { title: 'اختار فكرتك', desc: 'سواء من النماذج الجاهزة أو فكرة جديدة في دماغك.', icon: '💡' },
      { title: 'ابعت فكرتك', desc: 'هنصممها في أسرع وقت ممكن وبأعلى جودة تنفيذ.', icon: '🪄' },
      { title: 'استلم هديتك', desc: 'هنبعتلك رابط الهديّة أو التطبيق الخاص بيك.', icon: '🎁' },
    ],
    examples: [
      { title: 'نموذج رومانسي احترافي', pass: 'love', color: 'bg-red-600', icon: '❤️', showPass: true }
    ]
  }
};

export const dbAPI = {
  async getConfig(): Promise<AdminConfig> {
    let config = { ...INITIAL_DATA };
    
    // 1. محاولة الجلب من Supabase أولاً كونه المصدر الحقيقي للبيانات المشتركة
    if (supabase) {
      try {
        const { data: configData, error: cfgError } = await supabase.from('site_config').select('*').maybeSingle();
        const { data: usersData, error: usrError } = await supabase.from('users_pages').select('*').order('created_at', { ascending: false });

        if (configData) {
          config.adminPass = configData.admin_pass;
          config.landing = configData.landing_data;
        }

        if (usersData && usersData.length > 0) {
          const remoteUsers: UserPageData[] = usersData.map((u: any) => ({
            id: u.id,
            targetName: u.target_name,
            password: u.password,
            startDate: u.start_date,
            songUrl: u.song_url,
            images: u.images || [],
            bottomMessage: u.bottom_message
          }));
          
          // دمج بيانات الديمو مع البيانات الحقيقية
          config.users = [
            ...INITIAL_DATA.users,
            ...remoteUsers.filter(ru => !INITIAL_DATA.users.find(du => du.id === ru.id))
          ];
          
          // تحديث الذاكرة المحلية للمتصفح (لتسريع التحميل مستقبلاً)
          localStorage.setItem(DB_KEY, JSON.stringify(config));
          return config;
        }
      } catch (e) {
        console.error("Supabase Error, falling back to local storage:", e);
      }
    }

    // 2. إذا فشل السحاب أو كان غير متاح، نستخدم الذاكرة المحلية
    const saved = localStorage.getItem(DB_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed) return parsed;
      } catch (e) {}
    }

    return config;
  },

  async saveConfig(config: AdminConfig): Promise<boolean> {
    // حفظ محلي أولاً
    localStorage.setItem(DB_KEY, JSON.stringify(config));

    if (!supabase) return true;

    try {
      // رفع الإعدادات
      await supabase.from('site_config').upsert({ 
        id: 1, 
        admin_pass: config.adminPass, 
        landing_data: config.landing 
      });
      
      // استخراج العملاء الحقيقيين (ليس الديمو)
      const realUsers = config.users
        .filter(u => !u.id.startsWith('demo-'))
        .map(u => ({
          id: u.id,
          target_name: u.targetName,
          password: u.password,
          start_date: u.startDate,
          song_url: u.songUrl,
          images: u.images,
          bottom_message: u.bottomMessage
        }));

      if (realUsers.length > 0) {
        const { error } = await supabase.from('users_pages').upsert(realUsers);
        if (error) throw error;
      }
      return true;
    } catch (e) { 
      console.error("Save Error:", e); 
      return false;
    }
  },

  async deleteUser(id: string): Promise<boolean> {
    if (supabase && !id.startsWith('demo-')) {
      try {
        const { error } = await supabase.from('users_pages').delete().eq('id', id);
        if (error) throw error;
      } catch (e) {
        return false;
      }
    }
    return true;
  },

  async authenticateUser(pass: string | null): Promise<UserPageData | null> {
    if (!pass) return null;
    const config = await this.getConfig();
    return config.users.find(u => u.password.trim() === pass.trim()) || null;
  },

  async authenticateAdmin(pass: string | null): Promise<boolean> {
    if (!pass) return false;
    const config = await this.getConfig();
    return config.adminPass.trim() === pass.trim();
  }
};
