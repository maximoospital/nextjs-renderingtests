"use client";

import { showToast } from "@/components/toast";
import { useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";

function SubmitButton({ label = "Submit", pendingLabel = "Working…", toastMessage, onComplete }) {
  const { pending } = useFormStatus();
  const prevPending = useRef(pending);

  // Fire onComplete after the server action settles
  useEffect(() => {
    if (prevPending.current && !pending) {
      try { onComplete?.(); } catch {}
    }
    prevPending.current = pending;
  }, [pending, onComplete]);

  return (
    <button
      type="submit"
      disabled={pending}
      onClick={() => {
        if (toastMessage) showToast(toastMessage);
      }}
      style={{
        padding: "6px 10px",
        borderRadius: 6,
        border: "1px solid #ddd",
        background: pending ? "#f3f3f3" : "#fff",
        cursor: pending ? "not-allowed" : "pointer",
      }}
    >
      {pending ? pendingLabel : label}
    </button>
  );
}

export default function ActionForm({ action, label, pendingLabel, toast, onComplete, children }) {
  return (
    <form action={action} style={{ display: "inline-block" }}>
      <SubmitButton label={label} pendingLabel={pendingLabel} toastMessage={toast} onComplete={onComplete} />
      {children}
    </form>
  );
}
