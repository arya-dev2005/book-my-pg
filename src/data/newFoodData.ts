import { FoodVenue } from '@/types';

export const FOOD_VENUES: FoodVenue[] = [
  // College and Hostel Canteens
  {
    id: 'c1',
    name: 'Main Canteen',
    type: 'college-canteen',
    category: 'College and Hostel Canteens',
    description: 'Affordable meals, snacks, and beverages',
    timings: '8:00 AM - 8:00 PM',
    location: 'Ground Floor, Main Building',
    image: '/images/food/main-canteen.jpg',
    priceRange: '₹30-100',
    menu: [
      {
        name: 'Veg Thali',
        price: 50,
        isVeg: true,
        category: 'Meals'
      },
      {
        name: 'Samosa',
        price: 10,
        isVeg: true,
        category: 'Snacks'
      }
    ]
  },
  {
    id: 'c2',
    name: 'Hostel Mess',
    type: 'hostel-canteen',
    category: 'College and Hostel Canteens',
    description: 'Regular mess food with monthly subscription',
    timings: '7:00 AM - 10:00 PM',
    location: 'Hostel Building',
    priceRange: '₹2000-3000/month',
    menu: [
      {
        name: 'Monthly Mess Plan',
        price: 2500,
        isVeg: true,
        category: 'Subscription'
      }
    ]
  },

  // Affordable Hotels
  {
    id: 'ah1',
    name: 'Student Dhaba',
    type: 'affordable-hotel',
    category: 'Affordable Hotels',
    description: 'Budget-friendly North Indian cuisine',
    timings: '11:00 AM - 11:00 PM',
    location: '200m from Main Gate',
    contactNumber: '9876543210',
    priceRange: '₹60-200',
    studentDiscount: '10% off on showing ID card',
    menu: [
      {
        name: 'Dal Makhani',
        price: 80,
        isVeg: true,
        category: 'Main Course'
      },
      {
        name: 'Butter Chicken',
        price: 160,
        isVeg: false,
        category: 'Main Course'
      }
    ]
  },
  {
    id: 'ah2',
    name: 'Apna Kitchen',
    type: 'affordable-hotel',
    category: 'Affordable Hotels',
    description: 'Home-style meals at budget prices',
    timings: '10:00 AM - 10:00 PM',
    location: '300m from College',
    priceRange: '₹50-150',
    menu: [
      {
        name: 'Rice Plate',
        price: 50,
        isVeg: true,
        category: 'Meals'
      }
    ]
  },

  // Restaurants
  {
    id: 'r1',
    name: 'Pizza Palace',
    type: 'restaurant',
    category: 'Restaurants',
    description: 'Student discounts available. Great for group orders',
    timings: '11:00 AM - 11:00 PM',
    location: '100m from College',
    contactNumber: '9876543211',
    image: '/images/food/pizza.jpg',
    priceRange: '₹200-800',
    studentDiscount: '15% off on weekdays',
    menu: [
      {
        name: 'Margherita Pizza',
        price: 250,
        isVeg: true,
        category: 'Pizza'
      },
      {
        name: 'BBQ Chicken Pizza',
        price: 450,
        isVeg: false,
        category: 'Pizza'
      }
    ]
  },
  {
    id: 'r2',
    name: 'Cafe Connect',
    type: 'restaurant',
    category: 'Restaurants',
    description: 'Modern cafe with great ambiance',
    timings: '9:00 AM - 11:00 PM',
    location: '400m from College',
    priceRange: '₹150-500',
    menu: [
      {
        name: 'Cold Coffee',
        price: 120,
        isVeg: true,
        category: 'Beverages'
      }
    ]
  },

  // Street Food and Food Stalls
  {
    id: 's1',
    name: 'College Gate Stalls',
    type: 'street-food',
    category: 'Street Food and Food Stalls',
    description: 'Chaat, samosas, and local favorites',
    timings: '3:00 PM - 9:00 PM',
    location: 'Near College Main Gate',
    image: '/images/food/street-food.jpg',
    priceRange: '₹20-100',
    menu: [
      {
        name: 'Pani Puri',
        price: 30,
        isVeg: true,
        category: 'Chaat'
      },
      {
        name: 'Vada Pav',
        price: 25,
        isVeg: true,
        category: 'Snacks'
      }
    ]
  },
  {
    id: 's2',
    name: 'Momos Corner',
    type: 'food-stall',
    category: 'Street Food and Food Stalls',
    description: 'Fresh momos and rolls',
    timings: '12:00 PM - 9:00 PM',
    location: 'Side Gate',
    priceRange: '₹30-120',
    menu: [
      {
        name: 'Veg Momos',
        price: 40,
        isVeg: true,
        category: 'Snacks'
      }
    ]
  },

  // Time Pass and Cravings
  {
    id: 'tp1',
    name: 'Sweet Corner',
    type: 'time-pass-craving',
    category: 'Time Pass and Cravings',
    description: 'Ice cream, shakes, and sweet treats',
    timings: '12:00 PM - 10:00 PM',
    location: 'Behind Library',
    priceRange: '₹40-150',
    menu: [
      {
        name: 'Chocolate Shake',
        price: 60,
        isVeg: true,
        category: 'Beverages'
      },
      {
        name: 'Ice Cream Sundae',
        price: 120,
        isVeg: true,
        category: 'Desserts'
      }
    ]
  },
  {
    id: 'tp2',
    name: 'Snack Shack',
    type: 'time-pass-craving',
    category: 'Time Pass and Cravings',
    description: 'Quick bites and beverages',
    timings: '10:00 AM - 8:00 PM',
    location: 'Near Sports Complex',
    priceRange: '₹20-100',
    menu: [
      {
        name: 'Chips & Dip',
        price: 40,
        isVeg: true,
        category: 'Snacks'
      }
    ]
  }
];