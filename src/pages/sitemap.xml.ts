import type { APIRoute } from "astro";

// Static sitemap: the home page and the project form.
export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL("https://maeldev.netlify.app");
  const paths = ["/", "/start-a-project"];
  const urls = paths.map((p) => `  <url><loc>${new URL(p, base).href}</loc></url>`).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
