import { useEffect, useState } from 'react'
import { getProducts } from '../services/productsService'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let activo = true

    async function cargar() {
      try {
        const data = await getProducts()
        if (activo) setProducts(data)
      } catch (err) {
        if (activo) setError(err)
      } finally {
        if (activo) setLoading(false)
      }
    }

    cargar()

    return () => {
      activo = false // evita actualizar estado si el componente se desmonta
    }
  }, [])

  return { products, loading, error }
}