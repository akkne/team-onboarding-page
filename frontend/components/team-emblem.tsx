// Stacked outlines follow the angular jaw in the team's monogram.
export function TeamEmblem() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 300 180"
      className="h-full w-full"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      {Array.from({ length: 11 }, (_, row) => (
        <path
          key={row}
          transform={`translate(0 ${row * 5.4})`}
          d="m22 23 59 29 32-16 37 18 37-18 32 16 59-29-30 52-98 48-98-48Z"
        />
      ))}
    </svg>
  );
}
