import React from "react";
import { Card } from "@/components/ui";
import { BaseSectionProps } from "@/types";

export const FoodSection: React.FC<BaseSectionProps> = ({ onNavigate }) => (
  <div className="animate-fadeIn space-y-8">
    <div>
      <h3 className="text-xl font-bold mb-4 text-gray-800">
        🍽️ College Canteen
      </h3>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            🥘
          </div>
          <h4 className="font-bold mb-2">Main Canteen</h4>
          <p className="text-gray-600 text-sm">
            Affordable meals, snacks, and beverages. Open 8 AM - 8 PM
          </p>
        </Card>
        <Card className="text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            ☕
          </div>
          <h4 className="font-bold mb-2">Coffee Corner</h4>
          <p className="text-gray-600 text-sm">
            Fresh coffee, tea, and quick bites. Perfect study spot!
          </p>
        </Card>
      </div>
    </div>

    <div>
      <h3 className="text-xl font-bold mb-4 text-gray-800">
        🍕 Nearby Restaurants
      </h3>
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            🍕
          </div>
          <h4 className="font-bold mb-2">Pizza Palace</h4>
          <p className="text-gray-600 text-sm">
            Student discounts available. Great for group orders
          </p>
        </Card>
        <Card className="text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            🍛
          </div>
          <h4 className="font-bold mb-2">Curry House</h4>
          <p className="text-gray-600 text-sm">
            Authentic Indian cuisine at student-friendly prices
          </p>
        </Card>
        <Card className="text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            🍔
          </div>
          <h4 className="font-bold mb-2">Burger Junction</h4>
          <p className="text-gray-600 text-sm">
            Quick bites and combo meals. Open till midnight
          </p>
        </Card>
      </div>
    </div>

    <div>
      <h3 className="text-xl font-bold mb-4 text-gray-800">🌮 Street Food</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            🌮
          </div>
          <h4 className="font-bold mb-2">College Gate Stalls</h4>
          <p className="text-gray-600 text-sm">
            Chaat, samosas, and local favorites. Super affordable!
          </p>
        </Card>
        <Card className="text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            🥙
          </div>
          <h4 className="font-bold mb-2">Evening Food Court</h4>
          <p className="text-gray-600 text-sm">
            Multiple vendors with variety of street food options
          </p>
        </Card>
      </div>
    </div>
  </div>
);
