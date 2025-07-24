import { useContext, useState } from 'react';
import { PaperAirplaneIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { ProductsContext } from '../../../contexts/ProductsContext';
import { GoogleGenAI } from "@google/genai";
import MarkdownRenderer from '../../MarkdownRenderer';
import { createAIHistory } from '../../../modules/fetch';
import { UserContext } from '../../../contexts/UserContext';

function ExtraFormText({ formData, handleValidationData, resultAIText, setResultAIText }) {
  const { productsByIDState } = useContext(ProductsContext);
  const { userState } = useContext(UserContext);
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || "YOUR_API_KEY" });

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dropDownOpen, setDropdownOpen] = useState(false);

  const generatePromptText = (inputValue, formData, productData) => {
    const budget = productData?.price || 0;
    const lokasi = formData?.detail_order?.location || "Gedung / jalanan";
    const instruksiCatatan = inputValue || "Berikan catatan penting untuk perencanaan wedding"; // Mengganti 'tema' agar lebih sesuai dengan tujuan notes
  
    const clientName = formData?.client_name || "pasangan klien";
    const packageName = productData?.name || "paket acara";
    const eventDate = formData?.detail_order?.event_date ? new Date(formData.detail_order.event_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : "tanggal yang akan datang";
    const numberOfGuests = formData?.detail_order?.num_guests || "jumlah tamu yang tidak spesifik";
  
    saveAIHistoryFunc(inputValue);
  
    return `Berdasarkan permintaan "${instruksiCatatan}", buatkan daftar poin rekomendasi atau catatan tambahan yang relevan untuk perencanaan acara. Fokus pada topik seperti efisiensi biaya, pengaturan jadwal hari-H, logistik, atau hal lain yang penting sesuai dengan permintaan.
  
  **Konteks Acara:**
  * **Lokasi Acara:** ${lokasi}
  * **Estimasi Budget:** Rp ${budget.toLocaleString('id-ID')}
  * **Klien:** ${clientName} (telah memilih ${packageName})
  * **Tanggal Acara:** ${eventDate}
  * **Jumlah Tamu:** ${numberOfGuests}
  
  **Instruksi Output:**
  * Berikan langsung dalam format daftar poin.
  * Setiap poin harus berisi rekomendasi atau catatan.
  * Sertakan alasan singkat atau penjelasan mengapa poin tersebut relevan/penting.
  * Pastikan catatannya singkat, padat, to the point, dan langsung menjawab permintaan "${instruksiCatatan}".
  * Hindari sapaan, kalimat pembuka, atau penutup. Cukup hasilkan daftar poinnya saja.
  * Jangan tampilkan data pribadi atau JSON mentah dari form dalam catatan. Gunakan hanya informasi yang sudah diringkas dan relevan.
    `;
  };

  // Simpan History AI ke Database | User
  async function saveAIHistoryFunc(inputValue) {
    const saveAIHistory = await createAIHistory({ user_id: userState?.id, sender: 'user', message: inputValue });
    if (saveAIHistory.status !== 200) console.error("AIHistory: Gagal menyimpan AI History");
  }

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

      // Simpan History AI ke Database | Bot
      const saveAIHistory = await createAIHistory({ user_id: userState.id, sender: 'bot', message: finalText });
      if (saveAIHistory.status !== 200) console.error("AIHistory: Gagal menyimpan AI History");

    } catch (error) {
      console.error("AI error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ====================================================================================================================================

  const templateNotes = [
    "Rekomendasi Efisiensi Biaya Pernikahan",
    "Daftar Perlengkapan Hari-H yang Krusial",
    "Panduan Mengatur Jadwal Acara Hari-H",
    "Tips Memilih Vendor Tambahan",
    "Poin Penting untuk Rapat Terakhir dengan Klien",
  ];

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
                    <button className="btn btn-sm h-fit btn-outline py-1"
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