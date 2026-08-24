import React, { useState } from 'react';
import {
  X,
  Plus,
  FolderKanban,
  Check,
  Trash2,
  ExternalLink,
  Sparkles,
  Layers,
  Globe,
  Tag,
  Store,
  ChevronRight,
  User,
  ArrowRight,
} from 'lucide-react';
import { Workspace, AuthUser } from '../types';
import { WorkspaceService } from '../services/workspaceService';
import { WORKSPACE_TEMPLATES } from '../data/workspaceTemplates';

interface WorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  workspaces: Workspace[];
  activeWorkspaceId: string;
  onSelectWorkspace: (id: string) => void;
  authUser: AuthUser | null;
  onOpenGoogleLogin?: () => void;
}

export const WorkspaceModal: React.FC<WorkspaceModalProps> = ({
  isOpen,
  onClose,
  workspaces,
  activeWorkspaceId,
  onSelectWorkspace,
  authUser,
  onOpenGoogleLogin,
}) => {
  const [view, setView] = useState<'list' | 'create'>('list');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('creator-personal');
  const [newProjectName, setNewProjectName] = useState<string>('');
  const [newProjectSlug, setNewProjectSlug] = useState<string>('');

  if (!isOpen) return null;

  const handleCreateWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    const template = WORKSPACE_TEMPLATES.find(t => t.id === selectedTemplateId) || WORKSPACE_TEMPLATES[0];
    const finalName = newProjectName.trim() || template.name;
    const finalSlug = newProjectSlug.trim() || `${template.defaultUsername.split('.')[0]}-${Math.floor(Math.random() * 899 + 100)}`;

    const newWs = WorkspaceService.createWorkspaceFromTemplate(
      selectedTemplateId,
      finalName,
      finalSlug,
      authUser
    );

    onSelectWorkspace(newWs.id);
    setView('list');
    setNewProjectName('');
    setNewProjectSlug('');
    onClose();
  };

  const handleDeleteWorkspace = (wsId: string, wsName: string) => {
    if (workspaces.length <= 1) {
      alert('Anda harus memiliki minimal 1 project workspace.');
      return;
    }
    if (confirm(`Hapus workspace "${wsName}"? Data tautan di dalamnya akan terhapus.`)) {
      WorkspaceService.deleteWorkspace(wsId, authUser);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-5 sm:p-7 shadow-2xl border border-slate-100 space-y-6 my-auto max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          title="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-3 sm:gap-4 pr-8">
          <div className="w-11 h-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-xs">
            <FolderKanban className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                Menu Manajemen Workspace
              </h3>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                {workspaces.length} Project
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Kelola beberapa halaman bio link berbeda (toko, personal, portofolio, cafe) dalam 1 akun.
            </p>
          </div>
        </div>

        {/* Auth Sync Banner */}
        {!authUser && (
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
              <span>Workspace disimpan di browser. Login dengan <b>Google/Gmail</b> untuk backup awan otomatis.</span>
            </div>
            {onOpenGoogleLogin && (
              <button
                type="button"
                onClick={onOpenGoogleLogin}
                className="px-3 py-1.5 rounded-xl font-bold bg-slate-900 hover:bg-slate-800 text-white shrink-0 text-[11px] transition-all shadow-xs"
              >
                Login Gmail
              </button>
            )}
          </div>
        )}

        {/* View Switcher: List vs Create */}
        {view === 'list' ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Daftar Project Tautan Anda
              </span>
              <button
                type="button"
                onClick={() => setView('create')}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white flex items-center gap-1.5 transition-all shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>+ Buat Project Baru</span>
              </button>
            </div>

            {/* Workspaces Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {workspaces.map((ws) => {
                const isActive = ws.id === activeWorkspaceId;
                const linkCount = ws.links ? ws.links.length : 0;
                const totalClicks = ws.analytics ? ws.analytics.totalClicks : 0;

                return (
                  <div
                    key={ws.id}
                    className={`relative p-4 rounded-2xl border text-left transition-all group flex flex-col justify-between ${
                      isActive
                        ? 'border-slate-900 bg-slate-50/90 ring-2 ring-slate-900/10 shadow-xs'
                        : 'border-slate-200/80 hover:border-slate-400 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="text-2xl">{ws.icon || '🔗'}</span>
                          <div className="min-w-0">
                            <h4 className="font-bold text-sm text-slate-900 truncate">
                              {ws.name}
                            </h4>
                            <p className="text-[11px] text-slate-500 font-mono truncate">
                              linkbio.to/{ws.username || ws.profile?.username}
                            </p>
                          </div>
                        </div>

                        {isActive ? (
                          <span className="px-2 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-bold shrink-0">
                            Aktif
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              onSelectWorkspace(ws.id);
                              onClose();
                            }}
                            className="text-xs font-bold text-slate-600 hover:text-slate-900 px-2 py-1 rounded-lg hover:bg-slate-100 transition-colors"
                          >
                            Pilih
                          </button>
                        )}
                      </div>

                      {/* Bio preview snippet */}
                      <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                        {ws.profile?.bio || 'Tidak ada deskripsi bio.'}
                      </p>
                    </div>

                    {/* Footer Info & Actions */}
                    <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                      <div className="flex items-center gap-3">
                        <span>🔗 <b>{linkCount}</b> tautan</span>
                        <span>👆 <b>{totalClicks}</b> klik</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <a
                          href={`${window.location.origin}${window.location.pathname}#/@${ws.username || ws.profile?.username}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 text-slate-400 hover:text-slate-900 rounded-md hover:bg-slate-100"
                          title="Buka Halaman Publik"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>

                        {workspaces.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleDeleteWorkspace(ws.id, ws.name)}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded-md hover:bg-rose-50 transition-colors"
                            title="Hapus Workspace"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* CREATE NEW WORKSPACE VIEW */
          <form onSubmit={handleCreateWorkspace} className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-slate-900">
                  Pilih Template Project Baru
                </h4>
                <p className="text-xs text-slate-500">
                  Pilih preset tema dan struktur link sesuai kebutuhan Anda.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setView('list')}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 px-3 py-1.5 rounded-xl hover:bg-slate-100"
              >
                ← Kembali ke List
              </button>
            </div>

            {/* Template Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {WORKSPACE_TEMPLATES.map((tmpl) => {
                const isSelected = selectedTemplateId === tmpl.id;
                return (
                  <button
                    key={tmpl.id}
                    type="button"
                    onClick={() => {
                      setSelectedTemplateId(tmpl.id);
                      if (!newProjectName) setNewProjectName(tmpl.name);
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-slate-900 bg-slate-50 ring-2 ring-slate-900/10'
                        : 'border-slate-200/80 hover:border-slate-400 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{tmpl.icon}</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <h5 className="text-xs font-bold text-slate-900 truncate">
                            {tmpl.name}
                          </h5>
                          {isSelected && <Check className="w-3.5 h-3.5 text-slate-900" />}
                        </div>
                        <span className="text-[10px] text-slate-400 font-semibold">
                          {tmpl.category}
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-2 line-clamp-2">
                      {tmpl.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Custom Name & Username Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Nama Workspace / Project</label>
                <input
                  type="text"
                  placeholder="Contoh: Portofolio Desain Grafis"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 text-slate-900"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Custom URL Slug (Username)</label>
                <div className="flex items-center rounded-xl bg-slate-50 border border-slate-200 px-3">
                  <span className="text-xs text-slate-400 font-mono">linkbio.to/</span>
                  <input
                    type="text"
                    placeholder="nama-project"
                    value={newProjectSlug}
                    onChange={(e) => setNewProjectSlug(e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, ''))}
                    className="w-full py-2.5 px-1 text-xs bg-transparent focus:outline-none font-mono text-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setView('list')}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-xs flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Buat & Buka Project</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
