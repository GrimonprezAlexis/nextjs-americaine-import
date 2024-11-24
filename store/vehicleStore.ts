"use client";

import { create } from 'zustand';
import { db, storage } from '@/lib/firebase/config';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
  getDoc,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

interface Vehicle {
  id: string;
  name: string;
  year: string;
  price: string;
  mileage: string;
  fuel: string;
  transmission: string;
  image: string;
  description: string;
  specs: {
    engine: string;
    power: string;
    acceleration: string;
    topSpeed: string;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
  documentId?: string; // For storing Firestore document ID
  status: 'available' | 'sold' | 'reserved';
}

interface VehicleStore {
  vehicles: Vehicle[];
  loading: boolean;
  error: string | null;
  fetchVehicles: () => Promise<void>;
  getVehicle: (id: string) => Promise<Vehicle | null>;
  addVehicle: (vehicle: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt' | 'documentId'>) => Promise<string>;
  updateVehicle: (id: string, updates: Partial<Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt' | 'documentId'>>) => Promise<void>;
  deleteVehicle: (id: string) => Promise<void>;
  uploadImage: (file: File) => Promise<string>;
  deleteImage: (imageUrl: string) => Promise<void>;
}

export const useVehicleStore = create<VehicleStore>((set, get) => ({
  vehicles: [],
  loading: false,
  error: null,

  fetchVehicles: async () => {
    try {
      set({ loading: true, error: null });
      const vehiclesQuery = query(collection(db, 'vehicles'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(vehiclesQuery);
      const vehicles = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
        documentId: doc.id,
      })) as Vehicle[];
      set({ vehicles, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  getVehicle: async (id: string) => {
    try {
      const docRef = doc(db, 'vehicles', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { 
          ...docSnap.data(),
          id: docSnap.id,
          documentId: docSnap.id,
        } as Vehicle;
      }
      return null;
    } catch (error) {
      console.error("Error getting vehicle:", error);
      return null;
    }
  },

  addVehicle: async (vehicle) => {
    try {
      set({ loading: true, error: null });
      const docRef = await addDoc(collection(db, 'vehicles'), {
        ...vehicle,
        status: 'available',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      await get().fetchVehicles();
      set({ loading: false });
      return docRef.id;
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      throw error;
    }
  },

  updateVehicle: async (id: string, updates) => {
    try {
      set({ loading: true, error: null });
      const vehicleRef = doc(db, 'vehicles', id);
      
      await updateDoc(vehicleRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
      
      await get().fetchVehicles();
      set({ loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      throw error;
    }
  },

  deleteVehicle: async (id: string) => {
    try {
      set({ loading: true, error: null });
      
      const vehicleRef = doc(db, 'vehicles', id);
      const vehicleSnap = await getDoc(vehicleRef);
      
      if (vehicleSnap.exists()) {
        const vehicleData = vehicleSnap.data();
        if (vehicleData.image) {
          await get().deleteImage(vehicleData.image);
        }
        await deleteDoc(vehicleRef);
        await get().fetchVehicles();
      }
      
      set({ loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      throw error;
    }
  },

  uploadImage: async (file: File) => {
    try {
      const storageRef = ref(storage, `vehicles/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      return getDownloadURL(storageRef);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },

  deleteImage: async (imageUrl: string) => {
    if (!imageUrl) return;
    
    try {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  },
}));