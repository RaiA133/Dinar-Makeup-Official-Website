import { useContext, useState } from 'react';
import { PaperAirplaneIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { ProductsContext } from '../../../contexts/ProductsContext';
import { GoogleGenAI } from "@google/genai";
import MarkdownRenderer from '../Chabot/MarkdownRenderer';

function ExtraFormText({ formData, handleValidationData, resultAIText, setResultAIText }) {
  const { productsByIDState } = useContext(ProductsContext);
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || "YOUR_API_KEY" });

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dropDownOpen, setDropdownOpen] = useState(false);

  const formDataText = formData ? `\nData Pelanggan: ${JSON.stringify(formData, null, 2)}` : "";
  const productDataText = productsByIDState ? `\nData Paket: ${JSON.stringify(productsByIDState, null, 2)}` : "";

  const contents = `Beri saya isi notes tambahan di form pengisian data ketika order wedding organizer Dinar Makeup, dengan kebutuhan "${inputValue}". 
  ${formDataText}
  ${productDataText}
  Notes merupakan deskripsi text yang singkat, jelas, dan langsung ke poin — tidak perlu terlalu panjang.`;

  // ====================================================================================================================================

  const handleGenerateAIWithPrompt = async (e) => {
    setIsLoading(true);
    setResultAIText("");
    try {
      const stream = await ai.models.generateContentStream({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [{
              text: contents
            }]
          }
        ]
      });

      let finalText = "";
      setIsLoading(false);

      for await (const chunk of stream) {
        if (chunk.text) {
          finalText += chunk.text;
          setResultAIText(prev => prev + chunk.text); // update per chunk
        }
      }
    } catch (error) {
      console.error("AI error:", error);
    }
  };

  // ====================================================================================================================================

  const templateNotes = [
    "Tambahan Dokumentasi",
    "Kursi VIP Keluarga",
    "Transportasi Keluarga",
    "Efisiensi Biaya",
  ]

  return (
    <div className="absolute right-0 top-0">
      {/* Dropdown Content */}
      {dropDownOpen && (
        <div className="absolute right-0 bottom-full mb-2 z-20 w-83 sm:w-96 p-0 shadow-sm rounded-xl bg-base-100">

          {/* HEADER */}
          <section className="bg-error p-3 rounded-t-xl">
            <h1 className="text-base-100 font-bold">Generate AI</h1>
          </section>

          <section className="p-3 min-h-[200px]">
            <div className="border border-base-300 rounded-xl p-5 grid gap-2 relative">
              {isLoading && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex justify-center items-center rounded-xl z-10">
                  <span className="loading loading-spinner loading-lg text-error"></span>
                </div>
              )}

              <div className="divider my-0">Template</div>
              <div className="grid gap-2">
                {templateNotes.map((templateNote, index) => {
                  return (
                    <button className="btn btn-sm"
                      key={index}
                      disabled={isLoading}
                      onClick={async (e) => {
                        e.preventDefault();
                        handleValidationData()
                        setInputValue(templateNote);
                        await handleGenerateAIWithPrompt();
                      }}
                    >
                      {templateNote}
                    </button>
                  );
                })}
              </div>

              <div className="divider my-0">Atau</div>
              <div className="join w-full">
                <label className="input join-item w-full">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ketik kebutuhan spesifik.."
                    disabled={isLoading}
                  />
                </label>
                <button
                  className="btn btn-error join-item text-base-100"
                  disabled={!inputValue.trim() || isLoading}
                  onClick={async (e) => {
                    e.preventDefault();
                    handleValidationData()
                    await handleGenerateAIWithPrompt();
                  }}
                >
                  <PaperAirplaneIcon className="h-5 w-5" />
                </button>
              </div>

              {!isLoading && resultAIText && (
                <div className='max-h-96 overflow-y-auto'><MarkdownRenderer>{resultAIText}</MarkdownRenderer></div>
              )}
            </div>
          </section>

        </div>
      )}

      {/* Toggle Button */}
      <button className="btn m-1 bg-neutral text-base-100" type="button" onClick={(e) => {
        e.preventDefault();
        setDropdownOpen(!dropDownOpen)
      }}>
        <div className="animate-bounce">
          <SparklesIcon className="h-5 w-5 animate-pulse" />
        </div>
      </button>
    </div>

  )
}

export default ExtraFormText