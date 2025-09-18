import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { updateFoodSchema } from '@/lib/validators'
import { authOptions } from '@/lib/auth'

// GET /api/food/[id] - Get single food item
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const food = await prisma.food.findUnique({
      where: { id },
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

    if (!food) {
      return NextResponse.json(
        { error: 'Food item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(food)

  } catch (error) {
    console.error('Get food error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/food/[id] - Update food item
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
    const result = updateFoodSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.issues },
        { status: 422 }
      )
    }

    // Check if food exists
    const existingFood = await prisma.food.findUnique({
      where: { id }
    })

    if (!existingFood) {
      return NextResponse.json(
        { error: 'Food item not found' },
        { status: 404 }
      )
    }

    // Verify PG exists if pgId provided
    if (result.data.pgId) {
      const pgExists = await prisma.pG.findUnique({
        where: { id: result.data.pgId }
      })
      
      if (!pgExists) {
        return NextResponse.json(
          { error: 'PG not found' },
          { status: 404 }
        )
      }
    }

    // Update food item
    const food = await prisma.food.update({
      where: { id },
      data: result.data,
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

    return NextResponse.json(food)

  } catch (error) {
    console.error('Update food error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/food/[id] - Delete food item
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

    // Check if food exists
    const existingFood = await prisma.food.findUnique({
      where: { id }
    })

    if (!existingFood) {
      return NextResponse.json(
        { error: 'Food item not found' },
        { status: 404 }
      )
    }

    // Delete associated media first
    await prisma.media.deleteMany({
      where: { foodId: id }
    })

    // Delete food item
    await prisma.food.delete({
      where: { id }
    })

    return NextResponse.json(
      { message: 'Food item deleted successfully' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Delete food error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}