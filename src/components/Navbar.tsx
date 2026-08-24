import React, { useState } from 'react';
import {
  Link2,
  Palette,
  BarChart3,
  ExternalLink,
  Share2,
  QrCode,
  Smartphone,
  Copy,
  Check,
  FolderKanban,
  Users,
  ChevronDown,
  LogOut,
  LogIn,
  Plus,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { UserProfile, Workspace, AuthUser } from '../types';

interface NavbarProps {
  activeTab: 'links' | 'appearance' | 'analytics';
  onSelectTab: (tab: 'links' | 'appearance' | 'analytics') => void;
  profile: UserProfile;
  workspaces: Workspace[];
  activeWorkspace: Workspace;
  onOpenWorkspaceModal: () => void;
  onSelectWorkspace: (id: string) => void;
  registeredUsersCount: number;
  onOpenRegisteredUsersModal: () => void;
  authUser: AuthUser | null;
  isAdmin?: boolean;
  onLoginWithGoogle: () => void;
  onLogout: () => void;
  onOpenQr: () => void;
  onOpenShare: () => void;
  onToggleMobilePreview: () => void;
  showMobileSimulator: boolean;
  onOpenFullPreview: () => void;
  onOpenLanding?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  profile,
  workspaces,
  activeWorkspace,
  onOpenWorkspaceModal,
  onSelectWorkspace,
  registeredUsersCount,
  onOpenRegisteredUsersModal,
  authUser,
  isAdmin = false,
  onLoginWithGoogle,
  onLogout,
  onOpenQr,
  onOpenShare,
  onToggleMobilePreview,
  showMobileSimulator,
  onOpenFullPreview,
  onOpenLanding,
}) => {
  const [copied, setCopied] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isWorkspaceDropdownOpen, setIsWorkspaceDropdownOpen] = useState(false);

  const bioUrl = `${window.location.origin}${window.location.pathname}#/@${profile.username || 'user'}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(bioUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
      {/* Top Main Navigation Bar */}
      <div className="w-full max-w-[1720px] mx-auto px-2.5 sm:px-6 lg:px-8 xl:px-10 py-2 sm:py-2.5 flex items-center justify-between gap-1.5 sm:gap-4 border-b border-slate-100 min-w-0">
        {/* Left: Brand & Workspace Switcher */}
        <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
          <button
            type="button"
            onClick={onOpenLanding}
            className="flex items-center gap-1.5 sm:gap-2 group hover:opacity-90 transition-opacity shrink-0"
            title="Buka Beranda & Portal lynkbio"
          >
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-slate-950 flex items-center justify-center text-white font-bold shadow-xs shrink-0 group-hover:bg-slate-800 transition-colors">
              <Link2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <span className="font-extrabold text-xs sm:text-sm text-slate-950 tracking-tight hidden sm:inline">
              lynkbio
            </span>
          </button>

          <div className="flex items-center min-w-0">
            {/* Workspace Selector Dropdown / Button */}
            <div className="relative min-w-0">
              <button
                type="button"
                onClick={() => setIsWorkspaceDropdownOpen(!isWorkspaceDropdownOpen)}
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-slate-100/90 hover:bg-slate-200/80 text-slate-800 text-[11px] sm:text-xs font-semibold transition-colors max-w-[90px] xs:max-w-[130px] sm:max-w-[200px] border border-slate-200/50 shrink-0"
                title="Ganti Workspace / Project"
              >
                <span className="text-xs sm:text-sm shrink-0">{activeWorkspace.icon || '📁'}</span>
                <span className="truncate">{activeWorkspace.name || 'Workspace'}</span>
                <ChevronDown className="w-3 h-3 text-slate-500 shrink-0" />
              </button>

              {/* Quick Workspace Dropdown Menu */}
              {isWorkspaceDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setIsWorkspaceDropdownOpen(false)}
                  />
                  <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-2 z-40 space-y-1 animate-in fade-in zoom-in-95">
                    <div className="px-2.5 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                      <span>Proyek Anda ({workspaces.length})</span>
                      <button
                        type="button"
                        onClick={() => {
                          setIsWorkspaceDropdownOpen(false);
                          onOpenWorkspaceModal();
                        }}
                        className="text-slate-900 hover:underline flex items-center gap-0.5"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Kelola</span>
                      </button>
                    </div>

                    <div className="max-h-48 overflow-y-auto space-y-0.5">
                      {workspaces.map((ws) => (
                        <button
                          key={ws.id}
                          type="button"
                          onClick={() => {
                            onSelectWorkspace(ws.id);
                            setIsWorkspaceDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs transition-colors ${
                            ws.id === activeWorkspace.id
                              ? 'bg-slate-100 font-bold text-slate-900'
                              : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span>{ws.icon || '🔗'}</span>
                            <div className="min-w-0">
                              <p className="truncate font-medium">{ws.name}</p>
                              <p className="text-[10px] text-slate-400 font-mono truncate">@{ws.username || ws.profile?.username}</p>
                            </div>
                          </div>
                          {ws.id === activeWorkspace.id && <Check className="w-3.5 h-3.5 text-slate-900 shrink-0" />}
                        </button>
                      ))}
                    </div>

                    <div className="pt-1 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => {
                          setIsWorkspaceDropdownOpen(false);
                          onOpenWorkspaceModal();
                        }}
                        className="w-full py-2 px-2.5 rounded-xl text-xs font-semibold text-slate-900 bg-slate-50 hover:bg-slate-100 flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <FolderKanban className="w-3.5 h-3.5" />
                        <span>Buka Manajemen Workspace</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right: Auth, Admin Badge (Only for Admin), Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Admin-Only: Registered Users Directory Button */}
          {isAdmin && (
            <button
              type="button"
              onClick={onOpenRegisteredUsersModal}
              className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-amber-900 text-xs font-bold transition-all shadow-2xs shrink-0"
              title="Panel Admin: Daftar Pengguna Gmail Terdaftar"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span className="hidden md:inline">Admin:</span>
              <span className="hidden sm:inline">{registeredUsersCount} User</span>
            </button>
          )}

          {/* Google Auth Status / Login Button */}
          {authUser ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-1.5 p-1 sm:px-2.5 sm:py-1 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-colors shrink-0"
              >
                {authUser.photoURL ? (
                  <img
                    src={authUser.photoURL}
                    alt={authUser.displayName || 'User'}
                    referrerPolicy="no-referrer"
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover border border-slate-200 shrink-0"
                  />
                ) : (
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-900 text-white text-[10px] sm:text-[11px] font-bold flex items-center justify-center shrink-0">
                    {(authUser.displayName || authUser.email || 'U')[0].toUpperCase()}
                  </div>
                )}
                <span className="text-xs font-semibold text-slate-800 hidden md:inline max-w-[90px] lg:max-w-[110px] truncate">
                  {authUser.displayName?.split(' ')[0] || 'Akun'}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:inline shrink-0" />
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setIsUserMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-3 z-40 space-y-2 animate-in fade-in zoom-in-95">
                    <div className="border-b border-slate-100 pb-2">
                      <div className="flex items-center gap-2">
                        {authUser.photoURL ? (
                          <img
                            src={authUser.photoURL}
                            alt="Avatar"
                            referrerPolicy="no-referrer"
                            className="w-8 h-8 rounded-full border border-slate-200"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
                            {(authUser.displayName || authUser.email || 'U')[0].toUpperCase()}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 truncate">
                            {authUser.displayName || 'Pengguna'}
                          </p>
                          <p className="text-[11px] text-slate-500 font-mono truncate">
                            {authUser.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Admin only option */}
                    {isAdmin && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onOpenRegisteredUsersModal();
                        }}
                        className="w-full py-2 px-2.5 rounded-xl text-xs font-semibold text-amber-900 bg-amber-50/70 hover:bg-amber-100/70 border border-amber-200/60 flex items-center gap-2 text-left"
                      >
                        <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                        <span>Data Pengguna (Admin Only)</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onOpenWorkspaceModal();
                      }}
                      className="w-full py-2 px-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2 text-left"
                    >
                      <FolderKanban className="w-4 h-4 text-slate-500 shrink-0" />
                      <span>Semua Project Workspace ({workspaces.length})</span>
                    </button>

                    <div className="pt-1 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onLogout();
                        }}
                        className="w-full py-2 px-2.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2 text-left transition-colors"
                      >
                        <LogOut className="w-4 h-4 text-rose-500 shrink-0" />
                        <span>Keluar (Sign Out)</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={onLoginWithGoogle}
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-white text-[11px] sm:text-xs font-semibold transition-all shadow-xs shrink-0"
              title="Masuk dengan Google / Gmail"
            >
              {/* Google G Logo icon */}
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span className="hidden xs:inline">Login Gmail</span>
              <span className="xs:hidden">Login</span>
            </button>
          )}

          {/* Copy Bio URL */}
          <button
            onClick={handleCopyLink}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors flex items-center gap-1 shadow-2xs shrink-0"
            title="Salin Tautan Bio"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> : <Copy className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
            <span className="hidden md:inline">{copied ? 'Tersalin!' : 'Salin URL'}</span>
          </button>

          {/* Mode Publik */}
          <button
            onClick={onOpenFullPreview}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-bold bg-slate-950 text-white hover:bg-slate-800 transition-all flex items-center gap-1 shadow-xs shrink-0"
            title="Buka Halaman Bio Publik"
          >
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">Mode Publik</span>
          </button>
        </div>
      </div>

      {/* Bottom Sub-Bar: Navigation Tabs & Actions */}
      <div className="w-full max-w-[1720px] mx-auto px-2.5 sm:px-6 lg:px-8 xl:px-10 py-1.5 sm:py-2 flex items-center justify-between gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
        {/* Navigation Tabs */}
        <nav className="flex items-center bg-slate-100/90 p-0.5 sm:p-1 rounded-xl border border-slate-200/60 shrink-0">
          <button
            onClick={() => onSelectTab('links')}
            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-all ${
              activeTab === 'links'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Link2 className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap hidden xs:inline">Tautan & Bio</span>
            <span className="whitespace-nowrap xs:hidden">Tautan</span>
          </button>

          <button
            onClick={() => onSelectTab('appearance')}
            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-all ${
              activeTab === 'appearance'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Palette className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap hidden xs:inline">Tampilan & Tema</span>
            <span className="whitespace-nowrap xs:hidden">Tema</span>
          </button>

          <button
            onClick={() => onSelectTab('analytics')}
            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-all relative ${
              activeTab === 'analytics'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">Analitik</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
          </button>
        </nav>

        {/* Action Tools: QR, Share, Mobile Simulator toggle */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          <button
            onClick={onOpenQr}
            className="p-1.5 sm:p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors flex items-center justify-center shadow-2xs shrink-0"
            title="Tampilkan QR Code"
          >
            <QrCode className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          <button
            onClick={onOpenShare}
            className="p-1.5 sm:p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors flex items-center justify-center shadow-2xs shrink-0"
            title="Bagikan Tautan"
          >
            <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Toggle Simulator on Mobile / Tablet */}
          <button
            onClick={onToggleMobilePreview}
            className={`px-2 sm:px-2.5 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1 transition-all lg:hidden shrink-0 ${
              showMobileSimulator
                ? 'bg-slate-950 border-slate-950 text-white'
                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
            }`}
            title="Lihat Preview HP"
          >
            <Smartphone className="w-3.5 h-3.5 shrink-0" />
            <span className="text-[10px] sm:text-[11px] hidden xs:inline">Preview HP</span>
          </button>
        </div>
      </div>
    </header>
  );
};
