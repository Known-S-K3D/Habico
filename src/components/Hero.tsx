import { useState } from 'react';

interface HeroProps {
  onShopClick: () => void;
  onSearch: (term: string) => void;
}

export default function Hero({ onShopClick, onSearch }: HeroProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
  };

  return (
    <section className="relative bg-gradient-to-r from-amber-50 via-white to-amber-100 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900">
      <div className="flex flex-col items-center px-4 py-20 mx-auto space-y-6 text-center max-w-7xl">
        
        {/* Headline */}
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-neutral-900 dark:text-white">
          Discover Products You’ll Love
        </h1>

        {/* Subtext */}
        <p className="max-w-2xl text-lg text-neutral-600 dark:text-neutral-300">
          From everyday essentials to unique finds — shop our curated collection and enjoy exclusive deals.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-md overflow-hidden bg-white border rounded-lg shadow-md dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700"
        >
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-3 text-sm bg-transparent outline-none text-neutral-800 dark:text-neutral-100"
          />
          <button
            type="submit"
            className="px-5 font-medium text-white transition-colors bg-amber-600 hover:bg-amber-700"
          >
            Search
          </button>
        </form>

        {/* Shop Now Button */}
        <button
          onClick={onShopClick}
          className="px-8 py-3 mt-4 font-semibold text-white transition rounded-lg bg-neutral-900 dark:bg-white dark:text-neutral-900 hover:opacity-90"
        >
          Shop Nowasdasdasd
        </button>
      </div>

      {/* Decorative Background Element */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-10"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 800 800"
        >
          <circle cx="400" cy="400" r="400" fill="url(#grad)" />
          <defs>
            <radialGradient id="grad">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}
