import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  deleteDoc,
} from 'firebase/firestore';
import firebaseConfigJson from '../../firebase-applet-config.json';
import { AuthUser, RegisteredUserRecord, Workspace } from '../types';

const firebaseConfig = {
  apiKey: firebaseConfigJson.apiKey,
  authDomain: firebaseConfigJson.authDomain,
  projectId: firebaseConfigJson.projectId,
  storageBucket: firebaseConfigJson.storageBucket,
  messagingSenderId: firebaseConfigJson.messagingSenderId,
  appId: firebaseConfigJson.appId,
};

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Initialize Firestore with custom database ID if available
export const db = firebaseConfigJson.firestoreDatabaseId && firebaseConfigJson.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firebaseConfigJson.firestoreDatabaseId)
  : getFirestore(app);

// Auth Helpers
export const signInWithGoogle = async (): Promise<AuthUser> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const authUser: AuthUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    // Record or update registered user in Firestore
    await recordUserRegistration(authUser);

    return authUser;
  } catch (error: any) {
    console.error('Google sign-in error:', error);
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
};

// Record User to Firestore `registered_users`
export const recordUserRegistration = async (user: AuthUser, workspaceCount?: number): Promise<void> => {
  if (!user.uid || !user.email) return;
  try {
    const userRef = doc(db, 'registered_users', user.uid);
    const snap = await getDoc(userRef);

    const now = Date.now();
    if (!snap.exists()) {
      // First time registration
      const newUserDoc: RegisteredUserRecord = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || 'Pengguna LinkBio',
        photoURL: user.photoURL || '',
        firstLoginAt: now,
        lastLoginAt: now,
        workspaceCount: workspaceCount || 1,
      };
      await setDoc(userRef, newUserDoc);
    } else {
      // Existing user update
      const existing = snap.data() as RegisteredUserRecord;
      const updateData: Partial<RegisteredUserRecord> = {
        lastLoginAt: now,
        displayName: user.displayName || existing.displayName,
        photoURL: user.photoURL || existing.photoURL,
      };
      if (typeof workspaceCount === 'number') {
        updateData.workspaceCount = workspaceCount;
      }
      await setDoc(userRef, updateData, { merge: true });
    }
  } catch (err) {
    console.warn('Could not save user registration to Firestore:', err);
  }
};

// Fetch list of all registered users (for admin & dashboard count)
export const subscribeRegisteredUsers = (
  callback: (users: RegisteredUserRecord[]) => void
) => {
  try {
    const usersCol = collection(db, 'registered_users');
    const q = query(usersCol, orderBy('lastLoginAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const users: RegisteredUserRecord[] = [];
      snapshot.forEach((d) => {
        users.push(d.data() as RegisteredUserRecord);
      });
      callback(users);
    }, (error) => {
      console.warn('Error subscribing registered users:', error);
      callback([]);
    });
  } catch (e) {
    console.warn('Failed to listen to registered users:', e);
    return () => {};
  }
};

// Fetch or listen to user workspaces from Firestore
export const subscribeUserWorkspaces = (
  userId: string,
  callback: (workspaces: Workspace[]) => void
) => {
  try {
    const wsCol = collection(db, 'workspaces');
    const q = query(wsCol, where('userId', '==', userId));
    return onSnapshot(q, (snapshot) => {
      const list: Workspace[] = [];
      snapshot.forEach((d) => {
        list.push(d.data() as Workspace);
      });
      callback(list);
    }, (err) => {
      console.warn('Error listening to user workspaces in Firestore:', err);
    });
  } catch (e) {
    console.warn('Error subscribing to workspaces:', e);
    return () => {};
  }
};

// Save a workspace to Firestore
export const saveWorkspaceToFirestore = async (workspace: Workspace, userId: string): Promise<void> => {
  if (!userId || !workspace.id) return;
  try {
    const wsRef = doc(db, 'workspaces', workspace.id);
    await setDoc(wsRef, {
      ...workspace,
      userId,
      updatedAt: Date.now(),
    }, { merge: true });
  } catch (e) {
    console.warn('Could not save workspace to Firestore:', e);
  }
};

// Delete a workspace from Firestore
export const deleteWorkspaceFromFirestore = async (workspaceId: string): Promise<void> => {
  if (!workspaceId) return;
  try {
    const wsRef = doc(db, 'workspaces', workspaceId);
    await deleteDoc(wsRef);
  } catch (e) {
    console.warn('Could not delete workspace from Firestore:', e);
  }
};
