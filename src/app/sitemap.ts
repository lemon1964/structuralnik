// src/app/sitemap.ts
import type { MetadataRoute } from "next";

// Демо-проекты которые всегда доступны
const demoProjects = [
  { id: '5678', name: 'Организация цветочного магазина' },
  { id: '4723', name: 'Выучить английский' }
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://structuralnik.onrender.com";
  const now = new Date();
  
  return [
    // Главная страница
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 1,
    },
    // Страницы демо-проектов
    ...demoProjects.map(project => ({
      url: `${base}/projects/${project.id}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    // API endpoints (опционально)
    {
      url: `${base}/api/health`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.1,
    },
    {
      url: `${base}/api/og`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.1,
    }
  ];
}