"use client";

import { useEffect, useRef, useState } from "react";

export function showToast(message, opts = {}) {
  if (typeof window === "undefined") return;
  const id = Math.random().toString(36).slice(2);
  window.dispatchEvent(
    new CustomEvent("toast", {
      detail: {
        id,
        message,
        duration: typeof opts.duration === "number" ? opts.duration : 2000,
      },
    }),
  );
}

export default function ToastViewport() {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  useEffect(() => {
    function onToast(e) {
      const t = e.detail;
      setToasts((arr) => [...arr, t]);
      const timer = setTimeout(() => {
        setToasts((arr) => arr.filter((x) => x.id !== t.id));
        timers.current.delete(t.id);
      }, t.duration || 2000);
      timers.current.set(t.id, timer);
    }
    window.addEventListener("toast", onToast);
    return () => {
      window.removeEventListener("toast", onToast);
      timers.current.forEach((id) => clearTimeout(id));
      timers.current.clear();
    };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div style={{ position: "fixed", right: 12, bottom: 12, display: "grid", gap: 8, zIndex: 1000 }}>
      {toasts.map((t) => (
        <div key={t.id} style={{ background: "#111", color: "#fff", borderRadius: 8, padding: "8px 12px", boxShadow: "0 6px 20px rgba(0,0,0,0.2)", fontSize: 13 }}>
          {t.message}
        </div>
      ))}
    </div>
  );
}

