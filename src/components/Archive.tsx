import { articles } from "@/content";

export function Archive({ num }: { num: number }) {
  if (articles.length === 0) return null;

  return (
    <section id="archive" className="border-b border-line py-16">
      <p className="font-data text-xs tracking-[0.2em] text-ink-dim">{String(num).padStart(2, "0")}</p>
      <h2 className="mt-1 font-display text-2xl text-ink-bright sm:text-3xl">ARTICLES</h2>

      <ul className="mt-8 max-w-2xl divide-y divide-line">
        {articles.map((article) => (
          <li key={article.url} className="py-4 first:pt-0">
            <a
              href={article.url}
              target="_blank"
              rel="noreferrer"
              className="font-data text-sm text-ink-bright hover:underline"
            >
              {article.title}
            </a>
            <p className="mt-0.5 font-data text-xs text-ink-dim">
              {[article.publication, article.date].filter(Boolean).join(" · ")}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
