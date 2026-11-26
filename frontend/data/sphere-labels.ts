import { team, type Locale } from "./team";

export function getSphereLabels(lang: Locale): string[] {
  const names = team.skills.flatMap(({ items }) =>
    items.map((item) => typeof item === "string" ? item : item[lang]),
  );
  return [...new Set(names)];
}
