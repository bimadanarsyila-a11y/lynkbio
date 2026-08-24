import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  GripVertical,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Flame,
  ExternalLink,
  MessageCircle,
  Youtube,
  FileText,
  Coffee,
  ShoppingBag,
  Globe,
  CheckCircle2,
  Eye,
  EyeOff,
  Radio,
  Send,
  PlusCircle,
  HelpCircle,
  Layers,
  Image as ImageIcon,
  Share2,
} from 'lucide-react';
import { UserProfile, BioLink, SocialLink, LinkType } from '../types';

interface LinksEditorProps {
  profile: UserProfile;
  links: BioLink[];
  onUpdateProfile: (profile: UserProfile) => void;
  onUpdateLinks: (links: BioLink[]) => void;
  onOpenAiAssistant: () => void;
}

export const LinksEditor: React.FC<LinksEditorProps> = ({
  profile,
  links,
  onUpdateProfile,
  onUpdateLinks,
  onOpenAiAssistant,
}) => {
  const [activeTab, setActiveTab] = useState<'links' | 'profile' | 'socials'>('links');
  const [newLinkModalOpen, setNewLinkModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Add new link helper
  const handleAddLink = (type: LinkType) => {
    let newLink: BioLink;

    if (type === 'header') {
      newLink = {
        id: `header-${Date.now()}`,
        type: 'header',
        title: '📂 Kategori Baru',
        url: '',
        enabled: true,
        clicks: 0,
        createdAt: Date.now(),
      };
    } else if (type === 'contact') {
      newLink = {
        id: `link-${Date.now()}`,
        type: 'contact',
        title: '💬 Hubungi Saya di WhatsApp',
        subtitle: 'Respon cepat untuk pertanyaan & kolaborasi',
        url: 'https://wa.me/6281234567890?text=Halo%20saya%20tertarik%20bekerjasama',
        iconName: 'MessageCircle',
        enabled: true,
        clicks: 0,
        createdAt: Date.now(),
        category: 'Kontak',
      };
    } else if (type === 'donation') {
      newLink = {
        id: `link-${Date.now()}`,
        type: 'standard',
        title: '☕ Dukung Saya (Saweria / Trakteer)',
        subtitle: 'Dukungan untuk terus berkarya',
        url: 'https://saweria.co',
        iconName: 'Coffee',
        highlight: true,
        highlightText: 'SUPPORT',
        enabled: true,
        clicks: 0,
        createdAt: Date.now(),
        category: 'Donasi',
      };
    } else {
      newLink = {
        id: `link-${Date.now()}`,
        type: 'standard',
        title: 'Judul Tautan Baru',
        subtitle: 'Deskripsi singkat atau ajakan klik',
        url: 'https://',
        iconName: 'Globe',
        enabled: true,
        clicks: 0,
        createdAt: Date.now(),
        category: 'Umum',
      };
    }

    const updated = [newLink, ...links];
    onUpdateLinks(updated);
    setNewLinkModalOpen(false);
  };

  const handleUpdateLink = (id: string, updates: Partial<BioLink>) => {
    const updated = links.map(l => (l.id === id ? { ...l, ...updates } : l));
    onUpdateLinks(updated);
  };

  const handleDeleteLink = (id: string) => {
    const updated = links.filter(l => l.id !== id);
    onUpdateLinks(updated);
  };

  const handleMoveLink = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === links.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const newLinks = [...links];
    const temp = newLinks[index];
    newLinks[index] = newLinks[targetIndex];
    newLinks[targetIndex] = temp;
    onUpdateLinks(newLinks);
  };

  const handleUpdateSocial = (platform: string, url: string, enabled: boolean) => {
    const socials = [...profile.socials];
    const idx = socials.findIndex(s => s.platform === platform);
    if (idx !== -1) {
      socials[idx] = { ...socials[idx], url, enabled };
    } else {
      socials.push({ id: `soc-${Date.now()}`, platform: platform as any, url, enabled });
    }
    onUpdateProfile({ ...profile, socials });
  };

  const categories = Array.from(new Set(links.map(l => l.category).filter(Boolean)));

  const filteredLinks = selectedCategory === 'all'
    ? links
    : links.filter(l => l.category === selectedCategory || l.type === 'header');

  return (
    <div className="w-full max-w-full space-y-4 sm:space-y-6 text-slate-900 min-w-0 overflow-hidden">
      {/* Sub-Navigation Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 bg-white p-2 sm:p-2.5 rounded-2xl border border-slate-200/80 shadow-2xs min-w-0">
        <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('links')}
            className={`flex-1 sm:flex-none px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all text-center ${
              activeTab === 'links'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Tautan ({links.length})
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 sm:flex-none px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all text-center ${
              activeTab === 'profile'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Profil
          </button>
          <button
            onClick={() => setActiveTab('socials')}
            className={`flex-1 sm:flex-none px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all text-center ${
              activeTab === 'socials'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Sosial
          </button>
        </div>

        <button
          onClick={onOpenAiAssistant}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl text-xs font-semibold bg-slate-950 text-white shadow-xs hover:bg-slate-800 transition-all active:scale-95 shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>AI Assistant</span>
        </button>
      </div>

      {/* TAB 1: LINKS MANAGEMENT */}
      {activeTab === 'links' && (
        <div className="space-y-3 sm:space-y-4 min-w-0">
          {/* Action Bar: Add Link Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 bg-white p-3 sm:p-4 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => handleAddLink('standard')}
                className="flex-1 xs:flex-none inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-sm transition-all active:scale-95"
              >
                <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Tambah Tautan</span>
              </button>
              <button
                onClick={() => handleAddLink('header')}
                className="inline-flex items-center justify-center gap-1 px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs font-semibold bg-slate-100 border border-slate-200/60 text-slate-700 hover:bg-slate-200 transition-all"
                title="Tambah Pemisah Bagian"
              >
                <Layers className="w-3.5 h-3.5 text-slate-500" />
                <span>+ Header</span>
              </button>
              <button
                onClick={() => handleAddLink('contact')}
                className="inline-flex items-center justify-center gap-1 px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs font-semibold bg-slate-100 border border-slate-200/60 text-slate-700 hover:bg-slate-200 transition-all"
                title="WhatsApp Direct"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>+ WA</span>
              </button>
            </div>

            {categories.length > 0 && (
              <div className="flex items-center gap-1.5 text-xs min-w-0">
                <span className="text-slate-400 font-medium shrink-0">Filter:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="flex-1 sm:flex-none px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 min-w-0"
                >
                  <option value="all">Semua Kategori</option>
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Links List Cards */}
          <div className="space-y-2.5 sm:space-y-3 min-w-0">
            {filteredLinks.map((link, index) => {
              const isHeader = link.type === 'header';

              if (isHeader) {
                return (
                  <div
                    key={link.id}
                    className="p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-slate-100/90 border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 min-w-0"
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <div className="flex flex-col gap-0.5 text-slate-400 shrink-0">
                        <button
                          onClick={() => handleMoveLink(index, 'up')}
                          disabled={index === 0}
                          className="hover:text-slate-900 disabled:opacity-30 p-0.5"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleMoveLink(index, 'down')}
                          disabled={index === links.length - 1}
                          className="hover:text-slate-900 disabled:opacity-30 p-0.5"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <Layers className="w-4 h-4 text-slate-700 shrink-0" />
                      <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 shrink-0">Header:</span>
                      <input
                        type="text"
                        value={link.title}
                        onChange={(e) => handleUpdateLink(link.id, { title: e.target.value })}
                        placeholder="Judul Header / Bagian..."
                        className="flex-1 min-w-0 bg-transparent font-bold text-xs sm:text-sm text-slate-900 focus:outline-none border-b border-transparent focus:border-slate-400 px-1"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-1.5 self-end sm:self-auto shrink-0">
                      <button
                        onClick={() => handleUpdateLink(link.id, { enabled: !link.enabled })}
                        className={`p-1.5 px-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors ${
                          link.enabled
                            ? 'text-slate-900 bg-slate-200'
                            : 'text-slate-400 bg-slate-200/50'
                        }`}
                        title={link.enabled ? 'Aktif' : 'Nonaktif'}
                      >
                        {link.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        <span className="text-[11px] sm:hidden">{link.enabled ? 'Aktif' : 'Nonaktif'}</span>
                      </button>
                      <button
                        onClick={() => handleDeleteLink(link.id)}
                        className="p-1.5 px-2 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors flex items-center gap-1"
                        title="Hapus Header"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span className="text-[11px] sm:hidden">Hapus</span>
                      </button>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={link.id}
                  className={`p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl border transition-all min-w-0 ${
                    link.enabled
                      ? 'bg-white border-slate-100 shadow-sm'
                      : 'bg-slate-50/80 border-slate-200/50 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-2.5 sm:gap-3 min-w-0">
                    {/* Reorder Buttons */}
                    <div className="flex flex-col gap-1 pt-0.5 text-slate-400 shrink-0">
                      <button
                        onClick={() => handleMoveLink(index, 'up')}
                        disabled={index === 0}
                        className="p-1 rounded-lg hover:bg-slate-100 hover:text-slate-900 disabled:opacity-30 transition-colors"
                        title="Geser Naik"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleMoveLink(index, 'down')}
                        disabled={index === links.length - 1}
                        className="p-1 rounded-lg hover:bg-slate-100 hover:text-slate-900 disabled:opacity-30 transition-colors"
                        title="Geser Turun"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Link Fields */}
                    <div className="flex-1 min-w-0 space-y-2.5 sm:space-y-3">
                      {/* Title & Click Count Pill */}
                      <div className="flex items-center justify-between gap-2 min-w-0">
                        <input
                          type="text"
                          value={link.title}
                          onChange={(e) => handleUpdateLink(link.id, { title: e.target.value })}
                          placeholder="Judul Tautan..."
                          className="flex-1 min-w-0 font-bold text-xs sm:text-sm text-slate-900 bg-transparent border-b border-slate-200 focus:border-slate-900 focus:outline-none pb-0.5"
                        />
                        <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-slate-100 text-slate-700 shrink-0">
                          <Flame className="w-3 h-3 text-amber-500" />
                          <span>{link.clicks || 0}</span>
                          <span className="hidden xs:inline">Klik</span>
                        </span>
                      </div>

                      {/* Subtitle / Description */}
                      <input
                        type="text"
                        value={link.subtitle || ''}
                        onChange={(e) => handleUpdateLink(link.id, { subtitle: e.target.value })}
                        placeholder="Deskripsi singkat (opsional)..."
                        className="w-full text-[11px] sm:text-xs text-slate-500 bg-transparent border-b border-slate-100 focus:border-slate-900 focus:outline-none pb-0.5 min-w-0"
                      />

                      {/* Destination URL & Icon Selector */}
                      <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2 min-w-0">
                        <div className="relative flex-1 min-w-0">
                          <ExternalLink className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 shrink-0" />
                          <input
                            type="url"
                            value={link.url}
                            onChange={(e) => handleUpdateLink(link.id, { url: e.target.value })}
                            placeholder="https://..."
                            className="w-full pl-8 pr-3 py-1.5 sm:py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:border-slate-900 focus:outline-none font-medium min-w-0"
                          />
                        </div>

                        {/* Icon Type selector */}
                        <select
                          value={link.iconName || 'Globe'}
                          onChange={(e) => handleUpdateLink(link.id, { iconName: e.target.value })}
                          className="px-2.5 py-1.5 sm:py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shrink-0"
                        >
                          <option value="Globe">🌐 Web</option>
                          <option value="Youtube">🎥 YouTube</option>
                          <option value="MessageCircle">💬 WhatsApp</option>
                          <option value="FileText">📑 Dokumen</option>
                          <option value="Coffee">☕ Saweria</option>
                          <option value="ShoppingBag">🛍️ Toko</option>
                        </select>
                      </div>

                      {/* Advanced options: Highlight badge & Animation & Controls */}
                      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-t border-slate-100 text-xs min-w-0">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 min-w-0">
                          <label className="flex items-center gap-1.5 cursor-pointer select-none shrink-0">
                            <input
                              type="checkbox"
                              checked={link.highlight || false}
                              onChange={(e) => handleUpdateLink(link.id, { highlight: e.target.checked })}
                              className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                            />
                            <span className="text-slate-600 font-medium text-[11px] sm:text-xs">Highlight</span>
                          </label>

                          {link.highlight && (
                            <input
                              type="text"
                              value={link.highlightText || 'HOT'}
                              onChange={(e) => handleUpdateLink(link.id, { highlightText: e.target.value })}
                              placeholder="Badge (cth: BARU!)"
                              className="w-20 px-2 py-0.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] sm:text-[11px] font-bold text-center"
                            />
                          )}

                          <select
                            value={link.animation || 'none'}
                            onChange={(e) => handleUpdateLink(link.id, { animation: e.target.value as any })}
                            className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] sm:text-[11px] text-slate-600 font-medium"
                          >
                            <option value="none">Animasi: Tidak Ada</option>
                            <option value="pulse">Animasi: Pulse</option>
                            <option value="bounce">Animasi: Bounce</option>
                          </select>
                        </div>

                        {/* Controls (Toggle active & Delete) */}
                        <div className="flex items-center justify-end gap-1.5 shrink-0 self-end sm:self-auto">
                          <button
                            onClick={() => handleUpdateLink(link.id, { enabled: !link.enabled })}
                            className={`p-1.5 px-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors ${
                              link.enabled
                                ? 'text-slate-900 bg-slate-100 hover:bg-slate-200'
                                : 'text-slate-400 bg-slate-100/60'
                            }`}
                            title={link.enabled ? 'Tautan Aktif' : 'Tautan Disembunyikan'}
                          >
                            {link.enabled ? <Eye className="w-3.5 h-3.5 text-slate-900" /> : <EyeOff className="w-3.5 h-3.5" />}
                            <span className="text-[11px]">{link.enabled ? 'Aktif' : 'Nonaktif'}</span>
                          </button>

                          <button
                            onClick={() => handleDeleteLink(link.id)}
                            className="p-1.5 px-2 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors flex items-center gap-1"
                            title="Hapus Tautan"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span className="text-[11px] font-semibold sm:hidden">Hapus</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredLinks.length === 0 && (
              <div className="p-6 sm:p-8 text-center rounded-2xl sm:rounded-3xl border border-dashed border-slate-200 bg-white text-slate-500">
                <p className="font-semibold text-sm text-slate-800">Belum ada tautan yang dibuat.</p>
                <p className="text-xs mt-1 text-slate-400">Klik tombol "Tambah Tautan" di atas untuk menambahkan link pertamamu.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: PROFILE INFO */}
      {activeTab === 'profile' && (
        <div className="bg-white p-4 sm:p-7 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm space-y-4 sm:space-y-5 min-w-0">
          <h3 className="text-sm sm:text-base font-bold text-slate-900">
            Informasi Profil & Identitas
          </h3>

          {/* Avatar Picture Picker & Presets */}
          <div className="space-y-2 min-w-0">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Foto Profil (URL Gambar)</label>
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <img
                src={profile.avatarUrl}
                alt="Avatar preview"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-slate-900 shadow-xs shrink-0"
              />
              <input
                type="url"
                value={profile.avatarUrl}
                onChange={(e) => onUpdateProfile({ ...profile, avatarUrl: e.target.value })}
                placeholder="https://..."
                className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 font-medium min-w-0"
              />
            </div>

            {/* Quick avatar presets */}
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <span className="text-[11px] text-slate-400 font-medium shrink-0">Pilihan Cepat:</span>
              {[
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
                'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
              ].map((url, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => onUpdateProfile({ ...profile, avatarUrl: url })}
                  className="w-7 h-7 rounded-full overflow-hidden border border-slate-300 hover:scale-110 transition-transform shrink-0"
                >
                  <img src={url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Display Name & Handle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 min-w-0">
            <div className="space-y-1 min-w-0">
              <label className="text-xs font-bold text-slate-700">Nama Tampilan</label>
              <input
                type="text"
                value={profile.displayName}
                onChange={(e) => onUpdateProfile({ ...profile, displayName: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:border-slate-900 focus:outline-none min-w-0"
              />
            </div>
            <div className="space-y-1 min-w-0">
              <label className="text-xs font-bold text-slate-700">Username Handle</label>
              <div className="relative min-w-0">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">@</span>
                <input
                  type="text"
                  value={profile.username}
                  onChange={(e) => onUpdateProfile({ ...profile, username: e.target.value.toLowerCase().replace(/\s+/g, '') })}
                  className="w-full pl-7 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:border-slate-900 focus:outline-none min-w-0"
                />
              </div>
            </div>
          </div>

          {/* Bio Text */}
          <div className="space-y-1 min-w-0">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Bio Singkat</label>
              <button
                type="button"
                onClick={onOpenAiAssistant}
                className="text-[11px] font-bold text-slate-900 hover:underline flex items-center gap-1 shrink-0"
              >
                <Sparkles className="w-3 h-3 text-amber-500" /> Buat dengan AI
              </button>
            </div>
            <textarea
              rows={3}
              value={profile.bio}
              onChange={(e) => onUpdateProfile({ ...profile, bio: e.target.value })}
              placeholder="Ceritakan tentang dirimu, profesi, atau apa yang kamu bagikan..."
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl leading-relaxed text-slate-800 focus:border-slate-900 focus:outline-none min-w-0"
            />
          </div>

          {/* Status Badge & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 min-w-0">
            <div className="space-y-1 min-w-0">
              <label className="text-xs font-bold text-slate-700">Pill Status (Opsional)</label>
              <input
                type="text"
                value={profile.statusBadge || ''}
                onChange={(e) => onUpdateProfile({ ...profile, statusBadge: e.target.value })}
                placeholder="🚀 Open for projects"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:border-slate-900 focus:outline-none min-w-0"
              />
            </div>
            <div className="space-y-1 min-w-0">
              <label className="text-xs font-bold text-slate-700">Lokasi / Kota</label>
              <input
                type="text"
                value={profile.location || ''}
                onChange={(e) => onUpdateProfile({ ...profile, location: e.target.value })}
                placeholder="Jakarta, Indonesia"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:border-slate-900 focus:outline-none min-w-0"
              />
            </div>
          </div>

          {/* Verified Badge Checkbox */}
          <label className="flex items-center gap-2 pt-1 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={profile.verified}
              onChange={(e) => onUpdateProfile({ ...profile, verified: e.target.checked })}
              className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
            />
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
              Tampilkan Lencana Centang Biru (Verified)
            </span>
          </label>
        </div>
      )}

      {/* TAB 3: SOCIAL MEDIA LINKS */}
      {activeTab === 'socials' && (
        <div className="bg-white p-4 sm:p-7 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm space-y-3 sm:space-y-4 min-w-0">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Ikon Sosial Media
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Ikon akan otomatis muncul di bagian atas halaman profil bio Anda.
            </p>
          </div>

          <div className="space-y-2 sm:space-y-2.5 min-w-0">
            {[
              { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/username' },
              { key: 'tiktok', label: 'TikTok', placeholder: 'https://tiktok.com/@username' },
              { key: 'youtube', label: 'YouTube', placeholder: 'https://youtube.com/@channel' },
              { key: 'whatsapp', label: 'WhatsApp', placeholder: 'https://wa.me/6281234567890' },
              { key: 'twitter', label: 'Twitter / X', placeholder: 'https://x.com/username' },
              { key: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/in/username' },
              { key: 'github', label: 'GitHub', placeholder: 'https://github.com/username' },
              { key: 'spotify', label: 'Spotify', placeholder: 'https://open.spotify.com/user/id' },
              { key: 'telegram', label: 'Telegram', placeholder: 'https://t.me/username' },
              { key: 'email', label: 'Email', placeholder: 'mailto:kamu@domain.com' },
            ].map((soc) => {
              const current = profile.socials.find(s => s.platform === soc.key);
              const isEnabled = current ? current.enabled : false;
              const urlValue = current ? current.url : '';

              return (
                <div
                  key={soc.key}
                  className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200/70 min-w-0"
                >
                  <input
                    type="checkbox"
                    checked={isEnabled}
                    onChange={(e) => handleUpdateSocial(soc.key, urlValue, e.target.checked)}
                    className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 shrink-0"
                  />
                  <span className="w-16 sm:w-24 text-[11px] sm:text-xs font-bold text-slate-800 truncate shrink-0">
                    {soc.label}
                  </span>
                  <input
                    type="text"
                    value={urlValue}
                    onChange={(e) => handleUpdateSocial(soc.key, e.target.value, isEnabled || e.target.value.length > 0)}
                    placeholder={soc.placeholder}
                    className="flex-1 min-w-0 px-2.5 sm:px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg sm:rounded-xl focus:outline-none focus:border-slate-900 font-medium"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
