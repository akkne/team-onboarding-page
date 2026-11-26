import { team } from "./team";

export function getSphereLabels(): string[] {
  return [...new Set(team.skills.flatMap(({ items }) => items))];
}
