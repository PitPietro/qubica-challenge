import { http } from './http'
import type { Category, Product } from '@/types'

export async function fetchProducts(): Promise<Product[]> {
  const { data } = await http.get<Product[]>('/products')
  return data
}

export async function fetchProductById(id: number): Promise<Product> {
  const { data } = await http.get<Product>(`/products/${id}`)
  return data
}

export async function fetchCategories(): Promise<Category[]> {
  const { data } = await http.get<Category[]>('/products/categories')
  return data
}

export async function fetchProductsByCategory(category: Category): Promise<Product[]> {
  const { data } = await http.get<Product[]>(`/products/category/${encodeURIComponent(category)}`)
  return data
}
