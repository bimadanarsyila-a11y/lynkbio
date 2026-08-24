import React, { useState, useEffect } from 'react';
import {
  Link2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  BarChart3,
  FolderKanban,
  QrCode,
  CheckCircle2,
  ExternalLink,
  Layers,
  Smartphone,
  MousePointerClick,
  Share2,
  Globe,
  ShoppingBag,
  Youtube,
  MessageCircle,
  Coffee,
  Check,
  Flame,
  Palette,
  Eye,
  Sliders,
} from 'lucide-react';
import { AuthUser } from '../types';

interface LandingLoginPageProps {
  onLoginWithGoogle: () => void;
  onEnterStudio: () => void;
  authUser: AuthUser | null;
  isAdmin?: boolean;
}

interface DemoTheme {
  id: string;
  name: string;
  badge: string;
  bgClass: string;
  cardClass: string;
  textClass: string;
  subTextClass: string;
  accentClass: string;
}

const DEMO_THEMES: DemoTheme[] = [
  {
    id: 'slate',
    name: 'Minimal Slate',
    badge: 'Modern Clean',
    bgClass: 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white',
    cardClass: 'bg-white/10 hover:bg-white/15 border-white/10 text-white shadow-sm',
    textClass: 'text-white',
    subTextClass: 'text-slate-300',
    accentClass: 'bg-emerald-500 text-white',
  },
  {
    id: 'emerald',
    name: 'Neo Cyber',
    badge: 'High Contrast',
    bgClass: 'bg-gradient-to-br from-emerald-950 via-zinc-950 to-slate-950 text-white',
    cardClass: 'bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/30 text-emerald-100 shadow-sm',
    textClass: 'text-emerald-300',
    subTextClass: 'text-emerald-100/70',
    accentClass: 'bg-emerald-400 text-slate-950',
  },
  {
    id: 'warm',
    name: 'Velvet Sunset',
    badge: 'Aesthetic Warm',
    bgClass: 'bg-gradient-to-b from-amber-950 via-rose-950 to-zinc-950 text-white',
    cardClass: 'bg-white/10 hover:bg-white/20 border-amber-200/20 text-amber-50 shadow-sm',
    textClass: 'text-amber-200',
    subTextClass: 'text-rose-200/75',
    accentClass: 'bg-amber-400 text-slate-950',
  },
  {
    id: 'nordic',
    name: 'Nordic Pure',
    badge: 'Light Editorial',
    bgClass: 'bg-gradient-to-b from-slate-50 via-zinc-100 to-slate-200 text-slate-900',
    cardClass: 'bg-white hover:bg-slate-50 border-slate-200 text-slate-900 shadow-xs',
    textClass: 'text-slate-900',
    subTextClass: 'text-slate-600',
    accentClass: 'bg-slate-900 text-white',
  },
];

interface DemoProfilePreset {
  id: string;
  name: string;
  role: string;
  username: string;
  avatar: string;
  bio: string;
  badge: string;
  category: string;
  links: Array<{
    id: string;
    title: string;
    subtitle: string;
    url: string;
    icon: 'shopping' | 'youtube' | 'chat' | 'coffee' | 'globe';
    tag?: string;
  }>;
}

