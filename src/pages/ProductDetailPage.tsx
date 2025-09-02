import { useParams } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import QuantitySelector from '../components/QuantitySelector';
import Tabs from '../components/Tabs';
import ProductCard from '../components/ProductCard';
import { useState } from 'react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { product, related, loading, error } = useProduct(id);
  const [qty, setQty] = useState(1);

  if (loading) return <div className="h-80 rounded-lg bg-neutral-100 dark:bg-neutral-900 animate-pulse" />;
  if (error) return <div className="text-red-600">Error: {error}</div>;
  if (!product) return <div className="text-neutral-500">Product not found.</div>;

  const img = product.images?.[0];

  const tabs = [
    { key: 'details', label: 'Details', content: (
      <div className="space-y-2">
        <p className="text-sm text-neutral-700 dark:text-neutral-300">{product.description}</p>
        <ul className="text-sm text-neutral-600 dark:text-neutral-400">
          {product.dimensions && <li><span className="font-medium">Dimensions:</span> {product.dimensions}</li>}
          {product.weight && <li><span className="font-medium">Weight:</span> {product.weight}</li>}
        </ul>
      </div>
    )},
    { key: 'significance', label: 'Crafted Significance', content: (
      <p className="text-sm text-neutral-700 dark:text-neutral-300">
        {product.craftedSignificance || 'Significance details coming soon.'}
      </p>
    )},
    { key: 'history', label: 'History', content: (
      <p className="text-sm text-neutral-700 dark:text-neutral-300">
        {product.history || 'Historical background coming soon.'}
      </p>
    )},
  ];

  return (
    <div className="space-y-10">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800">
          <div className="aspect-square bg-neutral-100 dark:bg-neutral-900">
            {img ? <img src={img} alt={product.name} className="h-full w-full object-cover" /> :
              <div className="h-full w-full grid place-items-center text-neutral-400">No image</div>}
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <div className="mt-2 text-xl font-semibold">${product.price.toFixed(2)}</div>
          <p className="mt-4 text-neutral-700 dark:text-neutral-300">{product.description}</p>

          {product.artisan && (
            <div className="mt-6 rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
              <div className="flex items-center gap-3">
                {product.artisan.avatarUrl ? (
                  <img src={product.artisan.avatarUrl} alt={product.artisan.name} className="h-12 w-12 rounded-full object-cover" />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-neutral-200 dark:bg-neutral-800" />
                )}
                <div>
                  <div className="font-medium">Crafted by {product.artisan.name}</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    {product.artisan.yearsExperience ? `${product.artisan.yearsExperience}+ years • ` : ''}Artisan
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm text-neutral-700 dark:text-neutral-300">{product.artisan.bio}</p>
            </div>
          )}

          <div className="mt-6 flex items-center gap-4">
            <QuantitySelector value={qty} onChange={setQty} />
            <button
              onClick={() => {/* integrate cart later */}}
              className="rounded-md bg-amber-500 hover:bg-amber-600 px-5 py-3 text-sm font-medium text-neutral-900"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {/* integrate wishlist later */}}
              className="rounded-md border border-neutral-300 dark:border-neutral-700 px-5 py-3 text-sm"
            >
              Add to Wishlist
            </button>
          </div>

          <div className="mt-8">
            <Tabs tabs={tabs} />
          </div>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">You May Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {related.map(r => <ProductCard key={r.id} product={r} />)}
          {related.length === 0 && <div className="col-span-full text-sm text-neutral-500">No related items.</div>}
        </div>
      </section>
    </div>
  );
}
