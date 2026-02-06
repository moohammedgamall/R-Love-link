
import { createClient } from '@supabase/supabase-js';
import { AdminConfig, UserPageData } from '../types';

const SUPABASE_URL: string = 'https://ppexeseppccfvfgzyree.supabase.co';
const SUPABASE_KEY: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwZXhlc2VwcGNjZnZmZ3p5cmVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyOTYyOTYsImV4cCI6MjA4NTg3MjI5Nn0.TaIvxn2ifbyAMC5jJlHixCOG5QeOQzCjUv5MDuob2R4';

const isSupabaseEnabled = SUPABASE_URL !== '' && SUPABASE_KEY !== '' && !SUPABASE_URL.includes('your-project');
const supabase = isSupabaseEnabled ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;

const DB_KEY = 'heartlink_final_storage_v1';

const INITIAL_DATA: AdminConfig = {
  adminPass: 'Mmadmin890890',
  users: [
    {
      id: 'demo-valentine',
      targetName: 'هدية عيد الحب',
      password: 'love',
      startDate: '2024-02-14T10:00:00Z',
      songUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      images: ['https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80'],
      bottomMessage: 'النموذج الأول لصفحاتنا الاحترافية.'
    },
    {
      id: 'demo-birthday',
      targetName: 'عيد ميلاد سعيد',
      password: 'cake',
      startDate: new Date().toISOString(),
      songUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      images: ['https://images.unsplash.com/photo-1530103862676-fa8c9d34bb34?auto=format&fit=crop&w=800&q=80'],
      bottomMessage: 'فاجئهم بصفحة خاصة مليانة ذكريات.'
    }
  ],
  landing: {
    heroTitle: 'حكايتكم تستاهل',
    heroSubtitle: 'ذكرى تعيش للأبد..',
    heroCta: 'حتى لو عايز تصالح حبيبتك',
    steps: [
      { title: 'اختار فكرتك', desc: 'سواء من النماذج الجاهزة أو فكرة جديدة في دماغك.', icon: '💡' },
      { title: 'ابعت فكرتك', desc: 'هنصممها في أسرع وقت ممكن وبأعلى جودة تنفيذ.', icon: '🪄' },
      { title: 'استلم هديتك', desc: 'هنبعتلك رابط الهديّة أو التطبيق الخاص بيك.', icon: '🎁' },
    ],
    examples: [
      { title: 'نموذج عيد الحب الاحترافي', pass: 'love', color: 'bg-red-600', icon: '❤️', showPass: true },
      { title: 'نموذج عيد ميلاد مميز', pass: 'cake', color: 'bg-amber-500', icon: '🎂', showPass: true },
    ]
  }
};

export const dbAPI = {
  mergeUsers(localUsers: UserPageData[], remoteUsers: UserPageData[]): UserPageData[] {
    const userMap = new Map<string, UserPageData>();
    INITIAL_DATA.users.forEach(u => userMap.set(u.id, u));
    localUsers.forEach(u => userMap.set(u.id, u));
    remoteUsers.forEach(u => userMap.set(u.id, u));
    return Array.from(userMap.values());
  },

  async getConfig(): Promise<AdminConfig> {
    let currentConfig = { ...INITIAL_DATA };
    const local = localStorage.getItem(DB_KEY);
    let localUsers: UserPageData[] = [];
    
    if (local) {
      try {
        const parsed = JSON.parse(local);
        currentConfig.landing = parsed.landing || currentConfig.landing;
        currentConfig.adminPass = parsed.adminPass || currentConfig.adminPass;
        localUsers = parsed.users || [];
      } catch (e) { console.error(e); }
    }

    let remoteUsers: UserPageData[] = [];
    if (supabase) {
      try {
        const { data: configData } = await supabase.from('site_config').select('*').maybeSingle();
        const { data: usersData } = await supabase.from('users_pages').select('*');

        if (configData) {
          currentConfig.adminPass = configData.admin_pass;
          currentConfig.landing = configData.landing_data;
        }

        if (usersData) {
          remoteUsers = usersData.map((u: any) => ({
            id: u.id,
            targetName: u.target_name,
            password: u.password,
            startDate: u.start_date,
            songUrl: u.song_url,
            images: u.images || [],
            bottomMessage: u.bottom_message
          }));
        }
      } catch (e) { console.error("Supabase Fetch Error:", e); }
    }

    currentConfig.users = this.mergeUsers(localUsers, remoteUsers);
    localStorage.setItem(DB_KEY, JSON.stringify(currentConfig));
    return currentConfig;
  },

  async saveConfig(config: AdminConfig): Promise<boolean> {
    localStorage.setItem(DB_KEY, JSON.stringify(config));

    if (supabase) {
      try {
        // 1. تحديث الإعدادات العامة
        await supabase.from('site_config').upsert({ 
          id: 1, 
          admin_pass: config.adminPass, 
          landing_data: config.landing 
        });
        
        // 2. تحديث كافة العملاء دفعة واحدة (أكثر كفاءة)
        const realUsers = config.users.filter(u => !u.id.startsWith('demo-')).map(u => ({
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
        
        // 3. حذف المستخدمين الذين تم حذفهم من القائمة المحلية (اختياري، يفضل الإبقاء عليهم في السحاب كأرشيف)
      } catch (e) { console.error("Supabase Save Error:", e); }
    }
    return true;
  },

  async authenticateUser(pass: string): Promise<UserPageData | null> {
    const config = await this.getConfig();
    return config.users.find(u => u.password === pass) || null;
  },

  async authenticateAdmin(pass: string): Promise<boolean> {
    const config = await this.getConfig();
    return config.adminPass === pass;
  }
};
