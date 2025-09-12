"use client";

import { useState } from "react";

export default function ErrorThrower() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    // Throw during render so the route's error boundary catches it
    throw new Error("Intentional client render error 🙈");
  }

  return (
    <div>
      <button
        onClick={() => setShouldThrow(true)}
        style={{ padding: "6px 10px", border: "1px solid #ccc", borderRadius: 6 }}
      >
        Trigger error
      </button>
    </div>
  );
}

