import { PGListing } from '@/types';

export const PG_LISTINGS: PGListing[] = [
  {
    id: '1',
    name: 'Green Valley PG',
    distance: '500m from college',
    facilities: ['Food', 'WiFi', 'Laundry', 'Power Backup'],
    rating: 4.2,
    reviewCount: 28,
    coordinates: {
      lat: 28.6139,
      lng: 77.2090
    },
    address: 'Green Valley PG, Plot No. 123',
    near: 'Khudiram Nagar',
    image: '/images/pg/pg1.jpg',
    rooms: [
      { type: 'single', available: 2, price: 8000 },
      { type: 'double', available: 1, price: 6000 }
    ],
    isAvailable: true
  },
  {
    id: '2',
    name: 'Student Paradise',
    distance: '800m from college',
    facilities: ['WiFi', 'Laundry', 'Parking', 'Study Room'],
    rating: 4.5,
    reviewCount: 42,
    coordinates: {
      lat: 28.6145,
      lng: 77.2085
    },
    address: 'Student Paradise, Plot No. 456',
    near: 'Gandhi Nagar',
    image: '/images/pg/pg2.jpg',
    rooms: [
      { type: 'single', available: 0, price: 6500 },
      { type: 'double', available: 2, price: 5000 }
    ],
    isAvailable: true
  },
  {
    id: '3',
    name: 'Comfort Living',
    distance: '300m from college',
    facilities: ['Food', 'WiFi', 'AC', 'Security', 'Gym'],
    rating: 4.8,
    reviewCount: 67,
    coordinates: {
      lat: 28.6135,
      lng: 77.2095
    },
    address: 'Comfort Living, Plot No. 789',
    near: 'Ranichak',
    image: '/images/pg/pg3.jpg',
    rooms: [
      { type: 'single', available: 3, price: 9500 },
      { type: 'double', available: 1, price: 7000 }
    ],
    isAvailable: true
  },
  {
    id: '4',
    name: 'Ice cream Factory',
    distance: '1000m from college',
    facilities: ['Food', 'WiFi', 'AC', 'Security', 'Gym'],
    rating: 3.9,
    reviewCount: 15,
    coordinates: {
      lat: 28.6150,
      lng: 77.2080
    },
    address: 'Ice cream Factory, Plot No. 101',
    near: 'Khudiram Nagar',
    image: '/images/pg/pg4.jpg',
    rooms: [
      { type: 'single', available: 0, price: 5500 },
      { type: 'double', available: 0, price: 4000 }
    ],
    isAvailable: false
  }
];