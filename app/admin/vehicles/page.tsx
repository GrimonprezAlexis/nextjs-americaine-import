"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VehicleForm } from "@/components/admin/VehicleForm";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { VehicleList } from "@/components/admin/VehicleList";
import { useVehicleStore } from "@/store/vehicleStore";

export default function AdminVehiclesPage() {
  const [previewVehicle, setPreviewVehicle] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const emptyVehicle = {
    id: "",
    name: "",
    year: "",
    price: "",
    mileage: "",
    fuel: "Essence",
    transmission: "Automatique",
    image: "",
    description: "",
    specs: {
      engine: "",
      power: "",
      acceleration: "",
      topSpeed: "",
    },
  };

  return (
    <div className="min-h-screen bg-black pt-20">
      <main className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Gestion des Véhicules</h1>
          <Button
            onClick={() => {
              setPreviewVehicle(emptyVehicle);
              setIsEditing(true);
            }}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouveau véhicule
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vehicle List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-900 rounded-xl p-6"
          >
            <VehicleList
              onEdit={(vehicle) => {
                setPreviewVehicle(vehicle);
                setIsEditing(true);
              }}
            />
          </motion.div>

          {/* Edit Form and Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {isEditing ? (
              <div className="bg-gray-900 rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-white">
                    {previewVehicle?.id ? "Modifier le véhicule" : "Nouveau véhicule"}
                  </h2>
                  <Button
                    variant="outline"
                    onClick={() => setShowPreview(!showPreview)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {showPreview ? "Masquer" : "Prévisualiser"}
                  </Button>
                </div>

                <VehicleForm
                  vehicle={previewVehicle}
                  onUpdate={setPreviewVehicle}
                  onSave={() => {
                    setIsEditing(false);
                    setPreviewVehicle(null);
                  }}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                Sélectionnez un véhicule à modifier ou créez-en un nouveau
              </div>
            )}

            {/* Preview */}
            {showPreview && previewVehicle && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-xl font-semibold text-white mb-4">Prévisualisation</h2>
                <VehicleCard vehicle={previewVehicle} />
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}