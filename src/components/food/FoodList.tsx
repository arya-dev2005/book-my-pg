// components/food/FoodList.tsx
"use client";

import { useState } from "react";
import { useFood } from "@/hooks/useApi";
import { FoodForm } from "./FoodForm";
import { Button } from "@/components/ui/Button";

interface FoodData {
  id: string;
  name: string;
  type: "VEG" | "NON_VEG" | "VEGAN" | "MIXED";
}

export function FoodList() {
  const { foods, loading, error, createFood, updateFood, deleteFood } =
    useFood();
  const [showForm, setShowForm] = useState(false);
  const [editingFood, setEditingFood] = useState<FoodData | null>(null);

  const handleCreate = async (data: any) => {
    await createFood(data);
    setShowForm(false);
  };

  const handleEdit = async (data: any) => {
    if (editingFood) {
      await updateFood(editingFood.id, data);
      setEditingFood(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this food item?")) {
      await deleteFood(id);
    }
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error)
    return <div className="text-red-600 text-center py-4">Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Food Management</h1>
        <Button onClick={() => setShowForm(true)}>Add Food Item</Button>
      </div>

      {showForm && (
        <FoodForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
      )}

      {editingFood && (
        <FoodForm
          initialData={editingFood}
          onSubmit={handleEdit}
          onCancel={() => setEditingFood(null)}
          isEditing
        />
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {foods.map((food: any) => (
          <div key={food.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold">{food.name}</h3>
              <span
                className={`px-2 py-1 text-xs rounded ${
                  food.available
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {food.available ? "Available" : "Unavailable"}
              </span>
            </div>

            <div className="space-y-1 text-sm text-gray-600">
              <p>Type: {food.type}</p>
              <p>Price: ₹{food.price}</p>
              {food.pg && <p>PG: {food.pg.name}</p>}
            </div>

            <div className="flex space-x-2 mt-4">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setEditingFood(food)}
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(food.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {foods.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No food items found. Add your first food item!
        </div>
      )}
    </div>
  );
}
