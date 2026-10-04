import {
  BrainCircuit,
  Brain,
  Network,
  Cpu,
  CircuitBoard,
  Lightbulb,
  Target,
  Rocket,
  Sparkles,
  Users,
  GraduationCap,
  UserRoundCheck,
  HeartHandshake,
  Globe,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import type { ImpactArea } from "@/content/types";

/**
 * Icons available to content files by name. Only these are bundled (tree-shaken),
 * so add an import + entry here to make a new Lucide icon usable from content.
 * Names: https://lucide.dev/icons
 */
const registry: Record<string, LucideIcon> = {
  "brain-circuit": BrainCircuit,
  brain: Brain,
  network: Network,
  cpu: Cpu,
  "circuit-board": CircuitBoard,
  lightbulb: Lightbulb,
  target: Target,
  rocket: Rocket,
  sparkles: Sparkles,
  users: Users,
  "graduation-cap": GraduationCap,
  "user-round-check": UserRoundCheck,
  "heart-handshake": HeartHandshake,
  globe: Globe,
};

type Props = Pick<ImpactArea, "icon" | "iconType"> & { size?: number };

export function AreaIcon({ icon, iconType = "lucide", size = 24 }: Props) {
  if (iconType === "image") {
    return <Image src={icon} alt="" width={size} height={size} aria-hidden="true" />;
  }
  const Cmp = registry[icon];
  if (!Cmp) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[AreaIcon] Unknown icon "${icon}". Add it to components/ui/AreaIcon.tsx.`);
    }
    return null;
  }
  return <Cmp size={size} strokeWidth={1.6} aria-hidden="true" />;
}
