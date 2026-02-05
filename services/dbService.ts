
import { createClient } from '@supabase/supabase-js';
import { AdminConfig, UserPageData } from '../types';

/**
 * ⚠️ تم تحديث الإعدادات بنجاح:
 * تم وضع الرابط والمفتاح الخاص بمشروعك.
 */
const SUPABASE_URL: string = 'https://ppexeseppccfvfgzyree.supabase.co';
const SUPABASE_KEY: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwZXhlc2VwcGNjZnZmZ3p5cmVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyOTYyOTYsImV4cCI6MjA4NTg3MjI5Nn0.TaIvxn2ifbyAMC5jJlHixCOG5QeOQzCjUv5MDuob2R4';

// التحقق من أن المفاتيح تم إدخالها بشكل صحيح
const isSupabaseEnabled = SUPABASE_URL !== '' && SUPABASE_KEY !== '' && !SUPABASE_URL.includes('your-project');

const supabase = isSupabaseEnabled ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;

if (!isSupabaseEnabled) {
  console.warn("⚠️ تنبيه: لم يتم ربط Supabase بشكل كامل. الموقع يعمل حالياً بنمط التخزين المحلي (LocalStorage).");
} else {
  console.log("✅ تم ربط Supabase بنجاح! البيانات الآن تُخزن سحابياً على مشروعك الخاص.");
}

const DB_KEY = 'r_love_platform_db';

const INITIAL_DATA: AdminConfig = {
  adminPass: 'admin123',
  users: [
    {
      id: 'demo-1',
      targetName: 'تجربة حية',
      password: '1/10',
      startDate: new Date().toISOString(),
      songUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      images: [
        'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80'
      ],
      bottomMessage: 'هذا نموذج لما يمكننا تنفيذه لك ولشريك حياتك بكل حب وإتقان.'
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
      { title: 'هدية عيد الحب (تجربة)', pass: '1/10', color: 'bg-red-500', icon: '❤️' },
    ]
  }
};

export const dbAPI = {
  delay: (ms = 500) => new Promise(res => setTimeout(res, ms)),

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
        console.error("Supabase Fetch Error:", e);
      }
    }

    const local = localStorage.getItem(DB_KEY);
    return local ? JSON.parse(local) : INITIAL_DATA;
  },

  async saveConfig(config: AdminConfig): Promise<boolean> {
    if (supabase) {
      try {
        const { error: configError } = await supabase.from('site_config').upsert({
          id: 1,
          admin_pass: config.adminPass,
          landing_data: config.landing
        });

        if (configError) throw configError;

        for (const user of config.users) {
          if (user.id.includes('demo')) continue;

          await supabase.from('users_pages').upsert({
            id: user.id,
            target_name: user.targetName,
            password: user.password,
            start_date: user.startDate,
            song_url: user.songUrl,
            images: user.images,
            bottom_message: user.bottomMessage
          });
        }
        return true;
      } catch (e) {
        console.error('Supabase Save Error:', e);
      }
    }

    try {
      localStorage.setItem(DB_KEY, JSON.stringify(config));
      return true;
    } catch (e) {
      return false;
    }
  },

  async authenticateUser(pass: string): Promise<UserPageData | null> {
    if (supabase) {
      const { data, error } = await supabase
        .from('users_pages')
        .select('*')
        .eq('password', pass)
        .maybeSingle();
      
      if (data && !error) {
        return {
          id: data.id,
          targetName: data.target_name,
          password: data.password,
          startDate: data.start_date,
          songUrl: data.song_url,
          images: data.images || [],
          bottomMessage: data.bottom_message
        };
      }
    }

    const config = await this.getConfig();
    return config.users.find(u => u.password === pass) || null;
  },

  async authenticateAdmin(pass: string): Promise<boolean> {
    const config = await this.getConfig();
    return config.adminPass === pass;
  }
};
