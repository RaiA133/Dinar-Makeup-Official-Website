import { createContext, useCallback, useEffect, useState } from 'react';
import { createUserMessage, deleteAllMessageByUniqueId, deleteUserChatByUniqueId, findAllUserChats, findAllUserChatsByChatUniqueId, getAllUser, updateUserByChatUniqueIdChat } from '../modules/fetch';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { io } from "socket.io-client";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null) // profile kita
  const [allUsers, setAllUsers] = useState([]) // semua users
  const [otherUserByUniqueId, setOtherUserByUniqueId] = useState([]) // simpan data user lain yg diget berdasarkan unique_id
  const [userChats, setUserChats] = useState() // seluruh data percakapan / data table chats, otomatis terupdate berdasarkan notif & newMessage (socket.io)
  const [potentialChats, setPotentialChats] = useState([]) // user lain yg belum ngobrol sama kita
  const [currentChat, setCurrentChat] = useState(null) // state penampung ketika user di userbox di klik, menyimpan percakapan/chat
  const [userOrMessageDel, setUserOrMessageDel] = useState(null) // untuk merefresh get data chat / messages dibawah
  const [messages, setMessages] = useState(null) // socket.io // menampung semua pesan yg di pilih dari user yg ada di userbox, yg dikirim ke client
  const [sendTextMessageError, setSendTextMessageError] = useState(null)
  const [newMessage, setNewMessage] = useState(null) // socket.io // penampung message yg dikirim dari socket io, diterukan ke messages
  const [socket, setSocket] = useState(null) // socket.io // baseurl socket.io
  const [onlineUsers, setOnlineUsers] = useState([]) // socket.io // status online/offline user (socket.io)
  const [notifications, setNotifications] = useState([]) // socket.io // state penampung notif pesan

  // console.log("userChats", userChats)
  // console.log("currentChat", currentChat)
  // const recipientUniqueId = currentChat?.members.find((unique_id) => unique_id !== user?.unique_id)
  // console.log('recipientUniqueId', recipientUniqueId)

/* socket.io-client */ 

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);
    return () => { // cleanup function
      newSocket.disconnect()
    }
  }, [user])


  // add online user
  useEffect(() => {
    if(socket === null) return
    socket.emit("addNewUser", user?.unique_id)
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res)
    })
  }, [socket])


  // send/kirim message realtime
  useEffect(() => {
    if(socket === null) return
    const recipientUniqueId = currentChat?.members.find((unique_id) => unique_id !== user.unique_id)
    socket.emit("sendMessage", {...newMessage, recipientUniqueId})
  }, [newMessage])  


  // recieve/terima message & notification
  useEffect(() => {
    if(socket === null) return
    socket.on("getMessage", res => {
      if(currentChat.chat_unique_id !== res.chat_unique_id) return
      setMessages((prev) => [...prev, res])
    })
    socket.on("getNotification", res => {
      const isChatOpen = currentChat?.members.some(unique_id => unique_id === res.senderId)
      if(isChatOpen) {
        setNotifications((prev) => [{ ...res, isRead: true }, ...prev]);
      } else {
        setNotifications((prev) => [res, ...prev]);
      }
    })
    return () => {
      socket.off("getMessage")
      socket.off("getNotification")
    }
  }, [socket, currentChat]) 


