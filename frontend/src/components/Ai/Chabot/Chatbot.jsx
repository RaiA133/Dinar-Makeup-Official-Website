import { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowPathIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { healthCheck, chatBot, guideBot } from "../../../modules/fetch/chatbot";
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/solid';
import { GoogleGenAI } from "@google/genai";
import { useNavigate } from 'react-router-dom';
import MarkdownRenderer from './MarkdownRenderer';
import introJs from 'intro.js';
import 'intro.js/introjs.css';

// import { GoogleAuth } from 'google-auth-library';

const Chatbot = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { id: 1, text: 'Halo! Saya Dinar, asisten virtual Dinar Makeup. Ada yang bisa saya bantu?', sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [introJsSteps, setIntroJsSteps] = useState([
    {
      element: '.navbar',
      intro: 'Ini adalah navbar',
      position: 'bottom'
    },
    {
      element: '.hero-content',
      intro: 'Ini adalah Hero',
      position: 'right'
    },
    {
      element: '.login',
      intro: 'Klik di sini untuk login',
      position: 'left'
    },
  ])
  const messagesEndRef = useRef(null);




  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || "YOUR_API_KEY" });


  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === '' || isLoading) return;

    // Tambahkan pesan USER
    const newUserMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user'
    };

    setMessages([...messages, newUserMessage]);
    setInputValue('');
    setIsLoading(true);

    try {

      // ====================================================================================================================================

      // // DECISION MAKER
      // const decision = ai.chats.create({
      //   model: "gemini-2.5-flash",
      //   history: [
      //     {
      //       role: "model",
      //       parts: [{
      //         text: `beri saya output simple saja berupa 'chat' atau 'tour'. tentukan dari pesan yg akan diinput. Jika pertanyaan menyangkut 
      //         pertanyaan seperti letak halaman, dan info lain yang menanyakan lokasi tampilan di website output adalah 'tour' saja, tapi jika 
      //         konversesi biasa berikan output 'chat' saja`
      //       }],
      //     }
      //   ],
      // });
      // const decisionResponse = await decision.sendMessage({
      //   message: inputValue
      // });

      // if (decisionResponse.text == "tour") {

      //   console.log(decisionResponse);
      //   console.log('ini tour');
      //   return

      //   const response = await guideBot(inputValue);

      // } else if (decisionResponse.text == "chat") {

      //   console.log(decisionResponse);
      //   console.log('ini chat');
      //   return

      //   chatHistory = messages.map(msg => ({
      //     role: msg.sender === 'user' ? 'user' : 'model',
      //     parts: [{ text: msg.text }]
      //   }));

      //   chat = ai.chats.create({
      //     model: "gemini-2.5-flash",
      //     history: [
      //       {
      //         role: "model",
      //         parts: [{
      //           text: `Nama ada adalah Dinar, Anda adalah asisten virtual untuk Dinar Makeup, sebuah layanan makeup profesional.
      //           Ambil data dan informasi seluruhnya dari website ini : https://dinar-makeup-official-website.vercel.app/
      //           ` }],
      //       },
      //       ...chatHistory
      //     ],
      //     config: {
      //       tools: [{ urlContext: {} }, { googleSearch: {} }],
      //     },
      //   });
      // }

      // ====================================================================================================================================

      let chatHistory;
      chatHistory = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      const chatbotAPI = await chatBot(inputValue, chatHistory);
      const result = chatbotAPI.data;

      let text = ''
      if (result.status == "200") text = result.data;
      else text = 'Terjadi masalah, coba lagi nanti';

      // Tambahkan response AI
      const botResponse = {
        id: messages.length + 2,
        text,
        sender: 'bot'
      };
      setMessages(prev => [...prev, botResponse]);

    } catch (error) {
      console.error('Error calling Gemini API:', error);
      const errorMessage = {
        id: messages.length + 2,
        text: 'Maaf, terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi nanti.',
        sender: 'bot'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }

  };

  // Auto-scroll ke pesan terbaru
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ===============================================================================================================

  const startTour = useCallback(() => {
    introJs().setOptions({
      steps: introJsSteps,
      nextLabel: 'next',
      prevLabel: 'back',
      skipLabel: 'x',
      doneLabel: 'done',
      showProgress: true
    })
      .start();
  }, []);

  return (
    <div className="">
      {/* Tombol toggle chatbot */}
      <button
        onClick={() => setShowChatbot(!showChatbot)}
        className="btn fixed bottom-6 right-6 h-fit bg-neutral text-base-100 p-4 rounded-full shadow-lg hover:bg-neutral-600 transition-colors z-99"
      >
        <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
      </button>


      <div className={`fixed bottom-25 right-5 z-10 ${showChatbot ? '' : 'hidden'}`}>

        {/* Chatbot */}
        <div className="flex flex-col h-full max-w-xs sm:max-w-md mx-auto bg-base-100 rounded-lg shadow-lg overflow-hidden">

          {/* Header Chatbot */}
          <div className="bg-error text-base-100 p-4 flex items-center">
            <div className="w-10 h-10 rounded-full bg-base-100 flex items-center justify-center text-error font-bold">
              DM
            </div>
            <div className="ml-3">
              <h3 className="font-bold">Dinar Makeup Assistant</h3>
              <p className="text-xs">Online</p>
            </div>
            {/* <button className='btn' onClick={startTour} style={{ marginTop: '20px' }}>
                  Mulai Tour Guide
                </button> */} 
          </div>

          {/* Area Pesan */}
          <div className="flex-1 p-4 overflow-y-auto bg-base-50 max-h-96 text-xs">
            {messages.map((message) => (

              <div key={message.id} className={`chat ${message.sender === 'user' ? 'chat-end' : 'chat-start'}`}>
                <div className={`chat-bubble ${message.sender === 'user' ? 'chat-bubble-error' : ''}`}>
                  <MarkdownRenderer>{message.text}</MarkdownRenderer>
                </div>
              </div>

            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-base-100 text-base-800 px-4 py-2 rounded-lg rounded-bl-none shadow">
                  <ArrowPathIcon className="h-5 w-5 animate-spin" />
                </div>
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
              <button className="btn btn-error join-item"
                disabled={isLoading || !inputValue.trim()}>
                <PaperAirplaneIcon className="h-5 w-5" />
              </button>
            </div>
          </form>


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