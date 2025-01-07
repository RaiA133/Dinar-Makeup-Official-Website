import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import BellAlert from '../assets/icon/bell-alert.svg'
import { getUserByUniqueIdChat } from "../modules/fetch"
import { ChatContext } from "../contexts/ChatContext";
import { unreadNotificationsFunc } from "../utils/unreadNotificationsFunc";
import moment from "moment";

const Notification = () => {
  const navigate = useNavigate()
  const { 
    user, userChats, notifications, 
    allUsers, otherUserByUniqueId, 
    setOtherUserByUniqueId, updateUserChat, 
    setTextMessage, markNotifificationAsRead 
  } = useContext(ChatContext)
  const friendReqActive = userChats?.filter(item => item.friend_req !== null); // data percakapan/obrolan yg belum acc friend request
  const friendReqSender = friendReqActive && friendReqActive?.length > 0 ? friendReqActive : null 
  

  useEffect(() => {
    const getAllUserChat = async () => {
      if (userChats && userChats.length > 0) { // memastikan userChats tidak kosong sebelum buat request
        const responses = await Promise.all( // menggunakan Promise.all untuk execute requests bersamaan
          userChats.map(async (chat) => {
            const response = await getUserByUniqueIdChat(chat.friend_req); // friend_req = unique_id pengirim request friend yg ingin digunakan untuk request mencari user berdasarkan siapa yg ngirim (isi friend_req)
            return response;
          })
        );
        if (responses && responses.every(response => response !== null)) {  // menyatukan semua hasil request ke 1 buah array, jika null jangan kirim
          const allData = responses.reduce((acc, response) => {
            if (response.status[1] === 'Success') {
              return acc.concat(response.data);
            }
            return acc;
          }, []);
          const filteredData = allData.filter(item => item !== null); // Filter elemen-elemen yang bukan null
          setOtherUserByUniqueId(filteredData); // update ke otherUserByUniqueId
        }
      }
    };
    getAllUserChat();
  }, [userChats]);



  const newArrayForUserChatUpdate = friendReqSender?.map((friendReq) => {
    const user = otherUserByUniqueId?.find((user) => user?.unique_id === friendReq?.friend_req);
    const receiverUserUniqueId = friendReq.members.filter(member => member !== friendReq.friend_req); // data unique_id user yg dikirim friend_req
    const receiverUsername = allUsers.find(user => user?.unique_id === receiverUserUniqueId[0]); // data profile user yg dikirim friend_req
    return { // memfilter data yg dibutuhkan saja untuk notifikasi dibawah
      chat_unique_id: friendReq?.chat_unique_id,
      friend_req: friendReq?.friend_req,
      username: user ? user?.username : null,
      to: receiverUsername?.username
    };
  });
  function handleOnUserChatUpdate(friend, friend_req, chat_unique_id) {
    updateUserChat(friend, friend_req, chat_unique_id, setTextMessage)
  }


  // notif pesan message
  const unreadNotifications = unreadNotificationsFunc(notifications) // mencari notif yg belum di read
  const modifiedNotifications = notifications.map((n) => {
    const sender = allUsers.find((user) => user?.unique_id === n.senderId) // senderId = sender_unique_id
    return {
      ...n,
      senderName: sender?.username
    }
  })
  // console.log("un", unreadNotifications)
  // console.log("mn", modifiedNotifications)


  
  return (
    <div className="flex-none">
      <ul className="menu menu-horizontal px-0 relative">
        <li>
          <details className="">
            <summary>
              <div className="indicator">
                {/* {otherUserByUniqueId[0]?.unique_id && ( // notif count friend req pending & acc incoming friend req
                  <span className="indicator-item indicator-middle indicator-start badge badge-secondary ms-[-15px]">
                    {otherUserByUniqueId.length + notifications.length || 0}
                  </span>
                )} */}
                {/* {otherUserByUniqueId[0]?.unique_id && otherUserByUniqueId[0]?.unique_id !== user?.unique_id && ( // notif count only acc incoming friend req
                  <span className="indicator-item indicator-middle indicator-start badge badge-secondary ms-[-15px]">
                    {otherUserByUniqueId.length + notifications.length || 0}
                  </span>
                )} */}
                {/* {notifications?.length > 0 ( // notif chat masuk saja
                  <span className="indicator-item indicator-middle indicator-start badge badge-secondary ms-[-15px]">
                    {otherUserByUniqueId.length + notifications.length || 0}
                  </span>
                )} */}
                {(unreadNotifications?.length !== 0 || (otherUserByUniqueId[0]?.unique_id && otherUserByUniqueId.length > 0)) && ( // notif chat masuk, friend req, friend req pending
                  <span className="indicator-item indicator-middle indicator-start badge badge-secondary ms-[-15px]">
                    {otherUserByUniqueId.length + unreadNotifications.length || 0}
                  </span>
                )}
                <div>
                  <img src={BellAlert} width={20} />
                </div>
              </div>
            </summary>

            {notifications?.length > 0 || newArrayForUserChatUpdate && newArrayForUserChatUpdate?.length > 0 && newArrayForUserChatUpdate[0] !== null ? (
              <ul className="p-2 bg-base-200 rounded-t-none rounded-box w-56 absolute right-0 z-10">
                {/* NOTIF FRIEND REQUEST / ACC FRIEND REQUEST */}
                {newArrayForUserChatUpdate?.map(userNotif => (
                  <li key={userNotif?.chat_unique_id}>
                    {userNotif?.friend_req === user?.unique_id ? (
                      <div className="flex" title={moment(userNotif.date).calendar()}>
                        <a className="text-xs">Cencel friend request to <span className="font-bold">{userNotif?.to}</span></a>
                        <button className="btn btn-xs btn-neutral" onClick={() => handleOnUserChatUpdate(false, null, userNotif?.chat_unique_id)}>X</button>
                      </div>
                    ) : (
                      <div className="flex" title={moment(userNotif.date).calendar()}>
                        <a className="text-xs">You have a friend request from <span className="font-bold">{userNotif?.username}</span></a>
                        <button className="btn btn-xs btn-primary" onClick={() => handleOnUserChatUpdate(true, null, userNotif?.chat_unique_id)}>✓</button>
                        <button className="btn btn-xs btn-neutral" onClick={() => handleOnUserChatUpdate(false, null, userNotif?.chat_unique_id)}>X</button>
                      </div>
                    )}
                  </li>
                ))}
                {/* NOTIF MESSAGE */}
                {modifiedNotifications && modifiedNotifications.map((n, index) => (
                  <li 
                    key={index} 
                    className={n.isRead ? `bg-base-300` : ``} 
                    title={n.isRead ? `Sudah dibaca` : ``}
                    onClick={() => {
                      navigate("/chat")
                      markNotifificationAsRead(n, userChats, user, notifications)
                    }}
                  >
                    <div className="flex">
                      <a className="text-xs">You have a message from
                        <span className="font-bold"> {n.senderName}</span>
                        <span className=""> {moment(n.date).calendar()}</span>
                      </a>
                      {!n.isRead && (
                        <button 
                          className="btn btn-xs btn-primary" 
                          onClick={() => {
                            navigate("/chat")
                            markNotifificationAsRead(n, userChats, user, notifications)
                          }}
                        >See</button>
                      )} 
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="p-2 bg-base-200 rounded-t-none rounded-box w-56 absolute right-0 z-10">
                <p className="pb-2 text-center">Anda tidak memiliki notifikasi</p>
              </ul>
            )}

          </details>
        </li>
      </ul>
    </div>
  );
}

export default Notification;