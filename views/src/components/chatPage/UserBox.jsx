import { useContext } from "react"
import { ChatContext } from "../../contexts/ChatContext"
import { UserContext } from "../../contexts/UserContext"
import UserBoxModal from "./components/UserBoxModal"
import UserBoxChat from "./components/UserBoxChat";

function UserBox() {
  const { userChats, updateCurrentChat } = useContext(ChatContext) // seluruh data percakapan
  const { userState } = useContext(UserContext) // data profile kita
  // console.log('unique_id saya : ', userState.unique_id)
  // console.log('chat yg ada sayanya : ', userChats)

  return (
    <div className='col-span-1'>

      <div role="tablist" className="tabs tabs-lifted mt-5">

        {/* FRIEND MESSAGE */}
        <input type="radio" name="my_tabs_2" role="tab" className="tab font-bold w-20 xl:w-40" aria-label="Friend" defaultChecked />
        <div role="tabpanel" className="tab-content bg-base-100 rounded-box p-5 h-96 overflow-auto">

          {/* FRIEND BOX */}
          {userChats?.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            .filter(chat => chat.friend === true)
            .map((chat, index) => (
              <div key={index} onClick={() => updateCurrentChat(chat)}>
                <UserBoxChat chat={chat} user={userState} />
              </div>
            ))}

        </div>

        {/* DIRECT MESSAGE */}
        <input type="radio" name="my_tabs_2" role="tab" className="tab font-bold w-44" aria-label="Direct Message" />
        <div role="tabpanel" className="tab-content bg-base-100 rounded-box p-5 h-96 overflow-auto">

        {userChats?.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            .filter(chat => chat.friend === false)
            .map((chat, index) => (
              <div key={index} onClick={() => updateCurrentChat(chat)}>
                <UserBoxChat chat={chat} user={userState} />
              </div>
            ))}

        </div>

      </div>

      {/* MODAL ADD FRIENDs */}
      <UserBoxModal />

    </div>
  )
}


export default UserBox