// src/app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
//   const base = process.env.NEXT_PUBLIC_SITE_URL || "https://structuralnik.onrender.com";
  return {
    rules: [
      { 
        userAgent: "*", 
        disallow: '/' 
        // allow: "/",
        // disallow: ["/api/", "/_next/"]
      },
    ],
    // sitemap: `${base}/sitemap.xml`,
    // host: base,
  };
}