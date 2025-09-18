import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { createWishlistSchema } from '@/lib/validators'
import { authOptions } from '@/lib/auth'

// GET /api/wishlist - Get user's wishlist
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const skip = (page - 1) * limit

    const [wishlistItems, total] = await Promise.all([
      prisma.wishlist.findMany({
        where: { userId: session.user.id },
        skip,
        take: limit,
        include: {
          pg: {
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
              _count: {
                select: {
                  wishlists: true,
                }
              }
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.wishlist.count({
        where: { userId: session.user.id }
      })
    ])

    return NextResponse.json({
      wishlist: wishlistItems,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Get wishlist error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/wishlist - Add PG to wishlist
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    
    // Validate input
    const result = createWishlistSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.issues },
        { status: 422 }
      )
    }

    const { pgId } = result.data

    // Check if PG exists
    const pgExists = await prisma.pG.findUnique({
      where: { id: pgId }
    })

    if (!pgExists) {
      return NextResponse.json(
        { error: 'PG not found' },
        { status: 404 }
      )
    }

    // Check if already in wishlist
    const existingWishlistItem = await prisma.wishlist.findUnique({
      where: {
        userId_pgId: {
          userId: session.user.id,
          pgId
        }
      }
    })

    if (existingWishlistItem) {
      return NextResponse.json(
        { error: 'PG already in wishlist' },
        { status: 409 }
      )
    }

    // Add to wishlist
    const wishlistItem = await prisma.wishlist.create({
      data: {
        userId: session.user.id,
        pgId
      },
      include: {
        pg: {
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
        }
      }
    })

    return NextResponse.json(wishlistItem, { status: 201 })

  } catch (error) {
    console.error('Add to wishlist error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/wishlist - Remove PG from wishlist
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const pgId = searchParams.get('pgId')

    if (!pgId) {
      return NextResponse.json(
        { error: 'PG ID is required' },
        { status: 400 }
      )
    }

    // Check if item exists in wishlist
    const existingWishlistItem = await prisma.wishlist.findUnique({
      where: {
        userId_pgId: {
          userId: session.user.id,
          pgId
        }
      }
    })

    if (!existingWishlistItem) {
      return NextResponse.json(
        { error: 'PG not found in wishlist' },
        { status: 404 }
      )
    }

    // Remove from wishlist
    await prisma.wishlist.delete({
      where: {
        userId_pgId: {
          userId: session.user.id,
          pgId
        }
      }
    })

    return NextResponse.json(
      { message: 'PG removed from wishlist successfully' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Remove from wishlist error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}