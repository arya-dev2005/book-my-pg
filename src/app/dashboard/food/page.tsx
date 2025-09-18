"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { FoodList } from "@/components/food/FoodList";

export default function FoodManagementPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <FoodList />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
