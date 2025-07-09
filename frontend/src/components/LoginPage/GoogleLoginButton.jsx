// src/components/GoogleLoginButton.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { loginGoogle } from "../../modules/fetch";
import { UserContext } from '../../contexts/UserContext';
import toast from 'react-hot-toast';
import Cookies from "js-cookie";

function GoogleLoginButton({ redirectTo = "/" }) {
  const navigate = useNavigate();
  const { refreshCallback } = useContext(UserContext)

  return (
    <GoogleLogin
      className="btn bg-white text-black border-[#e5e5e5]"
      onSuccess={async (credentialResponse) => {
        try {
          const response = await loginGoogle(credentialResponse.credential);
          if (response.status === 200) {
            toast.success(response.message, { duration: 2500 });

            Cookies.set("token", response.data.access_Token, {
              expires: 1,
              path: "/",
              secure: true,
              sameSite: "strict",
            });

            refreshCallback();
            navigate(redirectTo);
          }
        } catch (error) {
          console.error('Login failed:', error);
        }
      }}
      onError={() => {
        toast.error('Google login gagal.', { duration: 2500 });
      }}
      auto_select={true}
      useOneTap
      text="continue_with"
    />
  );
}

export default GoogleLoginButton;
