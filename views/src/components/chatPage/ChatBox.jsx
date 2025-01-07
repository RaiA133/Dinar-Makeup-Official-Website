import { useContext, useEffect, useState } from "react"
import { ChatContext } from "../../contexts/ChatContext"
import ChatBoxMessage from "./components/ChatBoxMessage"
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient"
import toast, { Toaster } from 'react-hot-toast';
import InputEmoji from "react-input-emoji";

function ChatBox() {
  const { 
    user, currentChat, messages, 
    sendTextMessage, deleteAllMessage, 
    updateUserChat, deleteUserChat, 
    onlineUsers,
  } = useContext(ChatContext) // profile kita dari chatContext | Obrolan yg mana | Pesan Obrolan di userBox yg kita klik
  const recipientUser = useFetchRecipientUser(currentChat, user) // get data orang yg ngobrol dengan kita dari userBox yg kita klik
  const otherUserData = recipientUser[0] || ''
  const otherUserPic = `${import.meta.env.VITE_BACKEND_BASEURL}/profile/picture/${otherUserData.img_profile}`
  const [textMessage, setTextMessage] = useState("");
  const isOnline = onlineUsers?.some((user) => user?.userUniqueId === otherUserData.unique_id)

  useEffect(() => {
    const toastMessage = localStorage.getItem('toastMessage')
    if (toastMessage == 'User berhasil dihapus!') {
      toast.success(toastMessage, {
        duration: 2500,
      });
      localStorage.removeItem('toastMessage');
    }
  }, []);


  function handleOnEnter(textMessage) {
    sendTextMessage(textMessage, currentChat?.chat_unique_id, setTextMessage)
  }
  
  function handleOnMessageDelete() {
    deleteAllMessage(currentChat?.chat_unique_id, setTextMessage)
  }

  function handleOnUserChatDelete() {
    deleteUserChat(currentChat?.chat_unique_id, setTextMessage)
  }

  function handleOnUserChatUpdate(friend, friend_req) {
    updateUserChat(friend, friend_req, currentChat?.chat_unique_id, setTextMessage)
  }


  return (
    <div className="col-span-2 bg-base-100 card shadow-md md:ms-5 mt-5 h-[40rem]">

      <Toaster
        toastOptions={{
          style: {
            maxWidth: "600px",
          },
        }}
      />

      <div>
        <div className="col-span-1 py-2 px-5 bg-base-200 card shadow mt-0">
          <div className='join'>
            <div className="avatar">
              <div className="w-12 rounded-full">
                {messages && (
                  <img src={otherUserPic} />
                )}
              </div>
            </div>
            <div className='ms-4 w-full'>
              <div className="flex justify-between w-full">
                <p className='font-bold'>{otherUserData.username}</p>
                <p className="text-sm mr-2">{otherUserData.name}</p>
              </div>
              <div className="flex justify-between w-full">
                {messages && 
                  <p className=''>{ isOnline ? "Online" : "Offline"}</p>
                }
                <div className="flex items-center">

                  {currentChat?.friend == false && (
                    <button className="btn btn-xs btn-primary mr-1" onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('modal_add_friend_dirrect_message').showModal()
                    }}>Add Friend</button>
                  )}

                  {messages?.length > 0 ? (<button className="btn btn-warning btn-xs" onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('modal_message_del').showModal()
                  }} >Delete Message</button>) : (<></>)}
                  {messages?.length === 0 ? (<button className="btn btn-error btn-xs" onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('modal_userChat_del').showModal()
                  }} >Delete User</button>) : (<></>)}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='p-5 h-[32rem] overflow-auto'>

        <ChatBoxMessage />

      </div>

      {otherUserData && (
        <div className="join mx-2 mt-2">
          <InputEmoji
            value={textMessage}
            onChange={setTextMessage}
            cleanOnEnter
            onEnter={handleOnEnter}
            placeholder="Type a message"
            theme="light"
            />
            <button className="btn btn-sm mr-1 px-4 absolute z-10 right-14 bottom-3.5 rounded-full" onClick={() => sendTextMessage(textMessage, currentChat.chat_unique_id, setTextMessage)}>Send</button>
        </div>
      )}


      <dialog id="modal_message_del" className="modal">
        <div className="modal-box w-fit">
          <h3 className="font-bold text-lg text-center">Delete All Messages</h3>
          <p className="pt-4 text-center">Are you sure ?</p>
          <div className="modal-action flex justify-between gap-20">
            <form method="dialog">
              <button className="btn btn-error w-20" onClick={handleOnMessageDelete}>Yes</button>
            </form>
            <form method="dialog">
              <button className="btn w-20">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="modal_userChat_del" className="modal">
        <div className="modal-box w-fit">
          <h3 className="font-bold text-lg text-center">Delete This User from your chat</h3>
          <p className="pt-4 text-center">Are you sure ?</p>
          <div className="modal-action flex justify-between gap-20">
            <form method="dialog">
              <button className="btn btn-error w-20" onClick={handleOnUserChatDelete}>Yes</button>
            </form>
            <form method="dialog">
              <button className="btn w-20">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="modal_add_friend_dirrect_message" className="modal">
        <div className="modal-box w-fit">
          <h3 className="font-bold text-lg text-center">Send Friend Request to {otherUserData.username}</h3>
          <p className="pt-4 text-center">Are you sure ?</p>
          <div className="modal-action flex justify-between gap-20">
            <form method="dialog">
              <button className="btn btn-primary w-20" onClick={() => handleOnUserChatUpdate(false, user.unique_id)}>Yes</button>
            </form>
            <form method="dialog">
              <button className="btn w-20">Close</button>
            </form>
          </div>
        </div>
      </dialog>

    </div>
  )
}

export default ChatBox