import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { createTransportSchema } from '@/lib/validators'
import { authOptions } from '@/lib/auth'

// GET /api/transport - List all transport options
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const type = searchParams.get('type')
    const collegeId = searchParams.get('collegeId')
    const pgId = searchParams.get('pgId')
    const available = searchParams.get('available')

    const skip = (page - 1) * limit
    
    const where: any = {}
    if (type) where.type = type
    if (collegeId) where.collegeId = collegeId
    if (pgId) where.pgId = pgId
    if (available !== null) where.available = available === 'true'

    const [transports, total] = await Promise.all([
      prisma.transport.findMany({
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
        },
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.transport.count({ where })
    ])

    return NextResponse.json({
      transports,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Get transports error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/transport - Create new transport
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
    const result = createTransportSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.issues },
        { status: 422 }
      )
    }

    const data = result.data

    // Verify related entities exist
    if (data.pgId) {
      const pgExists = await prisma.pG.findUnique({
        where: { id: data.pgId }
      })
      
      if (!pgExists) {
        return NextResponse.json(
          { error: 'PG not found' },
          { status: 404 }
        )
      }
    }

    if (data.collegeId) {
      const collegeExists = await prisma.college.findUnique({
        where: { id: data.collegeId }
      })
      
      if (!collegeExists) {
        return NextResponse.json(
          { error: 'College not found' },
          { status: 404 }
        )
      }
    }

    // Create transport
    const transport = await prisma.transport.create({
      data,
      include: {
        pg: {
          select: {
            id: true,
            name: true,
            address: true,
          }
        },
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

    return NextResponse.json(transport, { status: 201 })

  } catch (error) {
    console.error('Create transport error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
