import { UserProfile, BioLink, ClickEvent, PageViewEvent, AnalyticsStats, AuthUser } from '../types';
import { WorkspaceService } from './workspaceService';

export class StorageService {
  static getProfile(): UserProfile {
    const activeWs = WorkspaceService.getActiveWorkspace();
    return activeWs.profile;
  }

  static saveProfile(profile: UserProfile, authUser?: AuthUser | null): void {
    WorkspaceService.updateActiveProfile(profile, authUser);
    window.dispatchEvent(new CustomEvent('linkbio_profile_updated', { detail: profile }));
  }

  static getLinks(): BioLink[] {
    const activeWs = WorkspaceService.getActiveWorkspace();
    return activeWs.links;
  }

  static saveLinks(links: BioLink[], authUser?: AuthUser | null): void {
    WorkspaceService.updateActiveLinks(links, authUser);
    window.dispatchEvent(new CustomEvent('linkbio_links_updated', { detail: links }));
  }

  static getAnalytics(): AnalyticsStats {
    const activeWs = WorkspaceService.getActiveWorkspace();
    return {
      ...activeWs.analytics,
      activeNow: Math.floor(Math.random() * 8) + 4,
    };
  }

  static recordPageView(): void {
    const activeWs = WorkspaceService.getActiveWorkspace();
    const analytics = { ...activeWs.analytics };
    const isMobile = window.innerWidth <= 768 || /Mobi|Android/i.test(navigator.userAgent);
    const newView: PageViewEvent = {
      id: `view-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: Date.now(),
      referrer: document.referrer ? (new URL(document.referrer).hostname || 'Direct') : 'Direct',
      device: isMobile ? 'Mobile' : 'Desktop',
      country: 'Indonesia',
    };

    analytics.views = [newView, ...(analytics.views || [])];
    analytics.totalViews = (analytics.totalViews || 0) + 1;

    if (analytics.views.length > 2000) {
      analytics.views = analytics.views.slice(0, 2000);
    }

    WorkspaceService.updateActiveAnalytics(analytics);
    window.dispatchEvent(new CustomEvent('linkbio_analytics_updated', { detail: analytics }));
  }

  static recordClick(linkId: string, linkTitle: string): void {
    const activeWs = WorkspaceService.getActiveWorkspace();
    const links = activeWs.links.map(link => {
      if (link.id === linkId) {
        return { ...link, clicks: (link.clicks || 0) + 1 };
      }
      return link;
    });

    const isMobile = window.innerWidth <= 768 || /Mobi|Android/i.test(navigator.userAgent);
    const cities = ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang', 'Yogyakarta', 'Tangerang', 'Bekasi', 'Bali'];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];

    const referrers = ['Instagram', 'TikTok', 'WhatsApp', 'Direct', 'Google'];
    const randomReferrer = referrers[Math.floor(Math.random() * referrers.length)];

    const newClick: ClickEvent = {
      id: `click-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      linkId,
      linkTitle,
      timestamp: Date.now(),
      referrer: randomReferrer,
      device: isMobile ? 'Mobile' : 'Desktop',
      browser: isMobile ? 'Mobile Safari / Chrome' : 'Chrome',
      country: 'Indonesia',
      city: randomCity,
    };

    const analytics = { ...activeWs.analytics };
    analytics.clicks = [newClick, ...(analytics.clicks || [])];
    analytics.totalClicks = (analytics.totalClicks || 0) + 1;

    if (analytics.clicks.length > 2000) {
      analytics.clicks = analytics.clicks.slice(0, 2000);
    }

    WorkspaceService.updateActiveWorkspace({
      links,
      analytics,
    });

    window.dispatchEvent(new CustomEvent('linkbio_links_updated', { detail: links }));
    window.dispatchEvent(new CustomEvent('linkbio_analytics_updated', { detail: analytics }));
  }

  static resetAllData(): void {
    localStorage.clear();
    window.location.reload();
  }
}

