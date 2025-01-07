import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { testSession } from "../modules/fetch";

export const DecodedTokenContext = createContext();

function PrivateRoute({
  children,
  ...rest
}) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [decodedTokenState, setDecodedTokenState] = useState()

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = window.localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const response = await testSession() // memanggil test session di fetch untuk menjalankan testSession di backend dengan middleware yg sudah dibuat
        if (response.status[1] === 'Success') {
          setDecodedTokenState(response.tokenDecoded) // mengirim hasil decoded dari token ke halaman yg di private dengan ReactContext
          setIsLogin(true);
        } else {
          navigate("/login");
        }
      } catch (error) {
        const successMessage = error.message;
        window.localStorage.setItem('toastMessage', successMessage); // toast yang dikirim ke halaman login jika sesi login berakhir
        window.localStorage.removeItem('token');
        console.error('Error checking login status:', error);
        navigate("/login");
      }
    };

    checkLoginStatus();
  }, [navigate]);


  return (
    <div>
      <DecodedTokenContext.Provider value={{ decodedTokenState, setDecodedTokenState }}>
        {isLogin ? (
          children
        ) : (
          // loading animation
          <div className="flex justify-center items-center h-screen">
            <span className="loading loading-spinner loading-lg"></span> 
          </div>
        )}
      </DecodedTokenContext.Provider>
    </div>
  );
}

export default PrivateRoute