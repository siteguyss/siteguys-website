"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Sticker } from "./utilityComps/Sticker";
import { SectionEyebrow } from "./utilityComps/SectionEyebrow";
import { stickers } from "../lib/content";

export function StickerPlayground() {
  const zoneRef = useRef<HTMLDivElement>(null);
  const [resetKey, setResetKey] = useState(0);

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8 grid-surface">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <span>
            <SectionEyebrow>02 / Interactive systems</SectionEyebrow>
            <h2 className="mt-4 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">Good websites have a little physics.</h2>
          </span>
          <motion.button type="button" onClick={() => setResetKey((k) => k + 1)} className="hard-card-small focus-ring px-3 py-2 font-mono text-xs font-bold uppercase" style={{ background: "var(--panel)" }} whileTap={{ scale: 0.94 }}>
            Reset
          </motion.button>
        </div>

        <div ref={zoneRef} className="hard-card bg-(--paper) relative mt-6 h-72 z-0 w-full overflow-hidden sm:h-80">
          {stickers.map((sticker) => (
            <div key={`${sticker.id}-${resetKey}`} style={{ position: "absolute", left: sticker.x, top: sticker.y }}>
              <Sticker label={sticker.label} color={sticker.color} rotate={sticker.rotate} dragConstraintsRef={zoneRef} />
            </div>
          ))}
          <div className=" z-10 absolute w-fit bottom-3 right-4 p-2">
            <p className="text-sm opacity-50">Interactive component playground</p>
          </div>
        </div>
      </div>
    </section>
  );
}
