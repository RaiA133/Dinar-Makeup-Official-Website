import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, loginGoogle } from "../../modules/fetch";
import toast, { Toaster } from 'react-hot-toast';
import Cookies from "js-cookie";
import { GoogleLogin } from '@react-oauth/google';

function LoginPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // toast akan muncul jika sesi login jwt berhakhir | ubah JWT_EXPIRED_TIME di .env untuk test
  useEffect(() => {
    const toastMessage = localStorage.getItem('toastMessage')
    if (toastMessage == "token is expired") {
      toast.error("Login Session is Expired", {
        duration: 2500,
      });
      localStorage.removeItem('toastMessage');
    }
  }, []);



  return (
    <div className='px-0'>

      <div className="h-screen flex justify-center items-center">
        <div className="card absolute sm:relative sm:shadow-xl top-0 w-96 bg-base-100">

          <Toaster
            toastOptions={{
              style: {
                maxWidth: '600px'
              }
            }}
          />

          <div className="card-body gap-0">
            <div className="card-actions justify-between mb-5">
              <h2 className="card-title text-2xl">Login</h2>
              <button className="btn btn-square btn-sm" onClick={() => navigate("/")}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <form
              className='mt-2'
              id="login-form"
              onSubmit={async (e) => {

                e.preventDefault();
                try {
                  const response = await login(
                    e.target.email.value,
                    e.target.password.value
                  );
                  if (response.status === 200) {
                    const successMessage = response.message;
                    // window.localStorage.setItem('toastMessage', successMessage);

                    toast.success(successMessage, {
                      duration: 2500,
                    });

                    // Set cookie
                    Cookies.set("token", response.data.access_Token, {
                      expires: 1, // 1 hari
                      path: "/",
                      secure: true,
                      sameSite: "strict",
                    });

                    navigate("/")
                  }
                }
                catch (error) {
                  toast.error(error.response.data.message, {
                    duration: 2500,
                  });
                  return
                }
              }}
            >

              <div className="form-control w-full">
                <label className="label"><span className="label-text">Email</span></label>
                <input
                  className="input input-bordered w-full"
                  type="email"
                  name="email"
                  placeholder="Your Email"
                />
              </div>

              <div className="form-control w-full mt-4">
                <label className="label"><span className="label-text">Password</span></label>
                <input
                  className="input input-bordered w-full"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete=''
                  placeholder="Your Password"
                  required
                />
                <label className="label place-content-end">
                  <a onClick={togglePasswordVisibility} className="label-text-alt text-xs underline" style={{ cursor: 'pointer' }}>
                    {showPassword ? 'Hide Password' : 'Show Password'}
                  </a>
                </label>
              </div>

              <div className="card-actions justify-center mt-4">
                <button
                  className="btn btn-primary w-full"
                  type="submit"
                  form="login-form"
                >Login</button>
              </div>

            </form>

            <div className="divider">Atau</div>

            <div className="card-actions justify-center">
              {/* <button className="btn bg-white text-black border-[#e5e5e5]" onClick={() => login()}>
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Login with Google
              </button> */}
              <GoogleLogin
                className="btn bg-white text-black border-[#e5e5e5]"
                onSuccess={async (credentialResponse) => {
                  try {
                    // Add await to handle the Promise
                    const response = await loginGoogle(credentialResponse.credential);
                    console.log(response);

                    if (response.status === 200) {
                      const successMessage = response.message;

                      toast.success(successMessage, {
                        duration: 2500,
                      });

                      // Set cookie
                      Cookies.set("token", response.data.access_Token, {
                        expires: 1, // 1 hari
                        path: "/",
                        secure: true,
                        sameSite: "strict",
                      });

                      navigate("/");
                    }
                  } catch (error) {
                    console.error('Login failed:', error);
                    toast.error('Login failed. Please try again.', {
                      duration: 2500,
                    });
                  }
                }}
                onError={() => {
                  console.log('Login Failed');
                  toast.error('Google login failed. Please try again.', {
                    duration: 2500,
                  });
                }}
                auto_select={true}
                useOneTap
                text="continue_with"
              />
            </div>

            <div className="card-actions justify-center mt-4">
              <div className='text-center'>
                <p className='text-sm text-center'>Dont have account ?
                  <span className='underline text-sky-600 decoration-sky-600 ms-1' style={{ cursor: 'pointer' }} onClick={() => navigate("/register")}>Register</span>
                </p>
                <span className='underline text-sky-600 decoration-sky-600 ms-1' style={{ cursor: 'pointer' }} onClick={() => navigate("/forgot-password")}>Forgot Password ?</span>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default LoginPage