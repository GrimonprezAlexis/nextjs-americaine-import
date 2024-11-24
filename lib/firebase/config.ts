"use client";

import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAO4AuFA5SWRuRoRPBJypaWEI1FT82Z7j8",
  authDomain: "americaineimport-f16ac.firebaseapp.com",
  projectId: "americaineimport-f16ac",
  storageBucket: "americaineimport-f16ac.firebasestorage.app",
  messagingSenderId: "66304726484",
  appId: "1:66304726484:web:3084f5d0f09b33a3323241",
  measurementId: "G-3GNP8SR401"
};


// Initialize Firebase only if it hasn't been initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };