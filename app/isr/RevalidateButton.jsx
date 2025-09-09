"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RevalidateButton({ path = "/isr" }) {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  async function handleClick(e) {
    e.preventDefault();
    setPending(true);
    try {
      const res = await fetch("/api/revalidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path }),
      });
      if (!res.ok) {
        // Swallow the error but log for debugging; still refresh below
        // so the user sees the latest content if any change occurred.
        console.error("Revalidate failed", await res.text());
      }
    } catch (err) {
      console.error("Revalidate error", err);
    } finally {
      setPending(false);
      // Trigger a re-fetch of the current route so the new ISR
      // content is visible without navigating to the API route.
      router.refresh();
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={pending}
      style={{
        display: "inline-block",
        padding: "6px 10px",
        border: "1px solid #ccc",
        borderRadius: 6,
        background: pending ? "#f3f3f3" : "#fff",
        cursor: pending ? "default" : "pointer",
      }}
    >
      {pending ? "Rebuilding…" : "Rebuild this page"}
    </button>
  );
}

