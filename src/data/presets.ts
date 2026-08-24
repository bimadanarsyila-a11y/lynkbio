import { BioLink, ProfileTheme, UserProfile, ClickEvent, PageViewEvent } from '../types';

export const PRESET_THEMES: ProfileTheme[] = [
  {
    id: 'clean-minimalist',
    name: 'Clean Minimalism',
    badge: 'Featured',
    bgType: 'solid',
    bgColor: '#f8fafc',
    textColor: '#0f172a',
    bioColor: '#64748b',
    cardBg: '#ffffff',
    cardText: '#0f172a',
    cardBorder: '#e2e8f0',
    cardHoverBg: '#f1f5f9',
    buttonStyle: 'rounded',
    fontFamily: 'Plus Jakarta Sans',
    avatarRing: '#0f172a',
    shadowStyle: 'soft',
    accentColor: '#0f172a',
  },
  {
    id: 'midnight-emerald',
    name: 'Midnight Emerald',
    badge: 'Popular',
    bgType: 'gradient',
    bgColor: '#064e3b',
    bgGradient: 'linear-gradient(135deg, #022c22 0%, #064e3b 50%, #0f766e 100%)',
    textColor: '#ffffff',
    bioColor: '#a7f3d0',
    cardBg: 'rgba(255, 255, 255, 0.08)',
    cardText: '#ffffff',
    cardBorder: 'rgba(255, 255, 255, 0.15)',
    cardHoverBg: 'rgba(255, 255, 255, 0.18)',
    buttonStyle: 'rounded',
    fontFamily: 'Plus Jakarta Sans',
    avatarRing: '#10b981',
    shadowStyle: 'soft',
    accentColor: '#10b981',
  },
  {
    id: 'cyber-dark',
    name: 'Cyber Onyx',
    badge: 'Dark',
    bgType: 'gradient',
    bgColor: '#09090b',
    bgGradient: 'linear-gradient(180deg, #09090b 0%, #18181b 100%)',
    textColor: '#fafafa',
    bioColor: '#a1a1aa',
    cardBg: '#18181b',
    cardText: '#fafafa',
    cardBorder: '#27272a',
    cardHoverBg: '#27272a',
    buttonStyle: 'rounded',
    fontFamily: 'Space Grotesk',
    avatarRing: '#6366f1',
    shadowStyle: 'soft',
    accentColor: '#6366f1',
  },
  {
    id: 'sunset-vibes',
    name: 'Sunset Gradient',
    badge: 'Vibrant',
    bgType: 'gradient',
    bgColor: '#f97316',
    bgGradient: 'linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)',
    textColor: '#ffffff',
    bioColor: '#fef08a',
    cardBg: 'rgba(255, 255, 255, 0.15)',
    cardText: '#ffffff',
    cardBorder: 'rgba(255, 255, 255, 0.25)',
    cardHoverBg: 'rgba(255, 255, 255, 0.28)',
    buttonStyle: 'pill',
    fontFamily: 'Outfit',
    avatarRing: '#fbbf24',
    shadowStyle: 'soft',
    accentColor: '#fbbf24',
  },
  {
    id: 'lavender-dream',
    name: 'Lavender Pastel',
    badge: 'Aesthetic',
    bgType: 'gradient',
    bgColor: '#f5f3ff',
    bgGradient: 'linear-gradient(180deg, #ede9fe 0%, #fae8ff 100%)',
    textColor: '#4c1d95',
    bioColor: '#6d28d9',
    cardBg: '#ffffff',
    cardText: '#4c1d95',
    cardBorder: '#ddd6fe',
    cardHoverBg: '#f5f3ff',
    buttonStyle: 'pill',
    fontFamily: 'Poppins',
    avatarRing: '#8b5cf6',
    shadowStyle: 'soft',
    accentColor: '#8b5cf6',
  },
  {
    id: 'warm-terracotta',
    name: 'Warm Terracotta',
    badge: 'Cozy',
    bgType: 'solid',
    bgColor: '#fff7ed',
    textColor: '#7c2d12',
    bioColor: '#9a3412',
    cardBg: '#ffedd5',
    cardText: '#7c2d12',
    cardBorder: '#fed7aa',
    cardHoverBg: '#fed7aa',
    buttonStyle: 'rounded',
    fontFamily: 'Playfair Display',
    avatarRing: '#ea580c',
    shadowStyle: 'soft',
    accentColor: '#ea580c',
  },
  {
    id: 'neo-brutalist',
    name: 'Neo Brutalism',
    badge: 'Trendy',
    bgType: 'solid',
    bgColor: '#fef08a',
    textColor: '#000000',
    bioColor: '#1e293b',
    cardBg: '#ffffff',
    cardText: '#000000',
    cardBorder: '#000000',
    cardHoverBg: '#ffffff',
    buttonStyle: 'shadow3d',
    fontFamily: 'Space Grotesk',
    avatarRing: '#000000',
    shadowStyle: 'hard',
    accentColor: '#000000',
  },
  {
    id: 'ocean-glass',
    name: 'Glass Ocean',
    badge: 'Modern',
    bgType: 'gradient',
    bgColor: '#0f172a',
    bgGradient: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0369a1 100%)',
    textColor: '#ffffff',
    bioColor: '#93c5fd',
    cardBg: 'rgba(255, 255, 255, 0.1)',
    cardText: '#ffffff',
    cardBorder: 'rgba(255, 255, 255, 0.2)',
    cardHoverBg: 'rgba(255, 255, 255, 0.2)',
    buttonStyle: 'glass',
    fontFamily: 'Plus Jakarta Sans',
    avatarRing: '#38bdf8',
    shadowStyle: 'soft',
    accentColor: '#38bdf8',
  }
];

