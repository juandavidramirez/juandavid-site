import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Add new routes here as pages are created (e.g. "/about", "/work", "/blog").
const routes = ["/", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: new URL(path, site.url).toString(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.6,
  }));
}
