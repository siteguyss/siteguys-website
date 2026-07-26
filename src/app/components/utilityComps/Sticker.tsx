"use client";

import { motion, type PanInfo } from "framer-motion";
import { useRef } from "react";

type StickerProps = {
  label: string;
  color: string;
  rotate: number;
  dragConstraintsRef: React.RefObject<HTMLDivElement | null>;
};

export function Sticker({ label, color, rotate, dragConstraintsRef }: StickerProps) {
  const ref = useRef<HTMLDivElement>(null);

  function nudge(dx: number, dy: number) {
    // Keyboard fallback: Framer Motion drag is pointer-only, so arrow keys
    // move the element directly via a small manual transform.
    const el = ref.current;
    if (!el) return;
    const current = el.style.transform.match(/translate\(([-\d.]+)px, ([-\d.]+)px\)/);
    const x = current ? parseFloat(current[1]) + dx : dx;
    const y = current ? parseFloat(current[2]) + dy : dy;
    el.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
  }

  return (
    <motion.div
      ref={ref}
      role="button"
      tabIndex={0}
      aria-label={`Draggable sticker: ${label}`}
      className="hard-card-small focus-ring absolute cursor-grab select-none touch-none px-4 py-2 w-fit font-mono text-xs font-bold uppercase active:cursor-grabbing"
      style={{ background: color, color: "var(--ink)" }}
      initial={{ rotate }}
      drag
      dragConstraints={dragConstraintsRef}
      dragElastic={0.12}
      whileDrag={{ filter: "brightness(0.96)", scale: 1.03 }}
      onKeyDown={(event) => {
        const step = event.shiftKey ? 20 : 8;
        const moves: Record<string, [number, number]> = {
          ArrowLeft: [-step, 0],
          ArrowRight: [step, 0],
          ArrowUp: [0, -step],
          ArrowDown: [0, step],
        };
        const move = moves[event.key];
        if (!move) return;
        event.preventDefault();
        nudge(...move);
      }}
    >
      <p className="text-center whitespace-nowrap">{label}</p>
    </motion.div>
  );
}
