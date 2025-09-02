import { apiFetch } from '../lib/api';
import type { Product } from '../types';

export function getFeaturedProducts(limit = 4) {
  return apiFetch<Product[]>('/api/products', { query: { featured: true, limit } });
}

export function searchProducts(q: string, limit = 24) {
  return apiFetch<Product[]>('/api/products/search', { query: { q, limit } });
}

export function getProductById(id: string) {
  return apiFetch<Product>(`/api/products/${id}`);
}

export function getRelatedProducts(id: string, limit = 4) {
  return apiFetch<Product[]>(`/api/products/${id}/related`, { query: { limit } });
}
