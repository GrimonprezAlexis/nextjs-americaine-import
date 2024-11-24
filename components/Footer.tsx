"use client";

import Link from "next/link";
import { Instagram, Mail, Phone, MapPin, Car, FileText, Wrench } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Americaine Motor</h3>
            <p className="text-gray-400">
              Spécialiste des véhicules américains en Savoie
            </p>
            <div className="mt-4 space-y-2">
              <a
                href="https://www.instagram.com/americaine.motor73/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5 mr-2" />
                @americaine.motor73
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <div className="space-y-2">
              <a href="tel:+33XXXXXXXXX" className="flex items-center text-gray-400 hover:text-white transition-colors">
                <Phone className="w-5 h-5 mr-2" />
                +33 X XX XX XX XX
              </a>
              <a href="mailto:contact@americaineimport.fr" className="flex items-center text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5 mr-2" />
                contact@americaineimport.fr
              </a>
              <div className="flex items-center text-gray-400">
                <MapPin className="w-5 h-5 mr-2" />
                Savoie, France
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <div className="space-y-2">
              <Link href="/services/vente" className="flex items-center text-gray-400 hover:text-white transition-colors">
                <Car className="w-5 h-5 mr-2" />
                Vente / Importation
              </Link>
              <Link href="/services/reparation" className="flex items-center text-gray-400 hover:text-white transition-colors">
                <Wrench className="w-5 h-5 mr-2" />
                Réparation / Entretien
              </Link>
              <Link href="/services/carte-grise" className="flex items-center text-gray-400 hover:text-white transition-colors">
                <FileText className="w-5 h-5 mr-2" />
                Service Carte Grise
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Navigation</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-gray-400 hover:text-white transition-colors">
                Accueil
              </Link>
              <Link href="/a-propos" className="block text-gray-400 hover:text-white transition-colors">
                À propos
              </Link>
              <Link href="/services" className="block text-gray-400 hover:text-white transition-colors">
                Services
              </Link>
              <Link href="/contact" className="block text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Americaine Motor. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}