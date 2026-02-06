
import { createClient } from '@supabase/supabase-js';
import { AdminConfig, UserPageData } from '../types';

const SUPABASE_URL: string = 'https://ppexeseppccfvfgzyree.supabase.co';
const SUPABASE_KEY: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwZXhlc2VwcGNjZnZmZ3p5cmVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyOTYyOTYsImV4cCI6MjA4NTg3MjI5Nn0.TaIvxn2ifbyAMC5jJlHixCOG5QeOQzCjUv5MDuob2R4';

const isSupabaseEnabled = SUPABASE_URL !== '' && SUPABASE_KEY !== '' && !SUPABASE_URL.includes('your-project');
const supabase = isSupabaseEnabled ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;

const DB_KEY = 'heartlink_v7_global';

const INITIAL_DATA: AdminConfig = {
  adminPass: 'Mmadmin890890',
  users: [],
  landing: {
    heroTitle: 'حكايتكم تستاهل',
    heroSubtitle: 'ذكرى تعيش للأبد..',
    heroCta: 'ابدأ تصميم هديتك الآن',
    steps: [
      { title: 'اختار فكرتك', desc: 'سواء من النماذج الجاهزة أو فكرة جديدة في دماغك.', icon: '💡' },
      { title: 'ابعت فكرتك', desc: 'هنصممها في أسرع وقت ممكن وبأعلى جودة تنفيذ.', icon: '🪄' },
      { title: 'استلم هديتك', desc: 'هنبعتلك رابط الهديّة أو التطبيق الخاص بيك.', icon: '🎁' },
    ],
    examples: [] 
  }
};

export const dbAPI = {
  async getConfig(): Promise<AdminConfig> {
    let config = { ...INITIAL_DATA };
    
    if (supabase) {
      try {
        const [configRes, usersRes] = await Promise.all([
          supabase.from('site_config').select('*').maybeSingle(),
          supabase.from('users_pages').select('*').order('created_at', { ascending: false })
        ]);

        if (configRes.data) {
          config.adminPass = configRes.data.admin_pass;
          config.landing = configRes.data.landing_data || config.landing;
        }

        if (usersRes.data) {
          config.users = usersRes.data.map((u: any) => ({
            id: u.id,
            targetName: u.target_name,
            password: u.password,
            startDate: u.start_date,
            songUrl: u.song_url || '',
            images: Array.isArray(u.images) ? u.images : [],
            videos: Array.isArray(u.videos) ? u.videos : [],
            bottomMessage: u.bottom_message || ''
          }));
          
          localStorage.setItem(DB_KEY, JSON.stringify(config));
          return config;
        }
      } catch (e) {
        console.error("Supabase Connection Error:", e);
      }
    }

    const saved = localStorage.getItem(DB_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_DATA,
          ...parsed,
          users: Array.isArray(parsed.users) ? parsed.users : []
        };
      } catch (e) {}
    }

    return config;
  },

  async saveConfig(config: AdminConfig): Promise<boolean> {
    localStorage.setItem(DB_KEY, JSON.stringify(config));
    if (!supabase) return true;

    try {
      // 1. تحديث الإعدادات العامة
      const { error: configErr } = await supabase.from('site_config').upsert({ 
        id: 1, 
        admin_pass: config.adminPass, 
        landing_data: config.landing,
        updated_at: new Date().toISOString()
      });
      if (configErr) throw configErr;
      
      // 2. تحديث صفحات العملاء
      if (config.users.length > 0) {
        const realUsers = config.users.map(u => ({
          id: u.id,
          target_name: u.targetName,
          password: u.password,
          start_date: u.startDate,
          // Fix: Use songUrl from UserPageData interface instead of song_url
          song_url: u.songUrl || '',
          images: Array.isArray(u.images) ? u.images : [],
          videos: Array.isArray(u.videos) ? u.videos : [],
          bottom_message: u.bottomMessage || ''
        }));

        const { error: usersErr } = await supabase.from('users_pages').upsert(realUsers);
        if (usersErr) throw usersErr;
      }
      return true;
    } catch (e) { 
      console.error("Supabase Save Error:", e); 
      return false;
    }
  },

  async deleteUser(id: string): Promise<boolean> {
    if (supabase) {
      try {
        const { error } = await supabase.from('users_pages').delete().eq('id', id);
        if (error) throw error;
      } catch (e) {
        console.error("Delete Error:", e);
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
