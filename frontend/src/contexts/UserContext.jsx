import { createContext, useCallback, useEffect, useState } from 'react';
import { getMe } from '../modules/fetch';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const navigate = useNavigate()
  const [userState, setUserState] = useState({}); // data profile kita
  const [img_profile_link, set_img_profile_link] = useState("");
  const [isLogin, setIsLogin] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMe(); // get semua data profile mu
        if (response.status === 200) {
          setIsLogin(true)
          
          if (response.data.role == "admin") setIsAdmin(true) // kondisi admin / bukan ada disini
          else setIsAdmin(false)

          setUserState(response.data); //mengirim response get diatas ke react context
        } else setIsLogin(false)
      }
      catch (err) { // Auto Logout ketika SESSION Habis
        setIsLogin(false)
        Cookies.remove("token");
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
      isLogin, setIsLogin,
      isAdmin, setIsAdmin,
      updateUser,
    }}>
      {children}
    </UserContext.Provider>
  );
};

/* LIST STATE REACT CONTEXT */
// userState | /me | ambil data user yang kita login kan
// img_profile_link | di set & dipke di Navbar | berisi link statis dari masing masing user yg kita login kan