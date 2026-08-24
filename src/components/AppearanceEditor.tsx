import React from 'react';
import {
  Palette,
  Type,
  LayoutTemplate,
  Sparkles,
  Check,
  Circle,
  Square,
  Layers,
  Flame,
  Sun,
  Moon,
} from 'lucide-react';
import { ProfileTheme, UserProfile, ButtonStyle, FontChoice } from '../types';
import { PRESET_THEMES } from '../data/presets';

interface AppearanceEditorProps {
  profile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
}

export const AppearanceEditor: React.FC<AppearanceEditorProps> = ({
  profile,
  onUpdateProfile,
}) => {
  const currentTheme = profile.theme;

  const handleSelectPresetTheme = (theme: ProfileTheme) => {
    onUpdateProfile({
      ...profile,
      theme: { ...theme },
    });
  };

  const handleUpdateTheme = (updates: Partial<ProfileTheme>) => {
    onUpdateProfile({
      ...profile,
      theme: {
        ...currentTheme,
        ...updates,
      },
    });
  };

  const buttonStyles: { id: ButtonStyle; label: string; desc: string }[] = [
    { id: 'rounded', label: 'Rounded', desc: 'Sudut melengkung modern' },
    { id: 'pill', label: 'Pill / Kapsul', desc: 'Sudut bulat sempurna' },
    { id: 'glass', label: 'Glassmorphism', desc: 'Efek kaca transparan & blur' },
    { id: 'shadow3d', label: '3D Brutalism', desc: 'Border tebal & shadow pop' },
    { id: 'outline', label: 'Garis Luar', desc: 'Transparan dengan border tegas' },
    { id: 'sharp', label: 'Kotak Tegas', desc: 'Minimalis persegi tanpa radius' },
  ];

  const fontOptions: FontChoice[] = [
    'Plus Jakarta Sans',
    'Inter',
    'Outfit',
    'Poppins',
    'Playfair Display',
    'Space Grotesk',
  ];

  return (
    <div className="w-full space-y-6 text-slate-900 font-sans">
      {/* 1. PRESET THEMES CAROUSEL */}
      <div className="bg-white p-5 sm:p-7 rounded-3xl border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-slate-900" />
            <h3 className="text-base font-bold text-slate-900">
              Pilihan Tema Siap Pakai
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">1 Klik Terapkan</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
          {PRESET_THEMES.map((theme) => {
            const isSelected = currentTheme.id === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => handleSelectPresetTheme(theme)}
                className={`relative p-3 rounded-2xl border text-left transition-all group overflow-hidden ${
                  isSelected
                    ? 'ring-2 ring-slate-950 border-transparent shadow-xs bg-slate-50'
                    : 'border-slate-200/80 hover:border-slate-400 bg-white'
                }`}
              >
                {/* Mini Theme Preview Canvas */}
                <div
                  className="w-full h-16 rounded-xl mb-2.5 p-2 flex flex-col justify-between items-center shadow-inner relative overflow-hidden"
                  style={{
                    background: theme.bgType === 'gradient' ? theme.bgGradient : theme.bgColor,
                  }}
                >
                  <div
                    className="w-4 h-4 rounded-full border border-white/40 shadow-xs"
                    style={{ backgroundColor: theme.avatarRing }}
                  />
                  <div
                    className="w-3/4 h-2.5 rounded border"
                    style={{
                      backgroundColor: theme.cardBg,
                      borderColor: theme.cardBorder,
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-900 truncate">
                    {theme.name}
                  </div>
                  {isSelected && (
                    <span className="w-4 h-4 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">
                      <Check className="w-2.5 h-2.5" />
                    </span>
                  )}
                </div>

                {theme.badge && (
                  <span className="text-[10px] text-slate-400 font-medium">
                    {theme.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. CUSTOM BACKGROUND & ACCENT */}
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-slate-900" />
          <h3 className="text-base font-bold text-slate-900">
            Kustomisasi Warna & Latar Belakang
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Background Color / Style */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Warna Latar (Background)</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={currentTheme.bgColor}
                onChange={(e) => handleUpdateTheme({ bgColor: e.target.value, bgType: 'solid' })}
                className="w-10 h-10 rounded-xl cursor-pointer border border-slate-200 bg-transparent p-0.5"
              />
              <input
                type="text"
                value={currentTheme.bgColor}
                onChange={(e) => handleUpdateTheme({ bgColor: e.target.value, bgType: 'solid' })}
                className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl uppercase font-mono text-slate-900 focus:outline-none focus:border-slate-900"
              />
            </div>
          </div>

          {/* Text Color */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Warna Teks Utama</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={currentTheme.textColor}
                onChange={(e) => handleUpdateTheme({ textColor: e.target.value })}
                className="w-10 h-10 rounded-xl cursor-pointer border border-slate-200 bg-transparent p-0.5"
              />
              <input
                type="text"
                value={currentTheme.textColor}
                onChange={(e) => handleUpdateTheme({ textColor: e.target.value })}
                className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl uppercase font-mono text-slate-900 focus:outline-none focus:border-slate-900"
              />
            </div>
          </div>

          {/* Card Fill Color */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Warna Kotak Tautan (Card Bg)</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={currentTheme.cardBg.startsWith('#') ? currentTheme.cardBg : '#ffffff'}
                onChange={(e) => handleUpdateTheme({ cardBg: e.target.value })}
                className="w-10 h-10 rounded-xl cursor-pointer border border-slate-200 bg-transparent p-0.5"
              />
              <input
                type="text"
                value={currentTheme.cardBg}
                onChange={(e) => handleUpdateTheme({ cardBg: e.target.value })}
                className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 focus:outline-none focus:border-slate-900"
              />
            </div>
          </div>

          {/* Accent / Highlight Color */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Warna Aksen / Badge</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={currentTheme.accentColor}
                onChange={(e) => handleUpdateTheme({ accentColor: e.target.value })}
                className="w-10 h-10 rounded-xl cursor-pointer border border-slate-200 bg-transparent p-0.5"
              />
              <input
                type="text"
                value={currentTheme.accentColor}
                onChange={(e) => handleUpdateTheme({ accentColor: e.target.value })}
                className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl uppercase font-mono text-slate-900 focus:outline-none focus:border-slate-900"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. BUTTON STYLE & SHAPE */}
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <LayoutTemplate className="w-5 h-5 text-slate-900" />
          <h3 className="text-base font-bold text-slate-900">
            Bentuk & Gaya Tombol
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {buttonStyles.map((style) => {
            const isSelected = currentTheme.buttonStyle === style.id;
            return (
              <button
                key={style.id}
                type="button"
                onClick={() => handleUpdateTheme({ buttonStyle: style.id })}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                    : 'border-slate-200/80 hover:border-slate-400 bg-white'
                }`}
              >
                <div className="font-bold text-xs text-slate-900">
                  {style.label}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  {style.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. TYPOGRAPHY / FONT */}
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Type className="w-5 h-5 text-slate-900" />
          <h3 className="text-base font-bold text-slate-900">
            Pilihan Tipografi & Font
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {fontOptions.map((font) => {
            const isSelected = currentTheme.fontFamily === font;
            return (
              <button
                key={font}
                type="button"
                onClick={() => handleUpdateTheme({ fontFamily: font })}
                style={{ fontFamily: font }}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  isSelected
                    ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900 font-bold'
                    : 'border-slate-200/80 hover:border-slate-400 bg-white'
                }`}
              >
                <span className="text-sm">{font}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
