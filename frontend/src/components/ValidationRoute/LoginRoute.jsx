import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { UserContext } from "../../contexts/UserContext";

export const LoginRouteContext = createContext();

// LoginRoute akan selalu berjalan di page yg dibungkus oleh route ini
function LoginRoute({
  children,
  ...rest
}) {
  const navigate = useNavigate();
  const {isLogin, setIsLogin} = useContext(UserContext);
  
  useEffect(() => {
    try {
      const token = Cookies.get("token");
      if (!token || !isLogin) {
        localStorage.setItem('toastMessage', 'token is expired')
        navigate("/login");
        return;
      } else setIsLogin(true);
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  }, [isLogin]);


  return (
    <div>
      <LoginRouteContext.Provider value={{}}>
        {isLogin ? (
          children
        ) : (
          // loading animation
          <div className="flex justify-center items-center h-screen">
            <span className="loading loading-spinner loading-lg"></span> 
          </div>
        )}
      </LoginRouteContext.Provider>
    </div>
  );
}

export default LoginRoute