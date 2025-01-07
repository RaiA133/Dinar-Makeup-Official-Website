import { useEffect } from 'react';
import UserBox from '../components/chatPage/UserBox';
import ChatBox from '../components/chatPage/ChatBox';
import toast, { Toaster } from 'react-hot-toast';

function ChatPage() {

  useEffect(() => {
    const toastMessage = localStorage.getItem('chatCreated')
    if (toastMessage) {
      // toast.success(`Chat dengan ${selectedPost?.user?.username} berhasil dibuat di 'Direct Message'`, {
      //   duration: 4500,
      // });
      toast.success(
        <>
          <span className="leading-normal">
            Chat dengan <span className='font-bold'>{toastMessage}</span> berhasil dibuat di <span className='font-bold'>'Direct Message'</span>
          </span>
        </>,
        { duration: 4500 }
      );
      localStorage.removeItem('chatCreated');
    }
  }, []);

  return (
    <>
      <div className="px-5 mb-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 mb-32">

          <Toaster
            toastOptions={{
              style: {
                maxWidth: '600px'
              }
            }}
          />

          {/* USER BOX */}
          <UserBox />

          {/* CHAT BOX */}
          <ChatBox />

        </div>
      </div>
    </>
  )
}

export default ChatPage