const DEMO_PRESETS: DemoProfilePreset[] = [
  {
    id: 'creator',
    name: 'Danar Creative',
    role: 'Digital Creator & Designer',
    username: 'danar.studio',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    bio: 'Berbagi insight seputar UI/UX design, visual branding, dan tools produktivitas.',
    badge: 'Creator Bio',
    category: 'Desain & Kreatif',
    links: [
      {
        id: '1',
        title: '🎨 Portofolio Desain & Case Study',
        subtitle: 'Kumpulan project UI/UX & Web Design terbaru',
        url: '#',
        icon: 'globe',
        tag: 'Populer',
      },
      {
        id: '2',
        title: '🎬 YouTube: Tutorial Figma & Kode',
        subtitle: 'Video mingguan tips workflow modern',
        url: '#',
        icon: 'youtube',
      },
      {
        id: '3',
        title: '☕ Traktir Kopi & Dukungan Karya',
        subtitle: 'Support pembuatan konten gratis di Saweria',
        url: '#',
        icon: 'coffee',
      },
      {
        id: '4',
        title: '💬 Kontak Kolaborasi via WhatsApp',
        subtitle: 'Respons cepat untuk freelance & mentoring',
        url: '#',
        icon: 'chat',
      },
    ],
  },
  {
    id: 'store',
    name: 'Aroma Artisan Coffee',
    role: 'Specialty Coffee & Roastery',
    username: 'aroma.roastery',
    avatar: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300&auto=format&fit=crop&q=80',
    bio: 'Biji kopi pilihan Nusantara sangrai segar setiap hari. Nikmati seduhan terbaik di rumah Anda.',
    badge: 'Toko Online',
    category: 'Kuliner & Shop',
    links: [
      {
        id: '1',
        title: '🛍️ Order Kopi di Shopee Official',
        subtitle: 'Gratis ongkir & voucher diskon 20%',
        url: '#',
        icon: 'shopping',
        tag: 'Promo 20%',
      },
      {
        id: '2',
        title: '📦 Menu Tokopedia & Paket Bundling',
        subtitle: 'Beli 3 gratis sample beans eksklusif',
        url: '#',
        icon: 'shopping',
      },
      {
        id: '3',
        title: '📍 Lokasi Kedai di Google Maps',
        subtitle: 'Buka setiap hari 08:00 - 22:00 WIB',
        url: '#',
        icon: 'globe',
      },
      {
        id: '4',
        title: '📲 Reservasi Meja & Event Coffee',
        subtitle: 'Hubungi barista via WhatsApp',
        url: '#',
        icon: 'chat',
      },
    ],
  },
  {
    id: 'dev',
    name: 'Bima Tech Studio',
    role: 'Full-Stack Web & Mobile Engineer',
    username: 'bimatech',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    bio: 'Membangun aplikasi web berperforma tinggi dengan React, Node, dan arsitektur cloud.',
    badge: 'Freelancer',
    category: 'Teknologi',
    links: [
      {
        id: '1',
        title: '🚀 GitHub Repositories & Open Source',
        subtitle: 'Lebih dari 40+ library dan template web',
        url: '#',
        icon: 'globe',
        tag: 'Verified',
      },
      {
        id: '2',
        title: '📄 Unduh Curriculum Vitae (PDF)',
        subtitle: 'Riwayat pengalaman & keahlian teknis',
        url: '#',
        icon: 'globe',
      },
      {
        id: '3',
        title: '📅 Booking Jadwal Konsultasi Proyek',
        subtitle: 'Diskusi arsitektur dan kebutuhan produk',
        url: '#',
        icon: 'chat',
      },
    ],
  },
];

