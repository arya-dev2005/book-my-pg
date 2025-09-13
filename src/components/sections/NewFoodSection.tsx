import React, { useState, useMemo } from "react";
import { Card, Button } from "@/components/ui";
import { BaseSectionProps } from "@/types";
import { FOOD_VENUES } from "@/data/foodData";
import { Phone, Clock, MapPin, Tag, IndianRupee } from "lucide-react";

interface FoodCardProps {
  venue: typeof FOOD_VENUES[0];
  onClick: () => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ venue, onClick }) => (
  <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow" onClick={onClick}>
    {venue.image ? (
      <div className="h-40 overflow-hidden">
        <img 
          src={venue.image} 
          alt={venue.name}
          className="w-full h-full object-cover"
        />
      </div>
    ) : (
      <div className="h-40 bg-orange-100 flex items-center justify-center text-4xl">
        {venue.type === 'restaurant' ? '🍽️' : venue.type === 'college-canteen' ? '🍱' : '🌮'}
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
        </div>
        <div className="flex items-center text-gray-500">
          <IndianRupee size={16} className="mr-2" />
          {venue.priceRange}
        </div>
        {venue.studentDiscount && (
          <div className="flex items-center text-green-600">
            <Tag size={16} className="mr-2" />
            {venue.studentDiscount}
          </div>
        )}
      </div>
    </div>
  </Card>
);

const categories = [
  'College and Hostel Canteens',
  'Affordable Hotels',
  'Restaurants',
  'Street Food and Food Stalls',
  'Time Pass and Cravings'
] as const;

export const FoodSection: React.FC<BaseSectionProps> = ({ onNavigate }) => {
  const [selectedVenue, setSelectedVenue] = useState<typeof FOOD_VENUES[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categorizedVenues = useMemo(() => {
    const grouped = categories.reduce((acc, category) => {
      acc[category] = FOOD_VENUES.filter(venue => {
        const matchesSearch = !searchQuery || 
          venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          venue.description.toLowerCase().includes(searchQuery.toLowerCase());
        return venue.category === category && matchesSearch;
      });
      return acc;
    }, {} as Record<typeof categories[number], typeof FOOD_VENUES>);
    return grouped;
  }, [searchQuery]);

  const handleVenueClick = (venue: typeof FOOD_VENUES[0]) => {
    setSelectedVenue(venue);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6">Food Options</h2>
        <div className="max-w-md">
          <input
            type="text"
            placeholder="Search food venues..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {categories.map((category) => {
        const venues = categorizedVenues[category];
        if (!venues?.length) return null;
        
        return (
          <div key={category} className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 text-orange-600">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {venues.map((venue) => (
                <FoodCard
                  key={venue.id}
                  venue={venue}
                  onClick={() => handleVenueClick(venue)}
                />
              ))}
            </div>
          </div>
        );
      })}

      {/* No Results Message */}
      {searchQuery && !Object.values(categorizedVenues).flat().length && (
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
          <Button 
            variant="secondary"
            onClick={() => setSearchQuery("")}
          >
            Clear Search
          </Button>
        </div>
      )}

      {/* Menu Modal */}
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
                  <div className="flex items-center text-gray-500">
                    <IndianRupee size={16} className="mr-2" />
                    {selectedVenue.priceRange}
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              {selectedVenue.menu && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Menu</h3>
                  <div className="space-y-4">
                    {selectedVenue.menu.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-medium">
                            {item.isVeg ? "🟢" : "🔴"} {item.name}
                          </span>
                          <div className="text-sm text-gray-600">{item.category}</div>
                        </div>
                        <div className="font-medium">₹{item.price}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};