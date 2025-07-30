import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getAIHistory, getAllProducts, getAllTrasaction, getAllUsers } from "../modules/fetch";
import { useLocation, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";


export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  let location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [productsState, setProductsState] = useState([]);
  const [productsByIDState, setProductsByIDState] = useState([]);

  const [usersState, setUsersState] = useState([]);
  const [usersByIDState, setUsersByIDState] = useState([]);

  const [transcactionState, setTranscactionState] = useState([]);

  const [AIHistoryState, setAIHistoryState] = useState([]);

  const [refresh, setRefresh] = useState(0); // use this on useEffect that set from callback below
  

  useEffect(() => { 

    const fetchDataProductManagement = async () => { // path = /admin/product-management
      try {
        // console.log('refresh /admin/product-management');
        const response = await getAllProducts(); // Fetch data
        if (response.status === 200) setProductsState(response.data); // Set state if the response is successful
      } catch (error) {
        console.error("Error : ", error);
      }
    };
    if (location.pathname == "/admin/product-management" || "/admin" || "/admin/dashboard") fetchDataProductManagement();

    // ----------------------------------------------------------------------------------------------------------------------------------

    const fetchDataUserManagement = async () => { // path = /admin/user-management
      try {
        // console.log('refresh /admin/user-management');
        let page = parseInt(searchParams.get("page"));
        let limit = parseInt(searchParams.get("limit")); // default = 1000
        if (location.pathname ==  "/admin" || "/admin/dashboard") limit = 99999999999999 // custom limit
        const response = await getAllUsers({page, limit: 10}); // Fetch data | limit 10
        if (response.status === 200) setUsersState(response.data); // Set state if the response is successful
      } catch (error) {
        console.error("Error : ", error);
      }
    };
    if (location.pathname == "/admin/user-management" || "/admin/ai" || "/admin" || "/admin/dashboard") fetchDataUserManagement();

    // ----------------------------------------------------------------------------------------------------------------------------------

    const fetchDataTransactionManagement = async () => { // path = /admin/transaction-management
      try {
        // console.log('refresh /admin/transaction-management');
        let page = parseInt(searchParams.get("page"));
        let limit = parseInt(searchParams.get("limit")); // default = 1000
        if (location.pathname ==  "/admin" || "/admin/dashboard") limit = 99999999999999  // custom limit
        const response = await getAllTrasaction({page, limit: 10}); // Fetch data | limit 10
        if (response.status === 200) setTranscactionState(response.data); // Set state if the response is successful
      } catch (error) {
        console.error("Error : ", error);
      }
    };
    if (location.pathname == "/admin/transaction-management" || "/admin" || "/admin/dashboard") fetchDataTransactionManagement();

    // ----------------------------------------------------------------------------------------------------------------------------------

    const fetchDataAI = async () => { // path = /admin/ai
      try {
        // console.log('refresh /admin/ai');
        let user_id = parseInt(searchParams.get("user_id"));
        const response = await getAIHistory(); // Fetch data
        if (response.status === 200) setAIHistoryState(response.data); // Set state if the response is successful
      } catch (error) {
        console.error("Error : ", error);
      }
    };
    if (location.pathname == "/admin/ai") fetchDataAI();

    // ----------------------------------------------------------------------------------------------------------------------------------

  }, [navigate, searchParams, refresh]);

  const refreshCallback = useCallback(() => {
    setRefresh(Math.random())
  }, []);

  return <AdminContext.Provider value={{
    productsState, setProductsState,
    productsByIDState, setProductsByIDState,
    usersState, setUsersState,
    usersByIDState, setUsersByIDState,
    transcactionState, setTranscactionState,
    AIHistoryState, setAIHistoryState,
    refreshCallback,
  }}>{children}</AdminContext.Provider>
}