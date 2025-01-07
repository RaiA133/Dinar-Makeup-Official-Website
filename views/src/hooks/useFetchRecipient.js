import { useEffect, useState } from "react"
import { getUserByUniqueIdChat } from "../modules/fetch/index"

export const useFetchRecipientUser = (chat, user) => { // seluruh percakapan yg ada kitanya, profilekita
  const [recipientUser, setRecipientUser] = useState({}) // data user lain yg ngobrol sama kita
  const [error, setError] = useState(false)
  const recipientUniqueId = chat?.members?.filter((chat_unique_id) => chat_unique_id !== user?.unique_id)

  useEffect(() => {
    const getUser = async () => {
      if(!recipientUniqueId) return null
      const response = await getUserByUniqueIdChat(recipientUniqueId); // get semua user (none admin)
      setRecipientUser(response?.data)
      if (response.data === null) {
        setRecipientUser({username: "-", status: "offline"})
        return setError(true)
      }
    }
    getUser()
  }, [chat, user])

  // useEffect(() => { // untuk cek
  //   console.log('chat', chat);
  // }, [chat]);

  
  return [recipientUser, error]
}