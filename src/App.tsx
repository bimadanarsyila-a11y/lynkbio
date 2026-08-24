import React, { useState, useEffect, useCallback } from 'react';
import {
  UserProfile,
  BioLink,
  AnalyticsStats,
  Workspace,
  AuthUser,
  RegisteredUserRecord,
} from './types';
import { StorageService } from './services/storage';
import { WorkspaceService } from './services/workspaceService';
import {
  auth,
  signInWithGoogle,
  logoutUser,
  subscribeRegisteredUsers,
  subscribeUserWorkspaces,
} from './services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { isAdminUser } from './utils/admin';
import { Navbar } from './components/Navbar';
import { LinksEditor } from './components/LinksEditor';
import { AppearanceEditor } from './components/AppearanceEditor';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { MobileSimulator } from './components/MobileSimulator';
import { PublicBioPage } from './components/PublicBioPage';
import { QrCodeModal } from './components/QrCodeModal';
import { ShareModal } from './components/ShareModal';
import { AiBioAssistant } from './components/AiBioAssistant';
import { WorkspaceModal } from './components/WorkspaceModal';
import { RegisteredUsersModal } from './components/RegisteredUsersModal';
import { LandingLoginPage } from './components/LandingLoginPage';
import {
  ArrowLeft,
  Smartphone,
  ExternalLink,
  Copy,
  Check,
  QrCode,
  Share2,
  Sparkles,
  X,
  RotateCw,
} from 'lucide-react';

