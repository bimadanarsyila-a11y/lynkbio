import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  ExternalLink,
  Share2,
  Sparkles,
  MapPin,
  Flame,
  ArrowUpRight,
  Send,
  MessageCircle,
  Youtube,
  FileText,
  Coffee,
  Globe,
  ShoppingBag,
  Zap,
  QrCode,
} from 'lucide-react';
import { UserProfile, BioLink } from '../types';
import { SocialIcons } from './SocialIcons';
import { StorageService } from '../services/storage';

interface PublicBioPageProps {
  profile: UserProfile;
  links: BioLink[];
  onShareClick?: () => void;
  onQrClick?: () => void;
  isSimulated?: boolean;
}

export const PublicBioPage: React.FC<PublicBioPageProps> = ({
  profile,
  links,
  onShareClick,
  onQrClick,
  isSimulated = false,
}) => {
  const [clickedLinkId, setClickedLinkId] = useState<string | null>(null);

  useEffect(() => {
    // Record page view on mount
    StorageService.recordPageView();
  }, []);

  const getLinkIcon = (iconName?: string, type?: string) => {
    switch (iconName?.toLowerCase()) {
      case 'youtube':
        return <Youtube className="w-5 h-5 text-red-500" />;
      case 'messagecircle':
      case 'whatsapp':
        return <MessageCircle className="w-5 h-5 text-emerald-500" />;
      case 'filetext':
        return <FileText className="w-5 h-5 text-blue-500" />;
      case 'coffee':
        return <Coffee className="w-5 h-5 text-amber-500" />;
      case 'shoppingbag':
        return <ShoppingBag className="w-5 h-5 text-rose-500" />;
      case 'globe':
        return <Globe className="w-5 h-5 text-sky-500" />;
      default:
        return type === 'contact' ? (
          <Send className="w-5 h-5 text-emerald-400" />
        ) : (
          <Sparkles className="w-5 h-5 text-indigo-400" />
        );
    }
  };

  const handleLinkClick = (link: BioLink, e: React.MouseEvent) => {
    // Visual feedback
    setClickedLinkId(link.id);
    setTimeout(() => setClickedLinkId(null), 400);

    // Record click analytics
    StorageService.recordClick(link.id, link.title);

    // If inside phone simulator, we still allow opening in new tab or prevent default if URL is empty
    if (!link.url || link.url === '#') {
      e.preventDefault();
    }
  };

  const theme = profile.theme;

  // Derive button styles
  const getButtonShapeClass = () => {
    switch (theme.buttonStyle) {
      case 'pill':
        return 'rounded-full';
      case 'sharp':
        return 'rounded-none';
      case 'shadow3d':
        return 'rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]';
      case 'glass':
        return 'rounded-2xl backdrop-blur-md border border-white/20 shadow-lg';
      case 'outline':
        return 'rounded-xl border-2 bg-transparent';
      case 'rounded':
      default:
        return 'rounded-2xl';
    }
  };

  // Shadow class
  const getShadowClass = () => {
    if (theme.buttonStyle === 'shadow3d') return '';
    switch (theme.shadowStyle) {
      case 'hard':
        return 'shadow-md';
      case 'glow':
        return 'shadow-[0_0_20px_rgba(255,255,255,0.25)]';
      case 'soft':
        return 'shadow-sm hover:shadow-md';
      default:
        return '';
    }
  };

  const activeLinks = links.filter(l => l.enabled);

  return (
    <div
      className="min-h-full w-full flex flex-col items-center justify-between transition-colors duration-300 relative selection:bg-emerald-500 selection:text-white"
      style={{
        background: theme.bgType === 'gradient' ? theme.bgGradient : theme.bgColor,
        color: theme.textColor,
        fontFamily: theme.fontFamily,
      }}
    >
      {/* Background ambient lighting if applicable */}
      {theme.bgType === 'mesh' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -right-40 w-96 h-96 bg-emerald-500/30 rounded-full blur-3xl" />
        </div>
      )}

      {/* Top Floating Action Buttons (Share & QR Code) */}
      <div className="w-full max-w-md px-4 pt-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold backdrop-blur-md bg-black/20 text-white/90 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live Bio
          </span>
        </div>
        <div className="flex items-center gap-2">
          {onQrClick && (
            <button
              onClick={onQrClick}
              className="p-2 rounded-full backdrop-blur-md bg-white/15 hover:bg-white/25 transition-all text-white border border-white/15 shadow-sm active:scale-90"
              title="Tampilkan QR Code"
              aria-label="QR Code"
            >
              <QrCode className="w-4 h-4" />
            </button>
          )}
          {onShareClick && (
            <button
              onClick={onShareClick}
              className="p-2 rounded-full backdrop-blur-md bg-white/15 hover:bg-white/25 transition-all text-white border border-white/15 shadow-sm active:scale-90"
              title="Bagikan Profil"
              aria-label="Bagikan Profil"
            >
              <Share2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Profile Content Container */}
      <div className="w-full max-w-md px-5 py-6 flex-1 flex flex-col items-center z-10">
        {/* Profile Avatar with custom Ring */}
        <div className="relative group mb-3">
          <div
            className="w-24 h-24 rounded-full p-1 transition-transform duration-300 group-hover:scale-105"
            style={{
              boxShadow: `0 0 0 3px ${theme.avatarRing}`,
            }}
          >
            <img
              src={profile.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'}
              alt={profile.displayName}
              className="w-full h-full object-cover rounded-full bg-gray-200"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // Fallback avatar
                (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/bottts/svg?seed=${profile.username}`;
              }}
            />
          </div>
          {profile.verified && (
            <div
              className="absolute bottom-0 right-0 rounded-full bg-white p-0.5 shadow-md flex items-center justify-center text-blue-500"
              title="Terverifikasi"
            >
              <CheckCircle2 className="w-6 h-6 fill-blue-500 text-white" />
            </div>
          )}
        </div>

        {/* Display Name & Handle */}
        <div className="text-center mb-1">
          <h1 className="text-xl font-bold tracking-tight flex items-center justify-center gap-1.5">
            {profile.displayName || 'Nama Profil'}
          </h1>
          <p className="text-xs font-medium opacity-75 mt-0.5">@{profile.username || 'username'}</p>
        </div>

        {/* Location / Status Badge if enabled */}
        {(profile.statusBadge || profile.location) && (
          <div className="flex flex-wrap items-center justify-center gap-2 my-2">
            {profile.statusBadge && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-white/15 backdrop-blur-sm border border-white/20 text-current">
                <Zap className="w-3 h-3 text-amber-400" />
                {profile.statusBadge}
              </span>
            )}
            {profile.location && (
              <span className="inline-flex items-center gap-1 text-xs opacity-75">
                <MapPin className="w-3 h-3" />
                {profile.location}
              </span>
            )}
          </div>
        )}

        {/* Bio Text */}
        {profile.bio && (
          <p
            className="text-xs sm:text-sm text-center max-w-xs leading-relaxed my-2.5 font-normal"
            style={{ color: theme.bioColor || 'inherit' }}
          >
            {profile.bio}
          </p>
        )}

        {/* Social Icons Bar */}
        <SocialIcons
          socials={profile.socials}
          color={theme.textColor}
          onSocialClick={(platform, url) => {
            StorageService.recordClick(`social-${platform}`, `Social: ${platform}`);
          }}
        />

        {/* Links List */}
        <div className="w-full space-y-3 mt-4">
          {activeLinks.map((link) => {
            // Header / Section Divider
            if (link.type === 'header') {
              return (
                <div key={link.id} className="pt-3 pb-1 text-center">
                  <h2 className="text-xs font-bold uppercase tracking-wider opacity-85 px-3 py-1 inline-block rounded-md">
                    {link.title}
                  </h2>
                </div>
              );
            }

            // Animation classes
            let animClass = '';
            if (link.animation === 'pulse') animClass = 'animate-pulse';
            if (link.animation === 'bounce') animClass = 'animate-bounce';

            const isClicked = clickedLinkId === link.id;

            return (
              <a
                key={link.id}
                href={link.url || '#'}
                target={isSimulated ? '_blank' : '_blank'}
                rel="noopener noreferrer"
                onClick={(e) => handleLinkClick(link, e)}
                style={{
                  backgroundColor: theme.cardBg,
                  color: theme.cardText,
                  borderColor: theme.cardBorder,
                }}
                className={`group relative w-full p-3.5 flex items-center justify-between border transition-all duration-200 ${getButtonShapeClass()} ${getShadowClass()} ${animClass} ${
                  isClicked ? 'scale-[0.97] opacity-90' : 'hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                {/* Highlight Badge if enabled */}
                {link.highlight && (
                  <span
                    style={{ backgroundColor: theme.accentColor, color: '#ffffff' }}
                    className="absolute -top-2.5 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1 uppercase tracking-wider"
                  >
                    <Flame className="w-2.5 h-2.5 fill-white" />
                    {link.highlightText || 'HOT'}
                  </span>
                )}

                {/* Left Icon / Thumbnail */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-10 h-10 rounded-xl bg-black/10 dark:bg-white/10 flex items-center justify-center shrink-0 overflow-hidden">
                    {link.thumbnailUrl ? (
                      <img
                        src={link.thumbnailUrl}
                        alt=""
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      getLinkIcon(link.iconName, link.type)
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <div className="min-w-0 flex-1 text-left">
                    <div className="font-semibold text-sm leading-snug line-clamp-1 group-hover:underline">
                      {link.title}
                    </div>
                    {link.subtitle && (
                      <div className="text-xs opacity-75 line-clamp-1 mt-0.5 font-normal">
                        {link.subtitle}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Arrow / Action Indicator */}
                <div className="pl-2 shrink-0 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </a>
            );
          })}

          {activeLinks.length === 0 && (
            <div className="p-8 text-center rounded-2xl border border-dashed border-white/20 bg-white/5 text-xs opacity-70">
              Belum ada tautan aktif. Tambahkan tautan di tab editor.
            </div>
          )}
        </div>
      </div>

      {/* Footer Branding & Fast Loading Indicator */}
      <div className="w-full max-w-md px-4 py-4 text-center z-10">
        <div className="inline-flex items-center gap-1.5 text-[11px] font-medium opacity-60 hover:opacity-100 transition-opacity">
          <Sparkles className="w-3 h-3 text-emerald-400" />
          <span>Dibuat dengan lynkbio</span>
        </div>
      </div>
    </div>
  );
};
