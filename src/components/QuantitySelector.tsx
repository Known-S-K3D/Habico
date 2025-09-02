type Props = { value: number; onChange: (n: number) => void; min?: number; max?: number; };
export default function QuantitySelector({ value, onChange, min = 1, max = 99 }: Props) {
  return (
    <div className="inline-flex items-center gap-2">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="h-9 w-9 rounded border border-neutral-300 dark:border-neutral-700"
      >−</button>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-9 w-16 text-center rounded border border-neutral-300 dark:border-neutral-700 bg-transparent"
        title="Quantity Selector"
        placeholder="Enter quantity"
      />
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        className="h-9 w-9 rounded border border-neutral-300 dark:border-neutral-700"
      >+</button>
    </div>
  );
}
