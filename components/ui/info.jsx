"use client";

import { useEffect, useRef, useState } from "react";

export function Info({ title = "More info", children, side = "top" }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const popRef = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (!open) return;
      const t = e.target;
      if (btnRef.current?.contains(t) || popRef.current?.contains(t)) return;
      setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const positions = {
    top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
    bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
    right: "left-full ml-2 top-1/2 -translate-y-1/2",
    left: "right-full mr-2 top-1/2 -translate-y-1/2",
  };

  return (
    <span className="relative inline-flex items-center">
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={title}
        onClick={() => setOpen((v) => !v)}
        className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-black/20 dark:border-white/30 text-[10px] leading-none text-black/70 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/10"
      >
        i
      </button>
      {open && (
        <div
          ref={popRef}
          role="dialog"
          className={`absolute z-50 min-w-64 max-w-xs rounded-md border border-black/10 dark:border-white/15 bg-white text-black shadow-lg dark:bg-neutral-900 dark:text-white p-3 text-xs ${positions[side]}`}
        >
          {children}
        </div>
      )}
    </span>
  );
}

export default Info;

