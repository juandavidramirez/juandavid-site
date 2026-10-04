import type { NextConfig } from "next";
import { lstatSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

/**
 * Local-only: when node_modules is a symlink to a folder outside the project
 * (kept out of Google Drive sync), Turbopack needs a root that contains both.
 * On Vercel/CI node_modules is a real folder, so this is skipped.
 */
function nodeModulesIsSymlink() {
  try {
    return lstatSync(join(process.cwd(), "node_modules")).isSymbolicLink();
  } catch {
    return false;
  }
}

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 80, 85],
  },
  ...(nodeModulesIsSymlink() ? { turbopack: { root: homedir() } } : {}),
};

export default nextConfig;
