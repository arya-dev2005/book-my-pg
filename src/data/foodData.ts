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
      { name: 'Thali', price: 60, isVeg: true, category: 'Meals' },
      { name: 'Sandwich', price: 30, isVeg: true, category: 'Snacks' },
      { name: 'Tea', price: 10, isVeg: true, category: 'Beverages' }
    ]
  },
  {
    id: 'c2',
    name: 'Coffee Corner',
    type: 'college-canteen',
    category: 'College and Hostel Canteens',
    description: 'Fresh coffee, tea, and quick bites. Perfect study spot!',
    timings: '9:00 AM - 7:00 PM',
    location: 'Library Building',
    image: '/images/food/coffee-corner.jpg',
    priceRange: '₹20-100',
    menu: [
      { name: 'Coffee', price: 20, isVeg: true, category: 'Beverages' },
      { name: 'Pastries', price: 25, isVeg: true, category: 'Snacks' }
    ]
  },
  {
    id: 'r1',
    name: 'Pizza Palace',
    type: 'restaurant',
    category: 'Restaurants',
    description: 'Student discounts available. Great for group orders',
    timings: '11:00 AM - 11:00 PM',
    location: '100m from College Gate',
    contactNumber: '+91-9876543210',
    image: '/images/food/pizza-palace.jpg',
    priceRange: '₹150-500',
    studentDiscount: '15% off on showing college ID',
    menu: [
      { name: 'Margherita Pizza', price: 150, isVeg: true, category: 'Pizza' },
      { name: 'Pepperoni Pizza', price: 220, isVeg: false, category: 'Pizza' },
      { name: 'Garlic Bread', price: 80, isVeg: true, category: 'Sides' }
    ]
  },
  {
    id: 'r2',
    name: 'Curry House',
    type: 'restaurant',
    category: 'Restaurants',
    description: 'Authentic Indian cuisine at student-friendly prices',
    timings: '11:00 AM - 10:30 PM',
    location: '200m from College Gate',
    contactNumber: '+91-9876543211',
    image: '/images/food/curry-house.jpg',
    priceRange: '₹120-400',
    studentDiscount: '10% off on orders above ₹200',
    menu: [
      { name: 'Dal Makhani', price: 120, isVeg: true, category: 'Main Course' },
      { name: 'Butter Chicken', price: 180, isVeg: false, category: 'Main Course' },
      { name: 'Naan', price: 25, isVeg: true, category: 'Breads' }
    ]
  },
  {
    id: 'r3',
    name: 'Burger Junction',
    type: 'restaurant',
    category: 'Restaurants',
    description: 'Quick bites and combo meals. Open till midnight',
    timings: '12:00 PM - 12:00 AM',
    location: '150m from College Gate',
    contactNumber: '+91-9876543212',
    image: '/images/food/burger-junction.jpg',
    priceRange: '₹50-150',
    studentDiscount: 'Free fries with any burger',
    menu: [
      { name: 'Veg Burger', price: 70, isVeg: true, category: 'Burgers' },
      { name: 'Chicken Burger', price: 90, isVeg: false, category: 'Burgers' },
      { name: 'French Fries', price: 50, isVeg: true, category: 'Sides' }
    ]
  },
  {
    id: 's1',
    name: 'College Gate Stalls',
    type: 'street-food',
    category: 'Street Food and Food Stalls',
    description: 'Chaat, samosas, and local favorites. Super affordable!',
    timings: '3:00 PM - 9:00 PM',
    location: 'Near College Main Gate',
    image: '/images/food/street-food.jpg',
    priceRange: '₹15-50',
    menu: [
      { name: 'Samosa', price: 15, isVeg: true, category: 'Snacks' },
      { name: 'Pani Puri', price: 30, isVeg: true, category: 'Chaat' },
      { name: 'Vada Pav', price: 20, isVeg: true, category: 'Snacks' }
    ]
  },
  {
    id: 's2',
    name: 'Evening Food Court',
    type: 'food-stall',
    category: 'Street Food and Food Stalls',
    description: 'Multiple vendors with variety of street food options',
    timings: '4:00 PM - 10:00 PM',
    location: 'College Back Gate',
    image: '/images/food/food-court.jpg',
    priceRange: '₹25-50',
    menu: [
      { name: 'Momos', price: 40, isVeg: true, category: 'Snacks' },
      { name: 'Maggi', price: 30, isVeg: true, category: 'Snacks' },
      { name: 'Cold Coffee', price: 25, isVeg: true, category: 'Beverages' }
    ]
  }
];