// src/components/GoogleLoginButton.jsx
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import Cookies from "js-cookie";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { loginGoogle } from "../../modules/fetch";

function GoogleLoginButton() {
  const navigate = useNavigate();

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

            navigate("/");
          }
        } catch (error) {
          console.error('Login failed:', error);
          toast.error('Login gagal. Coba lagi.', { duration: 2500 });
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
