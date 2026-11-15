import Image from "next/image";
import { books, type Book } from "@/content";

function BookCard({ book }: { book: Book }) {
  const body = (
    <>
      <div className="book-tilt relative aspect-square w-full overflow-hidden border border-line bg-surface">
        <Image
          src={book.cover}
          alt={`${book.title} cover`}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
          className="object-cover"
        />
      </div>
      <p className="mt-4 font-display text-lg leading-snug text-ink-bright">{book.title}</p>
      <p className="mt-1 font-prose text-sm leading-snug text-ink">{book.subtitle}</p>
      <p className="mt-2 font-data text-[11px] leading-relaxed text-ink-dim">{book.meta}</p>
      {book.salesUrl && (
        <span className="mt-4 inline-block border border-accent-amber px-4 py-2 font-data text-[11px] font-bold tracking-wide text-accent-amber transition-colors group-hover:bg-accent-amber group-hover:text-void">
          GET IT ON SELAR ↗
        </span>
      )}
    </>
  );

  if (book.salesUrl) {
    return (
      <a href={book.salesUrl} target="_blank" rel="noreferrer" className="group block">
        {body}
      </a>
    );
  }
  return <div className="group">{body}</div>;
}

export function BookShelf() {
  if (books.length === 0) return null;

  return (
    <div className="mt-16 border-t border-line pt-10">
      <p className="font-data text-xs tracking-[0.15em] text-accent-blue">PUBLISHED WORK</p>
      <p className="mt-2 max-w-xl font-prose text-sm text-ink-dim">
        {books.length} books written for developers moving from junior to senior, one project at a time.
      </p>
      <div className="book-shelf mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <BookCard key={book.title} book={book} />
        ))}
      </div>
    </div>
  );
}
