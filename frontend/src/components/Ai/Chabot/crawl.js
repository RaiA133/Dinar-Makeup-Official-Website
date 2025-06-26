// src/components/crawl.js

export function crawlDOM() {
  const elements = document.body.querySelectorAll('*');
  const data = [];

  elements.forEach((el) => {
    // Ambil data penting dari elemen (tag, teks, class, id, dsb)
    const tag = el.tagName.toLowerCase();
    const text = el.textContent.trim();
    const id = el.id || null;
    const className = el.className || null;

    if (text) {
      data.push({ tag, text, id, className });
    }
  });

  return data;
}
