import { createContext, useCallback, useEffect, useState } from 'react';
import { getMe, GetAllMyTransaction } from '../modules/fetch';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { googleLogout } from '@react-oauth/google';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const navigate = useNavigate()
  const [userState, setUserState] = useState({}); // data profile kita
  const [allMyTransaction, setAllMyTrasaction] = useState([]) // semua history transaksi kita
  const [img_profile_link, set_img_profile_link] = useState("");
  const [isLogin, setIsLogin] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  const [refresh, setRefresh] = useState(0); // use this on useEffect that set from callback below
  
  useEffect(() => {

    const checkLogin = async () => {
      try {
        const response = await getMe(); // get semua data profile mu
        if (response.status === 200) {
          setIsLogin(true)
          if (response.data.role == "admin") setIsAdmin(true) // kondisi admin / bukan ada disini
          else setIsAdmin(false)
          setUserState(response.data); //mengirim response get diatas ke react context
        } else {
          googleLogout();
          setIsLogin(false);
        }
      }
      catch (err) { // Auto Logout ketika SESSION Habis
        googleLogout();
        setIsLogin(false);
        Cookies.remove("token");
      }
    };
    checkLogin();

    const fetchDataGetAllMyTransaction = async () => { // path = /transaction
      try {
        const response = await GetAllMyTransaction(); // Fetch data
        if (response.status === 200) setAllMyTrasaction(response.data); // Set state if the response is successful
      } catch (error) {
        console.error("Error : ", error);
      }
    };
    if (location.pathname == "/transactions") fetchDataGetAllMyTransaction();

  }, [navigate, refresh]) // ini artinya akan berjalan tanpa refresh

  const updateUser = useCallback((response) => {
    localStorage.setItem("User", JSON.stringify(response));
    setUserState(response);
  }, []);

  const refreshCallback = useCallback(() => {
    setRefresh(Math.random())
  }, []);

  return (
    <UserContext.Provider value={{
      userState, setUserState,
      allMyTransaction, setAllMyTrasaction,
      img_profile_link,
      set_img_profile_link,
      isLogin, setIsLogin,
      isAdmin, setIsAdmin,
      updateUser,
      refreshCallback,
    }}>
      {children}
    </UserContext.Provider>
  );
};

/* LIST STATE REACT CONTEXT */
// userState | /me | ambil data user yang kita login kan
// img_profile_link | di set & dipke di Navbar | berisi link statis dari masing masing user yg kita login kan