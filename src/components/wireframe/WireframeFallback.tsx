export function WireframeFallback() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full text-line-live" aria-hidden>
      <polygon
        points="100,8 188,64 160,182 40,182 12,64"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <polygon points="100,8 160,182 40,182" fill="none" stroke="currentColor" strokeWidth="1" />
      <polygon points="100,8 12,64 40,182" fill="none" stroke="currentColor" strokeWidth="1" />
      <line x1="12" y1="64" x2="188" y2="64" stroke="currentColor" strokeWidth="1" />
      <line x1="100" y1="8" x2="100" y2="182" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
