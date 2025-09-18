import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'

// Generic API hook
export function useApi<T>(endpoint: string, options?: RequestInit) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { data: session } = useSession()

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(endpoint, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      setData(result)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [endpoint, options])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

// Food API hook
export function useFood() {
  const [foods, setFoods] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchFoods = useCallback(async (filters?: any) => {
    try {
      setLoading(true)
      const params = new URLSearchParams(filters)
      const response = await fetch(`/api/food?${params}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch foods')
      }
      
      const data = await response.json()
      setFoods(data.foods)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [])

  const createFood = async (foodData: any) => {
    try {
      const response = await fetch('/api/food', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(foodData),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create food')
      }
      
      const newFood = await response.json()
      await fetchFoods() // Refresh list
      return newFood
    } catch (error) {
      throw error
    }
  }

  const updateFood = async (id: string, foodData: any) => {
    try {
      const response = await fetch(`/api/food/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(foodData),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update food')
      }
      
      const updatedFood = await response.json()
      await fetchFoods() // Refresh list
      return updatedFood
    } catch (error) {
      throw error
    }
  }

  const deleteFood = async (id: string) => {
    try {
      const response = await fetch(`/api/food/${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete food')
      }
      
      await fetchFoods() // Refresh list
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    fetchFoods()
  }, [fetchFoods])

  return {
    foods,
    loading,
    error,
    createFood,
    updateFood,
    deleteFood,
    refetch: fetchFoods,
  }
}

// PG API hook
export function usePG() {
  const [pgs, setPgs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPGs = useCallback(async (filters?: any) => {
    try {
      setLoading(true)
      const params = new URLSearchParams(filters)
      const response = await fetch(`/api/pg?${params}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch PGs')
      }
      
      const data = await response.json()
      setPgs(data.pgs)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [])

  const createPG = async (pgData: any) => {
    try {
      const response = await fetch('/api/pg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pgData),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create PG')
      }
      
      const newPG = await response.json()
      await fetchPGs() // Refresh list
      return newPG
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    fetchPGs()
  }, [fetchPGs])

  return {
    pgs,
    loading,
    error,
    createPG,
    refetch: fetchPGs,
  }
}

// Wishlist API hook
export function useWishlist() {
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { data: session } = useSession()

  const fetchWishlist = useCallback(async () => {
    if (!session) return
    
    try {
      setLoading(true)
      const response = await fetch('/api/wishlist')
      
      if (!response.ok) {
        throw new Error('Failed to fetch wishlist')
      }
      
      const data = await response.json()
      setWishlist(data.wishlist)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [session])

  const addToWishlist = async (pgId: string) => {
    try {
      const response = await fetch('/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pgId }),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to add to wishlist')
      }
      
      await fetchWishlist() // Refresh list
    } catch (error) {
      throw error
    }
  }

  const removeFromWishlist = async (pgId: string) => {
    try {
      const response = await fetch(`/api/wishlist?pgId=${pgId}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to remove from wishlist')
      }
      
      await fetchWishlist() // Refresh list
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    fetchWishlist()
  }, [fetchWishlist])

  return {
    wishlist,
    loading,
    error,
    addToWishlist,
    removeFromWishlist,
    refetch: fetchWishlist,
  }
}
