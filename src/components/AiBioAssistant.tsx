import React, { useState } from 'react';
import { X, Sparkles, Check, RefreshCw, Wand2, Copy } from 'lucide-react';
import { UserProfile, BioLink } from '../types';

interface AiBioAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyBio: (newBio: string) => void;
  onAddSuggestedLink: (title: string, subtitle: string, url: string, iconName: string) => void;
}

export const AiBioAssistant: React.FC<AiBioAssistantProps> = ({
  isOpen,
  onClose,
  onApplyBio,
  onAddSuggestedLink,
}) => {
  const [role, setRole] = useState('kreator');
  const [keywords, setKeywords] = useState('tips teknologi, review gadget, tutorial produktivitas');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const sampleBios: Record<string, string[]> = {
    kreator: [
      '✨ Content Creator & Tech Geek | Membantu kamu melek teknologi & produktif setiap hari 🚀',
      '🎥 Berbagi tutorial, review jujur & tips digital | Simak tautan terbaru di bawah! 👇',
      '💡 Tips produktivitas, AI tools & gaya hidup digital modern. Let’s connect!',
    ],
    bisnis: [
      '🛍️ Official Store & Brand | Produk kualitas premium dengan diskon khusus follower hari ini ✨',
      '📦 Solusi kebutuhan harianmu | Chat admin via WhatsApp untuk konsultasi cepat & katalog lengkap!',
      '🔥 Promo Terbatas! Beli langsung atau cek testimoni ribuan pelanggan puas di bawah.',
    ],
    freelance: [
      '💻 Fullstack Web Developer & UI/UX Designer | Menerima jasa pembuatan web modern & konsultasi 🚀',
      '🎨 Creative Designer & Visual Storyteller | Portfolio, kontak WhatsApp & rate card tersedia di bawah.',
      '⚡ Membantu bisnis Anda go digital dengan website cepat & responsif. Mari berkolaborasi!',
    ],
    musik: [
      '🎵 Musisi Indie & Produser Musik | Single terbaru sudah rilis di semua streaming platform 🎧',
      '🎸 Dengarkan lagu terbaru, jadwal manggung & merchandise eksklusif di tautan bawah!',
    ],
  };

  const sampleLinks: Record<string, { title: string; subtitle: string; url: string; icon: string }[]> = {
    kreator: [
      { title: '🎥 Video Terbaru di YouTube', subtitle: 'Tonton review lengkap & kupas tuntas', url: 'https://youtube.com', icon: 'Youtube' },
      { title: '📑 Download E-Book / Notion Template Gratis', subtitle: 'Panduan step-by-step mulai dari nol', url: 'https://gumroad.com', icon: 'FileText' },
      { title: '💬 Konsultasi & Kerja Sama Bisnis', subtitle: 'Hubungi langsung via WhatsApp', url: 'https://wa.me/6281234567890', icon: 'MessageCircle' },
    ],
    bisnis: [
      { title: '🛍️ Belanja di Shopee / Tokopedia', subtitle: 'Gratis ongkir & cashback ekstra', url: 'https://shopee.co.id', icon: 'ShoppingBag' },
      { title: '💬 Chat Admin CS (Order Cepat)', subtitle: 'Respon ramah 24/7', url: 'https://wa.me/6281234567890', icon: 'MessageCircle' },
      { title: '⭐ Lihat Testimoni & Review Pelanggan', subtitle: 'Bukti kepuasan 10,000+ pembeli', url: 'https://instagram.com', icon: 'Globe' },
    ],
    freelance: [
      { title: '🌐 Lihat Portfolio & Studi Kasus', subtitle: 'Hasil project live dan review klien', url: 'https://github.com', icon: 'Globe' },
      { title: '📋 Formulir Request Project / Penawaran', subtitle: 'Dapatkan estimasi biaya gratis dalam 24 jam', url: 'https://docs.google.com', icon: 'FileText' },
    ],
    musik: [
      { title: '🎧 Putar Single Terbaru di Spotify', subtitle: 'Stream sekarang & tambahkan ke playlist', url: 'https://spotify.com', icon: 'Globe' },
      { title: '🎫 Tiket Konser & Jadwal Manggung', subtitle: 'Pesan tiket sebelum kehabisan', url: 'https://loket.com', icon: 'Globe' },
    ],
  };

  const currentBios = sampleBios[role] || sampleBios['kreator'];
  const currentLinks = sampleLinks[role] || sampleLinks['kreator'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-8 shadow-xl border border-slate-100 space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              AI Bio & Link Copy Assistant
            </h3>
            <p className="text-xs text-slate-500">
              Hasilkan bio menarik & judul tautan dengan konversi klik tinggi.
            </p>
          </div>
        </div>

        {/* Role Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Pilih Kategori Profesi Anda</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'kreator', label: '🎬 Kreator Konten' },
              { id: 'bisnis', label: '🛍️ Toko / Bisnis' },
              { id: 'freelance', label: '💻 Freelancer / Dev' },
              { id: 'musik', label: '🎵 Musisi / Artis' },
            ].map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => setRole(item.id)}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold text-center border transition-all ${
                  role === item.id
                    ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Suggested Bios */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700">Rekomendasi Bio Siap Pakai</label>
          <div className="space-y-2">
            {currentBios.map((bioText, i) => (
              <div
                key={i}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-start justify-between gap-3 text-xs"
              >
                <p className="flex-1 text-slate-800 leading-relaxed font-medium">
                  {bioText}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onApplyBio(bioText);
                    setCopiedIndex(i);
                    setTimeout(() => setCopiedIndex(null), 1500);
                  }}
                  className="px-3 py-1.5 rounded-xl font-bold bg-slate-900 hover:bg-slate-800 text-white shrink-0 transition-all text-[11px] flex items-center gap-1 shadow-xs"
                >
                  {copiedIndex === i ? <Check className="w-3.5 h-3.5" /> : <Wand2 className="w-3.5 h-3.5" />}
                  <span>{copiedIndex === i ? 'Diterapkan!' : 'Gunakan'}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Suggested Link Templates */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label className="text-xs font-bold text-slate-700">Rekomendasi Template Tautan</label>
          <div className="space-y-2">
            {currentLinks.map((linkItem, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between gap-3 text-xs"
              >
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-slate-900 truncate">
                    {linkItem.title}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    {linkItem.subtitle}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onAddSuggestedLink(linkItem.title, linkItem.subtitle, linkItem.url, linkItem.icon);
                    onClose();
                  }}
                  className="px-3 py-1.5 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800 shrink-0 transition-all text-[11px]"
                >
                  + Pasang
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
