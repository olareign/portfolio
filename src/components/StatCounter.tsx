"use client";

import { useEffect, useRef } from "react";
import { animate, m, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import type { Stat } from "@/content";

function parseValue(value: string): { target: number; suffix: string } {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return { target: 0, suffix: value };
  return { target: Number(match[1]), suffix: match[2] };
}

export function StatCounter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduceMotion = useReducedMotion();
  const { target, suffix } = parseValue(stat.value);

  const count = useMotionValue(reduceMotion ? target : 0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(count, target, { duration: 1.1, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, reduceMotion, target, count]);

  return (
    <div ref={ref} className="border-t border-line pt-3">
      <p className="font-display text-3xl text-ink-bright sm:text-4xl">
        <m.span>{rounded}</m.span>
        {suffix}
      </p>
      <p className="mt-1 font-data text-xs text-ink-dim">{stat.label}</p>
    </div>
  );
}
