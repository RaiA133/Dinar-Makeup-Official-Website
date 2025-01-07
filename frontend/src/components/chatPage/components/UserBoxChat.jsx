import { useContext } from "react"
import { useFetchRecipientUser } from "../../../hooks/useFetchRecipient"
import { ChatContext } from "../../../contexts/ChatContext"
import { unreadNotificationsFunc } from "../../../utils/unreadNotificationsFunc"
import moment from "moment"

const UserBoxChat = ({ chat, user }) => { // seluruh percakapan yg ada kitanya (sudah di map, tinggal taro dibawah langsung keforeach), profilekita
  const recipientUser = useFetchRecipientUser(chat, user) // profile user yg ngobrol sama kita (hooks)
  const otherUserData = recipientUser[0] 
  const otherUserPic = `${import.meta.env.VITE_BACKEND_BASEURL}/profile/picture/${otherUserData?.img_profile}`
  const { onlineUsers, notifications, markThisUserNotificationsAsRead } = useContext(ChatContext)
  const unreadNotifications = unreadNotificationsFunc(notifications)
  const thisUserNotifications = unreadNotifications?.filter(
    n => n.senderId === recipientUser[0]?.unique_id
  )
  const isOnline = onlineUsers?.some((user) => user?.userUniqueId === otherUserData?.unique_id)


  return (
    <div 
      className="w-full indicator col-span-1 py-2 px-3 bg-base-200 card shadow mt-2" 
      title={otherUserData?.name}
      onClick={() => {
        if(thisUserNotifications?.length !== 0) {
          markThisUserNotificationsAsRead(thisUserNotifications, notifications)
        }
      }}
    >
      { isOnline && <span className="indicator-item badge badge-success" />}
      <button className="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50">
        <div className="flex items-center text-xs">
          <img className="rounded-full items-start flex-shrink-0 mr-3 w-10 h-10" src={otherUserPic} alt="Byrne McKenzie" />
          <div className="overflow-hidden w-full">
            <h4 className="text-sm font-semibold text-gray-900 truncate ...">
              <span>{otherUserData?.username || 'Deleted User'}</span>
            </h4>
            <div className="text-[13px] flex justify-between">
              <span className="truncate w-44">{chat?.last_message || 'Belum ada pesan'}</span>
              <span className="ms-0 sm:ms-2 text-end">{moment(chat?.updatedAt).calendar()}</span>
            </div>
          </div>
          <div className="avatar placeholder ms-2">
            {thisUserNotifications?.length > 0 && (
              <div className="bg-secondary text-secondary-content rounded-full w-6">
                <span className="text-xs">{thisUserNotifications?.length > 0 ? thisUserNotifications?.length : ''}</span>
              </div>
            )}
          </div>
        </div>
      </button>
    </div>
  )
}

export default UserBoxChat