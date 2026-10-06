"use client";

import { useEffect } from "react";
import { isFriday } from "@/lib/friday";

// Sets <html data-friday> so CSS can switch palettes. `?friday=1` / `?friday=0` forces it for previews.
export function FridayMode() {
  useEffect(() => {
    const forced = new URLSearchParams(window.location.search).get("friday");
    const on = forced === null ? isFriday() : forced === "1";
    document.documentElement.toggleAttribute("data-friday", on);
  }, []);
  return null;
}
