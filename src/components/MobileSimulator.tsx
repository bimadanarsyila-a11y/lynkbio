import React from 'react';
import {
  Smartphone,
  ExternalLink,
  Copy,
  QrCode,
  Check,
  Wifi,
  Battery,
  RotateCw,
} from 'lucide-react';
import { UserProfile, BioLink } from '../types';
import { PublicBioPage } from './PublicBioPage';

interface MobileSimulatorProps {
  profile: UserProfile;
  links: BioLink[];
  onOpenQr: () => void;
  onOpenShare: () => void;
  onOpenFullPreview: () => void;
}

export const MobileSimulator: React.FC<MobileSimulatorProps> = ({
  profile,
  links,
  onOpenQr,
  onOpenShare,
  onOpenFullPreview,
}) => {
  const [copied, setCopied] = React.useState(false);
  const [refreshKey, setRefreshKey] = React.useState(0);

  const bioUrl = `${window.location.origin}${window.location.pathname}#/@${profile.username || 'user'}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(bioUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="w-full max-w-[400px] flex flex-col justify-center items-center bg-slate-200/50 rounded-[48px] border-8 border-white shadow-inner p-4">
      {/* Top Simulator Control Bar */}
      <div className="w-full flex items-center justify-between gap-2 mb-3 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm text-xs">
        <div className="flex items-center gap-2 min-w-0 flex-1 px-1">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold truncate text-slate-700">
            linkbio.to/{profile.username || 'user'}
          </span>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"
            title="Salin Tautan Bio"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={onOpenQr}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"
            title="QR Code"
          >
            <QrCode className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleRefresh}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"
            title="Muat Ulang Preview"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onOpenFullPreview}
            className="p-1.5 px-2.5 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-opacity flex items-center gap-1 shadow-xs"
            title="Buka Layar Penuh"
          >
            <ExternalLink className="w-3 h-3" />
            <span className="text-[10px]">Preview</span>
          </button>
        </div>
      </div>

      {/* Realistic Minimalist Phone Mockup Frame */}
      <div className="w-[310px] sm:w-[330px] h-[620px] bg-white rounded-[42px] shadow-2xl border-[6px] border-slate-900 flex flex-col items-center overflow-hidden relative select-none">
        {/* Dynamic Island / Top Camera Pill */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-900 rounded-full z-30 flex items-center justify-end px-2 pointer-events-none">
          <div className="w-2 h-2 rounded-full bg-slate-800" />
        </div>

        {/* Screen Container */}
        <div className="w-full h-full rounded-[36px] overflow-hidden bg-slate-50 flex flex-col relative">
          {/* Mock Status Bar */}
          <div className="w-full h-8 pt-2 px-6 flex items-center justify-between text-[10px] font-bold text-slate-800 z-20 pointer-events-none select-none">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <Wifi className="w-3 h-3 text-slate-800" />
              <Battery className="w-3.5 h-3.5 text-slate-800" />
            </div>
          </div>

          {/* Scrollable Live Bio Content */}
          <div
            key={refreshKey}
            className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none relative"
          >
            <PublicBioPage
              profile={profile}
              links={links}
              onShareClick={onOpenShare}
              onQrClick={onOpenQr}
              isSimulated={true}
            />
          </div>

          {/* Home indicator bar */}
          <div className="w-full h-3 bg-transparent flex items-center justify-center pointer-events-none absolute bottom-1 left-0 z-20">
            <div className="w-28 h-1 bg-slate-400/60 rounded-full" />
          </div>
        </div>
      </div>
      <p className="mt-3 text-[10px] text-slate-400 font-bold uppercase tracking-widest">Mobile Preview (Actual View)</p>
    </div>
  );
};
