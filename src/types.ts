export type LinkType = 'standard' | 'header' | 'social' | 'contact' | 'embed' | 'donation';

export type ButtonStyle = 'pill' | 'rounded' | 'sharp' | 'shadow3d' | 'glass' | 'outline' | 'gradient';

export type FontChoice = 'Plus Jakarta Sans' | 'Inter' | 'Outfit' | 'Poppins' | 'Playfair Display' | 'Space Grotesk';

export interface SocialLink {
  id: string;
  platform: 'instagram' | 'tiktok' | 'youtube' | 'whatsapp' | 'twitter' | 'linkedin' | 'github' | 'spotify' | 'discord' | 'email' | 'telegram' | 'facebook';
  url: string;
  enabled: boolean;
}

export interface BioLink {
  id: string;
  type: LinkType;
  title: string;
  subtitle?: string;
  url: string;
  iconName?: string;
  thumbnailUrl?: string;
  highlight?: boolean; // Highlight badge or glowing animation
  highlightText?: string;
  animation?: 'none' | 'pulse' | 'bounce' | 'shake' | 'glow';
  enabled: boolean;
  clicks: number;
  createdAt: number;
  category?: string;
  pinned?: boolean;
  // Specific metadata
  customClass?: string;
  embedType?: 'youtube' | 'spotify';
}

export interface ProfileTheme {
  id: string;
  name: string;
  badge?: string;
  bgType: 'solid' | 'gradient' | 'mesh' | 'pattern' | 'image';
  bgColor: string;
  bgGradient?: string;
  bgImage?: string;
  textColor: string;
  bioColor: string;
  cardBg: string;
  cardText: string;
  cardBorder: string;
  cardHoverBg: string;
  buttonStyle: ButtonStyle;
  fontFamily: FontChoice;
  avatarRing: string;
  shadowStyle: 'none' | 'soft' | 'hard' | 'glow';
  accentColor: string;
}

export interface UserProfile {
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  verified: boolean;
  location?: string;
  statusBadge?: string;
  socials: SocialLink[];
  theme: ProfileTheme;
}

export interface ClickEvent {
  id: string;
  linkId: string;
  linkTitle: string;
  timestamp: number;
  referrer: string; // e.g., 'Instagram', 'TikTok', 'WhatsApp', 'Direct', 'Google'
  device: 'Mobile' | 'Desktop' | 'Tablet';
  browser: string;
  country: string;
  city: string;
}

export interface PageViewEvent {
  id: string;
  timestamp: number;
  referrer: string;
  device: 'Mobile' | 'Desktop' | 'Tablet';
  country: string;
}

export interface AnalyticsStats {
  totalViews: number;
  totalClicks: number;
  activeNow: number;
  clicks: ClickEvent[];
  views: PageViewEvent[];
}

export interface Workspace {
  id: string;
  userId?: string;
  name: string;
  username: string;
  icon?: string;
  profile: UserProfile;
  links: BioLink[];
  analytics: AnalyticsStats;
  createdAt: number;
  updatedAt: number;
}

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface RegisteredUserRecord {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  firstLoginAt: number;
  lastLoginAt: number;
  workspaceCount?: number;
}
