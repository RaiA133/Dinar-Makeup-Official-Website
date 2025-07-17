import { useContext, useState } from 'react';
import { PaperAirplaneIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { ProductsContext } from '../../../contexts/ProductsContext';
import { GoogleGenAI } from "@google/genai";
import MarkdownRenderer from '../../MarkdownRenderer';

function ExtraFormText({ formData, handleValidationData, resultAIText, setResultAIText }) {
  const { productsByIDState } = useContext(ProductsContext);
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || "YOUR_API_KEY" });

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dropDownOpen, setDropdownOpen] = useState(false);

  const formDataText = formData ? `${JSON.stringify(formData, null, 2)}` : "";
  const productDataText = productsByIDState ? `{JSON.stringify(productsByIDState, null, 2)}` : "";

  const generatePromptText = (inputValue, formData, productData) => {
    const budget = productData?.price || 0;
    const lokasi = formData?.detail_order?.location || "Gedung / jalanan";
    const tema = inputValue || "Wedding khas indonesia";

    return `Buatkan isi catatan tambahan untuk kebutuhan berikut: \n\n

Tema: ${tema} \n
Lokasi Acara: ${lokasi} \n
Budget: Rp ${budget.toLocaleString('id-ID')} \n

Data Tambahan Lain : \n\n
Data form pribadi : ${formDataText} \n\n
Data produk yang dibeli: ${productDataText} \n\n

Berikan langsung dalam bentuk daftar poin dan alasan singkat disetiap point. Tidak perlu menyapa, atau menambahkan kalimat pembuka — cukup tampilkan hasil catatannya secara langsung, singkat, dan to the point.\n\n
Buat isi catatan singkat dan padat.
  `;
  };

  // ====================================================================================================================================

  const handleGenerateAIWithPrompt = async (textInput) => {
    setIsLoading(true);
    setResultAIText("");
    const contents = generatePromptText(textInput, formData, productsByIDState);

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
    <div className="absolute right-0 top-[-70px] xl:top-0">
      {/* Dropdown Content */}
      {dropDownOpen && (
        <div className="absolute right-0 bottom-full mb-2 z-20 w-83 sm:w-96 p-0 shadow-sm rounded-xl bg-base-100">

          {/* HEADER */}
          <section className="bg-error p-3 rounded-t-xl">
            <h1 className="text-base-100 font-bold">AI Wedding Planner Assistant</h1>
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
                {templateNotes.map((template, index) => {
                  return (
                    <button className="btn btn-sm py-5"
                      key={index}
                      disabled={isLoading}
                      onClick={async (e) => {
                        e.preventDefault();
                        handleValidationData()
                        await handleGenerateAIWithPrompt(template);
                      }}
                    >
                      {template}
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
                    await handleGenerateAIWithPrompt(inputValue);
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
      <div className={` ${dropDownOpen ? '' : 'tooltip'} tooltip-open tooltip-left xl:tooltip-top`} data-tip="AI Wedding Planner Assistant">
        <button className="btn m-1 bg-neutral text-base-100" type="button" onClick={(e) => {
          e.preventDefault();
          setDropdownOpen(!dropDownOpen)
        }}>
          <div className="animate-bounce">
            <SparklesIcon className="h-5 w-5 animate-pulse" />
          </div>
        </button>
      </div>
    </div>

  )
}

export default ExtraFormText