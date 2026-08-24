import { Workspace, UserProfile, BioLink, AnalyticsStats, AuthUser } from '../types';
import { WORKSPACE_TEMPLATES } from '../data/workspaceTemplates';
import { saveWorkspaceToFirestore, deleteWorkspaceFromFirestore, recordUserRegistration } from './firebase';

const WORKSPACES_STORAGE_KEY = 'linkbio_all_workspaces_v2';
const ACTIVE_WORKSPACE_ID_KEY = 'linkbio_active_workspace_id_v2';

export class WorkspaceService {
  // Get all cached or created workspaces
  static getAllWorkspaces(): Workspace[] {
    try {
      const data = localStorage.getItem(WORKSPACES_STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse workspaces from localStorage:', e);
    }

    // Default: initialize with first template
    const defaultWs = WORKSPACE_TEMPLATES[0].createWorkspace();
    this.saveAllWorkspaces([defaultWs]);
    this.setActiveWorkspaceId(defaultWs.id);
    return [defaultWs];
  }

  static saveAllWorkspaces(workspaces: Workspace[], authUser?: AuthUser | null): void {
    try {
      localStorage.setItem(WORKSPACES_STORAGE_KEY, JSON.stringify(workspaces));
      window.dispatchEvent(new CustomEvent('linkbio_workspaces_updated', { detail: workspaces }));
      
      // If user is logged in, sync to Firestore
      if (authUser?.uid) {
        workspaces.forEach(ws => {
          saveWorkspaceToFirestore(ws, authUser.uid);
        });
        recordUserRegistration(authUser, workspaces.length);
      }
    } catch (e) {
      console.error('Failed to save workspaces', e);
    }
  }

  static getActiveWorkspaceId(): string {
    try {
      const activeId = localStorage.getItem(ACTIVE_WORKSPACE_ID_KEY);
      if (activeId) return activeId;
    } catch (e) {
      console.warn(e);
    }
    const all = this.getAllWorkspaces();
    return all[0]?.id || '';
  }

  static setActiveWorkspaceId(id: string): void {
    try {
      localStorage.setItem(ACTIVE_WORKSPACE_ID_KEY, id);
      window.dispatchEvent(new CustomEvent('linkbio_active_workspace_changed', { detail: id }));
    } catch (e) {
      console.error(e);
    }
  }

  static getActiveWorkspace(): Workspace {
    const all = this.getAllWorkspaces();
    const activeId = this.getActiveWorkspaceId();
    const found = all.find(w => w.id === activeId);
    if (found) return found;
    return all[0] || WORKSPACE_TEMPLATES[0].createWorkspace();
  }

  static updateActiveWorkspace(
    updates: Partial<Workspace>,
    authUser?: AuthUser | null
  ): Workspace {
    const all = this.getAllWorkspaces();
    const activeId = this.getActiveWorkspaceId();
    let updatedWorkspace: Workspace | null = null;

    const newAll = all.map(ws => {
      if (ws.id === activeId) {
        updatedWorkspace = {
          ...ws,
          ...updates,
          updatedAt: Date.now(),
        };
        return updatedWorkspace;
      }
      return ws;
    });

    if (updatedWorkspace) {
      this.saveAllWorkspaces(newAll, authUser);
      if (authUser?.uid) {
        saveWorkspaceToFirestore(updatedWorkspace, authUser.uid);
      }
      return updatedWorkspace;
    }

    return all[0];
  }

  static updateActiveProfile(profile: UserProfile, authUser?: AuthUser | null): void {
    this.updateActiveWorkspace({ profile, username: profile.username }, authUser);
  }

  static updateActiveLinks(links: BioLink[], authUser?: AuthUser | null): void {
    this.updateActiveWorkspace({ links }, authUser);
  }

  static updateActiveAnalytics(analytics: AnalyticsStats, authUser?: AuthUser | null): void {
    this.updateActiveWorkspace({ analytics }, authUser);
  }

  static createWorkspaceFromTemplate(
    templateId: string,
    customName?: string,
    customUsername?: string,
    authUser?: AuthUser | null
  ): Workspace {
    const template = WORKSPACE_TEMPLATES.find(t => t.id === templateId) || WORKSPACE_TEMPLATES[0];
    const newWs = template.createWorkspace(authUser?.uid);
    if (customName) newWs.name = customName;
    if (customUsername) {
      newWs.username = customUsername.toLowerCase().replace(/[^a-z0-9._-]/g, '');
      newWs.profile.username = newWs.username;
    }

    const all = this.getAllWorkspaces();
    const updated = [newWs, ...all];
    this.saveAllWorkspaces(updated, authUser);
    this.setActiveWorkspaceId(newWs.id);

    if (authUser?.uid) {
      saveWorkspaceToFirestore(newWs, authUser.uid);
      recordUserRegistration(authUser, updated.length);
    }

    return newWs;
  }

  static deleteWorkspace(workspaceId: string, authUser?: AuthUser | null): void {
    const all = this.getAllWorkspaces();
    if (all.length <= 1) {
      alert('Anda harus memiliki minimal 1 workspace.');
      return;
    }

    const filtered = all.filter(w => w.id !== workspaceId);
    this.saveAllWorkspaces(filtered, authUser);

    if (this.getActiveWorkspaceId() === workspaceId) {
      this.setActiveWorkspaceId(filtered[0].id);
    }

    if (authUser?.uid) {
      deleteWorkspaceFromFirestore(workspaceId);
      recordUserRegistration(authUser, filtered.length);
    }
  }

  // Merge Firestore cloud workspaces with local workspaces on login
  static mergeCloudWorkspaces(cloudWorkspaces: Workspace[], authUser: AuthUser): Workspace[] {
    if (!cloudWorkspaces || cloudWorkspaces.length === 0) {
      // If cloud has none, upload local workspaces to cloud
      const locals = this.getAllWorkspaces();
      locals.forEach(l => saveWorkspaceToFirestore({ ...l, userId: authUser.uid }, authUser.uid));
      recordUserRegistration(authUser, locals.length);
      return locals;
    }

    const localMap = new Map<string, Workspace>();
    this.getAllWorkspaces().forEach(w => localMap.set(w.id, w));

    cloudWorkspaces.forEach(cw => {
      localMap.set(cw.id, cw);
    });

    const merged = Array.from(localMap.values());
    this.saveAllWorkspaces(merged);
    return merged;
  }
}
