import React, { createContext, useContext, ReactNode } from "react";
import { useWishlist } from "@/hooks/useWishlist";
import { WishlistContextType } from "@/types";

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({
  children,
}) => {
  const wishlistHook = useWishlist();

  return (
    <WishlistContext.Provider value={wishlistHook}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error(
      "useWishlistContext must be used within a WishlistProvider"
    );
  }
  return context;
};
