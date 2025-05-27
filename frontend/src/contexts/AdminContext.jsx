import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getAllUsers } from "../modules/fetch";
import { useLocation, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";


export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  let location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [usersState, setUsersState] = useState([]);
  const [usersByIDState, setUsersByIDState] = useState([]);
  const [refresh, setRefresh] = useState(0); // use this on useEffect that set from callback below

  useEffect(() => { // path = /admin/user-management
    const fetchData = async () => {
      try {
        let page = parseInt(searchParams.get("page"));
        let limit = parseInt(searchParams.get("limit")); 
        // limit = 1 // custom limit
        const response = await getAllUsers({page, limit}); // Fetch data
        if (response.status === 200) setUsersState(response.data); // Set state if the response is successful
      } catch (error) {
        console.error("Error : ", error);
      }
    };
    if (location.pathname == "/admin/user-management") fetchData();
  }, [navigate, searchParams, refresh]);

  const refreshCallback = useCallback(() => {
    setRefresh(Math.random())
  }, []);

  return <AdminContext.Provider value={{
    usersState, setUsersState,
    usersByIDState, setUsersByIDState,
    refreshCallback,
  }}>{children}</AdminContext.Provider>
}