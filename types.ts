
export interface UserPageData {
  id: string;
  targetName: string;
  password: string;
  startDate: string;
  songUrl: string;
  images: string[];
  videos?: string[]; 
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
  showPass?: boolean;
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

export interface StatItem {
  label: string;
  value: string;
  icon: string;
}

export interface ServiceCard {
  title: string;
  description: string;
  icon: string;
  color: string;
}
