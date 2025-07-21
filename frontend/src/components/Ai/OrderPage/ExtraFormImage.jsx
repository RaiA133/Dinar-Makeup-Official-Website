import { useContext, useState } from 'react';
import { PaperAirplaneIcon, SparklesIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import { ProductsContext } from '../../../contexts/ProductsContext';
import { GoogleGenAI, Modality } from "@google/genai";
import { createAIHistory } from '../../../modules/fetch';
import { UserContext } from '../../../contexts/UserContext';


function ExtraFormImage({ formData, handleValidationData, resultImage, setResultImage }) {
  const { productsByIDState } = useContext(ProductsContext);
  const { userState } = useContext(UserContext);
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

  const [inputValue, setInputValue] = useState('');
  const [resultImageText, setResultImageText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dropDownOpen, setDropdownOpen] = useState(false);

  const templatePrompts = [
    "Dekorasi Wedding tema klasik elegan, nuansa di indonesia, warna putih dan hitam",
    "Dekorasi pernikahan outdoor, tema alam, tradisional indonesia, namun elegan",
    "Desain kartu undangan bernuansa gold, elegan, modern dan simple",
  ];

  const formDataText = formData ? `${JSON.stringify(formData, null, 2)}` : "";
  const productDataText = productsByIDState ? `{JSON.stringify(productsByIDState, null, 2)}` : "";

  const generatePromptText = (inputValue, formData, productData) => {
    const budget = productData?.price || 0;
    const lokasi = formData?.detail_order?.location || "Gedung / jalanan";
    const tema = inputValue || "Wedding khas indonesia";

    saveAIHistoryFunc(inputValue);

    return `
Gambarkan ilustrasi visual untuk kebutuhan berikut: \n\n

Tema: ${tema} \n
Lokasi Acara: ${lokasi} \n
Budget: Rp ${budget.toLocaleString('id-ID')} \n

Data Tambahan Lain : \n\n
Data form pribadi : ${formDataText} \n\n
Data produk yang dibeli: ${productDataText} \n\n
  
Fokus pada elemen visual sesuai tema yang disebutkan. Gambar harus sesuai konteks pernikahan atau wedding organizer. Hindari teks dalam gambar. Tidak perlu tunjukkan data pribadi klien.\n
Berikan juga deskripsi pendek tentang gambar yang dibuat.
  `;
  };

  // Simpan History AI ke Database | User
  async function saveAIHistoryFunc(inputValue) {
    const saveAIHistory = await createAIHistory({ user_id: userState?.id, sender: 'user', message: inputValue });
    if (saveAIHistory.status !== 200) console.error("AIHistory: Gagal menyimpan AI History");
  }

  // ====================================================================================================================================

  const handleGenerateAIImageWithPrompt = async (textInput) => {
    setIsLoading(true);
    const contents = generatePromptText(textInput, formData, productsByIDState);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-preview-image-generation",
        contents: contents,
        config: { responseModalities: [Modality.TEXT, Modality.IMAGE] },
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.text) {
          setResultImageText(contents)
        } else if (part.inlineData) {
          const imageData = part.inlineData.data;
          const imageSrc = `data:image/png;base64,${imageData}`;
          setResultImage(imageSrc);
        }
      }

      // Simpan History AI ke Database | Bot
      const saveAIHistory = await createAIHistory({ user_id: userState.id, sender: 'bot', message: resultImageText });
      if (saveAIHistory.status !== 200) console.error("AIHistory: Gagal menyimpan AI History");

    } catch (error) {
      console.error("Gagal generate prompt:", error);
    } finally {
      setInputValue("")
      setIsLoading(false);
    }
  };

  // ====================================================================================================================================

  return (
    <div className="relative right-0 top-[-70px] xl:top-0">


      {dropDownOpen && (
        <div className="absolute right-0 bottom-full mb-2 z-20 w-96 shadow-xl rounded-xl bg-base-100">

          {/* Header */}
          <section className="bg-error p-3 rounded-t-xl">
            <h1 className="text-base-100 font-bold">AI Wedding VIsualizer</h1>
          </section>

          <section className="p-3 min-h-[200px] relative">
            <div className="border border-base-300 rounded-xl p-5 grid gap-2 relative">
              {isLoading && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex justify-center items-center rounded-xl z-10">
                  <span className="loading loading-spinner loading-lg text-error"></span>
                </div>
              )}

              <div className="divider my-0">Template</div>

              <div className="grid gap-2">
                {templatePrompts.map((template, index) => {
                  return (
                    <button className="btn btn-sm py-5"
                      key={index}
                      disabled={isLoading}
                      onClick={async (e) => {
                        e.preventDefault();
                        handleValidationData()
                        await handleGenerateAIImageWithPrompt(template);
                      }}
                    >
                      {template}
                    </button>
                  );
                })}
              </div>

              <div className="divider my-0">Atau</div>

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
                  onClick={async (e) => {
                    e.preventDefault();
                    handleValidationData()
                    await handleGenerateAIImageWithPrompt(inputValue);
                  }}
                  disabled={isLoading}
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                </button>
              </div>

              {!isLoading && resultImage && (
                <div className="mt-4 border border-base-300 rounded-xl p-4 max-h-96 overflow-y-auto grid gap-4">

                  <div className="relative">
                    {/* Hasil Image AI */}
                    <img className="rounded-xl w-full object-cover max-h-64"
                      src={resultImage}
                      alt="Generated by AI"
                      onClick={() => document.getElementById(`image_ai_modal`).showModal()}
                    />

                    {/* Tombol Download */}
                    <a className="absolute right-1 top-1 btn btn-sm px-2 bg-neutral text-base-100"
                      href={resultImage}
                      download="generated-image.png"
                    ><ArrowDownTrayIcon className="h-5 w-5 animate-bounce" /></a>

                    {/* Modal Review Gambar */}
                    <dialog id={`image_ai_modal`} className="modal modal-bottom sm:modal-middle">
                      <div className="modal-box p-0">
                        <img src={resultImage} alt={`Preview Gambar`} className="w-full max-h-full object-contain rounded-t" />
                        <a className="absolute right-1 top-1 btn btn-sm px-2 bg-neutral text-base-100"
                          href={resultImage}
                          download="generated-image.png"
                        ><ArrowDownTrayIcon className="h-5 w-5 animate-bounce" /></a>
                      </div>
                      <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                      </form>
                    </dialog>
                  </div>

                  {/* Deskripsi AI Gambar */}
                  <div className="collapse bg-base-100 border-base-300 border">
                    <input type="checkbox" />
                    <div className="collapse-title font-semibold skeleton bg-base-200">Deskripsi Hasil Gambar AI</div>
                    <div className="collapse-content text-justify">
                      <label>{resultImageText}</label>
                    </div>
                  </div>

                  <label>Download gambar diatas dan upload ke dalam form, jika belum sesuai anda bisa generate gambari ulang</label>
                </div>
              )}

            </div>
          </section>
        </div>
      )}

      {/* Toggle Button */}
      <div className={` ${dropDownOpen ? '' : 'tooltip'} tooltip-open tooltip-left xl:tooltip-top`} data-tip="AI Wedding VIsualizer">
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
  );
}

export default ExtraFormImage;
