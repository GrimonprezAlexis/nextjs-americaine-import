"use client";

import { motion } from "framer-motion";
import { Car } from "lucide-react";
import { VehicleCard } from "@/components/vehicles/VehicleCard";

export default function VentePage() {
  const features = [
    {
      title: "Recherche Personnalisée",
      description: "Nous trouvons le véhicule de vos rêves selon vos critères",
    },
    {
      title: "Import USA & Canada",
      description: "Gestion complète de l'importation de votre véhicule",
    },
    {
      title: "Garantie Véhicule",
      description: "Tous nos véhicules sont garantis pour votre tranquillité",
    },
  ];

  const vehicles = [
    {
      id: "1",
      name: "Dodge Challenger R/T Scat Pack",
      year: "2023",
      price: "72 900 €",
      mileage: "12 000 km",
      fuel: "Essence",
      transmission: "Automatique",
      image: "https://images.unsplash.com/photo-1612544448445-b8232cff3b6c?auto=format&fit=crop&w=1600&q=80",
      description: "La Dodge Challenger R/T Scat Pack 2023 incarne la puissance à l'état pur. Équipée d'un moteur HEMI V8 de 6.4L développant 485 chevaux, cette muscle car américaine offre des performances exceptionnelles tout en conservant le style iconique qui a fait sa renommée.",
      specs: {
        engine: "6.4L HEMI V8",
        power: "485 ch",
        acceleration: "4.3 secondes",
        topSpeed: "275 km/h",
      },
    },
    {
      id: "2",
      name: "Ford Mustang GT Premium",
      year: "2022",
      price: "65 900 €",
      mileage: "15 000 km",
      fuel: "Essence",
      transmission: "Manuelle",
      image: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1600&q=80",
      description: "La Ford Mustang GT Premium représente le parfait équilibre entre performance et luxe. Son moteur V8 de 5.0L produit une sonorité incomparable et des sensations de conduite uniques, tandis que son habitacle premium offre tout le confort moderne.",
      specs: {
        engine: "5.0L V8",
        power: "450 ch",
        acceleration: "4.5 secondes",
        topSpeed: "250 km/h",
      },
    },
    {
      id: "3",
      name: "Chevrolet Camaro ZL1",
      year: "2023",
      price: "89 900 €",
      mileage: "8 000 km",
      fuel: "Essence",
      transmission: "Automatique",
      image: "https://images.unsplash.com/photo-1603553329474-99f95f35394f?auto=format&fit=crop&w=1600&q=80",
      description: "La Chevrolet Camaro ZL1 est la quintessence de la performance américaine. Avec son moteur V8 suralimenté de 6.2L développant 650 chevaux, elle offre des performances dignes d'une supercar tout en restant utilisable au quotidien.",
      specs: {
        engine: "6.2L V8 Supercharged",
        power: "650 ch",
        acceleration: "3.5 secondes",
        topSpeed: "315 km/h",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-black pt-20">
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Car className="w-16 h-16 text-blue-500 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Vente & Importation
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Importation clé en main depuis USA/CANADA/EUROPE
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-900 rounded-xl p-8 text-center"
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Véhicules Disponibles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center bg-gray-900 rounded-xl p-8"
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            Vous recherchez un véhicule spécifique ?
          </h2>
          <p className="text-gray-400 mb-8">
            Contactez-nous avec vos critères, nous le trouverons pour vous.
          </p>
          <div className="inline-flex space-x-4">
            <a
              href="/contact"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg transition-colors"
            >
              Nous contacter
            </a>
          </div>
        </motion.div>
      </main>
    </div>
  );
}