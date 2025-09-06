import React from "react";
import { Card, Button } from "@/components/ui";
import { PG_LISTINGS } from "@/data/pgListings";
import { PGListing } from "@/types";
import { formatCurrency } from "@/utils/helpers";
import { useWishlistContext } from "@/contexts/WishlistContext";
import { Heart } from "lucide-react";

interface PGCardProps {
  pg: PGListing;
}

const PGCard: React.FC<PGCardProps> = ({ pg }) => {
  const { toggleWishlist, isInWishlist } = useWishlistContext();
  const isWishlisted = isInWishlist(pg.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(pg);
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
        <p className="text-gray-600 text-sm mb-3">📍 {pg.distance}</p>
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
        <div className="flex gap-2">
          <Button className="flex-1">View Details</Button>
          <Button variant="secondary" className="flex-1">
            Contact
          </Button>
        </div>

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
  const { wishlistCount } = useWishlistContext();

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
          >
            <option value="">Distance</option>
            <option value="0-500">Within 500m</option>
            <option value="500-1000">500m - 1km</option>
            <option value="1000+">Above 1km</option>
          </select>

          <select
            aria-label="Filter by facilities"
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
          >
            <option value="">Facilities</option>
            <option value="wifi">WiFi</option>
            <option value="food">Food</option>
            <option value="ac">AC</option>
            <option value="security">Security</option>
          </select>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Showing {PG_LISTINGS.length} PGs available
          </p>
          <select
            aria-label="Sort listings"
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
          >
            <option value="relevance">Sort by Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="distance">Distance</option>
          </select>
        </div>
      </div>

      {/* PG Listings */}
      <div className="space-y-4">
        {PG_LISTINGS.map((pg) => (
          <PGCard key={pg.id} pg={pg} />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <Button variant="secondary">Load More PGs</Button>
      </div>
    </div>
  );
};
