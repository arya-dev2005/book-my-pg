import React from "react";
import { SECTIONS } from "@/data/constants";
import { useWishlistContext } from "@/contexts/WishlistContext";

interface TopNavigationProps {
  onNavigate: (section: string) => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({ onNavigate }) => {
  const { wishlistCount } = useWishlistContext();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50 px-4 py-3 md:hidden">
      <div className="flex justify-between items-center">
        {/* Logo and Company Name */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            🏠
          </div>
          <span className="text-lg font-bold text-gray-800">Book My PG</span>
        </div>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-3">
          {/* Get In Touch Button */}
          <button
            onClick={() => onNavigate(SECTIONS.CONTACT)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors duration-200"
          >
            Get In Touch
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => onNavigate(SECTIONS.WISHLIST)}
            className="relative w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
            aria-label={`Wishlist (${wishlistCount} items)`}
          >
            <span className="text-red-500 text-lg">❤️</span>
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {wishlistCount > 9 ? "9+" : wishlistCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};
