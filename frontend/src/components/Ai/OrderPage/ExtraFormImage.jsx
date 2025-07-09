import { useContext, useState } from 'react';
import { PaperAirplaneIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { ProductsContext } from '../../../contexts/ProductsContext';
import { GoogleGenAI } from "@google/genai";
import MarkdownRenderer from '../Chabot/MarkdownRenderer'; // opsional untuk preview prompt

function ExtraFormImage({ onImagePromptReady }) {
  const { productsByIDState } = useContext(ProductsContext);
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resultPrompt, setResultPrompt] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const templatePrompts = [
    "Wedding tema klasik elegan",
    "Dekorasi pernikahan outdoor di taman",
    "Desain kartu undangan bernuansa emas",
  ];

  const handleGeneratePrompt = async () => {
    setIsLoading(true);
    setResultPrompt('');
    try {
      const stream = await ai.generateContentStream({
        model: "gemini-1.5-flash",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Buatkan deskripsi gambar pendek dan jelas untuk wedding organizer dengan konsep: "${inputValue}". Fokus pada elemen visual yang menonjol dan unik.`
              }
            ]
          }
        ]
      });

      let fullText = "";
      for await (const chunk of stream) {
        fullText += chunk.text || "";
        setResultPrompt(fullText); // live streaming
      }

      if (onImagePromptReady) {
        onImagePromptReady(fullText); // kirim ke parent jika perlu
      }

    } catch (error) {
      console.error("Gagal generate prompt:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <button type="button" className="btn m-1" onClick={() => setDropdownOpen(!dropdownOpen)}>
        <div className="animate-bounce">
          <SparklesIcon className="h-5 w-5 text-primary animate-pulse" />
        </div>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 bottom-full mb-2 z-20 w-96 shadow-xl rounded-xl bg-base-100">

          {/* Header */}
          <section className="bg-error p-3 rounded-t-xl">
            <h1 className="text-base-100 font-bold">Generate Prompt Gambar</h1>
          </section>

          <section className="p-3 min-h-[200px] relative">
            {isLoading && (
              <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex justify-center items-center rounded-xl z-10">
                <span className="loading loading-spinner loading-lg text-error"></span>
              </div>
            )}

            {/* Template Buttons */}
            <div className="grid gap-2 mb-4">
              {templatePrompts.map((template, i) => (
                <button
                  key={i}
                  className="btn btn-sm"
                  onClick={() => {
                    setInputValue(template);
                    handleGeneratePrompt();
                  }}
                  disabled={isLoading}
                >
                  {template}
                </button>
              ))}
            </div>

            {/* Input manual */}
            <div className="join w-full">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Masukkan tema atau konsep..."
                className="input input-bordered join-item w-full"
                disabled={isLoading}
              />
              <button
                className="btn btn-error join-item"
                onClick={handleGeneratePrompt}
                disabled={!inputValue || isLoading}
              >
                <PaperAirplaneIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Result */}
            {resultPrompt && (
              <div className="mt-4 border border-base-300 rounded-xl p-4 max-h-60 overflow-y-auto">
                <MarkdownRenderer>{resultPrompt}</MarkdownRenderer>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

export default ExtraFormImage;
