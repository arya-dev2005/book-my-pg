import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { createFoodSchema } from '@/lib/validators'

// GET /api/food - List all food items
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const type = searchParams.get('type')
    const pgId = searchParams.get('pgId')
    const available = searchParams.get('available')

    const skip = (page - 1) * limit
    
    const where: any = {}
    if (type) where.type = type
    if (pgId) where.pgId = pgId
    if (available !== null) where.available = available === 'true'

    const [foods, total] = await Promise.all([
      prisma.food.findMany({
        where,
        skip,
        take: limit,
        include: {
          pg: {
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
        },
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.food.count({ where })
    ])

    return NextResponse.json({
      foods,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Get foods error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/food - Create new food item
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    
    // Validate input
    const result = createFoodSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.issues },
        { status: 422 }
      )
    }

    const { name, type, price, available, pgId } = result.data

    // Verify PG exists if pgId provided
    if (pgId) {
      const pgExists = await prisma.pG.findUnique({
        where: { id: pgId }
      })
      
      if (!pgExists) {
        return NextResponse.json(
          { error: 'PG not found' },
          { status: 404 }
        )
      }
    }

    // Create food item
    const food = await prisma.food.create({
      data: {
        name,
        type,
        price,
        available,
        pgId,
      },
      include: {
        pg: {
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

    return NextResponse.json(food, { status: 201 })

  } catch (error) {
    console.error('Create food error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}