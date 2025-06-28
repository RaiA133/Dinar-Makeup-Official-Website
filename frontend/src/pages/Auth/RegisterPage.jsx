import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from "../../modules/fetch";
import toast, { Toaster } from 'react-hot-toast';

function RegisterPage() {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function formatMixedErrors(rawError) {
    return rawError.split(';')
      .map(err => err.trim())
      .filter(Boolean)
      .map(error => {
        // Check if it's the direct format (like password error)
        const directFormatMatch = error.match(/Field '(.*?)' (.*)/);
        if (directFormatMatch) {
          return `${directFormatMatch[1]} ${directFormatMatch[2]}`;
        }

        // Process standard validation format
        const fieldMatch = error.match(/field '(.*?)'/i);
        const tagMatch = error.match(/tag '(.*?)'/i);

        const field = fieldMatch ? fieldMatch[1] : 'This field';
        const tag = tagMatch ? tagMatch[1] : 'default';

        // Custom messages for each validation type
        const messages = {
          'alpha': 'must contain only letters',
          'email': 'must be a valid email address',
          'required': 'is required',
          'default': 'has an invalid value'
        };

        return `${field} ${messages[tag] || messages['default']}`;
      });
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // menghilankan refresh halaman jika tombol simpan di klik

    if (password !== confirmPassword) {
      return;
    }

    try {
      const response = await register(
        e.target.name.value,
        e.target.username.value,
        e.target.email.value,
        password
      );
      if (response.status === 200) {
        const successMessage = response.message;
        toast.success(successMessage, {
          duration: 6000,
        });
        setTimeout(() => {
          navigate("/login")
        }, 1000)
      }
    }
    catch (error) {
      if (error.response.data.status === 400) { // error validation
        const rawError = error.response.data.message;
        const errorMessages = formatMixedErrors(rawError);
        errorMessages.forEach(message => {
          toast.error(message, {
            duration: 2500,
          });
        });
      } else if (error.response.data.status === 500) { // email already exist
        toast.error(error.response.data.message, {
          duration: 6000,
        });
      }
      return;
    }

  }

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

          <div className="card-body gap-0 p-3 sm:p-6">
            <div className="card-actions justify-between mb-5">
              <h2 className="card-title text-2xl">Register</h2>
              <button className="btn btn-square btn-sm" onClick={() => navigate("/")}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} >

              <div className="form-control w-full">
                <label className="label"><span className="label-text">Name</span></label>
                <input
                  className="input input-bordered w-full"
                  type="text"
                  name="name"
                  placeholder="Name"
                  autoComplete='off'
                  required
                />
              </div>

              <div className="form-control w-full mt-4">
                <label className="label"><span className="label-text">Username</span></label>
                <input
                  className="input input-bordered w-full"
                  type="text"
                  name="username"
                  placeholder="Username"
                  autoComplete='off'
                  required
                />
              </div>

              <div className="form-control w-full mt-4">
                <label className="label"><span className="label-text">Email</span></label>
                <input
                  className="input input-bordered w-full"
                  type="email"
                  name="email"
                  placeholder="Email"
                  autoComplete='off'
                  required
                />
              </div>

              <div className="form-control w-full mt-4">
                <label className="label"><span className="label-text">Password</span></label>
                <input
                  className="input input-bordered w-full"
                  type={showPassword ? 'text' : 'password'}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  autoComplete='off'
                  placeholder="Password"
                  required
                />
                <label className="label place-content-end">
                  <a onClick={togglePasswordVisibility} className="label-text-alt text-xs underline" style={{ cursor: 'pointer' }}>
                    {showPassword ? 'Hide Password' : 'Show Password'}
                  </a>
                </label>
              </div>

              <div className="form-control w-full mt-4">
                <label className="label"><span className="label-text">Confirm Password</span></label>
                <input
                  className="input input-bordered w-full"
                  type={showConfirmPassword ? 'text' : 'password'}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  autoComplete='off'
                  placeholder="Confirm Password"
                  required
                />
                <label className="label place-content-end">
                  {password !== confirmPassword && (
                    <span className="label-text-alt text-red-600 me-28 mt-1">Password tidak sama</span>
                  )}
                  <a onClick={toggleConfirmPasswordVisibility} className="label-text-alt text-xs underline" style={{ cursor: 'pointer' }}>
                    {showConfirmPassword ? 'Hide Password' : 'Show Password'}
                  </a>
                </label>
              </div>

              <div className="card-actions justify-center mt-4">
                <button className="btn btn-error w-full" type="submit">Register</button>
                <p className='text-sm text-center'>Already have account ?
                  <span className='underline text-sky-600 decoration-sky-600 ms-1' style={{ cursor: 'pointer' }} onClick={() => navigate("/login")}>Login</span>
                </p>
              </div>
            </form>

          </div>
        </div>
      </div>

    </div>
  )
}

export default RegisterPage