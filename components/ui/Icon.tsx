import type { SocialNetwork } from "@/content/types";

type IconName = "arrow" | "close" | "menu" | SocialNetwork;

const paths: Record<IconName, React.ReactNode> = {
  arrow: <path d="M3 8h10M8.5 3.5 13 8l-4.5 4.5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  close: <path d="M5 5l14 14M19 5 5 19" strokeWidth="1.8" strokeLinecap="round" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" strokeWidth="1.8" strokeLinecap="round" />,
  linkedin: (
    <path
      fill="currentColor"
      stroke="none"
      d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1v5.45h-4v-4.83c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.91h-4v-11Z"
    />
  ),
  instagram: (
    <g strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" />
    </g>
  ),
  substack: (
    <g strokeWidth="1.6" strokeLinejoin="round">
      <path d="M5 4h14M5 8h14M5 12h14v8.5l-7-3.8-7 3.8V12Z" />
    </g>
  ),
  x: <path d="M4 4l16 16M20 4 4 20" strokeWidth="1.8" strokeLinecap="round" />,
  youtube: (
    <g strokeWidth="1.6" strokeLinejoin="round">
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="m10 9 5 3-5 3V9Z" fill="currentColor" />
    </g>
  ),
};

export function Icon({ name, size = 24, className }: { name: IconName; size?: number; className?: string }) {
  const viewBox = name === "arrow" ? "0 0 16 16" : "0 0 24 24";
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
