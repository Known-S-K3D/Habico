import { useState } from 'react';

type Tab = { key: string; label: string; content: React.ReactNode; };
export default function Tabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0]?.key);
  return (
    <div>
      <div className="flex gap-4 border-b border-neutral-200 dark:border-neutral-800">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`py-2 px-1 -mb-px border-b-2 ${active === t.key ? 'border-amber-500' : 'border-transparent text-neutral-500'}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="pt-4">
        {tabs.find(t => t.key === active)?.content}
      </div>
    </div>
  );
}
