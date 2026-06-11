import type { MetadataRoute } from "next";
import { projects, designProjects } from "@/data/projects";
import { essays } from "@/data/essays";

const BASE = "https://jonathanbrink.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/work",
    "/design",
    "/tools",
    "/tools/claude-code-workshop",
    "/workshops",
    "/writing",
    "/about",
    "/contact",
  ].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const workRoutes = projects.map((p) => ({
    url: `${BASE}/work/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: p.featured ? 0.9 : 0.6,
  }));

  const designRoutes = designProjects.map((p) => ({
    url: `${BASE}/design/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const essayRoutes = essays.map((e) => ({
    url: `${BASE}/writing/${e.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...workRoutes, ...designRoutes, ...essayRoutes];
}
