function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function LeftRail({ hasArchive }: { hasArchive: boolean }) {
  const sections = [
    { href: "#hero", label: `${pad(1)} SUBJECT` },
    { href: "#timeline", label: `${pad(2)} HISTORY` },
    { href: "#nodes", label: `${pad(3)} ENTITIES` },
    { href: "#capabilities", label: `${pad(4)} CAPABILITIES` },
    ...(hasArchive ? [{ href: "#archive", label: `${pad(5)} ARCHIVE` }] : []),
    { href: "#dossier", label: `${pad(hasArchive ? 6 : 5)} FILE` },
    { href: "#contact", label: `${pad(hasArchive ? 7 : 6)} CONTACT` },
  ];

  return (
    <nav
      aria-label="Section navigation"
      className="fixed bottom-0 left-0 top-10 z-40 hidden w-10 flex-col items-center justify-between border-r border-line py-6 sm:flex"
    >
      <span className="rail-label font-data text-[10px] tracking-[0.3em] text-ink-dim">
        SUBJECT OF INTEREST
      </span>
      <ul className="flex flex-col items-center gap-6">
        {sections.map((s) => (
          <li key={s.href} className="rail-label">
            <a
              href={s.href}
              className="font-data text-[10px] tracking-[0.2em] text-ink-dim transition-colors hover:text-ink-bright focus-visible:text-ink-bright"
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
