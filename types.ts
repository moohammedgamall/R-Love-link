
export interface UserPageData {
  id: string;
  targetName: string;
  password: string;
  startDate: string;
  songUrl: string;
  images: string[];
  bottomMessage: string;
}

export interface LandingStep {
  title: string;
  desc: string;
  icon: string;
}

export interface LandingExample {
  title: string;
  pass: string;
  color: string;
  icon?: string;
}

export interface LandingContent {
  heroTitle: string;
  heroSubtitle: string;
  heroCta: string;
  steps: LandingStep[];
  examples: LandingExample[];
}

export interface AdminConfig {
  adminPass: string;
  users: UserPageData[];
  landing: LandingContent;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

// Fix: Added missing StatItem interface used in Stats.tsx
export interface StatItem {
  label: string;
  value: string;
  icon: string;
}

// Fix: Added missing ServiceCard interface used in Services.tsx
export interface ServiceCard {
  title: string;
  description: string;
  icon: string;
  color: string;
}
