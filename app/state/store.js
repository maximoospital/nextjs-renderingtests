"use client";

import { create } from "zustand";

// global store with a few UI options.
// Any component can read/update these via the hook below.
export const useSettingsStore = create((set) => ({
  theme: "light", // "light" | "dark"
  textSize: "medium", // "small" | "medium" | "large"
  showTimestamp: true,
  favoriteColor: "#4f46e5", // indigo-600

  setTheme: (theme) => set({ theme }),
  setTextSize: (textSize) => set({ textSize }),
  setShowTimestamp: (showTimestamp) => set({ showTimestamp }),
  setFavoriteColor: (favoriteColor) => set({ favoriteColor }),
  reset: () =>
    set({ theme: "light", textSize: "medium", showTimestamp: true, favoriteColor: "#4f46e5" }),
}));

