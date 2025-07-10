// src/components/Seo/SeoMeta.jsx
import { useEffect, useRef, useState } from 'react';
import { GoogleGenAI } from '@google/genai';

const SeoMeta = ({ slug = '' }) => {
  const [meta, setMeta] = useState({
    title: 'Dinar Makeup',
    description: 'Layanan Makeup dan Wedding Organizer Profesional.',
  });

  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    let slugName = slug;
    if (slug == '/') slugName = '/home'; 
    async function fetchSEO() {
      try {
        const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

//         const prompt = `beri saya output JSON saja berupa meta title dan description untuk kebutuhan SEO untuk halaman dengan slug: "${slugName}". 
// // di halaman https://ai-dinar-makeup-official-website.vercel.app${slug}
// di website https://ai-dinar-makeup-official-website.vercel.app/
// Tampilkan dalam format JSON seperti ini:
// {
//   "title": "Judul SEO",
//   "description": "Deskripsi SEO"
// }`;
            
            const prompt = `beri saya output JSON saja berupa meta title dan description untuk halaman dengan slug: "${slug}". 
di halaman https://ai-dinar-makeup-official-website.vercel.app${slug}
pada website https://ai-dinar-makeup-official-website.vercel.app/
Tampilkan dalam format JSON seperti ini:
{
  "title": "Judul SEO",
  "description": "Deskripsi SEO"
}
NOTE : jika anda tidak dapat mengetahui konten halaman tersebut, singkatnya adalah website tersebut adalah website jasa
Wedding Organizer & Professional Makeup Artist yang berlokasi di kota bandung dengan sistem pesanan online. namun jika 
anda bisa crawl website, tolong cari info data knowladge dari sana untuk membuat JSON Meta Data  
// `;
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: [prompt],
          config: {
            tools: [{urlContext: {}}, {googleSearch: {}}],
          },
        });
        // console.log(response.text);
        const cleaned = response.text.replace(/```json|```/g, '').trim();
        const json = JSON.parse(cleaned);
        if (json?.title && json?.description) {
          setMeta(json);
        }
      } catch (error) {
        console.error('Gagal generate SEO dari Gemini:', error);
      }
    }

    fetchSEO();
  }, [slug]);
  
  // console.log('slug', slug);
  // console.log('meta', meta);

  return (
    <div>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
    </div>
  );
};

export default SeoMeta;
