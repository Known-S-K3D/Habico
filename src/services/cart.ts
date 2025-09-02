import { apiFetch } from '../lib/api';
import type { Product } from '../types';

export async function getCart() {
  return apiFetch<{ items: Array<{ product: Product; quantity: number }> }>('/api/cart');
}

export async function addToCart(productId: string, quantity: number = 1) {
  return apiFetch<{ success: boolean }>('/api/cart/add', {
    method: 'POST',
    body: JSON.stringify({ productId, quantity }),
  });
}

export async function updateCart(productId: string, quantity: number) {
  return apiFetch<{ success: boolean }>('/api/cart/update', {
    method: 'POST',
    body: JSON.stringify({ productId, quantity }),
  });
}

export async function removeFromCart(productId: string) {
  return apiFetch<{ success: boolean }>('/api/cart/remove', {
    method: 'POST',
    body: JSON.stringify({ productId }),
  });
}
