import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { createPGSchema } from '@/lib/validators'
import { authOptions } from '@/lib/auth'

// GET /api/pg - List all PGs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const collegeId = searchParams.get('collegeId')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const facilities = searchParams.get('facilities')

    const skip = (page - 1) * limit
    
    const where: any = {}
    if (collegeId) where.collegeId = collegeId
    if (minPrice) where.price = { gte: parseFloat(minPrice) }
    if (maxPrice) {
      if (where.price) {
        where.price.lte = parseFloat(maxPrice)
      } else {
        where.price = { lte: parseFloat(maxPrice) }
      }
    }
    if (facilities) {
      const facilityArray = facilities.split(',')
      where.facilities = { hasEvery: facilityArray }
    }

    const [pgs, total] = await Promise.all([
      prisma.pG.findMany({
        where,
        skip,
        take: limit,
        include: {
          college: {
            select: {
              id: true,
              name: true,
              address: true,
            }
          },
          media: {
            select: {
              id: true,
              url: true,
              type: true,
            }
          },
          foods: {
            select: {
              id: true,
              name: true,
              type: true,
              price: true,
              available: true,
            }
          },
          transports: {
            select: {
              id: true,
              name: true,
              type: true,
              fare: true,
              available: true,
            }
          },
          _count: {
            select: {
              wishlists: true,
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.pG.count({ where })
    ])

    return NextResponse.json({
      pgs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Get PGs error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/pg - Create new PG
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
    const result = createPGSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.issues },
        { status: 422 }
      )
    }

    const { name, address, price, facilities, collegeId } = result.data

    // Verify college exists if collegeId provided
    if (collegeId) {
      const collegeExists = await prisma.college.findUnique({
        where: { id: collegeId }
      })
      
      if (!collegeExists) {
        return NextResponse.json(
          { error: 'College not found' },
          { status: 404 }
        )
      }
    }

    // Create PG
    const pg = await prisma.pG.create({
      data: {
        name,
        address,
        price,
        facilities,
        collegeId,
      },
      include: {
        college: {
          select: {
            id: true,
            name: true,
            address: true,
          }
        },
        media: {
          select: {
            id: true,
            url: true,
            type: true,
          }
        }
      }
    })

    return NextResponse.json(pg, { status: 201 })

  } catch (error) {
    console.error('Create PG error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}