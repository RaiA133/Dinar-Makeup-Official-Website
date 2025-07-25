import { useContext, useState } from 'react';
import { PaperAirplaneIcon, SparklesIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import { ProductsContext } from '../../../contexts/ProductsContext';
import { GoogleGenAI, Modality } from "@google/genai";
import { createAIHistory } from '../../../modules/fetch';
import { UserContext } from '../../../contexts/UserContext';
import moment from "moment";


function ExtraFormImage({ formData, handleValidationData, resultImage, setResultImage }) {
  const { productsByIDState } = useContext(ProductsContext);
  const { userState } = useContext(UserContext);
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

  const [inputValue, setInputValue] = useState('');
  const [resultImageText, setResultImageText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dropDownOpen, setDropdownOpen] = useState(false);

  const templatePrompts = [
    "Dekorasi pernikahan klasik elegan di ballroom, dominasi warna putih, emas, dan sentuhan kristal.",
    "Dekorasi pernikahan outdoor dengan tema bohemian rustic, banyak bunga liar dan lampu peri.",
    "Desain kartu undangan digital modern minimalis dengan aksen floral dan palet warna pastel.",
    "Gaun pengantin muslimah elegan dengan detail brokat dan siluet A-line.",
    "Buket bunga pengantin cascading style dengan kombinasi mawar putih dan eukaliptus.",
];
const generatePromptText = (inputValue, formData, productData) => {
  const budget = productData?.price || 0;
  
  // Extracting more specific details from formData
  const groomFullName = formData?.customer_detail?.groom_full_name || "calon pengantin pria";
  const brideFullName = formData?.customer_detail?.bride_full_name || "calon pengantin wanita";
  const clientIdentifier = (groomFullName && brideFullName) ? `${groomFullName} & ${brideFullName}` : "pasangan klien";
  
  const lokasiAcara = formData?.detail_order?.location || "lokasi acara yang belum ditentukan";
  const akadDate = formData?.detail_order?.akad_date;
  const showDate = formData?.detail_order?.show_date;
  const akadTime = formData?.detail_order?.akad_time || "waktu akad belum ditentukan";
  const numberOfGuests = formData?.detail_order?.guest_count || "jumlah tamu yang tidak spesifik";
  const techMeetingDate = formData?.detail_order?.tech_meeting;

  // Formatting dates for better readability in the prompt
  const formattedAkadDate = akadDate ? moment(akadDate).format("DD MMMM YYYY") : "belum ditentukan";
  const formattedShowDate = showDate ? moment(showDate).format("DD MMMM YYYY") : "belum ditentukan";
  const formattedTechMeetingDate = techMeetingDate ? moment(techMeetingDate).format("DD MMMM YYYY") : "belum ditentukan";

  const packageName = productData?.name || "layanan wedding"; // Still using productData for package name
  const temaDariInput = inputValue || "Wedding khas indonesia"; // This is the user's direct visual request


  saveAIHistoryFunc(inputValue);

  return `
Gambarkan ilustrasi visual berkualitas tinggi dan realistis untuk kebutuhan acara berikut, fokus sepenuhnya pada **visualisasi yang relevan dengan Wedding Organizer (WO)**. Ini bisa meliputi dekorasi acara, desain gaun pengantin, inspirasi kartu undangan, buket bunga, setting meja makan, desain kue pengantin, atau elemen visual lain yang terkait dengan persiapan atau pelaksanaan acara pernikahan.

**Permintaan Visual Utama:** "${temaDariInput}"

**Konteks Acara untuk Inspirasi (JANGAN TAMPILKAN SEBAGAI TEKS ATAU DATA MENTAH DALAM GAMBAR):**
* **Klien:** ${clientIdentifier}
* **Paket yang Dipilih:** ${packageName}
* **Lokasi Acara:** ${lokasiAcara}
* **Estimasi Budget:** Rp ${budget.toLocaleString('id-ID')}
* **Tanggal Akad Nikah:** ${formattedAkadDate}
* **Waktu Akad:** ${akadTime}
* **Tanggal Resepsi/Acara Puncak:** ${formattedShowDate}
* **Jumlah Tamu yang Diperkirakan:** ${numberOfGuests} orang
* **Tanggal Technical Meeting:** ${formattedTechMeetingDate}

**Instruksi Penting untuk Generasi Gambar:**
* **Fokus Visual:** Ciptakan gambar yang indah dan imersif yang menggambarkan suasana, dekorasi, **atau detail lain yang terkait dengan persiapan/pelaksanaan acara pernikahan atau event organizer** sesuai dengan "Permintaan Visual Utama" di atas.
* **Keberagaman Visual:** Izinkan AI untuk bebas menentukan jenis visual yang paling sesuai dengan prompt, bisa berupa desain kartu undangan, detail gaun pengantin, pengaturan tempat, atau elemen WO lainnya.
* **Hindari Teks dan Data:** **JANGAN PERNAH** menampilkan teks, angka, data JSON, nama lengkap, alamat, email, Instagram, tanggal, budget, atau informasi pribadi klien lainnya dalam bentuk apapun di dalam gambar. Ini termasuk mencegah AI membuat "placeholder" atau simbol untuk data tersebut.
* **Relevansi Konteks:** Pastikan gambar sangat relevan dengan konteks pernikahan atau event organizer.
* **Gaya:** Gambar harus memiliki gaya yang elegan, profesional, dan artistik.
* **Deskripsi Singkat:** Setelah membuat gambar, berikan deskripsi pendek yang relevan tentang gambar yang telah Anda buat (ini akan menjadi hasil teks dari respons AI).
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
                    <button className="btn btn-sm h-fit btn-outline py-1"
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
