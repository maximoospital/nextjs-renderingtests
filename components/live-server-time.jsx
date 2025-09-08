"use client";

import { useEffect, useState } from "react";

export default function LiveServerTime() {
  const [now, setNow] = useState(null);
  useEffect(() => {
    let active = true;
    async function tick() {
      try {
        const res = await fetch("/api/time", { cache: "no-store" });
        const j = await res.json();
        if (active) setNow(j.now);
      } catch {}
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);
  return <span>{now ? new Date(now).toLocaleString() : "…"}</span>;
}

