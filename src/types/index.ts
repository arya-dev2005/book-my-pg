import React from 'react';

export interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  component: React.ComponentType;
}

export interface RoomAvailability {
  type: 'single' | 'double';
  available: number;
  price: number;
}

export interface PGListing {
  id: string;
  name: string;
  distance: string;
  facilities: string[];
  image?: string;
  rating?: number;
  reviewCount?: number;
  near?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  address?: string;
  rooms: RoomAvailability[];
  isAvailable: boolean;
}

export interface WishlistItem extends Omit<PGListing, 'isAvailable' | 'image' | 'rating' | 'reviewCount' | 'near' | 'coordinates' | 'address'> {
  addedAt: Date;
}

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
  icon: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export type FoodVenueType = 
  | 'college-canteen' 
  | 'hostel-canteen'
  | 'affordable-hotel'
  | 'restaurant'
  | 'street-food'
  | 'food-stall'
  | 'time-pass-craving';

export type FoodCategory =
  | 'College and Hostel Canteens'
  | 'Affordable Hotels'
  | 'Restaurants'
  | 'Street Food and Food Stalls'
  | 'Time Pass and Cravings';

export interface MenuItem {
  name: string;
  price: number;
  isVeg: boolean;
  category: string;
}

export interface FoodVenue {
  id: string;
  name: string;
  type: FoodVenueType;
  category: FoodCategory;
  description: string;
  image?: string;
  timings: string;
  contactNumber?: string;
  menu?: MenuItem[];
  location: string;
  studentDiscount?: string;
  priceRange: string;
}

export interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (item: PGListing) => void;
  removeFromWishlist: (itemId: string) => void;
  isInWishlist: (itemId: string) => boolean;
  toggleWishlist: (item: PGListing) => void;
  clearWishlist: () => void;
  wishlistCount: number;
}

export interface WishlistItem extends PGListing {
  addedAt: Date;
}

// Common event handler types
export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type TextAreaChangeEvent = React.ChangeEvent<HTMLTextAreaElement>;
export type SelectChangeEvent = React.ChangeEvent<HTMLSelectElement>;
export type FormSubmitEvent = React.FormEvent<HTMLFormElement>;
export type ButtonClickEvent = React.MouseEvent<HTMLButtonElement>;

// Base props type for all section components
export interface BaseSectionProps {
  onNavigate: (section: string) => void;
}

// Filter types
export interface FilterState {
  price: string;
  distance: string;
  facility: string;
  rating: string;
  sort: string;
}