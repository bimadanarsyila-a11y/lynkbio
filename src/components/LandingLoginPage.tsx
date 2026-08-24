import React, { useState } from 'react';
import {
  Link2,
  Sparkles,
  ArrowRight,
  BarChart3,
  Palette,
  Layers,
  Zap,
  Globe,
  CheckCircle2,
  ShieldCheck,
  FolderKanban,
  ShoppingBag,
  Youtube,
  MessageCircle,
  Coffee,
  Eye,
  TrendingUp,
  Smartphone,
  QrCode,
  Share2,
} from 'lucide-react';
import { AuthUser } from '../types';

interface LandingLoginPageProps {
  onLoginWithGoogle: () => void;
  onEnterStudio: () => void;
  authUser: AuthUser | null;
  isAdmin?: boolean;
}

interface DemoPreset {
  id: string;
  name: string;
  role: string;
  username: string;
  avatar: string;
  bio: string;
  bgColor: string;
  linkBgColor: string;
  linkHoverColor: string;
  accentColor: string;
  links: Array<{
    id: string;
    title: string;
    icon: 'shopping' | 'youtube' | 'chat' | 'coffee' | 'globe';
  }>;
}

const DEMO_PRESETS: DemoPreset[] = [
  {
    id: 'creator',
    name: 'Danar Creative',
    role: 'Digital Creator & Designer',
    username: 'danar.studio',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    bio: 'UI/UX Designer & Content Creator',
    bgColor: 'bg-gradient-to-br from-purple-100 to-pink-100',
    linkBgColor: 'bg-white',
    linkHoverColor: 'hover:bg-purple-50',
    accentColor: 'text-purple-600',
    links: [
      { id: '1', title: '🎨 Portfolio & Case Studies', icon: 'globe' },
      { id: '2', title: '🎬 YouTube Channel', icon: 'youtube' },
      { id: '3', title: '☕ Buy Me a Coffee', icon: 'coffee' },
    ],
  },
  {
    id: 'store',
    name: 'Aroma Coffee',
    role: 'Specialty Coffee Roastery',
    username: 'aroma.coffee',
    avatar: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300&auto=format&fit=crop&q=80',
    bio: 'Fresh roasted coffee beans ☕',
    bgColor: 'bg-gradient-to-br from-orange-100 to-amber-100',
    linkBgColor: 'bg-white',
    linkHoverColor: 'hover:bg-orange-50',
    accentColor: 'text-orange-600',
    links: [
      { id: '1', title: '🛍️ Shop on Shopee', icon: 'shopping' },
      { id: '2', title: '📦 Tokopedia Store', icon: 'shopping' },
      { id: '3', title: '📲 WhatsApp Order', icon: 'chat' },
    ],
  },
  {
    id: 'dev',
    name: 'Bima Tech',
    role: 'Full-Stack Developer',
    username: 'bimatech',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    bio: 'Building web apps with React & Node',
    bgColor: 'bg-gradient-to-br from-blue-100 to-cyan-100',
    linkBgColor: 'bg-white',
    linkHoverColor: 'hover:bg-blue-50',
    accentColor: 'text-blue-600',
    links: [
      { id: '1', title: '🚀 GitHub Projects', icon: 'globe' },
      { id: '2', title: '📄 Download CV', icon: 'globe' },
      { id: '3', title: '📅 Book Consultation', icon: 'chat' },
    ],
  },
];

const getLinkIcon = (icon: string) => {
  switch (icon) {
    case 'shopping':
      return <ShoppingBag className="w-5 h-5" />;
    case 'youtube':
      return <Youtube className="w-5 h-5" />;
    case 'chat':
      return <MessageCircle className="w-5 h-5" />;
    case 'coffee':
      return <Coffee className="w-5 h-5" />;
    default:
      return <Globe className="w-5 h-5" />;
  }
};