export const LandingLoginPage: React.FC<LandingLoginPageProps> = ({
  onLoginWithGoogle,
  onEnterStudio,
  authUser,
  isAdmin = false,
}) => {
  const [selectedTheme, setSelectedTheme] = useState<DemoTheme>(DEMO_THEMES[0]);
  const [selectedPreset, setSelectedPreset] = useState<DemoProfilePreset>(DEMO_PRESETS[0]);
  const [customUsername, setCustomUsername] = useState('danar.studio');
  const [demoClicks, setDemoClicks] = useState<Record<string, number>>({});
  const [totalDemoViews, setTotalDemoViews] = useState(1482);
  const [clickedFeedbackId, setClickedFeedbackId] = useState<string | null>(null);
  const [activeTabFilter, setActiveTabFilter] = useState<'all' | 'popular'>('all');

  const totalClicksCount = (Object.values(demoClicks) as number[]).reduce((a: number, b: number) => a + b, 384);

  const handleLinkClickSimulation = (linkId: string, title: string) => {
    setDemoClicks(prev => ({
      ...prev,
      [linkId]: (prev[linkId] || 0) + 1,
    }));
    setClickedFeedbackId(linkId);
    setTimeout(() => setClickedFeedbackId(null), 500);
  };

  const getLinkIconElement = (icon: string) => {
    switch (icon) {
      case 'shopping':
        return <ShoppingBag className="w-4 h-4 text-rose-400" />;
      case 'youtube':
        return <Youtube className="w-4 h-4 text-red-400" />;
      case 'chat':
        return <MessageCircle className="w-4 h-4 text-emerald-400" />;
      case 'coffee':
        return <Coffee className="w-4 h-4 text-amber-400" />;
      default:
        return <Globe className="w-4 h-4 text-sky-400" />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* 1. Header Navigation Bar */}
      <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 py-3.5 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white text-slate-950 flex items-center justify-center font-black shadow-xs">
              <Link2 className="w-5 h-5" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">
                lynkbio
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                v2.0
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Enter Studio Button */}
            <button
              type="button"
              onClick={onEnterStudio}
              className="px-3 sm:px-4 py-2 rounded-xl text-[10px] sm:text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-all flex items-center gap-1.5 sm:gap-2 shadow-xs whitespace-nowrap shrink-0"
            >
              <span>Buka Studio</span>
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 hidden xs:block" />
            </button>

            {/* Google Login / Status Button */}
            {authUser ? (
              <button
                type="button"
                onClick={onEnterStudio}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-[10px] sm:text-sm font-bold transition-all shadow-xs whitespace-nowrap shrink-0 max-w-[120px] sm:max-w-none"
              >
                {authUser.photoURL ? (
                  <img
                    src={authUser.photoURL}
                    alt={authUser.displayName || 'User'}
                    className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-slate-950/30 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-slate-950 text-white text-[9px] sm:text-[10px] font-bold flex items-center justify-center shrink-0">
                    {(authUser.displayName || authUser.email || 'U')[0].toUpperCase()}
                  </div>
                )}
                <span className="truncate">Masuk: {authUser.displayName?.split(' ')[0] || 'Studio'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onLoginWithGoogle}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-950 text-[10px] sm:text-sm font-bold transition-all shadow-sm active:scale-98 shrink-0 whitespace-nowrap"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Login Gmail</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 2. Hero Interactive Stage */}
      <main className="flex-1 w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column: Value Proposition, Username Claimer & Auth Actions */}
        <section className="lg:col-span-7 space-y-6 sm:space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-emerald-400 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Platform Bio Link & Portofolio Modern Generasi Baru</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Satu Tautan untuk Semua Konten, Bisnis & Karya Anda.
            </h1>
            <p className="text-sm sm:text-lg text-slate-400 max-w-2xl font-normal leading-relaxed">
              Buat halaman profil bio interaktif dalam hitungan detik. Kustomisasi tema visual, kelola <strong className="text-slate-200">multi-workspace project</strong>, simpan aman dengan <strong className="text-slate-200">akun Gmail</strong>, dan pantau analitik klik secara real-time.
            </p>
          </div>

          {/* Interactive URL Claimer & Sandbox Input */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800/90 shadow-xl space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>Klaim nama tautan kustom Anda:</span>
              </span>
              <span className="text-emerald-400 font-mono text-[11px]">Tersedia Sekarang</span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch gap-2">
              <div className="flex-1 flex items-center bg-slate-950 px-3.5 py-2.5 rounded-xl border border-slate-800 focus-within:border-emerald-500/80 transition-colors">
                <span className="text-slate-500 text-xs sm:text-sm font-mono select-none">
                  lynkbio.to/@
                </span>
                <input
                  type="text"
                  value={customUsername}
                  onChange={(e) => setCustomUsername(e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, ''))}
                  placeholder="nama.anda"
                  className="bg-transparent text-xs sm:text-sm text-white font-mono font-medium focus:outline-none w-full ml-1"
                />
              </div>

              {authUser ? (
                <button
                  type="button"
                  onClick={onEnterStudio}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-xs shrink-0"
                >
                  <span className="truncate">Edit Profil di Studio</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onLoginWithGoogle}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-xs shrink-0 active:scale-98"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span className="truncate">Mulai dengan Google</span>
                </button>
              )}
            </div>

            {/* Micro badges under input */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1 text-[11px] text-slate-400 font-medium">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Gratis</span>
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                <span>Firebase Cloud Sync</span>
              </span>
              <span className="flex items-center gap-1">
                <FolderKanban className="w-3.5 h-3.5 text-amber-400" />
                <span>Banyak Project / Workspace</span>
              </span>
            </div>
          </div>

          {/* Quick Preset Selector to test */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Pilih Demo Tipe Profil:</span>
              <span>Klik untuk mencoba tema interaktif</span>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-3 gap-2">
              {DEMO_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    setSelectedPreset(preset);
                    setCustomUsername(preset.username);
                  }}
                  className={`p-2.5 rounded-xl border text-left transition-all overflow-hidden ${
                    selectedPreset.id === preset.id
                      ? 'bg-slate-900 border-emerald-500/80 text-white shadow-xs ring-1 ring-emerald-500/50'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <p className="text-xs font-bold truncate">{preset.name}</p>
                  <p className="text-[10px] text-slate-400 truncate">{preset.badge}</p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Right Column: Fully Interactive Phone Simulator & Real-Time Controls */}
        <section className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="w-full max-w-[360px] sm:max-w-[380px] flex flex-col items-center space-y-4">
            {/* Interactive Theme Switcher Bar */}
            <div className="w-full flex items-center justify-between bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 shadow-sm text-xs">
              <span className="text-[11px] font-semibold text-slate-400 pl-2 flex items-center gap-1">
                <Palette className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tema:</span>
              </span>
              <div className="flex items-center gap-1">
                {DEMO_THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => setSelectedTheme(theme)}
                    className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                      selectedTheme.id === theme.id
                        ? 'bg-white text-slate-950 shadow-xs'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {theme.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Smartphone Outer Bezel */}
            <div className="relative w-full rounded-[40px] p-3 bg-slate-900 border-[6px] border-slate-800 shadow-2xl overflow-hidden ring-1 ring-slate-700/50">
              {/* Phone Speaker & Dynamic Island Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-950 rounded-full z-30 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-slate-800 mr-2" />
                <div className="w-8 h-1 rounded-full bg-slate-800" />
              </div>

              {/* Screen Content */}
              <div
                className={`w-full min-h-[520px] max-h-[540px] rounded-[30px] p-5 pt-8 overflow-y-auto no-scrollbar transition-all duration-300 flex flex-col justify-between ${selectedTheme.bgClass}`}
              >
                {/* Profile Header */}
                <div className="text-center space-y-2 pt-2">
                  <div className="relative inline-block">
                    <img
                      src={selectedPreset.avatar}
                      alt={selectedPreset.name}
                      className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-white/20 shadow-md"
                    />
                    <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center text-[10px] text-white">
                      ✓
                    </span>
                  </div>

                  <div>
                    <h3 className={`font-bold text-base leading-tight ${selectedTheme.textClass}`}>
                      {selectedPreset.name}
                    </h3>
                    <p className={`text-xs font-mono opacity-80 ${selectedTheme.subTextClass}`}>
                      @{customUsername || selectedPreset.username}
                    </p>
                  </div>

                  <p className={`text-xs leading-relaxed max-w-xs mx-auto line-clamp-2 ${selectedTheme.subTextClass}`}>
                    {selectedPreset.bio}
                  </p>
                </div>

                {/* Simulated Interactive Links */}
                <div className="space-y-2.5 my-4">
                  {selectedPreset.links.map((link) => {
                    const clickCount = demoClicks[link.id] || 0;
                    const isClicked = clickedFeedbackId === link.id;

                    return (
                      <button
                        key={link.id}
                        type="button"
                        onClick={() => handleLinkClickSimulation(link.id, link.title)}
                        className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between gap-2.5 transition-all transform active:scale-97 cursor-pointer ${
                          selectedTheme.cardClass
                        } ${isClicked ? 'ring-2 ring-emerald-400' : ''}`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-xl bg-black/20 flex items-center justify-center shrink-0">
                            {getLinkIconElement(link.icon)}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-xs leading-snug truncate">
                              {link.title}
                            </p>
                            <p className="text-[10px] opacity-70 truncate font-normal">
                              {link.subtitle}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {link.tag && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500 text-slate-950">
                              {link.tag}
                            </span>
                          )}
                          {clickCount > 0 && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/20 text-white font-mono animate-in zoom-in-75">
                              +{clickCount}
                            </span>
                          )}
                          <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Footer in phone */}
                <div className="pt-2 text-center text-[10px] opacity-60">
                  <span>Dibuat dengan lynkbio</span>
                </div>
              </div>
            </div>

            {/* Live Analytics HUD below phone */}
            <div className="w-full bg-slate-900/90 p-3 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-400 font-medium text-[11px]">Interaksi Live Demo:</span>
              </div>
              <div className="flex items-center gap-3 font-mono text-[11px]">
                <span className="text-slate-300">Views: <strong className="text-white">{totalDemoViews}</strong></span>
                <span className="text-emerald-400">Total Klik: <strong className="text-emerald-300">{totalClicksCount}</strong></span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 3. Core Features Showcase */}
      <section className="w-full bg-slate-900/50 border-t border-b border-slate-800/80 py-12 sm:py-16">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Fitur Lengkap untuk Kreator, Bisnis & Profesional
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Semua yang Anda butuhkan untuk membangun kehadiran digital yang terpercaya dan terorganisir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <FolderKanban className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-white">Multi-Workspace Project</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Kelola banyak link bio (toko online, portofolio desain, akun pribadi) dalam satu akun dengan URL kustom masing-masing.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-white">Google Cloud Sync</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Login 1-klik dengan Gmail. Semua tautan, tema, dan analitik otomatis tersimpan aman di database Firestore.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-white">Analitik Klik Real-Time</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Lacak metrik pengunjung, performa setiap tautan, rasio konversi (CTR), hingga distribusi perangkat secara akurat.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-white">AI Bio & Link Assistant</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Buat bio menarik, copywriting link promosi, dan ide struktur konten secara cerdas dengan teknologi AI terintegrasi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bottom Call-to-Action Bar */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 text-center space-y-5 shadow-2xl relative overflow-hidden">
          <div className="space-y-2 max-w-xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Mulai Bangun Profil Bio Anda Sekarang
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              Gratis selamanya, tanpa biaya langganan tersembunyi. Hubungkan semua audiens ke konten dan bisnis Anda.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            {authUser ? (
              <button
                type="button"
                onClick={onEnterStudio}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Masuk ke Studio Workspace</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={onLoginWithGoogle}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-950 text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 active:scale-98"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Daftar / Masuk dengan Gmail</span>
                </button>

                <button
                  type="button"
                  onClick={onEnterStudio}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-sm font-semibold transition-all border border-slate-700/60 justify-center flex items-center"
                >
                  <span>Coba Demo Studio Tanpa Login</span>
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 5. Minimal Clean Footer */}
      <footer className="w-full border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">lynkbio</span>
            <span>© 2026 — Platform Bio Link & Multi-Project Workspace</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Privasi & Keamanan Google</span>
            <span>•</span>
            <span>Real-Time Cloud</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