/* END socket.io-client */ 


  
  useEffect(() => {
    const getUsers = async () => {
      const response = await getAllUser(); // get semua user (none admin)
      if (response.error) {
        return console.log("Error fetch users", response)
      }
      const pChats = response.data.filter((u) => { // cari user mana saja yg pernah ngobrol dengan kita
        let isChatCreated = false
        if (user?.unique_id == u?.unique_id) return false
        if (userChats) { // cek jika pernah ngobrol
          isChatCreated = userChats?.some((chat) => {
            return chat.members[0] === u.unique_id || chat.members[1] === u.unique_id // cek jika ada unique_id kita di field members semua user 
          })
        }
        return !isChatCreated
      });
      setPotentialChats(pChats)
      setAllUsers(response.data)
    }
    getUsers()
  }, [user])


  // untuk data di userBox : last_message
  useEffect(() => {
    const getAllUserChat = async () => {
      const response = await findAllUserChats(); // get percakapan yg ada kitanya, berdasarkan unique_id hasil decoded token
      if (response.status[1] === 'Success') {
        setUserChats(response?.data);
      }
    }
    getAllUserChat()
  }, [navigate, newMessage, notifications])

  
  useEffect(() => {
    const getMessages = async () => {
      if (currentChat?.chat_unique_id) {
        const response = await findAllUserChatsByChatUniqueId(currentChat.chat_unique_id); 
        if (response.status[1] === 'Success') {
          setMessages(response.data);
        }
      }
    }
    getMessages()
  }, [currentChat, userOrMessageDel])


  // kirim pesan di chatBox | before : textMessage, sender, currentChatId, setTextMessage
  const sendTextMessage = useCallback( async(textMessage, chat_unique_id, setTextMessage) => {
    if (!textMessage) return console.log("Tulis sesuatu...")
    const response = await createUserMessage(textMessage, chat_unique_id, setTextMessage);
    if (response.error) {
      return setSendTextMessageError(response.message)
    }
    setNewMessage(response.data)
    setMessages((prev) => [...prev, response.data])
    setTextMessage("")
  }, [])


  // hapus semua riwayat pesan / message by chat_unique_id
  const deleteAllMessage = useCallback( async(chat_unique_id, setTextMessage) => {
    const response = await deleteAllMessageByUniqueId(chat_unique_id, setTextMessage);
    if (response.error) {
      return console.error("Error delete all messages")
    }
    const toastMessage = response.message
    setMessages(null)
    setUserOrMessageDel(true)
    toast.success(toastMessage, {
      duration: 2500,
    });
  }, [])


  // update User Chat 
  const updateUserChat = useCallback( async(friend, friend_req, chat_unique_id, setTextMessage) => {
    const response = await updateUserByChatUniqueIdChat(friend, friend_req, chat_unique_id, setTextMessage);
    console.log(response)
    if (response.error) {
      return console.error("Error delete all messages")
    }
    setMessages(null)
    localStorage.setItem('toastMessage', response.message);
    window.location.reload();
  }, [])


  // hapus semua riwayat pesan / message by chat_unique_id
  const deleteUserChat = useCallback( async(chat_unique_id, setTextMessage) => {
    const response = await deleteUserChatByUniqueId(chat_unique_id, setTextMessage);
    if (response.error) {
      return console.error("Error delete all messages")
    }
    setMessages(null)
    localStorage.setItem('toastMessage', response.message);
    window.location.reload();
  }, [])

  // menyimpan percakapan ke currentChat, berdasarkan userBox yg diklik
  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat) 
  },[])

  // klik notif pesan, langsung mengarah ke pesannya
  const markNotifificationAsRead = useCallback((n, userChats, user, notifications) => {
    // find chat to open
    const desiredChat = userChats.find((chat) => { 
      const chatMembers = [user.unique_id, n.senderId];
      const isDesiredChat = chat?.members.every((member) => {
        return chatMembers.includes(member);
      })
      return isDesiredChat
    })
    // mark notif as read / notif jadi terbaca
    const mNotifications = notifications.map(el => { 
      if(n.senderId === el.senderId) {
        return { ...n, isRead: true }
      } else {
        return el
      }
    })
    updateCurrentChat(desiredChat) // arahkan ke chatBox
    setNotifications(mNotifications) // update keadaan notif jadi read
  }, [])

  // menghapus notif di userBox dan notif ketika user userBox diklik
  const markThisUserNotificationsAsRead = useCallback((thisUserNotifications, notifications) => {
    // mark notif as read
    const mNotifications = notifications.map(el => {
      let notification;
      thisUserNotifications.forEach(n => {
        if(n.senderId === el.senderId) {
          notification = { ...n, isRead: true }
        } else {
          notification = el 
        }
      })
      return notification
    })
    setNotifications(mNotifications)
  }, [])

  return (
    <ChatContext.Provider value={{
      user, setUser,
      otherUserByUniqueId, setOtherUserByUniqueId,
      userChats,
      potentialChats, 
      updateCurrentChat,
      currentChat,
      messages,
      sendTextMessage,
      deleteAllMessage,
      updateUserChat,
      deleteUserChat,
      onlineUsers,
      notifications,
      allUsers, 
      markNotifificationAsRead,
      markThisUserNotificationsAsRead,
    }}>
      {children}
    </ChatContext.Provider>
  )
}



/* LIST STATE REACT CONTEXT */
// ChatFriendList | Menampung data yang dibutuhkan di Chat Box : masih data dummy
// userChats | /chats/find-all | Cari semua obrolan chat yang ada kitanya , untuk user box
