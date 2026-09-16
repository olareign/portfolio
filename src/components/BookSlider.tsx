"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { books, type Book } from "@/content";

function BookCard({ book }: { book: Book }) {
  const content = (
    <>
      <div className="relative aspect-square w-full overflow-hidden border border-line">
        <Image
          src={book.cover}
          alt={`${book.title} cover`}
          fill
          sizes="180px"
          className="object-cover transition-transform duration-200 group-hover:scale-105"
        />
      </div>
      <p className="mt-3 font-display text-sm leading-snug text-ink-bright">{book.title}</p>
      <p className="mt-1 font-prose text-xs leading-snug text-ink-dim">{book.subtitle}</p>
      {book.salesUrl && (
        <p className="mt-2 font-data text-[10px] tracking-[0.15em] text-ink-dim transition-colors group-hover:text-ink-bright">
          VIEW ON SELAR →
        </p>
      )}
    </>
  );

  const className = "group block w-[160px] shrink-0 snap-start sm:w-[180px]";

  if (book.salesUrl) {
    return (
      <a href={book.salesUrl} target="_blank" rel="noreferrer" className={className}>
        {content}
      </a>
    );
  }
  return <div className={className}>{content}</div>;
}

export function BookSlider() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div>
        <p className="font-data text-xs tracking-[0.15em] text-ink-dim">PUBLISHED WORK</p>
        <div className="mt-4 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2">
          {books.map((book) => (
            <BookCard key={book.title} book={book} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="font-data text-xs tracking-[0.15em] text-ink-dim">PUBLISHED WORK</p>
      <div className="mt-4 overflow-hidden book-slider-viewport">
        <div className="book-slider-track flex w-max gap-5">
          {[...books, ...books].map((book, i) => (
            <BookCard key={`${book.title}-${i}`} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}
