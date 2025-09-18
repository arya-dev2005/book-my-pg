import React from "react";
import { Card, Button } from "@/components/ui";
import { SECTIONS } from "@/data/constants";
import { useWishlistContext } from "@/contexts/WishlistContext";
import { formatCurrency } from "@/utils/helpers";
import { WishlistItem, BaseSectionProps } from "@/types";
import { Trash2, MapPin, Calendar } from "lucide-react";

// Add interfaces for props
interface WishlistPGCardProps {
  pg: WishlistItem;
  onRemove: (id: string) => void;
}

// Add navigation prop to EmptyWishlist interface
interface EmptyWishlistProps {
  onNavigate: (section: string) => void;
}

const WishlistPGCard: React.FC<WishlistPGCardProps> = ({ pg, onRemove }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  return (
    <Card className="overflow-hidden p-0 relative">
      {/* Remove Button */}
      <button
        onClick={() => onRemove(pg.id)}
        className="absolute top-3 right-3 z-10 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
        aria-label="Remove from wishlist"
      >
        <Trash2 size={14} />
      </button>

      {/* PG Image */}
      <div className="h-40 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-4xl">
        🏠
      </div>

      {/* PG Info */}
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-gray-800 pr-2">{pg.name}</h3>
          <div className="text-right">
            <div className="text-blue-500 font-bold text-sm">
              {formatCurrency(Math.min(...pg.rooms.map((r) => r.price)))}
              <span className="text-gray-500 text-xs font-normal">/mo</span>
            </div>
            <div className="text-xs text-gray-500">onwards</div>
          </div>
        </div>

        {/* Distance */}
        <div className="flex items-center gap-1 mb-3">
          <MapPin size={14} className="text-gray-500" />
          <p className="text-gray-600 text-sm">{pg.distance}</p>
        </div>

        {/* Added Date */}
        <div className="flex items-center gap-1 mb-4">
          <Calendar size={14} className="text-gray-500" />
          <p className="text-gray-500 text-xs">
            Added on {formatDate(pg.addedAt)}
          </p>
        </div>

        {/* Facilities */}
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

        {/* Actions */}
        <div className="flex gap-2">
          <Button className="flex-1" variant="primary">
            View Details
          </Button>
          <Button className="flex-1" variant="secondary">
            Contact Owner
          </Button>
        </div>
      </div>
    </Card>
  );
};

const EmptyWishlist: React.FC<EmptyWishlistProps> = ({ onNavigate }) => (
  <div className="text-center py-12">
    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
      💔
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-3">
      Your Wishlist is Empty
    </h3>
    <p className="text-gray-600 mb-6 max-w-md mx-auto">
      Start exploring PGs and add your favorites to your wishlist. You can save
      up to 50 properties for easy comparison.
    </p>
    <Button variant="primary" onClick={() => onNavigate(SECTIONS.PG)}>
      Browse PGs
    </Button>
  </div>
);

export const WishlistSection: React.FC<BaseSectionProps> = ({ onNavigate }) => {
  const { wishlistItems, removeFromWishlist, clearWishlist, wishlistCount } =
    useWishlistContext();

  if (wishlistCount === 0) {
    return (
      <div className="animate-fadeIn">
        <EmptyWishlist onNavigate={onNavigate} />
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">My Wishlist</h2>
          <p className="text-gray-600 text-sm">
            {wishlistCount} {wishlistCount === 1 ? "property" : "properties"}{" "}
            saved
          </p>
        </div>

        {wishlistCount > 0 && (
          <Button
            variant="secondary"
            onClick={clearWishlist}
            className="text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-blue-500">
            {wishlistCount}
          </div>
          <div className="text-sm text-gray-600">Total Saved</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-green-500">
            ₹
            {Math.min(
              ...wishlistItems.flatMap((item) => item.rooms.map((r) => r.price))
            ).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Lowest Price</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-orange-500">
            ₹
            {Math.max(
              ...wishlistItems.flatMap((item) => item.rooms.map((r) => r.price))
            ).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Highest Price</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-purple-500">
            ₹
            {Math.round(
              wishlistItems.reduce(
                (sum, item) =>
                  sum + Math.min(...item.rooms.map((r) => r.price)),
                0
              ) / wishlistCount
            ).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Avg Price</div>
        </Card>
      </div>

      {/* Sorting and Filtering */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select
          className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
          aria-label="Sort wishlist items"
        >
          <option value="recent">Recently Added</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="distance">Distance</option>
        </select>

        <Button variant="secondary" className="text-sm">
          Export List
        </Button>

        <Button variant="secondary" className="text-sm">
          Share Wishlist
        </Button>
      </div>

      {/* Wishlist Items */}
      <div className="space-y-4">
        {wishlistItems
          .sort(
            (a, b) =>
              new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
          )
          .map((pg) => (
            <WishlistPGCard key={pg.id} pg={pg} onRemove={removeFromWishlist} />
          ))}
      </div>

      {/* Action Footer */}
      <div className="mt-8 p-4 bg-blue-50 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-gray-800">Need more options?</h4>
            <p className="text-sm text-gray-600">
              Browse more PGs to add to your wishlist
            </p>
          </div>
          <Button variant="primary" onClick={() => onNavigate(SECTIONS.PG)}>
            Browse More PGs
          </Button>
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-gray-800">Ready to book?</h4>
            <p className="text-sm text-gray-600">
              Compare your saved PGs and make the best choice
            </p>
          </div>
          <Button variant="primary">Compare All</Button>
        </div>
      </div>
    </div>
  );
};
