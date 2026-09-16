const CORNER_POSITIONS = [
  "top-0 left-0 border-t border-l",
  "top-0 right-0 border-t border-r",
  "bottom-0 left-0 border-b border-l",
  "bottom-0 right-0 border-b border-r",
] as const;

interface ScanBracketProps {
  className?: string;
  /** "dim" for a quiet resting frame, "bright" for the locked/hover state. */
  tone?: "dim" | "bright";
  /** Adds the hover/focus-driven reveal used on interactive nodes. */
  interactive?: boolean;
}

export function ScanBracket({ className = "", tone = "dim", interactive = false }: ScanBracketProps) {
  const toneClass = tone === "bright" ? "border-ink-bright" : "border-line-live";
  const interactiveClass = interactive
    ? "opacity-0 scale-90 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:scale-100 group-focus-within:opacity-100 group-focus-within:scale-100"
    : "";

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      {CORNER_POSITIONS.map((pos) => (
        <span key={pos} className={`absolute h-3 w-3 ${pos} ${toneClass} ${interactiveClass}`} />
      ))}
    </div>
  );
}
