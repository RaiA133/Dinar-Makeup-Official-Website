import { createContext, useEffect, useState } from "react";
import { getAllProducts } from "../modules/fetch";
import { useNavigate } from "react-router-dom";


export const ProductsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [productsState, setProductsState] = useState([]);
  const [productsByIDState, setProductsByIDState] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllProducts(); // Fetch data
        if (response.status === 200) setProductsState(response.data); // Set state if the response is successful
      } catch (error) {
        console.error("Error : ", error);
      }
    };
    fetchData();
  }, [navigate]); // Re-fetch data when navigate changes

  return <ProductsContext.Provider value={{
    productsState, setProductsState,
    productsByIDState, setProductsByIDState
  }}>{children}</ProductsContext.Provider>
}