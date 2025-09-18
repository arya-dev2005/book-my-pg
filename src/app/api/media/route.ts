import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { uploadToCloudinary } from '@/lib/cloudinary'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const pgId = formData.get('pgId') as string | null
    const collegeId = formData.get('collegeId') as string | null
    const foodId = formData.get('foodId') as string | null
    const transportId = formData.get('transportId') as string | null

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type and size
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm']
    const maxSize = 10 * 1024 * 1024 // 10MB

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type' },
        { status: 400 }
      )
    }

    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large (max 10MB)' },
        { status: 400 }
      )
    }

    // Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(file, 'book-my-pg')

    // Save to database
    const media = await prisma.media.create({
      data: {
        url: uploadResult.secure_url,
        type: uploadResult.resource_type.toUpperCase() as 'IMAGE' | 'VIDEO',
        pgId: pgId || undefined,
        collegeId: collegeId || undefined,
        foodId: foodId || undefined,
        transportId: transportId || undefined,
      }
    })

    return NextResponse.json(media, { status: 201 })

  } catch (error) {
    console.error('Media upload error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}