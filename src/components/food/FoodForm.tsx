"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FoodFormProps {
  initialData?: {
    name: string;
    type: string;
    price: number;
    available: boolean;
    pgId?: string;
  };
  onSubmit: (data: any) => Promise<void>;
  onCancel?: () => void;
  isEditing?: boolean;
}

export function FoodForm({
  initialData,
  onSubmit,
  onCancel,
  isEditing = false,
}: FoodFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    type: initialData?.type || "VEG",
    price: initialData?.price?.toString() || "",
    available: initialData?.available !== false,
    pgId: initialData?.pgId || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await onSubmit({
        ...formData,
        price: parseFloat(formData.price),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">
        {isEditing ? "Edit Food Item" : "Add New Food Item"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            placeholder="Food item name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="VEG">Vegetarian</option>
            <option value="NON_VEG">Non-Vegetarian</option>
            <option value="VEGAN">Vegan</option>
            <option value="MIXED">Mixed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price (₹)</label>
          <Input
            type="number"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            required
            placeholder="0.00"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="available"
            checked={formData.available}
            onChange={(e) =>
              setFormData({ ...formData, available: e.target.checked })
            }
            className="w-4 h-4 text-blue-600"
          />
          <label htmlFor="available" className="text-sm font-medium">
            Available
          </label>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="flex space-x-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : isEditing ? "Update" : "Create"}
          </Button>
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
