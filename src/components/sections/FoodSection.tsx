// src/components/sections/FoodSection.tsx
import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Card, Button } from "@/components/ui";
import { BaseSectionProps } from "@/types";
import { FOOD_VENUES } from "@/data/newFoodData";
import { Phone, Clock, MapPin, Tag } from "lucide-react";

// ✅ Extended type for venues
export interface FoodVenue {
  id: string;
  name: string;
  type: string;
  category: string;
  description: string;
  location: string;
  timings: string;
  contactNumber?: string;
  image?: string;
  distanceFromCollege?: string;
  delivery?: boolean;
  onlineOrder?: boolean;
  studentDiscount?: boolean | string;
  menu?: {
    name: string;
    price: number;
    isVeg: boolean;
  }[];
}

interface FoodCardProps {
  venue: FoodVenue;
  onClick: () => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ venue, onClick }) => (
  <Card
    className="overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 h-full"
    onClick={onClick}
  >
    {venue.image ? (
      <div className="h-48 overflow-hidden">
        <Image
          src={venue.image}
          alt={venue.name}
          width={400}
          height={300}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
    ) : (
      <div className="h-48 bg-orange-100 flex items-center justify-center text-5xl">
        {venue.type === "restaurant"
          ? "🍽️"
          : venue.type === "college-canteen" || venue.type === "hostel-canteen"
          ? "🍱"
          : venue.type === "affordable-hotel"
          ? "🏪"
          : venue.type === "street-food" || venue.type === "food-stall"
          ? "🌮"
          : "🍫"}
      </div>
    )}
    <div className="p-4">
      <h4 className="font-bold text-lg mb-2">{venue.name}</h4>
      <p className="text-gray-600 text-sm mb-3">{venue.description}</p>

      <div className="space-y-2 text-sm">
        <div className="flex items-center text-gray-500">
          <Clock size={16} className="mr-2" />
          {venue.timings}
        </div>
        <div className="flex items-center text-gray-500">
          <MapPin size={16} className="mr-2" />
          {venue.location}
          {venue.distanceFromCollege && (
            <span className="ml-1 text-xs text-orange-500">
              ({venue.distanceFromCollege} from college)
            </span>
          )}
        </div>
        {venue.contactNumber && (
          <div className="flex items-center text-gray-500">
            <Phone size={16} className="mr-2" />
            {venue.contactNumber}
          </div>
        )}
        <div className="flex flex-wrap gap-2 mt-2">
          {venue.delivery && (
            <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
              🛵 Delivery Available
            </span>
          )}
          {venue.onlineOrder && (
            <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
              📱 Online Order
            </span>
          )}
          {venue.studentDiscount && (
            <span className="px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-700 flex items-center">
              <Tag size={12} className="mr-1" /> Student Discount
            </span>
          )}
        </div>
      </div>
    </div>
  </Card>
);

const categories = [
  "College and Hostel Canteens",
  "Affordable Hotels",
  "Restaurants",
  "Street Food and Food Stalls",
  "Time Pass and Cravings",
] as const;

export const FoodSection: React.FC<BaseSectionProps> = () => {
  const [selectedVenue, setSelectedVenue] = useState<FoodVenue | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categorizedVenues = useMemo(() => {
    return categories.reduce((acc, category) => {
      acc[category] = FOOD_VENUES.filter((venue) => {
        const matchesSearch =
          !searchQuery ||
          venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          venue.description.toLowerCase().includes(searchQuery.toLowerCase());
        return venue.category === category && matchesSearch;
      });
      return acc;
    }, {} as Record<(typeof categories)[number], FoodVenue[]>);
  }, [searchQuery]);

  return (
    <div className="animate-fadeIn space-y-8">
      {/* 🔍 Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search food venues by name or cuisine..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="mt-2 text-xs text-gray-500 underline hover:text-gray-700"
          >
            Clear Search
          </button>
        )}
      </div>

      {/* 🍽️ Categories */}
      {categories.map((category) => {
        const venues = categorizedVenues[category];
        const icons = {
          "College and Hostel Canteens": "🍱",
          "Affordable Hotels": "🏪",
          Restaurants: "🍽️",
          "Street Food and Food Stalls": "🌮",
          "Time Pass and Cravings": "🍫",
        };

        return (
          <div key={category}>
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              {icons[category]} {category}
            </h3>
            <div
              className={`grid gap-6 ${
                category === "Restaurants"
                  ? "md:grid-cols-3"
                  : "md:grid-cols-2"
              }`}
            >
              {venues.length > 0 ? (
                venues.map((venue) => (
                  <FoodCard
                    key={venue.id}
                    venue={venue}
                    onClick={() => setSelectedVenue(venue)}
                  />
                ))
              ) : (
                searchQuery && (
                  <div
                    className={`${
                      category === "Restaurants" ? "col-span-3" : "col-span-2"
                    } text-center py-4 text-gray-500`}
                  >
                    No {category.toLowerCase()} match your search.
                  </div>
                )
              )}
            </div>
          </div>
        );
      })}

      {/* ❌ No Results */}
      {searchQuery &&
        Object.values(categorizedVenues).every((venues) => venues.length === 0) && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
              🔍
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              No Food Venues Found
            </h3>
            <p className="text-gray-600 mb-6">
              No food venues match your search query. Try different keywords or clear the search.
            </p>
            <Button variant="secondary" onClick={() => setSearchQuery("")}>
              Clear Search
            </Button>
          </div>
        )}

      {/* 🍴 Menu Modal */}
      {selectedVenue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedVenue.name}</h2>
                <button
                  onClick={() => setSelectedVenue(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <p className="text-gray-600">{selectedVenue.description}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center text-gray-500">
                    <Clock size={16} className="mr-2" />
                    {selectedVenue.timings}
                  </div>
                  <div className="flex items-center text-gray-500">
                    <MapPin size={16} className="mr-2" />
                    {selectedVenue.location}
                  </div>
                  {selectedVenue.contactNumber && (
                    <div className="flex items-center text-gray-500">
                      <Phone size={16} className="mr-2" />
                      {selectedVenue.contactNumber}
                    </div>
                  )}
                </div>
                {selectedVenue.studentDiscount && (
                  <div className="bg-green-50 text-green-600 p-3 rounded-lg flex items-center">
                    <Tag size={16} className="mr-2" />
                    {selectedVenue.studentDiscount}
                  </div>
                )}
              </div>

              {selectedVenue.menu && (
                <div>
                  <h3 className="font-bold text-lg mb-3">Menu</h3>
                  <div className="divide-y">
                    {selectedVenue.menu.map((item, index) => (
                      <div
                        key={index}
                        className="py-2 flex justify-between items-center"
                      >
                        <div className="flex items-center">
                          <span className="mr-2">
                            {item.isVeg ? "🟢" : "🔴"}
                          </span>
                          <span>{item.name}</span>
                        </div>
                        <span className="font-semibold">₹{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <Button onClick={() => setSelectedVenue(null)}>Close</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
