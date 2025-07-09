import { useContext, useState } from 'react';
import { PaperAirplaneIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { ProductsContext } from '../../../contexts/ProductsContext';
import { GoogleGenAI } from "@google/genai";

function ExtraFormImage() {
  const { productsByIDState } = useContext(ProductsContext);
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || "YOUR_API_KEY" });

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // ====================================================================================================================================

  const handleGenerateAI = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    try {
      const decision = ai.chats.create({ // DECISION MAKER
        model: "gemini-2.5-flash",
        history: [
          {
            role: "model",
            parts: [{
              text: `beri saya deskpripsi untuk mengisi data notes, dengan kebutuhan ${inputValue} berdasarkan data ${productsByIDState}`
            }],
          }
        ],
      });
      const decisionResponse = await decision.sendMessage({ message: inputValue });
    } catch (error) {
      
    } finally {
      setIsLoading(false)
    }
  }

  // ====================================================================================================================================

  return (
    <div className="dropdown dropdown-top dropdown-end join-item">
      <div tabIndex={0} role="button" className="btn m-1">
        <div className="animate-bounce">
          <SparklesIcon className="h-5 w-5 text-primary animate-pulse" />
        </div>
      </div>
      <div tabIndex={0} className="dropdown-content menu z-20 w-96 p-0 shadow-sm rounded-xl bg-base-100">

        <section className='bg-error p-3'>
          <h1 className='text-base-100  menu-title'>Generate AI</h1>
        </section>
        
        <div className="divider mb-0">Template</div>
        <section className='p-3'>
          <div className='border border-base-300 rounded-xl p-5 grid gap-2'>
            <button className='btn btn-sm' value={`Efisiensi Harga`}>Weeding Tema Random</button>
            <button className='btn btn-sm' value={`Efisiensi Harga`}>Weeding Tema Alam Terbuka</button>
            <button className='btn btn-sm'>Desain kartu undangan</button>
          </div>
        </section>

        <div className="divider my-0">Atau</div>
        <section className='p-3'>
          <div>
            <div className="join w-full">
              <div className='w-full'>
                <label className="input validator join-item w-full">
                  <input
                    type="text"
                    // value={inputValue}
                    // onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ketik perintah.."
                  // disabled={isLoading}
                  />
                </label>
              </div>
              <button
                className="btn btn-error join-item text-base-100"
              // disabled={isLoading || !inputValue.trim()}
              >
                <PaperAirplaneIcon className="h-5 w-5" onClick={handleGenerateAI} />
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

export default ExtraFormImage