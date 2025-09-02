import { apiFetch } from '../lib/api';

export async function login(email: string, password: string) {
  return apiFetch<{ token: string; user: { id: string; name: string; email: string } }>('/api/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function signup(name: string, email: string, password: string) {
  return apiFetch<{ token: string; user: { id: string; name: string; email: string } }>('/api/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
}

export async function logout() {
  return apiFetch<{ success: boolean }>('/api/logout', {
    method: 'POST',
  });
}

export async function getCurrentUser() {
  return apiFetch<{ user: { id: string; name: string; email: string } }>('/api/user');
}
