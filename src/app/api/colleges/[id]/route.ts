import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { updateCollegeSchema } from '@/lib/validators'
import { authOptions } from '@/lib/auth'

// GET /api/colleges/[id] - Get single college
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const college = await prisma.college.findUnique({
      where: { id },
      include: {
        media: {
          select: {
            id: true,
            url: true,
            type: true,
          }
        },
        pgs: {
          select: {
            id: true,
            name: true,
            address: true,
            price: true,
            facilities: true,
          },
          orderBy: {
            price: 'asc'
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
          },
          where: {
            available: true
          }
        }
      }
    })

    if (!college) {
      return NextResponse.json(
        { error: 'College not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(college)

  } catch (error) {
    console.error('Get college error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/colleges/[id] - Update college
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
    const result = updateCollegeSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.issues },
        { status: 422 }
      )
    }

    // Check if college exists
    const existingCollege = await prisma.college.findUnique({
      where: { id }
    })

    if (!existingCollege) {
      return NextResponse.json(
        { error: 'College not found' },
        { status: 404 }
      )
    }

    // Check if another college with same name exists (if name is being updated)
    if (result.data.name && result.data.name !== existingCollege.name) {
      const duplicateCollege = await prisma.college.findFirst({
        where: { 
          name: result.data.name,
          id: { not: id }
        }
      })

      if (duplicateCollege) {
        return NextResponse.json(
          { error: 'College with this name already exists' },
          { status: 409 }
        )
      }
    }

    // Update college
    const college = await prisma.college.update({
      where: { id },
      data: result.data,
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

    return NextResponse.json(college)

  } catch (error) {
    console.error('Update college error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/colleges/[id] - Delete college
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

    // Check if college exists
    const existingCollege = await prisma.college.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            pgs: true,
            transports: true,
          }
        }
      }
    })

    if (!existingCollege) {
      return NextResponse.json(
        { error: 'College not found' },
        { status: 404 }
      )
    }

    // Check if college has associated PGs or transports
    if (existingCollege._count.pgs > 0 || existingCollege._count.transports > 0) {
      return NextResponse.json(
        { error: 'Cannot delete college with associated PGs or transports' },
        { status: 409 }
      )
    }

    // Delete college media and then college
    await prisma.$transaction(async (tx) => {
      await tx.media.deleteMany({
        where: { collegeId: id }
      })

      await tx.college.delete({
        where: { id }
      })
    })

    return NextResponse.json(
      { message: 'College deleted successfully' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Delete college error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}