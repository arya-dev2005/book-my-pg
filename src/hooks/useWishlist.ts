import { useState, useCallback, useMemo } from 'react';
import { PGListing, WishlistItem } from '@/types';

export const useWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  const addToWishlist = useCallback((item: PGListing) => {
    setWishlistItems(prev => {
      // Check if item already exists
      if (prev.some(wishlistItem => wishlistItem.id === item.id)) {
        return prev;
      }
      
      // Add new item with timestamp
      const newWishlistItem: WishlistItem = {
        ...item,
        addedAt: new Date()
      };
      
      return [...prev, newWishlistItem];
    });
  }, []);

  const removeFromWishlist = useCallback((itemId: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
  }, []);

  const isInWishlist = useCallback((itemId: string) => {
    return wishlistItems.some(item => item.id === itemId);
  }, [wishlistItems]);

  const clearWishlist = useCallback(() => {
    setWishlistItems([]);
  }, []);

  const wishlistCount = useMemo(() => wishlistItems.length, [wishlistItems]);

  const toggleWishlist = useCallback((item: PGListing) => {
    if (isInWishlist(item.id)) {
      removeFromWishlist(item.id);
    } else {
      addToWishlist(item);
    }
  }, [isInWishlist, removeFromWishlist, addToWishlist]);

  return {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    toggleWishlist,
    wishlistCount
  };
};