export const LandingLoginPage: React.FC<LandingLoginPageProps> = ({
  onLoginWithGoogle,
  onEnterStudio,
  authUser,
}) => {
  const [selectedPreset, setSelectedPreset] = useState<DemoPreset>(DEMO_PRESETS[0]);
  const [customUsername, setCustomUsername] = useState('yourname');
  const [demoClicks, setDemoClicks] = useState<Record<string, number>>({});

  const totalViews = 2847;
  const totalClicks = Object.values(demoClicks).reduce((a, b) => a + b, 0);

  const handleLinkClick = (linkId: string) => {
    setDemoClicks((prev) => ({
      ...prev,
      [linkId]: (prev[linkId] || 0) + 1,
    }));
  };

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
              <Link2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">lynkbio</span>
          </div>

          <div className="flex items-center gap-3">
            {authUser ? (
              <button
                onClick={onEnterStudio}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white rounded-full font-semibold text-sm transition-all shadow-lg"
              >
                {authUser.photoURL && (
                  <img
                    src={authUser.photoURL}
                    alt={authUser.displayName || 'User'}
                    className="w-5 h-5 rounded-full border border-white/30"
                    referrerPolicy="no-referrer"
                  />
                )}
                <span>Open Studio</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <>
                <button
                  onClick={onEnterStudio}
                  className="hidden sm:flex items-center gap-2 px-4 py-2.5 text-gray-700 hover:bg-gray-50 rounded-full font-medium text-sm transition-all"
                >
                  <span>Try Demo</span>
                </button>
                <button
                  onClick={onLoginWithGoogle}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-full font-semibold text-sm transition-all shadow-lg"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Sign up free</span>
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-200">
              <span className="text-sm font-semibold text-green-700">
                Join 70M+ creators worldwide
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-tight">
                Everything you are.{' '}
                <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  In one simple link.
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                Join millions of people using lynkbio to share everything they create, curate and
                sell online. All from one link in bio.
              </p>
            </div>

            {/* URL Input */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
                <div className="flex-1 flex items-center bg-gray-50 px-4 py-4 rounded-xl border-2 border-gray-200 focus-within:border-green-400 transition-colors">
                  <span className="text-gray-400 text-sm font-medium">lynkbio.to/</span>
                  <input
                    type="text"
                    value={customUsername}
                    onChange={(e) =>
                      setCustomUsername(e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, ''))
                    }
                    placeholder="yourname"
                    className="bg-transparent text-gray-900 font-medium focus:outline-none w-full ml-1"
                  />
                </div>

                <button
                  onClick={authUser ? onEnterStudio : onLoginWithGoogle}
                  className="px-8 py-4 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white rounded-xl font-bold text-base transition-all shadow-lg hover:shadow-xl"
                >
                  Claim your Linktree
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Free forever
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-500" />
                  Secure & reliable
                </span>
                <span className="flex items-center gap-1.5">
                  <FolderKanban className="w-4 h-4 text-purple-500" />
                  Multi-workspace
                </span>
              </div>
            </div>

            {/* Features Pills */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: BarChart3, label: 'Analytics', color: 'bg-purple-100 text-purple-700' },
                { icon: Palette, label: 'Themes', color: 'bg-pink-100 text-pink-700' },
                { icon: Layers, label: 'Workspaces', color: 'bg-blue-100 text-blue-700' },
                { icon: Zap, label: 'AI Assistant', color: 'bg-orange-100 text-orange-700' },
              ].map((feature, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm ${feature.color}`}
                >
                  <feature.icon className="w-4 h-4" />
                  <span>{feature.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Phone Demo */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Preset Switcher */}
            <div className="w-full max-w-sm mb-6">
              <p className="text-sm font-semibold text-gray-700 mb-3">Try different styles:</p>
              <div className="grid grid-cols-3 gap-2">
                {DEMO_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => {
                      setSelectedPreset(preset);
                      setCustomUsername(preset.username);
                    }}
                    className={`p-3 rounded-2xl border-2 text-left transition-all ${
                      selectedPreset.id === preset.id
                        ? 'border-green-400 bg-green-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <p className="text-xs font-bold text-gray-900 truncate">{preset.name}</p>
                    <p className="text-[10px] text-gray-500 truncate">{preset.role}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="relative w-full max-w-sm">
              <div className="bg-gray-900 rounded-[3rem] p-4 shadow-2xl">
                <div className="bg-white rounded-[2.5rem] overflow-hidden">
                  {/* Notch */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-3xl z-10" />

                  {/* Screen Content */}
                  <div className={`relative min-h-[640px] ${selectedPreset.bgColor} p-6 pt-12`}>
                    {/* Profile */}
                    <div className="flex flex-col items-center text-center mb-6">
                      <img
                        src={selectedPreset.avatar}
                        alt={selectedPreset.name}
                        className="w-24 h-24 rounded-full border-4 border-white shadow-lg mb-4"
                      />
                      <h2 className="text-xl font-bold text-gray-900 mb-1">
                        {selectedPreset.name}
                      </h2>
                      <p className="text-sm text-gray-600 mb-4">{selectedPreset.bio}</p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 mb-6">
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 text-center shadow-sm">
                        <div className="flex items-center justify-center mb-1">
                          <Eye className="w-4 h-4 text-purple-500" />
                        </div>
                        <p className="text-lg font-bold text-gray-900">{totalViews}</p>
                        <p className="text-[10px] text-gray-500">Views</p>
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 text-center shadow-sm">
                        <div className="flex items-center justify-center mb-1">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        </div>
                        <p className="text-lg font-bold text-gray-900">{totalClicks}</p>
                        <p className="text-[10px] text-gray-500">Clicks</p>
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 text-center shadow-sm">
                        <div className="flex items-center justify-center mb-1">
                          <BarChart3 className="w-4 h-4 text-blue-500" />
                        </div>
                        <p className="text-lg font-bold text-gray-900">
                          {totalViews > 0 ? Math.round((totalClicks / totalViews) * 100) : 0}%
                        </p>
                        <p className="text-[10px] text-gray-500">CTR</p>
                      </div>
                    </div>

                    {/* Links */}
                    <div className="space-y-3">
                      {selectedPreset.links.map((link) => (
                        <button
                          key={link.id}
                          onClick={() => handleLinkClick(link.id)}
                          className={`w-full p-4 ${selectedPreset.linkBgColor} ${selectedPreset.linkHoverColor} rounded-2xl shadow-md hover:shadow-lg transition-all text-left group`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`${selectedPreset.accentColor}`}>
                              {getLinkIcon(link.icon)}
                            </div>
                            <span className="flex-1 font-semibold text-gray-900 text-sm">
                              {link.title}
                            </span>
                            {demoClicks[link.id] > 0 && (
                              <span className="text-xs font-bold text-green-600">
                                +{demoClicks[link.id]}
                              </span>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                      <button className="p-3 bg-white/80 rounded-full shadow-md hover:shadow-lg transition-all">
                        <Share2 className="w-5 h-5 text-gray-700" />
                      </button>
                      <button className="p-3 bg-white/80 rounded-full shadow-md hover:shadow-lg transition-all">
                        <QrCode className="w-5 h-5 text-gray-700" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white border-2 border-gray-200 rounded-full shadow-lg">
                <p className="text-xs font-semibold text-gray-700 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-green-500" />
                  <span>Live Demo</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer CTA */}
      <footer className="relative bg-gradient-to-br from-green-50 to-emerald-50 py-16 mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h3 className="text-3xl sm:text-4xl font-black text-gray-900">
            Ready to grow your audience?
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join millions of creators, businesses and brands sharing their world with lynkbio.
          </p>
          <button
            onClick={onLoginWithGoogle}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white rounded-full font-bold text-base transition-all shadow-xl hover:shadow-2xl"
          >
            <span>Get started for free</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-xs text-gray-500 mt-6">© 2026 lynkbio</p>
        </div>
      </footer>
    </div>
  );
};
