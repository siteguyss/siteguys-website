"use client";

import { motion } from "framer-motion";
import type { MouseEventHandler, ReactNode } from "react";

type PressableButtonProps = {
  href?: string;
  children: ReactNode;
  background: string;
  textColor?: string;
  onClick?: MouseEventHandler;
};

export function Button({ href, children, background, onClick, textColor = "var(--ink)" }: PressableButtonProps) {
  return (
    <motion.a href={href} onClick={onClick} className="focus-ring inline-flex min-h-8 max-h-12 items-center justify-center cursor-pointer gap-3 rounded-none border-2 px-6 py-3 font-bold font-mono!" style={{ background, color: textColor, borderColor: "var(--line)" }} whileHover={{ x: -2, y: -2, boxShadow: "7px 7px 0 var(--line)" }} whileTap={{ x: 3, y: 3, boxShadow: "1px 1px 0 var(--line)" }} initial={{ boxShadow: "5px 5px 0 var(--line)" }} transition={{ duration: 0.16, ease: "easeOut" }}>
      {children}
    </motion.a>
  );
}
