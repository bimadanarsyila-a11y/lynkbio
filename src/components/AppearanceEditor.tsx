import React, { useState } from 'react';
import {
  Palette,
  Type,
  LayoutTemplate,
  Sparkles,
  Check,
  Circle,
  Square,
  Layers,
  Sun,
  Droplet,
  Zap,
  Heart,
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

  const buttonStyles: { id: ButtonStyle; label: string; desc: string; icon: any }[] = [
    { id: 'rounded', label: 'Rounded', desc: 'Modern curves', icon: Circle },
    { id: 'pill', label: 'Pill', desc: 'Full rounded', icon: Droplet },
    { id: 'glass', label: 'Glass', desc: 'Blur effect', icon: Sparkles },
    { id: 'shadow3d', label: '3D', desc: 'Bold shadow', icon: Layers },
    { id: 'outline', label: 'Outline', desc: 'Border only', icon: Square },
    { id: 'sharp', label: 'Sharp', desc: 'No radius', icon: Zap },
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
    <div className="w-full space-y-5">
      {/* Preset Themes */}
      <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-purple-500" />
            <h3 className="text-lg font-bold text-gray-900">Ready-to-Use Themes</h3>
          </div>
          <span className="text-xs text-gray-500 font-medium">Click to apply</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {PRESET_THEMES.map((theme) => {
            const isSelected = currentTheme.id === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => handleSelectPresetTheme(theme)}
                className={`relative p-4 rounded-2xl border-2 text-left transition-all group ${
                  isSelected
                    ? 'ring-2 ring-green-500 border-green-500 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                {/* Theme Preview */}
                <div
                  className="w-full h-20 rounded-xl mb-3 p-3 flex flex-col justify-between items-center shadow-inner relative overflow-hidden"
                  style={{
                    background: theme.bgType === 'gradient' ? theme.bgGradient : theme.bgColor,
                  }}
                >
                  <div
                    className="w-6 h-6 rounded-full border-2 border-white/40 shadow-sm"
                    style={{ backgroundColor: theme.avatarRing }}
                  />
                  <div
                    className="w-full h-3 rounded-lg border"
                    style={{
                      backgroundColor: theme.cardBg,
                      borderColor: theme.cardBorder,
                    }}
                  />
                </div>

                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm font-bold text-gray-900 truncate">{theme.name}</div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </div>

                {theme.badge && (
                  <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-semibold">
                    {theme.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Colors */}
      <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-lg space-y-5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-orange-500" />
          <h3 className="text-lg font-bold text-gray-900">Custom Colors</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Background Color */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Background Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={currentTheme.bgColor}
                onChange={(e) => handleUpdateTheme({ bgColor: e.target.value, bgType: 'solid' })}
                className="w-12 h-12 rounded-xl border-2 border-gray-200 cursor-pointer"
              />
              <input
                type="text"
                value={currentTheme.bgColor}
                onChange={(e) => handleUpdateTheme({ bgColor: e.target.value })}
                className="flex-1 px-3 py-2.5 text-sm bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Accent Color */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Accent Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={currentTheme.accentColor}
                onChange={(e) => handleUpdateTheme({ accentColor: e.target.value })}
                className="w-12 h-12 rounded-xl border-2 border-gray-200 cursor-pointer"
              />
              <input
                type="text"
                value={currentTheme.accentColor}
                onChange={(e) => handleUpdateTheme({ accentColor: e.target.value })}
                className="flex-1 px-3 py-2.5 text-sm bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Text Color */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Text Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={currentTheme.textColor}
                onChange={(e) => handleUpdateTheme({ textColor: e.target.value })}
                className="w-12 h-12 rounded-xl border-2 border-gray-200 cursor-pointer"
              />
              <input
                type="text"
                value={currentTheme.textColor}
                onChange={(e) => handleUpdateTheme({ textColor: e.target.value })}
                className="flex-1 px-3 py-2.5 text-sm bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Card Background */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Card Background</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={currentTheme.cardBg}
                onChange={(e) => handleUpdateTheme({ cardBg: e.target.value })}
                className="w-12 h-12 rounded-xl border-2 border-gray-200 cursor-pointer"
              />
              <input
                type="text"
                value={currentTheme.cardBg}
                onChange={(e) => handleUpdateTheme({ cardBg: e.target.value })}
                className="flex-1 px-3 py-2.5 text-sm bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Gradient Background Option */}
        <div className="pt-4 border-t-2 border-gray-100">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={currentTheme.bgType === 'gradient'}
              onChange={(e) =>
                handleUpdateTheme({
                  bgType: e.target.checked ? 'gradient' : 'solid',
                })
              }
              className="rounded border-gray-300 text-green-500 focus:ring-green-500"
            />
            <span className="text-sm font-semibold text-gray-700">Use Gradient Background</span>
          </label>

          {currentTheme.bgType === 'gradient' && (
            <div className="mt-3">
              <input
                type="text"
                value={currentTheme.bgGradient || ''}
                onChange={(e) => handleUpdateTheme({ bgGradient: e.target.value })}
                placeholder="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                className="w-full px-3 py-2.5 text-sm bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none font-mono"
              />
              <p className="text-xs text-gray-500 mt-1.5">
                Use CSS gradient syntax (e.g., linear-gradient, radial-gradient)
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Button Style */}
      <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-lg space-y-4">
        <div className="flex items-center gap-2">
          <LayoutTemplate className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-bold text-gray-900">Button Style</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {buttonStyles.map((style) => {
            const isSelected = currentTheme.buttonStyle === style.id;
            const Icon = style.icon;
            return (
              <button
                key={style.id}
                onClick={() => handleUpdateTheme({ buttonStyle: style.id })}
                className={`p-4 rounded-2xl border-2 text-left transition-all ${
                  isSelected
                    ? 'border-green-500 bg-green-50 ring-2 ring-green-500'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-green-600' : 'text-gray-400'}`} />
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </div>
                <p className="text-sm font-bold text-gray-900">{style.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{style.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Font Family */}
      <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-lg space-y-4">
        <div className="flex items-center gap-2">
          <Type className="w-5 h-5 text-pink-500" />
          <h3 className="text-lg font-bold text-gray-900">Font Family</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {fontOptions.map((font) => {
            const isSelected = currentTheme.fontFamily === font;
            return (
              <button
                key={font}
                onClick={() => handleUpdateTheme({ fontFamily: font })}
                className={`p-4 rounded-2xl border-2 text-left transition-all ${
                  isSelected
                    ? 'border-green-500 bg-green-50 ring-2 ring-green-500'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                style={{ fontFamily: font }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-900">{font}</span>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">The quick brown fox jumps</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Presets */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200 space-y-3">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-purple-500" />
          <h3 className="text-lg font-bold text-gray-900">Quick Color Presets</h3>
        </div>
        <p className="text-sm text-gray-600">Popular color combinations</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { name: 'Mint Fresh', bg: '#d1f4e0', accent: '#10b981' },
            { name: 'Ocean Blue', bg: '#dbeafe', accent: '#3b82f6' },
            { name: 'Sunset Pink', bg: '#fce7f3', accent: '#ec4899' },
            { name: 'Lavender', bg: '#f3e8ff', accent: '#a855f7' },
          ].map((preset) => (
            <button
              key={preset.name}
              onClick={() =>
                handleUpdateTheme({
                  bgColor: preset.bg,
                  accentColor: preset.accent,
                  bgType: 'solid',
                })
              }
              className="p-3 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all text-center group"
              style={{ backgroundColor: preset.bg }}
            >
              <div
                className="w-8 h-8 rounded-full mx-auto mb-2 border-2 border-white shadow-sm"
                style={{ backgroundColor: preset.accent }}
              />
              <p className="text-xs font-bold text-gray-900">{preset.name}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
