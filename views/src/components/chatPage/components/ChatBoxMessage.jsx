import { useContext, useEffect, useRef } from "react";
import { ChatContext } from "../../../contexts/ChatContext";
import { useFetchRecipientUser } from "../../../hooks/useFetchRecipient";
import moment from "moment"

const ChatBoxMessage = () => {
  const { user, currentChat, messages } = useContext(ChatContext) // profile kita dari chatContext | Obrolan yg mana | Pesan Obrolan di userBox yg kita klik
  const recipientUser = useFetchRecipientUser(currentChat, user) // get data user yg ngobrol dengan kita dari userBox yg kita klik
  const scroll = useRef()

  useEffect(() => {
    scroll.current?.scrollIntoView({behavior: "smooth"})
  }, [messages])

  if (!recipientUser[0]) return (
    <p className="flex justify-center items-center h-full">Belum ada obrolan yg dipilih</p>
  )

  return (
    <>
      {messages && messages.map((message, index) => (
        <div className={`chat  ${message?.sender_unique_id !== user?.unique_id && "chat-start" || "chat-end"}`} key={index} ref={scroll}>
          <div className={`chat-bubble ${message?.sender_unique_id !== user?.unique_id && "bg-base-300 text-black" || ""}`}>{message?.text}</div>
          <div className="chat-footer opacity-50">
            {/* {message?.sender_unique_id === user?.unique_id ? (<span className=''> Read </span>) : (<></>)} */}
            <time className="text-xs opacity-50 ms-2 font-bold">{moment(message?.createdAt).calendar()}</time>
          </div>
        </div>
      ))}
    </>
  );
}

export default ChatBoxMessage;