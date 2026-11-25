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
    "--color-background-body": ["#2352d6", "#102568"],
    "--color-background-card": ["#ffffff", "#172950"],
    "--color-background-surface": ["#f1f6ff", "#101e3b"],
    "--color-background-muted": ["#e3edff", "#253e68"],
    "--color-text-primary": ["#142952", "#eef4ff"],
    "--color-text-secondary": ["#405677", "#b8cbea"],
    "--color-text-accent": ["#263cc7", "#91c6ff"],
    "--color-neutral": ["#dce8ff", "#274777"],
    "--color-accent": ["#3045da", "#9fb9ff"],
    "--color-on-accent": ["#ffffff", "#101e3b"],
    "--color-border": ["#1429522e", "#eef4ff2e"],
    "--focus-outline-color": "var(--color-accent)",
  },
});
