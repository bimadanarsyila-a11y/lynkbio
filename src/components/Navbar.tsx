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
  ChevronDown,
  LogOut,
  Plus,
  ShieldCheck,
  Zap,
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

  const tabs = [
    { id: 'links' as const, label: 'Links', icon: Zap },
    { id: 'appearance' as const, label: 'Appearance', icon: Palette },
    { id: 'analytics' as const, label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row */}
        <div className="flex items-center justify-between py-3 gap-4">
          {/* Left: Brand + Workspace */}
          <div className="flex items-center gap-3">
            {/* Brand Logo */}
            <button
              onClick={onOpenLanding}
              className="flex items-center gap-2 group"
              title="Back to Home"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                <Link2 className="w-4 h-4 text-white" />
              </div>
              <span className="hidden sm:inline font-bold text-lg text-gray-900">lynkbio</span>
            </button>

            {/* Workspace Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsWorkspaceDropdownOpen(!isWorkspaceDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 text-gray-900 text-sm font-medium transition-colors"
              >
                <span>{activeWorkspace.icon || '📁'}</span>
                <span className="max-w-[100px] sm:max-w-[150px] truncate">
                  {activeWorkspace.name}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {isWorkspaceDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setIsWorkspaceDropdownOpen(false)}
                  />
                  <div className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 p-2 z-40 animate-scaleIn">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center justify-between">
                      <span>Workspaces ({workspaces.length})</span>
                      <button
                        onClick={() => {
                          setIsWorkspaceDropdownOpen(false);
                          onOpenWorkspaceModal();
                        }}
                        className="text-green-600 hover:text-green-700 flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>New</span>
                      </button>
                    </div>

                    <div className="max-h-64 overflow-y-auto space-y-1">
                      {workspaces.map((ws) => (
                        <button
                          key={ws.id}
                          onClick={() => {
                            onSelectWorkspace(ws.id);
                            setIsWorkspaceDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-colors ${
                            ws.id === activeWorkspace.id
                              ? 'bg-green-50 text-gray-900'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="text-lg">{ws.icon || '🔗'}</span>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold truncate">{ws.name}</p>
                              <p className="text-xs text-gray-500 font-mono truncate">
                                @{ws.username || ws.profile?.username}
                              </p>
                            </div>
                          </div>
                          {ws.id === activeWorkspace.id && (
                            <Check className="w-4 h-4 text-green-600" />
                          )}
                        </button>
                      ))}
                    </div>

                    <div className="mt-2 pt-2 border-t border-gray-200">
                      <button
                        onClick={() => {
                          setIsWorkspaceDropdownOpen(false);
                          onOpenWorkspaceModal();
                        }}
                        className="w-full py-2.5 px-3 rounded-xl text-sm font-semibold bg-gray-50 hover:bg-gray-100 text-gray-900 flex items-center justify-center gap-2 transition-colors"
                      >
                        <FolderKanban className="w-4 h-4" />
                        <span>Manage Workspaces</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {/* Admin Badge */}
            {isAdmin && (
              <button
                onClick={onOpenRegisteredUsersModal}
                className="hidden sm:flex items-center gap-2 px-3 py-2 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-xl text-orange-700 text-xs font-semibold transition-colors"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{registeredUsersCount} Users</span>
              </button>
            )}

            {/* Preview Toggle */}
            <button
              onClick={onToggleMobilePreview}
              className="hidden lg:flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 text-gray-700 hover:text-gray-900 text-sm transition-colors"
              title="Toggle Preview"
            >
              <Smartphone className="w-4 h-4" />
              <span className="hidden xl:inline">
                {showMobileSimulator ? 'Hide' : 'Show'} Preview
              </span>
            </button>

            {/* Quick Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleCopyLink}
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
                onClick={onOpenShare}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
                title="Share"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenFullPreview}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
                title="Full Preview"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

            {/* User Menu */}
            {authUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-colors"
                >
                  {authUser.photoURL ? (
                    <img
                      src={authUser.photoURL}
                      alt={authUser.displayName || 'User'}
                      className="w-6 h-6 rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center">
                      {(authUser.displayName || authUser.email || 'U')[0].toUpperCase()}
                    </div>
                  )}
                  <span className="hidden sm:inline text-sm text-gray-900 font-medium max-w-[100px] truncate">
                    {authUser.displayName?.split(' ')[0] || 'User'}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {isUserMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-200 p-2 z-40 animate-scaleIn">
                      <div className="px-3 py-2 border-b border-gray-200">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {authUser.displayName || 'User'}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{authUser.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onLogout();
                        }}
                        className="w-full mt-2 flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={onLoginWithGoogle}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-full font-semibold text-sm transition-colors"
              >
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>

        {/* Bottom Row: Tabs */}
        <div className="flex items-center gap-1 py-2 border-t border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
