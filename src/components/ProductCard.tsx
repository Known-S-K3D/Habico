import { Link } from 'react-router-dom';
import type { Product } from '../types';

export default function ProductCard({ product }: { product: Product }) {
  const img = product.images?.[0];
  return (
    <Link
      to={`/product/${product.id}`}
      className="overflow-hidden transition border rounded-lg group border-neutral-200 dark:border-neutral-800 hover:shadow-md"
    >
      <div className="aspect-square bg-neutral-100 dark:bg-neutral-900">
        {img ? (
          <img src={img} alt={product.name} className="object-cover w-full h-full" />
        ) : (
          <div className="grid w-full h-full text-sm place-items-center text-neutral-400">No image</div>
        )}
      </div>
      <div className="p-4">
        {product.label && (
          <span className="inline-block px-2 py-1 text-xs rounded text-amber-700 bg-amber-100 dark:text-amber-300 dark:bg-amber-900/30">
            {product.label}
          </span>
        )}
        <h3 className="mt-2 font-medium">{product.name}</h3>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">{product.description}</p>
        <div className="mt-3 font-semibold">${product.price.toFixed(2)}</div>
      </div>
    </Link>
  );
}
    