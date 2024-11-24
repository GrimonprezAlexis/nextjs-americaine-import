"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from 'canvas-confetti';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useVehicleStore } from "@/store/vehicleStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface VehicleFormProps {
  vehicle: any;
  onUpdate: (vehicle: any) => void;
  onSave: () => void;
}

export function VehicleForm({ vehicle, onUpdate, onSave }: VehicleFormProps) {
  const { addVehicle, updateVehicle } = useVehicleStore();
  const isEditing = Boolean(vehicle?.documentId);

  const handleChange = (field: string, value: string) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      onUpdate({
        ...vehicle,
        [parent]: {
          ...vehicle[parent],
          [child]: value,
        },
      });
    } else {
      onUpdate({
        ...vehicle,
        [field]: value,
      });
    }
  };

  const triggerConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999,
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const { documentId, createdAt, updatedAt, ...updates } = vehicle;
        await updateVehicle(documentId, updates);
      } else {
        const { id, ...newVehicle } = vehicle;
        await addVehicle(newVehicle);
      }
      triggerConfetti();
      onSave();
    } catch (error) {
      console.error("Error saving vehicle:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name">Nom du véhicule</Label>
          <Input
            id="name"
            value={vehicle.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
            required
          />
        </div>

        <div>
          <Label htmlFor="year">Année</Label>
          <Input
            id="year"
            value={vehicle.year}
            onChange={(e) => handleChange("year", e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
            required
          />
        </div>

        <div>
          <Label htmlFor="price">Prix</Label>
          <Input
            id="price"
            value={vehicle.price}
            onChange={(e) => handleChange("price", e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
            required
          />
        </div>

        <div>
          <Label htmlFor="mileage">Kilométrage</Label>
          <Input
            id="mileage"
            value={vehicle.mileage}
            onChange={(e) => handleChange("mileage", e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
            required
          />
        </div>

        <div>
          <Label htmlFor="fuel">Carburant</Label>
          <Select
            value={vehicle.fuel}
            onValueChange={(value) => handleChange("fuel", value)}
          >
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Sélectionnez" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Essence">Essence</SelectItem>
              <SelectItem value="Diesel">Diesel</SelectItem>
              <SelectItem value="Hybride">Hybride</SelectItem>
              <SelectItem value="Électrique">Électrique</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="transmission">Transmission</Label>
          <Select
            value={vehicle.transmission}
            onValueChange={(value) => handleChange("transmission", value)}
          >
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Sélectionnez" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Automatique">Automatique</SelectItem>
              <SelectItem value="Manuelle">Manuelle</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="status">Statut</Label>
          <Select
            value={vehicle.status}
            onValueChange={(value) => handleChange("status", value)}
          >
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Sélectionnez le statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Disponible</SelectItem>
              <SelectItem value="reserved">Réservé</SelectItem>
              <SelectItem value="sold">Vendu</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label>Image du véhicule</Label>
        <ImageUpload
          currentImage={vehicle.image}
          onImageUploaded={(url) => handleChange("image", url)}
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={vehicle.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="bg-gray-800 border-gray-700 text-white h-32"
          required
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Spécifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="specs.engine">Moteur</Label>
            <Input
              id="specs.engine"
              value={vehicle.specs.engine}
              onChange={(e) => handleChange("specs.engine", e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              required
            />
          </div>

          <div>
            <Label htmlFor="specs.power">Puissance</Label>
            <Input
              id="specs.power"
              value={vehicle.specs.power}
              onChange={(e) => handleChange("specs.power", e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              required
            />
          </div>

          <div>
            <Label htmlFor="specs.acceleration">0-100 km/h</Label>
            <Input
              id="specs.acceleration"
              value={vehicle.specs.acceleration}
              onChange={(e) => handleChange("specs.acceleration", e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              required
            />
          </div>

          <div>
            <Label htmlFor="specs.topSpeed">Vitesse max</Label>
            <Input
              id="specs.topSpeed"
              value={vehicle.specs.topSpeed}
              onChange={(e) => handleChange("specs.topSpeed", e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              required
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          {isEditing ? "Mettre à jour" : "Publier"}
        </Button>
      </div>
    </form>
  );
}