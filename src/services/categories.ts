import { apiFetch } from '../lib/api';

export async function getCategories() {
  return apiFetch<{ categories: string[] }>('/api/categories');
}
