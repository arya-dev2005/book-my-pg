import React from "react";
import { NavigationProps } from "@/types";
import { SECTIONS } from "@/data/constants";
import { useWishlistContext } from "@/contexts/WishlistContext";

export const BottomNavigation: React.FC<NavigationProps> = ({
  activeSection,
  onNavigate,
}) => {
  const { wishlistCount } = useWishlistContext();

  type NavItem = {
    id: string;
    icon: string;
    label: string;
    badge?: number;
  };

  const mobileNavItems: NavItem[] = [
    { id: SECTIONS.HOME, icon: "🏠", label: "Home" },
    { id: SECTIONS.COLLEGE, icon: "🏫", label: "College" },
    { id: SECTIONS.TRANSPORT, icon: "🚌", label: "Transport" },
    { id: SECTIONS.PG, icon: "🏠", label: "PG" },
    { id: SECTIONS.FOOD, icon: "🍕", label: "Food" },
    { id: SECTIONS.ESSENTIALS, icon: "🏥", label: "Essentials" },
  ];

  const desktopOnlyNavItems = [
    {
      id: SECTIONS.WISHLIST,
      icon: "❤️",
      label: "Wishlist",
      badge: wishlistCount > 0 ? wishlistCount : undefined,
    },
    { id: SECTIONS.CONTACT, icon: "📞", label: "Contact" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around py-2 overflow-x-auto">
        {mobileNavItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center py-2 px-1 min-w-0 flex-shrink-0 transition-colors duration-200 relative ${
              activeSection === item.id ? "text-blue-500" : "text-gray-600"
            }`}
          >
            <div className="relative">
              <span className="text-lg mb-1 block">{item.icon}</span>
              {item.badge && item.badge > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {item.badge > 9 ? "9+" : item.badge}
                </span>
              )}
            </div>
            <span className="text-xs font-medium truncate">{item.label}</span>
          </button>
        ))}

        {/* Desktop-only navigation items */}
        {desktopOnlyNavItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`hidden md:flex flex-col items-center py-2 px-1 min-w-0 flex-shrink-0 transition-colors duration-200 relative ${
              activeSection === item.id ? "text-blue-500" : "text-gray-600"
            }`}
          >
            <div className="relative">
              <span className="text-lg mb-1 block">{item.icon}</span>
              {item.badge && item.badge > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {item.badge > 9 ? "9+" : item.badge}
                </span>
              )}
            </div>
            <span className="text-xs font-medium truncate">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};
