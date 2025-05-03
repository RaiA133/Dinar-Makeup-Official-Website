import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster } from "react-hot-toast";

function ForgotPasswordPage() {
  const navigate = useNavigate()

  return (
    <div className='px-0'>

      <div className="h-screen flex justify-center items-center">
        <div className="card w-96 bg-base-100 shadow-xl">

          <Toaster
            toastOptions={{
              style: {
                maxWidth: '600px'
              }
            }}
          />

          <div className="card-body gap-0">
            <div className="card-actions justify-between mb-5">
              <h2 className="card-title text-2xl">Forget Password</h2>
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
                  );
                  if (response.status === 200) {
                    const successMessage = response.message;
                    window.localStorage.setItem('toastMessage', successMessage);
                    window.localStorage.setItem("token", response.jwt.access_Token);
                    navigate("/")
                  }
                }
                catch (error) {
                  let failedMessage = error.message // data message dari authController BE
                  toast.error(failedMessage, {
                    duration: 2500,
                  });
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


              <div className="card-actions mt-4">
                <button
                  className="btn btn-primary w-full"
                  type="submit"
                  form="login-form"
                >Reset Password</button>
              </div>

            </form>

          </div>
        </div>
      </div>

    </div>
  )
}

export default ForgotPasswordPage