export const SECTIONS = {
  HOME: 'home',
  COLLEGE: 'college',
  TRANSPORT: 'transport',
  PG: 'pg',
  FOOD: 'food',
  ESSENTIALS: 'essentials',
  CONTACT: 'contact',
  WISHLIST: 'wishlist'
} as const;

export type SectionType = typeof SECTIONS[keyof typeof SECTIONS];