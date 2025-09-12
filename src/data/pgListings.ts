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
    facilities: ['Food', 'WiFi', 'Laundry', 'Power Backup'],
    rating: 4.2,
    reviewCount: 28,
    coordinates: {
      lat: 28.6139,
      lng: 77.2090
    },
    address: 'Green Valley, Near College Gate, Delhi'
  },
  {
    id: '2',
    name: 'Student Paradise',
    price: 6500,
    distance: '800m from college',
    facilities: ['WiFi', 'Laundry', 'Parking', 'Study Room'],
    rating: 4.5,
    reviewCount: 42,
    coordinates: {
      lat: 28.6145,
      lng: 77.2085
    },
    address: 'Student Paradise, College Road, Delhi'
  },
  {
    id: '3',
    name: 'Comfort Living',
    price: 9500,
    distance: '300m from college',
    facilities: ['Food', 'WiFi', 'AC', 'Security', 'Gym'],
    rating: 4.8,
    reviewCount: 67,
    coordinates: {
      lat: 28.6135,
      lng: 77.2095
    },
    address: 'Comfort Living, Premium Zone, Delhi'
  },
  {
    id: '4',
    name: 'Ice cream Factory',
    price: 2000,
    distance: '1000m from college',
    facilities: ['Food', 'WiFi', 'AC', 'Security', 'Gym'],
    rating: 3.9,
    reviewCount: 15,
    coordinates: {
      lat: 28.6150,
      lng: 77.2080
    },
    address: 'Ice cream Factory, Student Area, Delhi'
  }
];