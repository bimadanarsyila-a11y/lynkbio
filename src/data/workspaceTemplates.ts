import { Workspace, ProfileTheme } from '../types';
import { PRESET_THEMES, INITIAL_PROFILE, INITIAL_LINKS, generateInitialAnalytics } from './presets';

export interface WorkspaceTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  defaultUsername: string;
  theme: ProfileTheme;
  createWorkspace: (userId?: string) => Workspace;
}

export const WORKSPACE_TEMPLATES: WorkspaceTemplate[] = [
  {
    id: 'creator-personal',
    name: 'Personal Branding & Creator',
    category: 'Kreator',
    description: 'Untuk influencer, content creator, youtuber, dan public figure.',
    icon: '✨',
    defaultUsername: 'bima.creator',
    theme: PRESET_THEMES[0],
    createWorkspace: (userId) => {
      const links = INITIAL_LINKS;
      const initial = generateInitialAnalytics(links);
      return {
        id: `ws-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        userId,
        name: 'Personal Creator Bio',
        username: 'bima.creator',
        icon: '✨',
        profile: {
          ...INITIAL_PROFILE,
          theme: PRESET_THEMES[0],
        },
        links,
        analytics: {
          totalViews: initial.totalViews,
          totalClicks: initial.totalClicks,
          activeNow: 8,
          clicks: initial.clicks,
          views: initial.views,
        },
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
    },
  },
  {
    id: 'olshop-fashion',
    name: 'Online Shop & E-Commerce',
    category: 'Bisnis & Toko',
    description: 'Katalog produk Shopee, Tokopedia, WhatsApp order, dan promo ongkir.',
    icon: '🛍️',
    defaultUsername: 'tokofashion.id',
    theme: PRESET_THEMES[3], // Sunset / Vibrant
    createWorkspace: (userId) => {
      const links = [
        {
          id: 'link-shop-1',
          type: 'standard' as const,
          title: '🔥 Promo Diskon 50% Koleksi Terbaru',
          subtitle: 'Gunakan kode voucher VOUCHER50 di checkout',
          url: 'https://shopee.co.id',
          iconName: 'ShoppingBag',
          highlight: true,
          highlightText: '50% OFF',
          animation: 'pulse' as const,
          enabled: true,
          clicks: 342,
          createdAt: Date.now() - 3600000 * 24 * 3,
        },
        {
          id: 'link-shop-2',
          type: 'contact' as const,
          title: '💬 Order Cepat via WhatsApp Admin',
          subtitle: 'Respon cepat & cek stok real-time',
          url: 'https://wa.me/6281234567890?text=Halo%20Admin,%20mau%20order',
          iconName: 'MessageCircle',
          enabled: true,
          clicks: 218,
          createdAt: Date.now() - 3600000 * 24 * 2,
        },
        {
          id: 'link-shop-3',
          type: 'standard' as const,
          title: '📦 Official Store di Tokopedia',
          subtitle: 'Bebas ongkir ke seluruh Indonesia',
          url: 'https://tokopedia.com',
          iconName: 'Package',
          enabled: true,
          clicks: 189,
          createdAt: Date.now() - 3600000 * 24 * 1,
        },
      ];
      const initial = generateInitialAnalytics(links);
      return {
        id: `ws-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        userId,
        name: 'Toko Online Fashion',
        username: 'tokofashion.id',
        icon: '🛍️',
        profile: {
          username: 'tokofashion.id',
          displayName: 'Lumina Fashion Store',
          bio: '👗 Trend Fashion Terkini | Pengiriman Cepat Se-Indonesia | 100% Produk Original & Bergaransi.',
          avatarUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&auto=format&fit=crop&q=80',
          verified: true,
          location: 'Bandung, Jawa Barat',
          statusBadge: '⚡ Flash Sale Berlangsung Hari Ini',
          socials: [
            { id: '1', platform: 'instagram', url: 'https://instagram.com/tokofashion.id', enabled: true },
            { id: '2', platform: 'tiktok', url: 'https://tiktok.com/@tokofashion.id', enabled: true },
            { id: '3', platform: 'whatsapp', url: 'https://wa.me/6281234567890', enabled: true },
          ],
          theme: PRESET_THEMES[3],
        },
        links,
        analytics: {
          totalViews: initial.totalViews,
          totalClicks: initial.totalClicks,
          activeNow: 12,
          clicks: initial.clicks,
          views: initial.views,
        },
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
    },
  },
  {
    id: 'fnb-culinary',
    name: 'Restoran, Cafe & Kuliner',
    category: 'Kuliner & FnB',
    description: 'Menu digital, reservasi meja WhatsApp, lokasi Google Maps, dan delivery.',
    icon: '☕',
    defaultUsername: 'kopisenja.space',
    theme: PRESET_THEMES[5], // Warm Terracotta
    createWorkspace: (userId) => {
      const links = [
        {
          id: 'link-fnb-1',
          type: 'standard' as const,
          title: '📖 Lihat Menu Makanan & Minuman Digital',
          subtitle: 'Daftar menu lengkap beserta harga terupdate',
          url: 'https://google.com',
          iconName: 'Coffee',
          highlight: true,
          highlightText: 'MENU BARU',
          enabled: true,
          clicks: 410,
          createdAt: Date.now() - 3600000 * 24 * 4,
        },
        {
          id: 'link-fnb-2',
          type: 'contact' as const,
          title: '📍 Reservasi Meja & Event WhatsApp',
          subtitle: 'Booking tempat meeting atau kumpul keluarga',
          url: 'https://wa.me/6281234567890?text=Halo,%20saya%20mau%20reservasi%20meja',
          iconName: 'Calendar',
          enabled: true,
          clicks: 195,
          createdAt: Date.now() - 3600000 * 24 * 3,
        },
        {
          id: 'link-fnb-3',
          type: 'standard' as const,
          title: '🛵 Pesan Delivery via GrabFood / GoFood',
          subtitle: 'Nikmati kopi dan hidangan lezat langsung ke rumah',
          url: 'https://grab.com',
          iconName: 'Bike',
          enabled: true,
          clicks: 278,
          createdAt: Date.now() - 3600000 * 24 * 2,
        },
      ];
      const initial = generateInitialAnalytics(links);
      return {
        id: `ws-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        userId,
        name: 'Kopi Senja Cafe',
        username: 'kopisenja.space',
        icon: '☕',
        profile: {
          username: 'kopisenja.space',
          displayName: 'Kopi Senja & Eatery',
          bio: '🌿 Tempat ngopi teduh dengan racikan kopi Nusantara pilihan, live acoustic tiap Jumat-Minggu.',
          avatarUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&auto=format&fit=crop&q=80',
          verified: true,
          location: 'Yogyakarta, Indonesia',
          statusBadge: '🕒 Buka Setiap Hari: 08.00 - 23.00',
          socials: [
            { id: '1', platform: 'instagram', url: 'https://instagram.com/kopisenja', enabled: true },
            { id: '2', platform: 'tiktok', url: 'https://tiktok.com/@kopisenja', enabled: true },
            { id: '3', platform: 'whatsapp', url: 'https://wa.me/6281234567890', enabled: true },
          ],
          theme: PRESET_THEMES[5],
        },
        links,
        analytics: {
          totalViews: initial.totalViews,
          totalClicks: initial.totalClicks,
          activeNow: 6,
          clicks: initial.clicks,
          views: initial.views,
        },
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
    },
  },
  {
    id: 'portfolio-agency',
    name: 'Freelancer & Portfolio Jasa',
    category: 'Portofolio & Agensi',
    description: 'Pamerkan portofolio desain/koding, tarif jasa, resume CV, dan kontak klien.',
    icon: '💻',
    defaultUsername: 'danar.studio',
    theme: PRESET_THEMES[2], // Cyber Onyx
    createWorkspace: (userId) => {
      const links = [
        {
          id: 'link-agency-1',
          type: 'standard' as const,
          title: '🎨 Portofolio Desain UI/UX & Web (Dribbble/Behance)',
          subtitle: 'Lihat 30+ proyek website dan aplikasi mobile',
          url: 'https://dribbble.com',
          iconName: 'Layout',
          highlight: true,
          highlightText: 'PORTFOLIO',
          enabled: true,
          clicks: 312,
          createdAt: Date.now() - 3600000 * 24 * 5,
        },
        {
          id: 'link-agency-2',
          type: 'standard' as const,
          title: '💼 Rate Card Jasa & Estimasi Biaya',
          subtitle: 'Paket pembuatan website & branding identity',
          url: 'https://notion.so',
          iconName: 'FileText',
          enabled: true,
          clicks: 143,
          createdAt: Date.now() - 3600000 * 24 * 3,
        },
        {
          id: 'link-agency-3',
          type: 'contact' as const,
          title: '🤝 Konsultasi Proyek & Diskusi Brief',
          subtitle: 'Jadwalkan Google Meet atau chat WhatsApp',
          url: 'https://wa.me/6281234567890?text=Halo%20Danar,%20saya%20tertarik%20hire%20jasa%20desain',
          iconName: 'MessageSquare',
          enabled: true,
          clicks: 180,
          createdAt: Date.now() - 3600000 * 24 * 2,
        },
      ];
      const initial = generateInitialAnalytics(links);
      return {
        id: `ws-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        userId,
        name: 'Danar Design Studio',
        username: 'danar.studio',
        icon: '💻',
        profile: {
          username: 'danar.studio',
          displayName: 'Danar Creative Studio',
          bio: '🚀 Product Designer & Frontend Specialist | Membantu brand & startup berkembang dengan desain berdampak.',
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
          verified: true,
          location: 'Jakarta & Remote',
          statusBadge: '🟢 Available for Freelance & Contract',
          socials: [
            { id: '1', platform: 'linkedin', url: 'https://linkedin.com', enabled: true },
            { id: '2', platform: 'github', url: 'https://github.com', enabled: true },
            { id: '3', platform: 'whatsapp', url: 'https://wa.me/6281234567890', enabled: true },
            { id: '4', platform: 'instagram', url: 'https://instagram.com', enabled: true },
          ],
          theme: PRESET_THEMES[2],
        },
        links,
        analytics: {
          totalViews: initial.totalViews,
          totalClicks: initial.totalClicks,
          activeNow: 5,
          clicks: initial.clicks,
          views: initial.views,
        },
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
    },
  },
];
