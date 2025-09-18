import { z } from 'zod'

// User validators
export const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
})

// PG validators
export const createPGSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  address: z.string().min(1, 'Address is required'),
  price: z.number().positive('Price must be positive'),
  facilities: z.array(z.string()),
  collegeId: z.string().optional(),
})

export const updatePGSchema = createPGSchema.partial()

// College validators
export const createCollegeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  address: z.string().min(1, 'Address is required'),
})

export const updateCollegeSchema = createCollegeSchema.partial()

// Food validators
export const createFoodSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.enum(['VEG', 'NON_VEG', 'VEGAN', 'MIXED']),
  price: z.number().positive('Price must be positive'),
  available: z.boolean().default(true),
  pgId: z.string().optional(),
})

export const updateFoodSchema = createFoodSchema.partial()

// Transport validators
export const createTransportSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.enum(['BUS', 'SHUTTLE', 'TRAIN', 'METRO', 'OTHER']),
  route: z.string().optional(),
  startPoint: z.string().optional(),
  endPoint: z.string().optional(),
  fare: z.number().positive().optional(),
  schedule: z.string().optional(),
  available: z.boolean().default(true),
  pgId: z.string().optional(),
  collegeId: z.string().optional(),
})

export const updateTransportSchema = createTransportSchema.partial()

// Wishlist validators
export const createWishlistSchema = z.object({
  pgId: z.string().cuid('Invalid PG ID'),
})

// Media validators
export const createMediaSchema = z.object({
  url: z.string().url('Invalid URL'),
  type: z.enum(['IMAGE', 'VIDEO']),
  pgId: z.string().optional(),
  collegeId: z.string().optional(),
  foodId: z.string().optional(),
  transportId: z.string().optional(),
})