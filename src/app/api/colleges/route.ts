import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { createCollegeSchema } from '@/lib/validators'
import { authOptions } from '@/lib/auth'

// GET /api/colleges - List all colleges
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search')

    const skip = (page - 1) * limit
    
    const where: any = {}
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } }
      ]
    }

    const [colleges, total] = await Promise.all([
      prisma.college.findMany({
        where,
        skip,
        take: limit,
        include: {
          media: {
            select: {
              id: true,
              url: true,
              type: true,
            }
          },
          _count: {
            select: {
              pgs: true,
              transports: true,
            }
          }
        },
        orderBy: {
          name: 'asc'
        }
      }),
      prisma.college.count({ where })
    ])

    return NextResponse.json({
      colleges,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Get colleges error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/colleges - Create new college
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    
    // Validate input
    const result = createCollegeSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.issues },
        { status: 422 }
      )
    }

    const { name, address } = result.data

    // Check if college with same name already exists
    const existingCollege = await prisma.college.findFirst({
      where: { name }
    })

    if (existingCollege) {
      return NextResponse.json(
        { error: 'College with this name already exists' },
        { status: 409 }
      )
    }

    // Create college
    const college = await prisma.college.create({
      data: {
        name,
        address,
      },
      include: {
        media: {
          select: {
            id: true,
            url: true,
            type: true,
          }
        },
        _count: {
          select: {
            pgs: true,
            transports: true,
          }
        }
      }
    })

    return NextResponse.json(college, { status: 201 })

  } catch (error) {
    console.error('Create college error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}