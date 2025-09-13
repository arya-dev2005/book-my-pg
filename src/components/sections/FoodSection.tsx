import React, { useState, useMemo } from "react";
import { Card, Button } from "@/components/ui";
import { BaseSectionProps } from "@/types";
import { FOOD_VENUES } from "@/data/newFoodData";
import { Phone, Clock, MapPin, Tag, IndianRupee } from "lucide-react";

interface FoodCardProps {
  venue: typeof FOOD_VENUES[0];
  onClick: () => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ venue, onClick }) => (
  <Card className="overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 h-full" onClick={onClick}>
    {venue.image ? (
      <div className="h-48 overflow-hidden">
        <img 
          src={venue.image} 
          alt={venue.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
    ) : (
      <div className="h-48 bg-orange-100 flex items-center justify-center text-5xl">
        {venue.type === 'restaurant' ? '🍽️' : 
         venue.type === 'college-canteen' || venue.type === 'hostel-canteen' ? '🍱' :
         venue.type === 'affordable-hotel' ? '🏪' :
         venue.type === 'street-food' || venue.type === 'food-stall' ? '🌮' : '🍫'}
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
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
              🛵 Delivery Available
            </span>
          )}
          {venue.onlineOrder && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
              📱 Online Order
            </span>
          )}
          {venue.studentDiscount && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-700">
              <Tag size={12} className="mr-1" />
              Student Discount
            </span>
          )}
        </div>
      </div>
    </div>
  </Card>
);

export const FoodSection: React.FC<BaseSectionProps> = ({ onNavigate }) => {
  const [selectedVenue, setSelectedVenue] = useState<typeof FOOD_VENUES[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const categories = [
    'College and Hostel Canteens',
    'Affordable Hotels',
    'Restaurants',
    'Street Food and Food Stalls',
    'Time Pass and Cravings'
  ] as const;

  const categorizedVenues = useMemo(() => {
    return categories.reduce((acc, category) => {
      acc[category] = FOOD_VENUES.filter(venue => {
        const matchesSearch = !searchQuery || 
          venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          venue.description.toLowerCase().includes(searchQuery.toLowerCase());
        return venue.category === category && matchesSearch;
      });
      return acc;
    }, {} as Record<typeof categories[number], typeof FOOD_VENUES>);
  }, [searchQuery]);

  return (
    <div className="animate-fadeIn space-y-8">
      {/* Search Section */}
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

      {/* All Food Sections */}
      {categories.map(category => {
        const venues = categorizedVenues[category];
        const icons = {
          'College and Hostel Canteens': '🍱',
          'Affordable Hotels': '🏪',
          'Restaurants': '🍽️',
          'Street Food and Food Stalls': '🌮',
          'Time Pass and Cravings': '🍫'
        };

        return (
          <div key={category}>
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              {icons[category]} {category}
            </h3>
            <div className={`grid gap-6 ${
              category === 'Restaurants' 
                ? 'md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3' 
                : 'md:grid-cols-2'
            }`}>
              {venues.length > 0 ? (
                venues.map(venue => (
                  <div className={category === 'Restaurants' ? 'transform transition-all duration-300 hover:scale-105' : ''}>
                    <FoodCard
                      key={venue.id}
                      venue={venue}
                      onClick={() => setSelectedVenue(venue)}
                    />
                  </div>
                ))
              ) : searchQuery && (
                <div className={`${
                  category === 'Restaurants' ? 'col-span-3' : 'col-span-2'
                } text-center py-4 text-gray-500`}>
                  No {category.toLowerCase()} match your search.
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* No Results Message */}
      {searchQuery && Object.values(categorizedVenues).every(venues => venues.length === 0) && (
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
                            {item.isVeg ? '🟢' : '🔴'}
                          </span>
                          <span>{item.name}</span>
                        </div>
                        <span className="font-semibold">
                          ₹{item.price}
                        </span>
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
;
