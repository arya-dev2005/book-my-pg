import React from 'react';

export interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  component: React.ComponentType;
}

export interface PGListing {
  id: string;
  name: string;
  price: number;
  distance: string;
  facilities: string[];
  image?: string;
  rating?: number;
  reviewCount?: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
  address?: string;
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