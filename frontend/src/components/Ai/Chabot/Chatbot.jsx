import { useState, useRef, useEffect, useCallback, useContext } from 'react';
import { PaperAirplaneIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { chatBot, guideBot } from "../modules/fetch/ai";
import { GoogleGenAI } from "@google/genai";
import { useNavigate } from 'react-router-dom';
import MarkdownRenderer from '../../../components/MarkdownRenderer';
import introJs from 'intro.js';
import 'intro.js/introjs.css';
import 'intro.js/themes/introjs-modern.css';
import GoogleLoginButton from '../../LoginPage/GoogleLoginButton';
import { UserContext } from '../../../contexts/UserContext';
import Cookies from "js-cookie";
// import { GoogleAuth } from 'google-auth-library';

const Chatbot = () => {
  const navigate = useNavigate();
  const { isLogin } = useContext(UserContext)

  const [messages, setMessages] = useState([
    { id: 1, text: 'Halo! Saya Dinar, asisten virtual Dinar Makeup. Ada yang bisa saya bantu?', sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingChatGuide, setIsLoadingChatGuide] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);

  const [inputValueGuide, setInputValueGuide] = useState('');
  const [askToGuideButton, setAskToGuideButton] = useState(false);
  const [showGuideButton, setShowGuideButton] = useState(false);
  const [introJsSteps, setIntroJsSteps] = useState([])

  const messagesEndRef = useRef(null);

  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || "YOUR_API_KEY" });

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === '' || isLoading) return;

    // pesan USER
    const newUserMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user'
    };

    setMessages([...messages, newUserMessage]);
    setInputValue('');
    setIsLoading(true)

    try {

      let chatHistory;
      chatHistory = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      // ====================================================================================================================================

      const chatbotAPI = await chatBot(inputValue, chatHistory); // HIT API CHATBOT
      const result = chatbotAPI.data;

      let text = ''
      if (result.status == "200") text = result.data;
      else text = 'Terjadi masalah, coba lagi nanti';

      // Tambahkan response AI chat
      const botResponse = {
        id: messages.length + 2,
        text,
        sender: 'bot'
      };
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);

      // ====================================================================================================================================

      const decision = ai.chats.create({ // DECISION MAKER
        model: "gemini-2.5-flash",
        history: [
          {
            role: "model",
            parts: [{
              text: `beri saya output simple saja berupa 'chat' atau 'tour'. tentukan dari pesan yg akan diinput. Jika pertanyaan menyangkut 
              pertanyaan seperti letak halaman, dan info lain yang menanyakan lokasi tampilan di website output adalah 'tour' saja, tapi jika 
              konversesi biasa berikan output 'chat' saja`
            }],
          }
        ],
      });

      const decisionResponse = await decision.sendMessage({ message: inputValue });

      // ====================================================================================================================================

      if (decisionResponse.text == "tour") {
        setInputValueGuide(inputValue) // Simpan data pesan untuk AI TourGuide
        setAskToGuideButton(true)
        setIntroJsSteps([])
        setShowGuideButton(false)
      }

    } catch (error) {
      console.error('Error calling Gemini API:', error);
      const errorMessage = {
        id: messages.length + 2,
        text: 'Maaf, terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi nanti.',
        sender: 'bot'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoadingChatGuide(false)
    }
  };

  // Auto-scroll ke pesan terbaru
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ===============================================================================================================

  const handleUseAiTourGuide = useCallback(async () => { // HIT API AI TOURGUIDE
    setIsLoadingChatGuide(true);
    try {
      let chatHistory = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      const fetch = await guideBot(inputValueGuide, chatHistory);
      const response = fetch.data;
      if (response) {
        setIntroJsSteps(response.data?.[0]);
        setShowGuideButton(true);
      }
    } catch (err) {
      console.error('Gagal memuat tour guide:', err);
    } finally {
      setIsLoadingChatGuide(false);
    }
  }, [inputValueGuide, messages]);

  const resolveSteps = (stepsFromApi) => { // GUNAKAN TARGET ELEMENT UNTUK INTROJS, YG ERROR TIDAK DIGUNAKAN
    return stepsFromApi
      .map(step => {
        try {
          const el = document.querySelector(step.element);
          if (!el) {
            console.warn("Invalid selector or element not found: " + step.element);
            return null;
          }
          return {
            element: el,
            intro: step.intro,
            position: step.position
          };
        } catch (err) {
          console.warn("Skipping invalid selector: " + step.element + "—" + err.message);
          return null;
        }
      })
      .filter(Boolean); // buang hasil null
  };

  const startTour = useCallback(() => { // INTROJS
    setShowChatbot(false);
    // console.log("introJsSteps", introJsSteps.step);
    // console.log("steps", resolveSteps(introJsSteps.step));
    navigate(introJsSteps.url);
    setTimeout(() => {
      introJs()
        .setOptions({
          steps: resolveSteps(introJsSteps.step),
          nextLabel: "next",
          prevLabel: "back",
          skipLabel: "x",
          doneLabel: "done",
          showProgress: true,
        })
        .start();
    }, 1000);
  }, [introJsSteps]);



  return (
    <div className="">
      {/* Tombol toggle chatbot */}
      <button
        onClick={() => setShowChatbot(!showChatbot)}
        className="btn fixed bottom-6 right-6 h-fit bg-neutral text-base-100 p-4 rounded-full shadow-lg hover:bg-neutral-600 transition-colors z-99"
      >
        <SparklesIcon className="h-6 w-6" />
      </button>


      <div className={`fixed bottom-25 right-5 z-10 ${showChatbot ? '' : 'hidden'}`}>

        {/* Chatbot */}
        <div className="flex flex-col h-full max-w-xs sm:max-w-md mx-auto bg-base-100 rounded-lg shadow-lg overflow-hidden">

          {/* Header Chatbot */}
          <div className="bg-error text-base-100 p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-base-100 flex items-center justify-center text-error font-bold">
                DM
              </div>
              <div className="ml-3">
                <h3 className="font-bold">Dinar Makeup Assistant</h3>
                <p className="text-xs">Online</p>
              </div>
            </div>
          </div>

          {isLogin ? (
            <section>
              {/* Area Pesan */}
              <div className="flex-1 p-4 overflow-y-auto bg-base-50 max-h-96 text-xs">
                {messages.map((message, index) => (

                  <div key={index} className={`chat my-2 ${message.sender === 'user' ? 'chat-end' : 'chat-start'}`}>
                    <div className={`chat-bubble ${message.sender === 'user' ? 'chat-bubble-error text-base-100' : ''}`}>
                      <MarkdownRenderer>{message.text}</MarkdownRenderer>
                    </div>
                  </div>

                ))}

                {/* LOADING CHATBOT */}
                {isLoading && !isLoadingChatGuide && (
                  <div className="chat my-2 chat-start">
                    <div className="chat-bubble flex gap-5 items-center max-w-11/12">
                      <div className="flex w-92 flex-col gap-2">
                        <div className="skeleton bg-neutral-content h-2 w-11/12"></div>
                        <div className="skeleton bg-neutral-content h-2 w-9/12"></div>
                        <div className="skeleton bg-neutral-content h-2 w-7/12"></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* LOADING AI TOUR GUIDE */}
                {isLoadingChatGuide && (
                  <div className="chat my-2 chat-start">
                    <div className="chat-bubble flex items-center gap-4 max-w-11/12 skeleton">
                      <div className="animate-spin-slow">
                        <SparklesIcon className="h-5 w-5 text-primary animate-pulse" />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-xs text-base-content">
                          AI sedang membuatkan tour guide untuk Anda.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* HIT API AI TOUR GUIDE ? */}
                {askToGuideButton && !showGuideButton && !isLoadingChatGuide && (
                  <div className='flex items-center justify-start'>
                    <div className="chat my-2 chat-start w-full">
                      <div className="chat-bubble flex items-center gap-1">
                        Pakai AI Tour Guide
                        <div className="animate-spin-slow">
                          <SparklesIcon className="h-5 w-5 text-primary animate-pulse" />
                        </div>
                        ?
                      </div>
                    </div>
                    <div className="flex justify-center gap-2">
                      <button className='btn btn-sm btn-error text-base-100' onClick={handleUseAiTourGuide}>Ya</button>
                      <button className='btn btn-sm' onClick={() => setAskToGuideButton(false)}>Tidak</button>
                    </div>
                  </div>
                )}

                {/* START AI TOUR GUIDE */}
                {showGuideButton && !isLoading && (
                  <div className="flex justify-center w-full mt-5">
                    <button className='btn bg-gradient-to-br from-error to-accent text-base-100 hover:shadow-md animate-pulse hover:animate-none' onClick={startTour}>
                      Mulai AI Tour Guide
                    </button>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Pesan */}
              <form onSubmit={handleSendMessage} className="p-4 bg-base-100 border-t">
                <div className="join w-full">
                  <div className='w-full'>
                    <label className="input validator join-item w-full">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ketik pesan Anda.."
                        disabled={isLoading}
                      />
                    </label>
                    <div className="validator-hint hidden">Enter valid email address</div>
                  </div>
                  <button className="btn btn-error join-item text-base-100"
                    disabled={isLoading || !inputValue.trim()}>
                    <PaperAirplaneIcon className="h-5 w-5" />
                  </button>
                </div>
              </form>

            </section>
          ) : (
            <div>
              <div className="card-actions justify-center my-5 space-y-2 rounded-md border border-stone-300 mx-5 p-5 ">
                <GoogleLoginButton redirectTo="/" />
                <div className='text-center text-sm'>
                  <div>Untuk menggunakan chatbot diharapkan untuk login. Atau lakukan <a href="" className=' link-neutral text-primary'>registrasi</a> akun</div>
                </div>
              </div>
            </div>
          )}

          {/* <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ketik pesan Anda..."
              className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-error"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-error text-base-100 px-4 py-2 rounded-r-lg hover:bg-error-600 transition-colors disabled:opacity-50"
              disabled={isLoading || !inputValue.trim()}
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button> */}

        </div>

      </div>
    </div>

  );
};

export default Chatbot;