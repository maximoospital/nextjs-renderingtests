export default function LoadingBooks() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ height: 20, width: 160, background: "#f3f3f3", borderRadius: 4 }} />
      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
            <div style={{ height: 16, background: "#f3f3f3", borderRadius: 4, marginBottom: 8 }} />
            <div style={{ height: 12, background: "#f3f3f3", borderRadius: 4, marginBottom: 8 }} />
            <div style={{ height: 12, background: "#f3f3f3", borderRadius: 4, width: "60%" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

