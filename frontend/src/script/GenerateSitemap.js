// src/script/GenerateSitemap.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { create } from 'xmlbuilder2';

// Replikasi __dirname untuk ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Atur URL dan route situs Anda
const baseUrl = "https://ai-dinar-makeup-official-website.vercel.app";
const routes = [
  '/', 
  '/about', 
  '/gallery', 
  '/pricing',
  '/contact', 
  '/login', 
  '/register', 
  '/forgot-password',
];

// Bangun XML sitemap
const urlset = create({ version: '1.0' })
  .ele('urlset', { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' });

routes.forEach(route => {
  const url = urlset.ele('url');
  url.ele('loc').txt(baseUrl + route);
  url.ele('lastmod').txt(new Date().toISOString());
});

const xml = urlset.end({ prettyPrint: true });

// Output path, relatif terhadap proyek
const outputPath = path.resolve(__dirname, '../../public/sitemap.xml');

// Pastikan direktori target ada sebelum menulis
fs.mkdirSync(path.dirname(outputPath), { recursive: true });

// Tulis file sitemap.xml
fs.writeFileSync(outputPath, xml, 'utf8');

console.log('✅ Sitemap generated successfully!');
