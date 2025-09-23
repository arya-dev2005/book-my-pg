import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { updatePGSchema } from '@/lib/validators'
import { authOptions } from '@/lib/auth'

// GET /api/pg/[id] - Get single PG
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const pg = await prisma.pG.findUnique({
      where: { id },
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
            route: true,
            fare: true,
            schedule: true,
            available: true,
          }
        },
        _count: {
          select: {
            wishlists: true,
          }
        }
      }
    })

    if (!pg) {
      return NextResponse.json(
        { error: 'PG not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(pg)

  } catch (error) {
    console.error('Get PG error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/pg/[id] - Update PG
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = params
    const body = await request.json()

    // Validate input
    const result = updatePGSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.issues },
        { status: 422 }
      )
    }

    // Check if PG exists
    const existingPG = await prisma.pG.findUnique({
      where: { id }
    })

    if (!existingPG) {
      return NextResponse.json(
        { error: 'PG not found' },
        { status: 404 }
      )
    }

    // Verify college exists if collegeId provided
    if (result.data.collegeId) {
      const collegeExists = await prisma.college.findUnique({
        where: { id: result.data.collegeId }
      })
      
      if (!collegeExists) {
        return NextResponse.json(
          { error: 'College not found' },
          { status: 404 }
        )
      }
    }

    // Update PG
    const pg = await prisma.pG.update({
      where: { id },
      data: result.data,
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

    return NextResponse.json(pg)

  } catch (error) {
    console.error('Update PG error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/pg/[id] - Delete PG
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = params

    // Check if PG exists
    const existingPG = await prisma.pG.findUnique({
      where: { id }
    })

    if (!existingPG) {
      return NextResponse.json(
        { error: 'PG not found' },
        { status: 404 }
      )
    }

    // Delete in order due to foreign key constraints
    await prisma.$transaction(async (tx: any) => {
      // Delete wishlists first
      await tx.wishlist.deleteMany({
        where: { pgId: id }
      })

      // Delete media
      await tx.media.deleteMany({
        where: { pgId: id }
      })

      // Delete foods
      await tx.food.deleteMany({
        where: { pgId: id }
      })

      // Delete transports
      await tx.transport.deleteMany({
        where: { pgId: id }
      })

      // Finally delete PG
      await tx.pG.delete({
        where: { id }
      })
    })

    return NextResponse.json(
      { message: 'PG deleted successfully' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Delete PG error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}