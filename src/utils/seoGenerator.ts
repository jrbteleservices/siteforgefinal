// src/utils/seoGenerator.ts

export function generateRobotsTxt(domain: string): string {
  return `User-agent: *\nAllow: /\nSitemap: https://${domain}/sitemap.xml`;
}

export function generateSitemapXml(domain: string, pages: string[]): string {
  const urls = pages.map(p => `  <url>\n    <loc>https://${domain}/${p.toLowerCase()}</loc>\n    <changefreq>weekly</changefreq>\n  </url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
}