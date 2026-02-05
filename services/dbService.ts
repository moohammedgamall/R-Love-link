
import { createClient } from '@supabase/supabase-js';
import { AdminConfig, UserPageData } from '../types';

const SUPABASE_URL: string = 'https://ppexeseppccfvfgzyree.supabase.co';
const SUPABASE_KEY: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwZXhlc2VwcGNjZnZmZ3p5cmVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyOTYyOTYsImV4cCI6MjA4NTg3MjI5Nn0.TaIvxn2ifbyAMC5jJlHixCOG5QeOQzCjUv5MDuob2R4';

const isSupabaseEnabled = SUPABASE_URL !== '' && SUPABASE_KEY !== '' && !SUPABASE_URL.includes('your-project');
const supabase = isSupabaseEnabled ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;

const DB_KEY = 'r_love_platform_db';

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
    },
    {
      id: 'demo-grad',
      targetName: 'احتفال التخرج',
      password: 'grad',
      startDate: '2024-06-15T09:00:00Z',
      songUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      images: ['https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80'],
      bottomMessage: 'فخورين بيك وبكل اللي وصلتله! 🎓'
    },
    {
      id: 'demo-anniversary',
      targetName: 'ذكرى زواجنا',
      password: 'ever',
      startDate: '2020-10-10T18:00:00Z',
      songUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
      images: ['https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80'],
      bottomMessage: 'أجمل سنين عمري كانت معاك. ❤️'
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
      { title: 'نموذج حفل تخرج', pass: 'grad', color: 'bg-blue-600', icon: '🎓', showPass: true },
      { title: 'نموذج ذكرى زواج فخم', pass: 'ever', color: 'bg-indigo-600', icon: '💍', showPass: true },
    ]
  }
};

export const dbAPI = {
  async getConfig(): Promise<AdminConfig> {
    if (supabase) {
      try {
        const { data: configData, error: configError } = await supabase.from('site_config').select('*').single();
        const { data: usersData, error: usersError } = await supabase.from('users_pages').select('*');

        if (configData && !configError) {
          const mappedUsers = (usersData || []).map((u: any) => ({
            id: u.id,
            targetName: u.target_name,
            password: u.password,
            startDate: u.start_date,
            songUrl: u.song_url,
            images: u.images || [],
            bottomMessage: u.bottom_message
          }));

          return {
            adminPass: configData.admin_pass,
            landing: configData.landing_data,
            users: mappedUsers
          };
        }
      } catch (e) {
        console.error("Supabase Error:", e);
      }
    }
    const local = localStorage.getItem(DB_KEY);
    return local ? JSON.parse(local) : INITIAL_DATA;
  },

  async saveConfig(config: AdminConfig): Promise<boolean> {
    if (supabase) {
      try {
        await supabase.from('site_config').upsert({ id: 1, admin_pass: config.adminPass, landing_data: config.landing });
        for (const user of config.users) {
          if (user.id.startsWith('demo-')) continue;
          await supabase.from('users_pages').upsert({
            id: user.id, target_name: user.targetName, password: user.password,
            start_date: user.startDate, song_url: user.songUrl, images: user.images,
            bottom_message: user.bottomMessage
          });
        }
        return true;
      } catch (e) { console.error('Save Error:', e); }
    }
    localStorage.setItem(DB_KEY, JSON.stringify(config));
    return true;
  },

  async authenticateUser(pass: string): Promise<UserPageData | null> {
    const config = await this.getConfig();
    const user = config.users.find(u => u.password === pass);
    if (user) return user;

    if (supabase) {
      const { data } = await supabase.from('users_pages').select('*').eq('password', pass).maybeSingle();
      if (data) return {
        id: data.id, targetName: data.target_name, password: data.password,
        startDate: data.start_date, songUrl: data.song_url, images: data.images || [],
        bottomMessage: data.bottom_message
      };
    }
    return null;
  },

  async authenticateAdmin(pass: string): Promise<boolean> {
    const config = await this.getConfig();
    return config.adminPass === pass;
  }
};
