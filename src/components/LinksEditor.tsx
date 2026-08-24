import React, { useState } from 'react';
import {
  Plus,
  Trash2,
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
  Eye,
  EyeOff,
  Layers,
  Image as ImageIcon,
  Share2,
  User,
  AtSign,
  FileImage,
} from 'lucide-react';
import { UserProfile, BioLink, LinkType } from '../types';

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
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Add new link helper
  const handleAddLink = (type: LinkType) => {
    let newLink: BioLink;

    if (type === 'header') {
      newLink = {
        id: `header-${Date.now()}`,
        type: 'header',
        title: '📂 Section Header',
        url: '',
        enabled: true,
        clicks: 0,
        createdAt: Date.now(),
      };
    } else if (type === 'contact') {
      newLink = {
        id: `link-${Date.now()}`,
        type: 'contact',
        title: '💬 Chat on WhatsApp',
        subtitle: 'Quick response for inquiries',
        url: 'https://wa.me/6281234567890',
        iconName: 'MessageCircle',
        enabled: true,
        clicks: 0,
        createdAt: Date.now(),
        category: 'Contact',
      };
    } else {
      newLink = {
        id: `link-${Date.now()}`,
        type: 'standard',
        title: 'New Link',
        subtitle: 'Add a description',
        url: 'https://',
        iconName: 'Globe',
        enabled: true,
        clicks: 0,
        createdAt: Date.now(),
        category: 'General',
      };
    }

    const updated = [newLink, ...links];
    onUpdateLinks(updated);
  };

  const handleUpdateLink = (id: string, updates: Partial<BioLink>) => {
    const updated = links.map((l) => (l.id === id ? { ...l, ...updates } : l));
    onUpdateLinks(updated);
  };

  const handleDeleteLink = (id: string) => {
    const updated = links.filter((l) => l.id !== id);
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
    const idx = socials.findIndex((s) => s.platform === platform);
    if (idx !== -1) {
      socials[idx] = { ...socials[idx], url, enabled };
    } else {
      socials.push({ id: `soc-${Date.now()}`, platform: platform as any, url, enabled });
    }
    onUpdateProfile({ ...profile, socials });
  };

  const categories = Array.from(new Set(links.map((l) => l.category).filter(Boolean)));

  const filteredLinks =
    selectedCategory === 'all'
      ? links
      : links.filter((l) => l.category === selectedCategory || l.type === 'header');

  return (
    <div className="w-full max-w-full space-y-5 min-w-0 overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border-2 border-gray-200 shadow-md">
        <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-xl w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('links')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'links'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Links ({links.length})
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'profile'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('socials')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'socials'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Social
          </button>
        </div>

        <button
          onClick={onOpenAiAssistant}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>AI Assistant</span>
        </button>
      </div>

      {/* TAB 1: LINKS */}
      {activeTab === 'links' && (
        <div className="space-y-4 min-w-0">
          {/* Add Link Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border-2 border-gray-200 shadow-md">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleAddLink('standard')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white shadow-lg transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Link</span>
              </button>
              <button
                onClick={() => handleAddLink('header')}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all"
                title="Add Section Header"
              >
                <Layers className="w-4 h-4" />
                <span>Header</span>
              </button>
              <button
                onClick={() => handleAddLink('contact')}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all"
                title="WhatsApp Link"
              >
                <MessageCircle className="w-4 h-4 text-green-600" />
                <span>WhatsApp</span>
              </button>
            </div>

            {categories.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 font-medium">Filter:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-700"
                >
                  <option value="all">All Categories</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Links List */}
          <div className="space-y-3 min-w-0">
            {filteredLinks.map((link, index) => {
              const isHeader = link.type === 'header';

              if (isHeader) {
                return (
                  <div
                    key={link.id}
                    className="p-4 rounded-2xl bg-gray-50 border-2 border-gray-200 shadow-md flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="flex flex-col gap-0.5">
                        <button
                          onClick={() => handleMoveLink(index, 'up')}
                          disabled={index === 0}
                          className="text-gray-400 hover:text-gray-900 disabled:opacity-30 p-0.5"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleMoveLink(index, 'down')}
                          disabled={index === links.length - 1}
                          className="text-gray-400 hover:text-gray-900 disabled:opacity-30 p-0.5"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </div>
                      <Layers className="w-5 h-5 text-gray-600" />
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                        Header:
                      </span>
                      <input
                        type="text"
                        value={link.title}
                        onChange={(e) => handleUpdateLink(link.id, { title: e.target.value })}
                        placeholder="Section Title..."
                        className="flex-1 min-w-0 bg-transparent font-bold text-sm text-gray-900 focus:outline-none border-b-2 border-transparent focus:border-gray-400 px-1"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateLink(link.id, { enabled: !link.enabled })}
                        className={`p-2 rounded-xl text-sm font-semibold transition-colors ${
                          link.enabled ? 'text-gray-900 bg-gray-200' : 'text-gray-400 bg-gray-100'
                        }`}
                      >
                        {link.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleDeleteLink(link.id)}
                        className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={link.id}
                  className={`p-5 rounded-2xl border-2 transition-all ${
                    link.enabled
                      ? 'bg-white border-gray-200 shadow-lg'
                      : 'bg-gray-50 border-gray-200 opacity-60 shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Reorder Controls */}
                    <div className="flex flex-col gap-1 pt-1">
                      <button
                        onClick={() => handleMoveLink(index, 'up')}
                        disabled={index === 0}
                        className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-900 disabled:opacity-30 transition-colors"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleMoveLink(index, 'down')}
                        disabled={index === links.length - 1}
                        className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-900 disabled:opacity-30 transition-colors"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Link Content */}
                    <div className="flex-1 min-w-0 space-y-3">
                      {/* Title & Stats */}
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={link.title}
                          onChange={(e) => handleUpdateLink(link.id, { title: e.target.value })}
                          placeholder="Link Title..."
                          className="flex-1 min-w-0 font-bold text-sm text-gray-900 bg-transparent border-b-2 border-gray-200 focus:border-green-500 focus:outline-none pb-1"
                        />
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700">
                          <Flame className="w-3.5 h-3.5" />
                          <span>{link.clicks || 0}</span>
                        </span>
                      </div>

                      {/* Subtitle */}
                      <input
                        type="text"
                        value={link.subtitle || ''}
                        onChange={(e) => handleUpdateLink(link.id, { subtitle: e.target.value })}
                        placeholder="Add description (optional)..."
                        className="w-full text-xs text-gray-600 bg-transparent border-b border-gray-200 focus:border-green-500 focus:outline-none pb-1"
                      />

                      {/* URL & Icon */}
                      <div className="flex items-center gap-2">
                        <div className="relative flex-1 min-w-0">
                          <ExternalLink className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="url"
                            value={link.url}
                            onChange={(e) => handleUpdateLink(link.id, { url: e.target.value })}
                            placeholder="https://..."
                            className="w-full pl-10 pr-3 py-2.5 text-sm bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none font-medium"
                          />
                        </div>

                        <select
                          value={link.iconName || 'Globe'}
                          onChange={(e) => handleUpdateLink(link.id, { iconName: e.target.value })}
                          className="px-3 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-700"
                        >
                          <option value="Globe">🌐 Web</option>
                          <option value="Youtube">🎥 YouTube</option>
                          <option value="MessageCircle">💬 WhatsApp</option>
                          <option value="FileText">📄 Document</option>
                          <option value="Coffee">☕ Donate</option>
                          <option value="ShoppingBag">🛍️ Shop</option>
                        </select>
                      </div>

                      {/* Advanced Options */}
                      <div className="pt-3 flex items-center justify-between gap-3 border-t-2 border-gray-100">
                        <div className="flex flex-wrap items-center gap-3">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={link.highlight || false}
                              onChange={(e) =>
                                handleUpdateLink(link.id, { highlight: e.target.checked })
                              }
                              className="rounded border-gray-300 text-green-500 focus:ring-green-500"
                            />
                            <span className="text-sm text-gray-700 font-medium">Highlight</span>
                          </label>

                          {link.highlight && (
                            <input
                              type="text"
                              value={link.highlightText || 'NEW'}
                              onChange={(e) =>
                                handleUpdateLink(link.id, { highlightText: e.target.value })
                              }
                              placeholder="Badge text"
                              className="w-24 px-2 py-1 bg-gray-50 border-2 border-gray-200 rounded-lg text-xs font-bold text-center"
                            />
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateLink(link.id, { enabled: !link.enabled })}
                            className={`p-2 rounded-xl text-sm font-semibold transition-colors ${
                              link.enabled
                                ? 'text-gray-900 bg-gray-100 hover:bg-gray-200'
                                : 'text-gray-400 bg-gray-100'
                            }`}
                          >
                            {link.enabled ? (
                              <Eye className="w-4 h-4" />
                            ) : (
                              <EyeOff className="w-4 h-4" />
                            )}
                          </button>

                          <button
                            onClick={() => handleDeleteLink(link.id)}
                            className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredLinks.length === 0 && (
              <div className="text-center py-12 px-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 shadow-md">
                <Globe className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm font-semibold text-gray-500">No links yet</p>
                <p className="text-xs text-gray-400 mt-1">Click "Add Link" to get started</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: PROFILE */}
      {activeTab === 'profile' && (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-lg space-y-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <User className="w-5 h-5 text-green-500" />
              Profile Information
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  value={profile.name || ''}
                  onChange={(e) => onUpdateProfile({ ...profile, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full px-4 py-3 text-sm bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <AtSign className="w-4 h-4 inline mr-1" />
                  Username
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 font-medium">lynkbio.to/</span>
                  <input
                    type="text"
                    value={profile.username || ''}
                    onChange={(e) =>
                      onUpdateProfile({
                        ...profile,
                        username: e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, ''),
                      })
                    }
                    placeholder="username"
                    className="flex-1 px-4 py-3 text-sm bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
                <textarea
                  value={profile.bio || ''}
                  onChange={(e) => onUpdateProfile({ ...profile, bio: e.target.value })}
                  placeholder="Tell people about yourself..."
                  rows={3}
                  className="w-full px-4 py-3 text-sm bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FileImage className="w-4 h-4 inline mr-1" />
                  Avatar URL
                </label>
                <input
                  type="url"
                  value={profile.avatar || ''}
                  onChange={(e) => onUpdateProfile({ ...profile, avatar: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-3 text-sm bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none font-medium"
                />
                {profile.avatar && (
                  <div className="mt-3 flex items-center gap-3">
                    <img
                      src={profile.avatar}
                      alt="Avatar preview"
                      className="w-16 h-16 rounded-full border-2 border-gray-200"
                    />
                    <span className="text-xs text-gray-500">Preview</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SOCIAL LINKS */}
      {activeTab === 'socials' && (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-lg space-y-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Share2 className="w-5 h-5 text-blue-500" />
              Social Media Links
            </h3>

            <div className="space-y-3">
              {['instagram', 'twitter', 'tiktok', 'youtube', 'linkedin'].map((platform) => {
                const social = profile.socials.find((s) => s.platform === platform);
                return (
                  <div key={platform} className="flex items-center gap-3">
                    <label className="flex items-center gap-2 w-32">
                      <input
                        type="checkbox"
                        checked={social?.enabled || false}
                        onChange={(e) =>
                          handleUpdateSocial(platform, social?.url || '', e.target.checked)
                        }
                        className="rounded border-gray-300 text-green-500 focus:ring-green-500"
                      />
                      <span className="text-sm font-semibold text-gray-700 capitalize">
                        {platform}
                      </span>
                    </label>
                    <input
                      type="url"
                      value={social?.url || ''}
                      onChange={(e) =>
                        handleUpdateSocial(platform, e.target.value, social?.enabled || false)
                      }
                      placeholder={`https://${platform}.com/...`}
                      className="flex-1 px-4 py-2.5 text-sm bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
