import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Card, Button, PGDetailsModal } from "@/components/ui";
import { PG_LISTINGS } from "@/data/pgListings";
import { PGListing, SelectChangeEvent, BaseSectionProps } from "@/types";
import { formatCurrency } from "@/utils/helpers";
import { useWishlistContext } from "@/contexts/WishlistContext";
import { Heart, MapPin, ExternalLink } from "lucide-react";

interface PGCardProps {
  pg: PGListing;
  onViewDetails: (pg: PGListing) => void;
}

const PGCard: React.FC<PGCardProps> = ({ pg, onViewDetails }) => {
  const { toggleWishlist, isInWishlist } = useWishlistContext();
  const isWishlisted = isInWishlist(pg.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(pg);
  };

  const handleMapClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (pg.coordinates) {
      const { lat, lng } = pg.coordinates;
      const mapUrl = `https://www.google.com/maps?q=${lat},${lng}`;
      window.open(mapUrl, '_blank');
    }
  };

  return (
    <Card className="overflow-hidden p-0 relative">
      {/* Wishlist Button */}
      <button
        onClick={handleWishlistClick}
        className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
          isWishlisted
            ? "bg-red-500 text-white shadow-md"
            : "bg-white bg-opacity-90 text-gray-600 hover:bg-red-50 hover:text-red-500"
        }`}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart
          size={16}
          fill={isWishlisted ? "currentColor" : "none"}
          className="transition-all duration-200"
        />
      </button>

      {/* PG Image */}
      <div className="h-40 bg-gradient-to-r from-blue-500 to-blue-600 relative overflow-hidden">
        {pg.image ? (
          <Image 
            src={pg.image} 
            alt={pg.name}
            width={160}
            height={160}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-white text-4xl">
            🏠
          </div>
        )}
      </div>

      {/* PG Info */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-gray-800 pr-2">{pg.name}</h3>
          <div className="text-right">
            <div className="text-blue-500 font-bold">
              {formatCurrency(Math.min(...pg.rooms.map(r => r.price)))}
              <span className="text-gray-500 text-sm font-normal">/mo</span>
            </div>
            <div className="text-xs text-gray-500">onwards</div>
          </div>
        </div>

        
        {/* Distance and Address */}
        <div className="mb-3">
          <p className="text-gray-600 text-sm mb-1">📍 {pg.distance}</p>
          {pg.address && (
            <p className="text-gray-500 text-xs">{pg.address}</p>
          )}
        </div>
        
        {/* Room Availability */}
        <div className="mb-4">
          <div className={`text-sm font-medium ${pg.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
            {pg.isAvailable ? '🟢 Rooms Available' : '🔴 No Rooms Available'}
          </div>
          {pg.isAvailable && (
            <div className="mt-2 space-y-1">
              {pg.rooms.map((room) => (
                room.available > 0 && (
                  <div key={room.type} className="flex justify-between items-center">
                    <span className="text-xs text-gray-600 capitalize">
                      {room.type} Room ({room.available} left)
                    </span>
                    <span className="text-xs font-medium text-blue-600">
                      {formatCurrency(room.price)}
                    </span>
                  </div>
                )
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mb-3">
          <Button 
            className="flex-1"
            onClick={() => onViewDetails(pg)}
          >
            View Details
          </Button>
          <Button variant="secondary" className="flex-1">
            Contact
          </Button>
        </div>

        {/* Map Button */}
        {pg.coordinates && (
          <Button
            variant="secondary"
            onClick={handleMapClick}
            className="w-full flex items-center justify-center gap-2 text-sm"
          >
            <MapPin size={16} />
            View on Map
            <ExternalLink size={14} />
          </Button>
        )}

        {/* Wishlist Status */}
        {isWishlisted && (
          <div className="mt-3 p-2 bg-red-50 rounded-lg">
            <p className="text-xs text-red-600 text-center">
              ❤️ Added to your wishlist
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export const PGSection: React.FC<BaseSectionProps> = () => {
  const { wishlistCount, toggleWishlist, isInWishlist } = useWishlistContext();
  
  // Filter state
  const [priceFilter, setPriceFilter] = useState<string>("");
  const [distanceFilter, setDistanceFilter] = useState<string>("");
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [roomTypeFilter, setRoomTypeFilter] = useState<"single" | "double" | "">("");
  const [availabilityFilter, setAvailabilityFilter] = useState<"available" | "all">("all");
  const [sortBy, setSortBy] = useState<string>("relevance");
  
  // Modal state
  const [selectedPG, setSelectedPG] = useState<PGListing | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter and sort logic
  const filteredAndSortedPGs = useMemo(() => {
    let filtered = [...PG_LISTINGS];
    
    // Debug logs
    console.log('Initial PGs:', PG_LISTINGS.length);
    console.log('Current filters:', {
      price: priceFilter,
      distance: distanceFilter,
      location: locationFilter,
      search: searchQuery,
      roomType: roomTypeFilter,
      availability: availabilityFilter
    });

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter((pg) => 
        pg.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      console.log('After search filter:', filtered.length);
    }

    // Apply price filter
    if (priceFilter) {
      filtered = filtered.filter((pg) => {
        const minPrice = Math.min(...pg.rooms.map(room => room.price));
        switch (priceFilter) {
          case "0-5000":
            return minPrice < 5000;
          case "5000-8000":
            return minPrice >= 5000 && minPrice <= 8000;
          case "8000-12000":
            return minPrice >= 8000 && minPrice <= 12000;
          case "12000+":
            return minPrice > 12000;
          default:
            return true;
        }
      });
    }

    // Apply distance filter
    if (distanceFilter) {
      filtered = filtered.filter((pg) => {
        const distance = parseInt(pg.distance.replace(/\D/g, ""));
        switch (distanceFilter) {
          case "0-500":
            return distance <= 500;
          case "500-1000":
            return distance > 500 && distance <= 1000;
          case "1000+":
            return distance > 1000;
          default:
            return true;
        }
      });
      console.log('After distance filter:', filtered.length);
    }

    // Apply room type filter
    if (roomTypeFilter) {
      filtered = filtered.filter((pg) => {
        return pg.rooms.some(room => room.type === roomTypeFilter && room.available > 0);
      });
      console.log('After room type filter:', filtered.length);
    }

    // Apply availability filter
    if (availabilityFilter === 'available') {
      filtered = filtered.filter((pg) => pg.isAvailable);
      console.log('After availability filter:', filtered.length);
    }

    // Apply room type filter
    if (roomTypeFilter) {
      filtered = filtered.filter((pg) => {
        const room = pg.rooms.find(r => r.type === roomTypeFilter);
        return room && room.available > 0;
      });
    }

    // Apply availability filter
    if (availabilityFilter === 'available') {
      filtered = filtered.filter((pg) => pg.isAvailable === true);
    }
    // When availabilityFilter is 'all', we don't apply any filter

    // Apply location filter
    if (locationFilter) {
      filtered = filtered.filter((pg) =>
        pg.near?.toLowerCase() === locationFilter.toLowerCase()
      );
    }

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter((pg) => 
        pg.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        return filtered.sort((a, b) => {
          const minPriceA = Math.min(...a.rooms.map(r => r.price));
          const minPriceB = Math.min(...b.rooms.map(r => r.price));
          return minPriceA - minPriceB;
        });
      case "price-high":
        return filtered.sort((a, b) => {
          const minPriceA = Math.min(...a.rooms.map(r => r.price));
          const minPriceB = Math.min(...b.rooms.map(r => r.price));
          return minPriceB - minPriceA;
        });
      case "distance":
        return filtered.sort((a, b) => {
          const distanceA = parseInt(a.distance.replace(/\D/g, ""));
          const distanceB = parseInt(b.distance.replace(/\D/g, ""));
          return distanceA - distanceB;
        });
      case "name":
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return filtered;
    }
  }, [searchQuery, priceFilter, distanceFilter, locationFilter, roomTypeFilter, availabilityFilter, sortBy]);

  // Debug total count and filters
  useEffect(() => {
    console.log('Total PGs shown:', filteredAndSortedPGs.length);
    console.log('Current filters:', {
      price: priceFilter,
      distance: distanceFilter,
      location: locationFilter,
      roomType: roomTypeFilter,
      availability: availabilityFilter,
      search: searchQuery,
      sort: sortBy
    });
  }, [filteredAndSortedPGs, priceFilter, distanceFilter, locationFilter, roomTypeFilter, availabilityFilter, searchQuery, sortBy]);

  const handleViewDetails = (pg: PGListing) => {
    setSelectedPG(pg);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPG(null);
  };

  const handleContact = () => {
    if (selectedPG) {
      // In a real app, this would open a contact form or call functionality
      alert(`Contacting ${selectedPG.name} owner...`);
    }
  };

  return (
    <div className="animate-fadeIn">
      {/* Header with Wishlist Info */}
      {wishlistCount > 0 && (
        <div className="mb-6 p-4 bg-blue-50 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700">
                ❤️ You have {wishlistCount} {wishlistCount === 1 ? "PG" : "PGs"}{" "}
                in your wishlist
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search PG by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
          <select
            aria-label="Filter by price range"
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
            value={priceFilter}
            onChange={(e: SelectChangeEvent) => setPriceFilter(e.target.value)}
          >
            <option value="">Price Range</option>
            <option value="0-5000">Under ₹5,000</option>
            <option value="5000-8000">₹5,000 - ₹8,000</option>
            <option value="8000-12000">₹8,000 - ₹12,000</option>
            <option value="12000+">Above ₹12,000</option>
          </select>

          <select
            aria-label="Filter by distance"
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
            value={distanceFilter}
            onChange={(e: SelectChangeEvent) => setDistanceFilter(e.target.value)}
          >
            <option value="">Distance</option>
            <option value="0-500">Within 500m</option>
            <option value="500-1000">500m - 1km</option>
            <option value="1000+">Above 1km</option>
          </select>

          <select
            aria-label="Filter by location"
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
            value={locationFilter}
            onChange={(e: SelectChangeEvent) => setLocationFilter(e.target.value)}
          >
            <option value="">Location</option>
            <option value="khudiram nagar">Khudiram Nagar</option>
            <option value="gandhi nagar">Gandhi Nagar</option>
            <option value="ranichak">Ranichak</option>
          </select>

          <select
            aria-label="Filter by room type"
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
            value={roomTypeFilter}
            onChange={(e: SelectChangeEvent) => setRoomTypeFilter(e.target.value as "single" | "double" | "")}
          >
            <option value="">Room Type</option>
            <option value="single">Single Room</option>
            <option value="double">Double Room</option>
          </select>

          <select
            aria-label="Filter by availability"
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
            value={availabilityFilter}
            onChange={(e: SelectChangeEvent) => setAvailabilityFilter(e.target.value as "available" | "all")}
          >
            <option value="all">All PGs</option>
            <option value="available">Available Rooms Only</option>
          </select>

          {(searchQuery || priceFilter || distanceFilter || locationFilter || roomTypeFilter || availabilityFilter !== "all") && (
            <Button
              variant="secondary"
              onClick={() => {
                setSearchQuery("");
                setPriceFilter("");
                setDistanceFilter("");
                setLocationFilter("");
                setRoomTypeFilter("");
                setAvailabilityFilter("all");
              }}
              className="text-sm"
            >
              Clear Filters
            </Button>
          )}
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Showing {filteredAndSortedPGs.length} of {PG_LISTINGS.length} PGs
          </p>
          <select
            aria-label="Sort listings"
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
            value={sortBy}
            onChange={(e: SelectChangeEvent) => setSortBy(e.target.value)}
          >
            <option value="relevance">Sort by Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="distance">Distance</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>
      </div>

      {/* PG Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAndSortedPGs.length > 0 ? (
          filteredAndSortedPGs.map((pg) => (
            <PGCard key={pg.id} pg={pg} onViewDetails={handleViewDetails} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
              🔍
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              No PGs Found
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Try adjusting your filters to see more results.
            </p>
            <Button 
              variant="secondary" 
              onClick={() => {
                setSearchQuery("");
                setPriceFilter("");
                setDistanceFilter("");
                setLocationFilter("");
                setRoomTypeFilter("");
                setAvailabilityFilter("all");
                setSortBy("relevance");
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <Button variant="secondary">Load More PGs</Button>
      </div>

      {/* PG Details Modal */}
      <PGDetailsModal
        pg={selectedPG}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onContact={handleContact}
        onWishlist={() => selectedPG && toggleWishlist(selectedPG)}
        isWishlisted={selectedPG ? isInWishlist(selectedPG.id) : false}
      />
    </div>
  );
};
