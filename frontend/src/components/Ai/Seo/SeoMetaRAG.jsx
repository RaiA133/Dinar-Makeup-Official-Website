// src/components/Seo/SeoMeta.jsx
import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';
import { seo } from "../../../modules/fetch/chatbot";

const SeoMetaRAG = ({ slug = 'home' }) => {
  const [meta, setMeta] = useState({ title: 'Dinar Makeup', description: 'Layanan Makeup dan Wedding Organizer Profesional.' });

  useEffect(() => {
    async function fetchSEO() {
      try {
        const res = await seo(slug);
        const json = res.data;
        if (json?.data?.title && json?.data?.description) {
          setMeta(json.data);
        }
      } catch (err) {
        console.error('Gagal ambil SEO:', err);
      }
    }
    fetchSEO();
  }, [slug]);

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
    </Helmet>
  );
};

export default SeoMetaRAG;
