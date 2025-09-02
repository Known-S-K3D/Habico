import { useEffect, useState } from 'react';
import { getFeaturedProducts, searchProducts } from '../services/products';
import type { Product } from '../types';

export function useFeaturedOrSearch(query?: string) {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    const run = async () => {
      try {
        const products = query?.trim()
          ? await searchProducts(query.trim())
          : await getFeaturedProducts(4);
        if (mounted) setData(products);
      } catch (e: unknown) {
        if (mounted) setError(e instanceof Error ? e.message : 'Failed to load products');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    run();
    return () => { mounted = false; };
  }, [query]);

  return { data, loading, error };
}
