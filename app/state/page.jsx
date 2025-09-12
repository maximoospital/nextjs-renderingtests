"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSettingsStore } from "./store";

export default function StateHomePage() {
  const { theme, textSize, showTimestamp, favoriteColor } = useSettingsStore();

  const fontSize = useMemo(() => {
    switch (textSize) {
      case "small":
        return 14;
      case "large":
        return 20;
      default:
        return 16;
    }
  }, [textSize]);

  const pageBg = theme === "dark" ? "#0b0f19" : "#ffffff";
  const pageFg = theme === "dark" ? "#e5e7eb" : "#111827";

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <header>
        <h1 style={{ margin: 0 }}>State Demo (Zustand)</h1>
        <p style={{ marginTop: 4 }}>
          This page reads shared options from a tiny global store.
          Change them on <Link href="/state/settings">Settings</Link>.
        </p>
      </header>

      <section
        style={{
          border: "1px solid #e5e5e5",
          borderRadius: 8,
          padding: 16,
          background: pageBg,
          color: pageFg,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <strong>Preview</strong>
          <span style={{ fontSize: 12, opacity: 0.7 }}>theme: {theme}</span>
        </div>
        <div
          style={{
            marginTop: 8,
            padding: 16,
            borderRadius: 8,
            border: "1px dashed #d1d5db",
            fontSize,
          }}
        >
          <p style={{ margin: 0 }}>
            Your favorite color is:
            <span
              title={favoriteColor}
              style={{
                display: "inline-block",
                verticalAlign: "middle",
                width: 16,
                height: 16,
                background: favoriteColor,
                borderRadius: 4,
                marginLeft: 8,
                boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.1)",
              }}
            />
          </p>

          {showTimestamp && (
            <p style={{ marginTop: 8, opacity: 0.8 }}>
              Timestamp: {new Date().toLocaleString()}
            </p>
          )}
        </div>
      </section>

      <Link href="/state/settings" style={{ alignSelf: "start", padding: "6px 10px", borderRadius: 6, border: "1px solid #e5e5e5", textDecoration: "none", color: "inherit" }}>
        Go to Settings →
      </Link>
    </div>
  );
}

