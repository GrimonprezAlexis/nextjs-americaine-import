"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, X, Calendar, DollarSign, Fuel, Info, ImageOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VehicleProps {
  id: string;
  name: string;
  year: string;
  price: string;
  mileage: string;
  fuel: string;
  transmission: string;
  description: string;
  image: string;
  specs: {
    engine: string;
    power: string;
    acceleration: string;
    topSpeed: string;
  };
}

export function VehicleCard({ vehicle }: { vehicle: VehicleProps }) {
  const [showDetails, setShowDetails] = useState(false);
  const [imageError, setImageError] = useState(false);

  const defaultImage = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80";

  return (
    <>
      <motion.div
        layout
        className="relative group overflow-hidden rounded-xl aspect-[16/9]"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {imageError ? (
          <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
            <ImageOff className="w-12 h-12 text-gray-600" />
          </div>
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url(${vehicle.image || defaultImage})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <h3 className="text-2xl font-bold text-white mb-2">{vehicle.name}</h3>
          <div className="flex items-center space-x-4 text-gray-200 mb-4">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{vehicle.year}</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 mr-1" />
              <span>{vehicle.price}</span>
            </div>
            <div className="flex items-center">
              <Fuel className="w-4 h-4 mr-1" />
              <span>{vehicle.fuel}</span>
            </div>
          </div>
          <Button
            onClick={() => setShowDetails(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <Info className="w-4 h-4 mr-2" />
            Voir les détails
          </Button>
        </div>
      </motion.div>

      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80"
            onClick={() => setShowDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                {imageError ? (
                  <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                    <ImageOff className="w-16 h-16 text-gray-600" />
                  </div>
                ) : (
                  <Image
                    src={vehicle.image || defaultImage}
                    alt={vehicle.name}
                    fill
                    className="object-cover rounded-t-xl"
                    onError={() => setImageError(true)}
                    priority
                  />
                )}
                <button
                  onClick={() => setShowDetails(false)}
                  className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6">
                <h2 className="text-3xl font-bold text-white mb-4">{vehicle.name}</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <span className="text-gray-400 text-sm">Année</span>
                    <p className="text-white font-semibold">{vehicle.year}</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <span className="text-gray-400 text-sm">Prix</span>
                    <p className="text-white font-semibold">{vehicle.price}</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <span className="text-gray-400 text-sm">Kilométrage</span>
                    <p className="text-white font-semibold">{vehicle.mileage}</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <span className="text-gray-400 text-sm">Transmission</span>
                    <p className="text-white font-semibold">{vehicle.transmission}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Spécifications</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <span className="text-gray-400 text-sm">Moteur</span>
                      <p className="text-white font-semibold">{vehicle.specs.engine}</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <span className="text-gray-400 text-sm">Puissance</span>
                      <p className="text-white font-semibold">{vehicle.specs.power}</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <span className="text-gray-400 text-sm">0-100 km/h</span>
                      <p className="text-white font-semibold">{vehicle.specs.acceleration}</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <span className="text-gray-400 text-sm">Vitesse max</span>
                      <p className="text-white font-semibold">{vehicle.specs.topSpeed}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Description</h3>
                  <p className="text-gray-300">{vehicle.description}</p>
                </div>

                <div className="flex space-x-4">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Demander plus d'informations
                  </Button>
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">
                    Réserver un essai
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}