"use client";

import { create } from 'zustand';
import { auth, db, storage } from '@/lib/firebase/config';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  isAdmin: boolean;
  photoURL?: string | null;
  createdAt: number;
  lastLogin: number;
}

interface AuthState {
  user: UserData | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: UserData | null) => void;
  uploadDocument: (file: File, path: string) => Promise<string>;
  updateProfile: (data: Partial<UserData>) => Promise<void>;
}

const getUserData = async (user: User): Promise<UserData> => {
  const userRef = doc(db, 'users', user.uid);
  const userDoc = await getDoc(userRef);
  const now = Date.now();
  
  if (userDoc.exists()) {
    const userData = userDoc.data() as UserData;
    await updateDoc(userRef, { lastLogin: now });
    return { ...userData, lastLogin: now };
  }
  
  const userData: UserData = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    isAdmin: false,
    photoURL: user.photoURL,
    createdAt: now,
    lastLogin: now,
  };
  
  await setDoc(userRef, userData);
  return userData;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: true,
  error: null,

  signIn: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userData = await getUserData(userCredential.user);
      set({ user: userData, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  signUp: async (email: string, password: string, name: string) => {
    try {
      set({ loading: true, error: null });
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const now = Date.now();
      const userData: UserData = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: name,
        isAdmin: false,
        createdAt: now,
        lastLogin: now,
      };
      await setDoc(doc(db, 'users', userCredential.user.uid), userData);
      set({ user: userData, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  signInWithGoogle: async () => {
    try {
      set({ loading: true, error: null });
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const userData = await getUserData(userCredential.user);
      set({ user: userData, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
      set({ user: null, error: null });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  setUser: (user: UserData | null) => {
    set({ user, loading: false });
  },

  uploadDocument: async (file: File, path: string) => {
    const user = get().user;
    if (!user) throw new Error('User not authenticated');

    const storageRef = ref(storage, `${path}/${user.uid}/${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  },

  updateProfile: async (data: Partial<UserData>) => {
    const user = get().user;
    if (!user) throw new Error('User not authenticated');

    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, data);
    set({ user: { ...user, ...data } });
  },
}));