"use client";

export default function Error({ error, reset }) {
  return (
    <div style={{ border: "1px solid #f0c2c2", background: "#fff6f6", color: "#981b1b", borderRadius: 12, padding: 16 }}>
      <div style={{ fontWeight: 600, marginBottom: 8 }}>Something went wrong</div>
      <div style={{ fontSize: 14, marginBottom: 12 }}>
        {error?.message || "Unknown error"}
      </div>
      <button
        onClick={() => reset()}
        style={{ padding: "6px 10px", border: "1px solid #e0a2a2", background: "#fff", color: "#981b1b", borderRadius: 6 }}
      >
        Try again
      </button>
    </div>
  );
}