export const INITIAL_PROFILE: UserProfile = {
  username: 'bima.creator',
  displayName: 'Bima Danar Syila',
  bio: '✨ Content Creator & Tech Enthusiast | Berbagi tips teknologi, produktivitas, & tutorial digital.',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  verified: true,
  location: 'Jakarta, Indonesia',
  statusBadge: '🚀 Sedang Buka Project & Endorsement',
  socials: [
    { id: '1', platform: 'instagram', url: 'https://instagram.com/bima.creator', enabled: true },
    { id: '2', platform: 'tiktok', url: 'https://tiktok.com/@bima.creator', enabled: true },
    { id: '3', platform: 'youtube', url: 'https://youtube.com/@bima.creator', enabled: true },
    { id: '4', platform: 'whatsapp', url: 'https://wa.me/6281234567890?text=Halo%20Bima,%20saya%20tertarik%20kerjasama', enabled: true },
    { id: '5', platform: 'linkedin', url: 'https://linkedin.com/in/bimadanar', enabled: true },
    { id: '6', platform: 'spotify', url: 'https://open.spotify.com', enabled: false },
  ],
  theme: PRESET_THEMES[0],
};

export const INITIAL_LINKS: BioLink[] = [
  {
    id: 'header-1',
    type: 'header',
    title: '🔥 Tautan Utama & Rekomendasi',
    url: '',
    enabled: true,
    clicks: 0,
    createdAt: Date.now() - 3600000 * 24 * 7,
  },
  {
    id: 'link-1',
    type: 'standard',
    title: '🎥 Video Terbaru: 10 Tools AI Gratis 2026',
    subtitle: 'Tonton tutorial lengkap di YouTube',
    url: 'https://youtube.com',
    iconName: 'Youtube',
    highlight: true,
    highlightText: 'BARU!',
    animation: 'pulse',
    enabled: true,
    clicks: 482,
    createdAt: Date.now() - 3600000 * 24 * 5,
    category: 'Konten',
    pinned: true,
  },
  {
    id: 'link-2',
    type: 'contact',
    title: '💬 Chat WhatsApp (Konsultasi & Bisnis)',
    subtitle: 'Respon cepat untuk kolaborasi & sponsorship',
    url: 'https://wa.me/6281234567890?text=Halo%20Bima,%20saya%20ingin%20konsultasi',
    iconName: 'MessageCircle',
    highlight: false,
    enabled: true,
    clicks: 294,
    createdAt: Date.now() - 3600000 * 24 * 6,
    category: 'Kontak',
  },
  {
    id: 'header-2',
    type: 'header',
    title: '🛍️ Produk Digital & Template',
    url: '',
    enabled: true,
    clicks: 0,
    createdAt: Date.now() - 3600000 * 24 * 4,
  },
  {
    id: 'link-3',
    type: 'standard',
    title: '📑 Notion Template Produktivitas Kreator',
    subtitle: 'Diskon 50% khusus follower bulan ini',
    url: 'https://gumroad.com',
    iconName: 'FileText',
    highlight: true,
    highlightText: '50% OFF',
    animation: 'bounce',
    enabled: true,
    clicks: 631,
    createdAt: Date.now() - 3600000 * 24 * 3,
    category: 'Produk',
  },
  {
    id: 'link-4',
    type: 'standard',
    title: '☕ Dukung Saya di Saweria / Trakteer',
    subtitle: 'Traktir kopi untuk semangat bikin konten',
    url: 'https://saweria.co',
    iconName: 'Coffee',
    highlight: false,
    enabled: true,
    clicks: 128,
    createdAt: Date.now() - 3600000 * 24 * 2,
    category: 'Donasi',
  },
  {
    id: 'link-5',
    type: 'standard',
    title: '🌐 Website Portfolio & Studi Kasus',
    subtitle: 'Lihat karya desain dan sistem yang pernah dibuat',
    url: 'https://github.com',
    iconName: 'Globe',
    highlight: false,
    enabled: true,
    clicks: 215,
    createdAt: Date.now() - 3600000 * 24 * 1,
    category: 'Portfolio',
  },
];