export default function App() {
  // Auth State
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUserRecord[]>([]);

  // View Mode: 'studio' (editor & live preview) vs 'landing' (showcase & auth portal)
  const [viewMode, setViewMode] = useState<'landing' | 'studio'>(() => {
    if (window.location.hash === '#login' || window.location.hash === '#portal' || window.location.hash === '#landing') {
      return 'landing';
    }
    // Default to landing page for guests, studio for others, but we evaluate it after auth loads
    return 'landing'; 
  });

  // Admin Check
  const isAdmin = isAdminUser(authUser);

  // Workspace & Profile States
  const [workspaces, setWorkspaces] = useState<Workspace[]>(() => WorkspaceService.getAllWorkspaces());
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string>(() => WorkspaceService.getActiveWorkspaceId());
  
  const activeWorkspace = workspaces.find(w => w.id === activeWorkspaceId) || workspaces[0] || WorkspaceService.getActiveWorkspace();
  const profile = activeWorkspace.profile;
  const links = activeWorkspace.links;
  const analytics = activeWorkspace.analytics;

  const [activeTab, setActiveTab] = useState<'links' | 'appearance' | 'analytics'>('links');
  const [isFullPublicMode, setIsFullPublicMode] = useState<boolean>(() => {
    return window.location.hash.startsWith('#/@') || window.location.hash === '#preview';
  });

  // UI Modals
  const [showMobileSimulator, setShowMobileSimulator] = useState<boolean>(true);
  const [isMobilePreviewModalOpen, setIsMobilePreviewModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = useState(false);
  const [isRegisteredUsersModalOpen, setIsRegisteredUsersModalOpen] = useState(false);

  // 1. Listen for Firebase Auth Changes
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const currentAuth: AuthUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };
        setAuthUser(currentAuth);
        
        // If they just opened the app without a specific hash, route to studio
        if (!window.location.hash || window.location.hash === '') {
          setViewMode('studio');
        }
      } else {
        setAuthUser(null);
        // If they are not logged in and not looking at a public profile, show landing
        if (!window.location.hash.startsWith('#/@') && window.location.hash !== '#preview') {
          setViewMode('landing');
        }
      }
      setIsAuthLoaded(true);
    });

    // 2. Subscribe to Registered Users collection in Firestore
    const unsubscribeUsers = subscribeRegisteredUsers((usersList) => {
      setRegisteredUsers(usersList);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeUsers();
    };
  }, []);

  // 3. When authUser changes, subscribe to their cloud workspaces
  useEffect(() => {
    if (!authUser?.uid) return;

    const unsubscribeWs = subscribeUserWorkspaces(authUser.uid, (cloudWorkspaces) => {
      if (cloudWorkspaces && cloudWorkspaces.length > 0) {
        const merged = WorkspaceService.mergeCloudWorkspaces(cloudWorkspaces, authUser);
        setWorkspaces(merged);
      }
    });

    return () => {
      unsubscribeWs();
    };
  }, [authUser?.uid]);

  // 4. Synchronize Workspace state with custom events & hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/@') || hash === '#preview') {
        setIsFullPublicMode(true);
      } else if (hash === '#login' || hash === '#portal' || hash === '#landing') {
        setIsFullPublicMode(false);
        setViewMode('landing');
      } else {
        setIsFullPublicMode(false);
        setViewMode('studio');
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    const handleWorkspacesUpdate = (e: CustomEvent<Workspace[]>) => {
      setWorkspaces(e.detail);
    };
    const handleActiveWorkspaceChange = (e: CustomEvent<string>) => {
      setActiveWorkspaceId(e.detail);
    };

    window.addEventListener('linkbio_workspaces_updated', handleWorkspacesUpdate as EventListener);
    window.addEventListener('linkbio_active_workspace_changed', handleActiveWorkspaceChange as EventListener);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('linkbio_workspaces_updated', handleWorkspacesUpdate as EventListener);
      window.removeEventListener('linkbio_active_workspace_changed', handleActiveWorkspaceChange as EventListener);
    };
  }, []);

  // Handlers
  const handleSelectWorkspace = (wsId: string) => {
    WorkspaceService.setActiveWorkspaceId(wsId);
    setActiveWorkspaceId(wsId);
  };

  const handleUpdateProfile = useCallback((updated: UserProfile) => {
    StorageService.saveProfile(updated, authUser);
    setWorkspaces(WorkspaceService.getAllWorkspaces());
  }, [authUser]);

  const handleUpdateLinks = useCallback((updated: BioLink[]) => {
    StorageService.saveLinks(updated, authUser);
    setWorkspaces(WorkspaceService.getAllWorkspaces());
  }, [authUser]);

  const handleRefreshAnalytics = useCallback(() => {
    setWorkspaces(WorkspaceService.getAllWorkspaces());
  }, []);

  const handleLoginGoogle = async () => {
    try {
      const user = await signInWithGoogle();
      setAuthUser(user);
      if (window.location.hash === '#login' || window.location.hash === '#portal' || window.location.hash === '#landing') {
        window.history.replaceState(null, '', ' ');
      }
      setViewMode('studio');
    } catch (err: any) {
      console.error('Login error:', err);
      alert('Gagal melakukan login. Pastikan browser Anda tidak memblokir popup atau coba gunakan mode incognito.');
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setAuthUser(null);
      setViewMode('landing');
      window.location.hash = '#portal';
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const handleApplyAiBio = (newBio: string) => {
    const updated = { ...profile, bio: newBio };
    handleUpdateProfile(updated);
  };

  const handleAddAiSuggestedLink = (
    title: string,
    subtitle: string,
    url: string,
    iconName: string
  ) => {
    const newLink: BioLink = {
      id: `link-${Date.now()}`,
      type: 'standard',
      title,
      subtitle,
      url,
      iconName,
      enabled: true,
      clicks: 0,
      createdAt: Date.now(),
    };
    handleUpdateLinks([newLink, ...links]);
  };

  if (!isAuthLoaded) {
    return (
      <div className="min-h-screen w-full bg-slate-950 flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
        <p className="text-slate-400 text-sm font-semibold animate-pulse">Memuat workspace Anda...</p>
      </div>
    );
  }

  // 1. FULL PUBLIC VIEW MODE
  if (isFullPublicMode) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-start bg-slate-900">
        {/* Floating Top Return to Studio banner */}
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700 shadow-2xl text-xs text-white">
          <button
            onClick={() => {
              window.location.hash = '';
              setIsFullPublicMode(false);
              setViewMode('studio');
            }}
            className="flex items-center gap-1.5 font-bold hover:text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Studio</span>
          </button>
          <span className="opacity-30">|</span>
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="hover:text-slate-300 transition-colors p-1"
            title="Bagikan Profil"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsQrModalOpen(true)}
            className="hover:text-slate-300 transition-colors p-1"
            title="QR Code"
          >
            <QrCode className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Public Mobile Bio Page */}
        <div className="w-full min-h-screen flex justify-center pt-10">
          <PublicBioPage
            profile={profile}
            links={links}
            onShareClick={() => setIsShareModalOpen(true)}
            onQrClick={() => setIsQrModalOpen(true)}
            isSimulated={false}
          />
        </div>

        {/* Modals */}
        <QrCodeModal
          isOpen={isQrModalOpen}
          onClose={() => setIsQrModalOpen(false)}
          profile={profile}
        />
        <ShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          profile={profile}
        />
      </div>
    );
  }

  // 2. INITIAL LANDING & LOGIN SHOWCASE PAGE
  if (viewMode === 'landing') {
    return (
      <LandingLoginPage
        onLoginWithGoogle={handleLoginGoogle}
        onEnterStudio={() => {
          if (window.location.hash === '#login' || window.location.hash === '#portal' || window.location.hash === '#landing') {
            window.history.replaceState(null, '', ' ');
          }
          setViewMode('studio');
        }}
        authUser={authUser}
        isAdmin={isAdmin}
      />
    );
  }

  // 3. STUDIO CREATOR WORKSPACE
  return (
    <div className="min-h-screen w-full max-w-[100vw] bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-slate-900 selection:text-white overflow-x-hidden">
      {/* Top Main Navigation Bar with Workspace & Gmail Auth */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        profile={profile}
        workspaces={workspaces}
        activeWorkspace={activeWorkspace}
        onOpenWorkspaceModal={() => setIsWorkspaceModalOpen(true)}
        onSelectWorkspace={handleSelectWorkspace}
        registeredUsersCount={registeredUsers.length || 1}
        onOpenRegisteredUsersModal={() => {
          if (isAdmin) {
            setIsRegisteredUsersModalOpen(true);
          }
        }}
        authUser={authUser}
        isAdmin={isAdmin}
        onLoginWithGoogle={handleLoginGoogle}
        onLogout={handleLogout}
        onOpenQr={() => setIsQrModalOpen(true)}
        onOpenShare={() => setIsShareModalOpen(true)}
        onOpenLanding={() => setViewMode('landing')}
        onToggleMobilePreview={() => {
          if (window.innerWidth < 1024) {
            setIsMobilePreviewModalOpen(true);
          } else {
            setShowMobileSimulator(!showMobileSimulator);
          }
        }}
        showMobileSimulator={showMobileSimulator}
        onOpenFullPreview={() => {
          window.location.hash = `/@${profile.username || 'user'}`;
          setIsFullPublicMode(true);
        }}
      />

      {/* Main Studio Body (Split view: Editor on Left, Mobile Frame on Right - Laptop Optimized) */}
      <main className="flex-1 w-full max-w-[1720px] mx-auto px-2.5 sm:px-6 lg:px-8 xl:px-10 py-3 sm:py-6 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 xl:gap-10 items-start min-w-0">
        {/* Left / Center Column: Active Editor & Dashboard */}
        <section
          className={`space-y-4 sm:space-y-6 transition-all duration-300 w-full min-w-0 max-w-full overflow-hidden ${
            showMobileSimulator ? 'lg:col-span-7 xl:col-span-7 2xl:col-span-8' : 'lg:col-span-12 max-w-5xl mx-auto'
          }`}
        >
          {activeTab === 'links' && (
            <LinksEditor
              profile={profile}
              links={links}
              onUpdateProfile={handleUpdateProfile}
              onUpdateLinks={handleUpdateLinks}
              onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
            />
          )}

          {activeTab === 'appearance' && (
            <AppearanceEditor
              profile={profile}
              onUpdateProfile={handleUpdateProfile}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsDashboard
              analytics={analytics}
              links={links}
              onRefresh={handleRefreshAnalytics}
            />
          )}
        </section>

        {/* Right Column: Live Interactive Smartphone Simulator (Desktop / Laptop) */}
        {showMobileSimulator && (
          <aside className="lg:col-span-5 xl:col-span-5 2xl:col-span-4 sticky top-20 hidden lg:flex flex-col items-center justify-start">
            <MobileSimulator
              profile={profile}
              links={links}
              onOpenQr={() => setIsQrModalOpen(true)}
              onOpenShare={() => setIsShareModalOpen(true)}
              onOpenFullPreview={() => {
                window.location.hash = `/@${profile.username || 'user'}`;
                setIsFullPublicMode(true);
              }}
            />
          </aside>
        )}
      </main>

      {/* Mobile-Only Dedicated Preview Modal (Clean non-clashing view) */}
      {isMobilePreviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/60 backdrop-blur-xs lg:hidden animate-in fade-in overflow-y-auto">
          <div className="relative w-full max-w-sm bg-white rounded-3xl p-4 shadow-2xl border border-slate-100 flex flex-col items-center my-auto max-h-[92vh]">
            {/* Header with Close */}
            <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-slate-900" />
                <span className="font-bold text-xs text-slate-900">Preview HP Live</span>
              </div>
              <button
                onClick={() => setIsMobilePreviewModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile preview frame */}
            <div className="w-full h-[520px] rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-50 flex flex-col">
              <div className="flex-1 overflow-y-auto">
                <PublicBioPage
                  profile={profile}
                  links={links}
                  onShareClick={() => {
                    setIsMobilePreviewModalOpen(false);
                    setIsShareModalOpen(true);
                  }}
                  onQrClick={() => {
                    setIsMobilePreviewModalOpen(false);
                    setIsQrModalOpen(true);
                  }}
                  isSimulated={true}
                />
              </div>
            </div>

            {/* Close & Fullscreen Actions */}
            <div className="w-full flex items-center justify-between gap-2 mt-3 pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setIsMobilePreviewModalOpen(false);
                  window.location.hash = `/@${profile.username || 'user'}`;
                  setIsFullPublicMode(true);
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center justify-center gap-1 shadow-xs"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Buka Layar Penuh</span>
              </button>
              <button
                onClick={() => setIsMobilePreviewModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Workspace Manager Modal */}
      <WorkspaceModal
        isOpen={isWorkspaceModalOpen}
        onClose={() => setIsWorkspaceModalOpen(false)}
        workspaces={workspaces}
        activeWorkspaceId={activeWorkspaceId}
        onSelectWorkspace={handleSelectWorkspace}
        authUser={authUser}
        onOpenGoogleLogin={handleLoginGoogle}
      />

      {/* Admin Only: Registered Users Modal */}
      {isAdmin && (
        <RegisteredUsersModal
          isOpen={isRegisteredUsersModalOpen}
          onClose={() => setIsRegisteredUsersModalOpen(false)}
          users={registeredUsers}
          onRefresh={() => {
            subscribeRegisteredUsers((list) => setRegisteredUsers(list));
          }}
        />
      )}

      {/* Modals */}
      <QrCodeModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        profile={profile}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        profile={profile}
      />

      <AiBioAssistant
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        onApplyBio={handleApplyAiBio}
        onAddSuggestedLink={handleAddAiSuggestedLink}
      />
    </div>
  );
}
