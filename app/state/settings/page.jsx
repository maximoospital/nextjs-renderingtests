"use client";

import Link from "next/link";
import { useSettingsStore } from "../store";

export default function StateSettingsPage() {
  const {
    theme,
    textSize,
    showTimestamp,
    favoriteColor,
    setTheme,
    setTextSize,
    setShowTimestamp,
    setFavoriteColor,
    reset,
  } = useSettingsStore();

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <header>
        <h1 style={{ margin: 0 }}>Settings</h1>
        <p style={{ marginTop: 4 }}>
          These controls update a global store. Open <Link href="/state">Home</Link> in another tab to see changes immediately.
        </p>
      </header>

      <div style={{ display: "grid", gap: 12, maxWidth: 520 }}>
        <label style={{ display: "grid", gap: 6 }}>
          <span>Theme</span>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            style={{ padding: 8, borderRadius: 6, border: "1px solid #e5e5e5" }}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>Text size</span>
          <select
            value={textSize}
            onChange={(e) => setTextSize(e.target.value)}
            style={{ padding: 8, borderRadius: 6, border: "1px solid #e5e5e5" }}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            checked={showTimestamp}
            onChange={(e) => setShowTimestamp(e.target.checked)}
          />
          <span>Show timestamp on Home</span>
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>Favorite color</span>
          <input
            type="color"
            value={favoriteColor}
            onChange={(e) => setFavoriteColor(e.target.value)}
            style={{ width: 56, height: 32, padding: 0, border: "1px solid #e5e5e5", borderRadius: 6 }}
            aria-label="Pick favorite color"
          />
          <span style={{ fontSize: 12, opacity: 0.7 }}>Value: {favoriteColor}</span>
        </label>

        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
          <button onClick={reset} style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid #e5e5e5", background: "#fff", cursor: "pointer" }}>
            Reset to defaults
          </button>
          <Link href="/state" style={{ alignSelf: "center", padding: "6px 10px", borderRadius: 6, border: "1px solid #e5e5e5", textDecoration: "none", color: "inherit" }}>
            View Home →
          </Link>
        </div>
      </div>
    </div>
  );
}

