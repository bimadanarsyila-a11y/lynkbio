import React, { useState } from 'react';
import { X, Download, Copy, Check, QrCode, Sparkles, Smartphone } from 'lucide-react';
import { UserProfile } from '../types';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({ isOpen, onClose, profile }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const bioUrl = `${window.location.origin}${window.location.pathname}#/@${profile.username || 'user'}`;

  // Use reliable quickchart / qrserver SVG or standard image
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
    bioUrl
  )}&margin=10`;

  const handleCopy = () => {
    navigator.clipboard.writeText(bioUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrImageUrl;
    link.download = `qrcode-${profile.username || 'lynkbio'}.png`;
    link.target = '_blank';
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-sm bg-white rounded-3xl p-7 shadow-xl border border-slate-100 text-center space-y-4">
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
            <QrCode className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            QR Code Profil
          </h3>
          <p className="text-xs text-slate-500">
            Pindai dengan kamera handphone untuk membuka profil bio Anda secara instan.
          </p>
        </div>

        {/* QR Code Container with user avatar */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 shadow-xs inline-block relative">
          <img
            src={qrImageUrl}
            alt="QR Code"
            className="w-52 h-52 mx-auto rounded-xl"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-md">
            <img
              src={profile.avatarUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Bio URL */}
        <div className="text-xs font-mono font-medium text-slate-600 truncate bg-slate-50 border border-slate-200 py-2 px-3 rounded-xl">
          {bioUrl}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            onClick={handleCopy}
            className="py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors flex items-center justify-center gap-1.5"
          >
            {copied ? <Check className="w-4 h-4 text-slate-900" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Tersalin!' : 'Salin URL'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors flex items-center justify-center gap-1.5 shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Download PNG</span>
          </button>
        </div>
      </div>
    </div>
  );
};
