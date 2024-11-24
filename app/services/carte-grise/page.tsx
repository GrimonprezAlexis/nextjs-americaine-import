"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CarteGrisePage() {
  const services = [
    "Changement de titulaire",
    "Première immatriculation française",
    "Immatriculation provisoire WW",
    "Déclaration achat",
    "Déclaration vente",
    "Demande de duplicata",
    "Demande de correction",
    "Changement adresse",
    "Passage en CG Collection +30ans",
    "Changement données personnelles",
    "Certificat de non gage",
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
          <FileText className="w-16 h-16 text-blue-500 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Service Carte Grise
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Gestion complète de vos démarches administratives
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-900 rounded-xl p-6 hover:bg-gray-800 transition-colors"
            >
              <h3 className="text-xl font-semibold text-white mb-4">{service}</h3>
              <Button className="w-full bg-blue-500 hover:bg-blue-600">
                En savoir plus
              </Button>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}