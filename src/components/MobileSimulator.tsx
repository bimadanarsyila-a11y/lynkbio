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
  Signal,
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
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="w-full max-w-[420px] flex flex-col items-center">
      {/* Control Bar */}
      <div className="w-full mb-4 p-3 bg-white rounded-2xl border-2 border-gray-200 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          {/* URL Display */}
          <div className="flex items-center gap-2 flex-1 min-w-0 px-3 py-2 bg-gray-50 rounded-xl border border-gray-200">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
            <span className="text-xs font-mono text-gray-600 truncate">
              lynkbio.to/@{profile.username || 'user'}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
              title="Copy Link"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={handleRefresh}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
              title="Refresh"
            >
              <RotateCw className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenFullPreview}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold text-xs transition-colors"
              title="Full Preview"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>
          </div>
        </div>
      </div>

      {/* Phone Mockup */}
      <div className="relative">
        {/* Phone Frame */}
        <div className="relative bg-gray-900 rounded-[3.5rem] p-3 shadow-2xl">
          {/* Inner bezel */}
          <div className="relative bg-white rounded-[3rem] overflow-hidden">
            {/* Dynamic Island */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-black rounded-b-3xl z-50 flex items-center justify-end px-3 gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-800" />
              <div className="w-2 h-2 rounded-full bg-gray-700" />
            </div>

            {/* Screen Content Container */}
            <div className="relative w-[340px] h-[680px] bg-white rounded-[2.75rem] overflow-hidden flex flex-col">
              {/* Status Bar */}
              <div className="absolute top-0 left-0 right-0 h-12 pt-2 px-8 flex items-center justify-between text-[11px] font-semibold text-gray-900 z-40 bg-gradient-to-b from-white to-transparent">
                <span>9:41</span>
                <div className="flex items-center gap-1">
                  <Signal className="w-3.5 h-3.5" />
                  <Wifi className="w-3.5 h-3.5" />
                  <Battery className="w-4 h-4" />
                </div>
              </div>

              {/* Scrollable Bio Content */}
              <div
                key={refreshKey}
                className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar pt-12"
              >
                <PublicBioPage
                  profile={profile}
                  links={links}
                  onShareClick={onOpenShare}
                  onQrClick={onOpenQr}
                  isSimulated={true}
                />
              </div>

              {/* Home Indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-gray-900/30 rounded-full z-40" />
            </div>
          </div>
        </div>

        {/* Floating Label */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-white rounded-full border-2 border-gray-200 shadow-lg whitespace-nowrap">
          <Smartphone className="w-3.5 h-3.5 text-green-500" />
          <span className="text-xs font-semibold text-gray-700">Live Preview</span>
        </div>
      </div>

      <div className="h-10" />
    </div>
  );
};
