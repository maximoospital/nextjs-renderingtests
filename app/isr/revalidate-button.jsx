"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function RevalidateButton() {
  const [status, setStatus] = useState("Idle");
  const [ok, setOk] = useState(null);

  async function trigger() {
    setStatus("Revalidating…");
    setOk(null);
    try {
      const res = await fetch("/api/revalidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: "/isr" }),
      });
      const j = await res.json().catch(() => ({}));
      setOk(res.ok);
      setStatus(res.ok ? "Revalidated. Refresh to see changes." : j?.error || "Failed.");
    } catch (e) {
      setOk(false);
      setStatus("Failed.");
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button onClick={trigger}>Rebuild this page</Button>
      <span className={`text-sm ${ok === false ? "text-red-600" : ok ? "text-green-600" : ""}`}>
        {status}
      </span>
    </div>
  );
}

