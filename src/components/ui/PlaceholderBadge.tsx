export function PlaceholderBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-cyan/20 bg-cyan/5 px-2 py-0.5 font-mono text-[10px] tracking-[0.18em] text-cyan/80 uppercase ${className}`}
    >
      Placeholder
    </span>
  );
}
