import React, { useState, useMemo } from "react";
import { Card, Button, StarRating, PGDetailsModal } from "@/components/ui";
import { PG_LISTINGS } from "@/data/pgListings";
import { PGListing } from "@/types";
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
      <div className="h-40 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-4xl">
        🏠
      </div>

      {/* PG Info */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-gray-800 pr-2">{pg.name}</h3>
          <span className="text-blue-500 font-bold">
            {formatCurrency(pg.price)}
          </span>
        </div>
        
        {/* Rating */}
        {pg.rating && (
          <div className="mb-3">
            <StarRating 
              rating={pg.rating} 
              reviewCount={pg.reviewCount}
              size="sm"
            />
          </div>
        )}
        
        {/* Distance and Address */}
        <div className="mb-3">
          <p className="text-gray-600 text-sm mb-1">📍 {pg.distance}</p>
          {pg.address && (
            <p className="text-gray-500 text-xs">{pg.address}</p>
          )}
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {pg.facilities.map((facility, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium"
            >
              {facility}
            </span>
          ))}
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

export const PGSection: React.FC = () => {
  const { wishlistCount, toggleWishlist, isInWishlist } = useWishlistContext();
  
  // Filter state
  const [priceFilter, setPriceFilter] = useState<string>("");
  const [distanceFilter, setDistanceFilter] = useState<string>("");
  const [facilityFilter, setFacilityFilter] = useState<string>("");
  const [ratingFilter, setRatingFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("relevance");
  
  // Modal state
  const [selectedPG, setSelectedPG] = useState<PGListing | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter and sort logic
  const filteredAndSortedPGs = useMemo(() => {
    let filtered = [...PG_LISTINGS];

    // Apply price filter
    if (priceFilter) {
      filtered = filtered.filter((pg) => {
        switch (priceFilter) {
          case "0-5000":
            return pg.price < 5000;
          case "5000-8000":
            return pg.price >= 5000 && pg.price <= 8000;
          case "8000-12000":
            return pg.price >= 8000 && pg.price <= 12000;
          case "12000+":
            return pg.price > 12000;
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
    }

    // Apply facility filter
    if (facilityFilter) {
      filtered = filtered.filter((pg) =>
        pg.facilities.some((facility) =>
          facility.toLowerCase().includes(facilityFilter.toLowerCase())
        )
      );
    }

    // Apply rating filter
    if (ratingFilter) {
      filtered = filtered.filter((pg) => {
        if (!pg.rating) return false;
        const minRating = parseFloat(ratingFilter);
        return pg.rating >= minRating;
      });
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        return filtered.sort((a, b) => a.price - b.price);
      case "price-high":
        return filtered.sort((a, b) => b.price - a.price);
      case "distance":
        return filtered.sort((a, b) => {
          const distanceA = parseInt(a.distance.replace(/\D/g, ""));
          const distanceB = parseInt(b.distance.replace(/\D/g, ""));
          return distanceA - distanceB;
        });
      case "rating":
        return filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      default:
        return filtered;
    }
  }, [priceFilter, distanceFilter, facilityFilter, ratingFilter, sortBy]);

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

      {/* Filters and Search */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-3 mb-4">
          <select
            aria-label="Filter by price range"
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
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
            onChange={(e) => setDistanceFilter(e.target.value)}
          >
            <option value="">Distance</option>
            <option value="0-500">Within 500m</option>
            <option value="500-1000">500m - 1km</option>
            <option value="1000+">Above 1km</option>
          </select>

          <select
            aria-label="Filter by facilities"
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
            value={facilityFilter}
            onChange={(e) => setFacilityFilter(e.target.value)}
          >
            <option value="">Facilities</option>
            <option value="wifi">WiFi</option>
            <option value="food">Food</option>
            <option value="ac">AC</option>
            <option value="security">Security</option>
          </select>

          <select
            aria-label="Filter by rating"
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
          >
            <option value="">Rating</option>
            <option value="4.5">4.5+ Stars</option>
            <option value="4.0">4.0+ Stars</option>
            <option value="3.5">3.5+ Stars</option>
            <option value="3.0">3.0+ Stars</option>
          </select>

          {(priceFilter || distanceFilter || facilityFilter || ratingFilter) && (
            <Button
              variant="secondary"
              onClick={() => {
                setPriceFilter("");
                setDistanceFilter("");
                setFacilityFilter("");
                setRatingFilter("");
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
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="relevance">Sort by Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="distance">Distance</option>
            <option value="rating">Rating: High to Low</option>
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
                setPriceFilter("");
                setDistanceFilter("");
                setFacilityFilter("");
                setRatingFilter("");
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