// Seed realistic initial analytics with timestamps over the last 7 days
export function generateInitialAnalytics(links: BioLink[]): { clicks: ClickEvent[]; views: PageViewEvent[]; totalViews: number; totalClicks: number } {
  const referrers = ['Instagram', 'TikTok', 'WhatsApp', 'Direct', 'Google', 'Twitter/X', 'YouTube'];
  const referrerWeights = [0.42, 0.28, 0.14, 0.08, 0.04, 0.02, 0.02];
  const devices: ('Mobile' | 'Desktop' | 'Tablet')[] = ['Mobile', 'Mobile', 'Mobile', 'Mobile', 'Desktop', 'Tablet'];
  const cities = ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang', 'Yogyakarta', 'Makassar', 'Denpasar', 'Malang'];

  const clicks: ClickEvent[] = [];
  const views: PageViewEvent[] = [];
  const now = Date.now();

  const getWeightedReferrer = () => {
    const r = Math.random();
    let acc = 0;
    for (let i = 0; i < referrers.length; i++) {
      acc += referrerWeights[i];
      if (r <= acc) return referrers[i];
    }
    return 'Instagram';
  };

  // Generate 800 page views over 7 days
  for (let i = 0; i < 1850; i++) {
    const timeAgo = Math.pow(Math.random(), 1.5) * (7 * 24 * 3600 * 1000);
    const ts = now - timeAgo;
    const device = devices[Math.floor(Math.random() * devices.length)];
    const referrer = getWeightedReferrer();
    views.push({
      id: `view-${i}`,
      timestamp: ts,
      referrer,
      device,
      country: 'Indonesia',
    });
  }

  // Generate clicks matching link click sums
  let clickIdCounter = 1;
  const activeLinks = links.filter(l => l.type !== 'header' && l.enabled);

  activeLinks.forEach(link => {
    for (let j = 0; j < link.clicks; j++) {
      const timeAgo = Math.pow(Math.random(), 1.4) * (7 * 24 * 3600 * 1000);
      const ts = now - timeAgo;
      const device = devices[Math.floor(Math.random() * devices.length)];
      const referrer = getWeightedReferrer();
      const city = cities[Math.floor(Math.random() * cities.length)];

      clicks.push({
        id: `click-${clickIdCounter++}`,
        linkId: link.id,
        linkTitle: link.title,
        timestamp: ts,
        referrer,
        device,
        browser: device === 'Mobile' ? 'Mobile Safari / Chrome' : 'Chrome',
        country: 'Indonesia',
        city,
      });
    }
  });

  // Sort descending by timestamp
  clicks.sort((a, b) => b.timestamp - a.timestamp);
  views.sort((a, b) => b.timestamp - a.timestamp);

  return {
    clicks,
    views,
    totalViews: views.length,
    totalClicks: clicks.length,
  };
}
