import { createContext, useCallback, useEffect, useState } from 'react';
import { testSession, userProfile } from '../modules/fetch';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const navigate = useNavigate()
  const [userState, setUserState] = useState({}); // data profile kita
  const [img_profile_link, set_img_profile_link] = useState("");
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
      const ambilRole = await testSession()
      if (ambilRole.tokenDecoded.user_role_id == 1) { // kondisi admin / bukan ada disini
        setIsAdmin(true)
      } else {
        setIsAdmin(false)
      }
        const response = await userProfile(); // get semua data profile mu
        if (response.status[1] === 'Success') {
          setUserState(response.data); //mengerim response get diatas ke react context
        }
      }
      catch (err) {
        // console.log(err)
      }
    };
    fetchData();
  }, [navigate]) // ini artinya akan berjalan tanpa refresh

  const updateUser = useCallback((response) => {
    localStorage.setItem("User", JSON.stringify(response));
    setUserState(response);
  }, []);

  return (
    <UserContext.Provider value={{
      userState, setUserState,
      img_profile_link,
      set_img_profile_link,
      isAdmin, setIsAdmin,
      updateUser,
    }}>
      {children}
    </UserContext.Provider>
  );
};

/* LIST STATE REACT CONTEXT */
// userState | /profile | ambil data user yang kita login kan
// img_profile_link | di set & dipke di Navbar | berisi link statis dari masing masing user yg kita login kan