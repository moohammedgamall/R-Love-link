
import { createClient } from '@supabase/supabase-js';
import { AdminConfig, UserPageData } from '../types';

const SUPABASE_URL: string = 'https://ppexeseppccfvfgzyree.supabase.co';
const SUPABASE_KEY: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwZXhlc2VwcGNjZnZmZ3p5cmVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyOTYyOTYsImV4cCI6MjA4NTg3MjI5Nn0.TaIvxn2ifbyAMC5jJlHixCOG5QeOQzCjUv5MDuob2R4';

const isSupabaseEnabled = SUPABASE_URL !== '' && SUPABASE_KEY !== '' && !SUPABASE_URL.includes('your-project');
const supabase = isSupabaseEnabled ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;

const DB_KEY = 'heartlink_final_storage_v4';

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
    let currentConfig = { ...INITIAL_DATA };
    
    if (supabase) {
      try {
        const { data: configData } = await supabase.from('site_config').select('*').maybeSingle();
        const { data: usersData } = await supabase.from('users_pages').select('*').order('created_at', { ascending: false });

        if (configData) {
          currentConfig.adminPass = configData.admin_pass;
          currentConfig.landing = configData.landing_data;
        }

        if (usersData) {
          const remoteUsers = usersData.map((u: any) => ({
            id: u.id,
            targetName: u.target_name,
            password: u.password,
            startDate: u.start_date,
            songUrl: u.song_url,
            images: u.images || [],
            bottomMessage: u.bottom_message
          }));
          
          // دمج الديمو مع البيانات السحابية الحقيقية لضمان عدم تكرارها
          const demoUsers = INITIAL_DATA.users;
          currentConfig.users = [...demoUsers, ...remoteUsers.filter(ru => !demoUsers.find(du => du.id === ru.id))];
        }
      } catch (e) { 
        console.error("Supabase Fetch Error:", e);
      }
    }

    localStorage.setItem(DB_KEY, JSON.stringify(currentConfig));
    return currentConfig;
  },

  async saveConfig(config: AdminConfig): Promise<boolean> {
    localStorage.setItem(DB_KEY, JSON.stringify(config));

    if (supabase) {
      try {
        // حفظ الإعدادات
        await supabase.from('site_config').upsert({ 
          id: 1, 
          admin_pass: config.adminPass, 
          landing_data: config.landing 
        });
        
        // حفظ العملاء الجدد أو المحدثين
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
          await supabase.from('users_pages').upsert(realUsers);
        }
      } catch (e) { 
        console.error("Supabase Sync Save Error:", e); 
        return false;
      }
    }
    return true;
  },

  async deleteUser(id: string): Promise<boolean> {
    if (supabase && !id.startsWith('demo-')) {
      try {
        const { error } = await supabase.from('users_pages').delete().eq('id', id);
        if (error) throw error;
      } catch (e) {
        console.error("Supabase Delete Error:", e);
        return false;
      }
    }
    return true;
  },

  async authenticateUser(pass: string | null): Promise<UserPageData | null> {
    if (!pass) return null;
    const config = await this.getConfig();
    const cleanPass = pass.trim();
    return config.users.find(u => u.password.trim() === cleanPass) || null;
  },

  async authenticateAdmin(pass: string | null): Promise<boolean> {
    if (!pass) return false;
    const config = await this.getConfig();
    return config.adminPass.trim() === pass.trim();
  }
};
