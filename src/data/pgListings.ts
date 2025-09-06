import { PGListing } from '@/types';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  distance: string;
  facilities: string[];
  addedAt: Date;
}

export const PG_LISTINGS: PGListing[] = [
  {
    id: '1',
    name: 'Green Valley PG',
    price: 8000,
    distance: '500m from college',
    facilities: ['Food', 'WiFi', 'Laundry', 'Power Backup']
  },
  {
    id: '2',
    name: 'Student Paradise',
    price: 6500,
    distance: '800m from college',
    facilities: ['WiFi', 'Laundry', 'Parking', 'Study Room']
  },
  {
    id: '3',
    name: 'Comfort Living',
    price: 9500,
    distance: '300m from college',
    facilities: ['Food', 'WiFi', 'AC', 'Security', 'Gym']
  }
];