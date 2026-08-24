import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Share2,
  MessageCircle,
  Send,
  Twitter,
  Facebook,
  Mail,
  Smartphone,
} from 'lucide-react';
import { UserProfile } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, profile }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const bioUrl = `${window.location.origin}${window.location.pathname}#/@${profile.username || 'user'}`;
  const shareText = `Kunjungi halaman profil tautan bio ${profile.displayName}: ${bioUrl}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(bioUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profile.displayName} - lynkbio`,
          text: profile.bio || shareText,
          url: bioUrl,
        });
      } catch (err) {
        console.log('Share canceled');
      }
    } else {
      handleCopy();
    }
  };

  const shareChannels = [
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="w-5 h-5 text-emerald-500" />,
      url: `https://wa.me/?text=${encodeURIComponent(shareText)}`,
      color: 'hover:bg-emerald-50 dark:hover:bg-emerald-950/40',
    },
    {
      name: 'Telegram',
      icon: <Send className="w-5 h-5 text-sky-500" />,
      url: `https://t.me/share/url?url=${encodeURIComponent(bioUrl)}&text=${encodeURIComponent(shareText)}`,
      color: 'hover:bg-sky-50 dark:hover:bg-sky-950/40',
    },
    {
      name: 'Twitter / X',
      icon: <Twitter className="w-5 h-5 text-zinc-900 dark:text-zinc-100" />,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
      color: 'hover:bg-zinc-100 dark:hover:bg-zinc-800',
    },
    {
      name: 'Facebook',
      icon: <Facebook className="w-5 h-5 text-blue-600" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(bioUrl)}`,
      color: 'hover:bg-blue-50 dark:hover:bg-blue-950/40',
    },
    {
      name: 'Email',
      icon: <Mail className="w-5 h-5 text-amber-500" />,
      url: `mailto:?subject=${encodeURIComponent(profile.displayName + ' Bio Link')}&body=${encodeURIComponent(shareText)}`,
      color: 'hover:bg-amber-50 dark:hover:bg-amber-950/40',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-sm bg-white rounded-3xl p-7 shadow-xl border border-slate-100 text-center space-y-5">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-900 mx-auto flex items-center justify-center shadow-xs">
            <Share2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Bagikan Profil Anda
          </h3>
          <p className="text-xs text-slate-500">
            Sebarkan tautan profil bio ke media sosial atau teman Anda.
          </p>
        </div>

        {/* Share Channels */}
        <div className="grid grid-cols-5 gap-2 pt-1">
          {shareChannels.map((ch) => (
            <a
              key={ch.name}
              href={ch.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all transform hover:scale-105 active:scale-95 shadow-xs"
            >
              {ch.icon}
              <span className="text-[10px] font-semibold text-slate-700 mt-1 truncate max-w-full">
                {ch.name.split('/')[0]}
              </span>
            </a>
          ))}
        </div>

        {/* Copy Link Input Bar */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-50 border border-slate-200">
            <input
              type="text"
              readOnly
              value={bioUrl}
              className="flex-1 px-2.5 text-xs bg-transparent text-slate-700 font-mono truncate focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-all flex items-center gap-1 shrink-0 shadow-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin!' : 'Salin'}</span>
            </button>
          </div>

          {'share' in navigator && (
            <button
              onClick={handleNativeShare}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Smartphone className="w-4 h-4" />
              <span>Buka Menu Berbagi Bawaan Handphone</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
