/** Clearly-labelled placeholder for photographs that haven't been supplied yet. */
export function PhotoPlaceholder({
  label = "Photograph awaiting",
  sub,
  className = "",
  tone = "beige",
}: {
  label?: string;
  sub?: string;
  className?: string;
  tone?: "beige" | "sage";
}) {
  return (
    <div
      className={`placeholder-texture relative flex h-full w-full items-center justify-center ${
        tone === "sage" ? "!bg-sage/40" : ""
      } ${className}`}
    >
      <div className="mx-6 border border-gold/60 bg-ivory/85 px-5 py-4 text-center backdrop-blur-sm">
        <svg viewBox="0 0 32 32" className="mx-auto mb-2 h-6 w-6 text-gold-dark" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.1">
          <rect x="4" y="9" width="24" height="17" rx="1" />
          <circle cx="16" cy="17.5" r="4.5" />
          <path d="M11 9l2-3h6l2 3" />
        </svg>
        <p className="eyebrow !tracking-[0.18em]">{label}</p>
        {sub && <p className="mt-1 text-xs text-stone">{sub}</p>}
      </div>
    </div>
  );
}
