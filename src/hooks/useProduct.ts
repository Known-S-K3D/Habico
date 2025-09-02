import { useEffect, useState } from 'react';
import { getProductById, getRelatedProducts } from '../services/products';
import type { Product } from '../types';

export function useProduct(id?: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    setLoading(true);
    setError(null);
    const run = async () => {
      try {
        const [p, r] = await Promise.all([getProductById(id), getRelatedProducts(id, 4)]);
        if (mounted) {
          setProduct(p);
          setRelated(r);
        }
      } catch (e: unknown) {
        if (mounted) {
          const errorMessage = e instanceof Error ? e.message : 'Failed to load product';
          setError(errorMessage);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };
    run();
    return () => { mounted = false; };
  }, [id]);

  return { product, related, loading, error };
}
  