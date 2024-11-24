"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const { user, loading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto bg-gray-900 rounded-xl p-8"
        >
          <h1 className="text-3xl font-bold text-white mb-8">Mon Profil</h1>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-300">Nom</h2>
              <p className="text-white">{user.displayName || "Non défini"}</p>
            </div>
            
            <div>
              <h2 className="text-lg font-medium text-gray-300">Email</h2>
              <p className="text-white">{user.email}</p>
            </div>

            {user.isAdmin && (
              <div>
                <h2 className="text-lg font-medium text-gray-300">Statut</h2>
                <p className="text-white">Administrateur</p>
              </div>
            )}

            <div className="pt-4">
              <Button
                onClick={() => router.push("/profile/edit")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Modifier le profil
              </Button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}