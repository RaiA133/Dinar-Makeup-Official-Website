import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const DecodedTokenContext = createContext();

function LoginRoute({
  children,
  ...rest
}) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [decodedTokenState, setDecodedTokenState] = useState()

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          navigate("/login");
          return;
        } else {
          setIsLogin(true);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
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

export default LoginRoute