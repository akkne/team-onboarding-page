import { defineTheme } from "@astryxdesign/core/theme";
import { neutralTheme } from "@astryxdesign/theme-neutral";

export const recessedMaxillaTheme = defineTheme({
  name: "recessed-maxilla",
  extends: neutralTheme,
  typography: {
    scale: { base: 16, ratio: 1.25 },
    body: { family: "system-ui", fallbacks: "sans-serif" },
    heading: { family: "system-ui", fallbacks: "sans-serif" },
  },
  tokens: {
    "--color-background-body": ["#f5f6ed", "#142620"],
    "--color-background-card": ["#fbfcf7", "#1b312a"],
    "--color-background-surface": ["#fbfcf7", "#1b312a"],
    "--color-background-muted": ["#eaede0", "#213a32"],
    "--color-text-primary": ["#183f34", "#e3eedf"],
    "--color-text-secondary": ["#3d5e54", "#a8c2b6"],
    "--color-text-accent": ["#183f34", "#a7e3c9"],
    "--color-neutral": ["#e4e8da", "#274138"],
    "--color-accent": ["#183f34", "#e3eedf"],
    "--color-on-accent": ["#f5f6ed", "#142620"],
    "--color-border": ["#183f342e", "#e3eedf2e"],
    "--focus-outline-color": "var(--color-accent)",
  },
});
