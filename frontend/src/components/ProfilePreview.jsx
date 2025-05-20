import { useNavigate, useLocation } from 'react-router-dom';
import iconLocation from '../assets/icon/map-pin.svg';
import iconGlobe from '../assets/icon/globe-alt.svg';
import iconGithub from '../assets/icon/github.svg';
import iconFacebook from '../assets/icon/facebook.svg';
import iconInstagram from '../assets/icon/instagram.svg';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { updateProfile } from "../modules/fetch";
import toast, { Toaster } from 'react-hot-toast';

function ProfilePreview() {
  let location = useLocation();
  const navigate = useNavigate();
  const { userState, img_profile_link, set_img_profile_link, isAdmin } = useContext(UserContext)

  return (

    <div className={`row-span-2 flex flex-col text-xl items-center pt-6 pb-10 bg-base-100 card shadow-md h-fit lg:sticky top-0 ${location.pathname === '/profile' ? 'ms-6' : ''}`}>

      <div className="flex justify-center w-80">
        <p className="text-2xl font-bold">Profile Preview</p>
      </div>

      <div className='divider' />

      <div className="avatar">
        <div className="w-60 xl:w-80 rounded-xl">
          <img src={userState.avatar || import.meta.env.VITE_PROFILE_DEFAULT} className='w-20' />
        </div>
        {location.pathname == '/profile' &&
          <details className="dropdown dropdown-top absolute">
            <summary className="m-1 btn btn-sm btn-neutral">Edit</summary>
            <ul className="ms-1 p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-56 overflow-hidden">
              <li>
                <input
                  className="w-full input-sm"
                  type="file"
                  name="file"
                  onChange={(e) => {
                    e.preventDefault()
                    const file = e.target.files[0];
                    let imageUrl
                    if (file) {
                      const maxSize = 2 * 1024 * 1024
                      if (file.size <= maxSize) {
                        imageUrl = URL.createObjectURL(file);
                        set_img_profile_link(imageUrl);
                      } else {
                        e.target.value = null;
                        toast.error('File Tidak Boleh Lebih Dari 2MB!', {
                          duration: 2500,
                        });
                      }
                    }
                  }}

                />
              </li>
              <div className="divider my-0">or</div>
              <li>
                <div className="join">
                  <div>
                    <label className="input validator join- input-sm">
                      <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          strokeWidth="2.5"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                        </g>
                      </svg>
                      <input
                        type="url"
                        required
                        placeholder="https://"
                        pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9\-].*[a-zA-Z0-9])?\.)+[a-zA-Z].*$"
                        title="Must be valid URL"
                      />
                    </label>
                  </div>
                  <button className="btn btn-neutral join-item btn-sm">✓</button>
                </div>
              </li>
              <div className="divider my-0"></div>
              <li>
                <a className='btn btn-sm btn-danger'
                  onClick={async () => {
                    const formData = new FormData();
                    formData.append('hapus_img', 'default.png');
                    formData.append('username', userState.username);
                    const hapus_img = await updateProfile(formData);
                    if (hapus_img.status == 201) {
                      set_img_profile_link(import.meta.env.VITE_PROFILE_DEFAULT);
                      window.localStorage.setItem('toastMessage', 'Hapus Photo Berhasil!');
                      setTimeout(() => {
                        localStorage.removeItem('toastMessage');
                      }, 100)
                    }
                  }}>Remove Photo</a>
              </li>
            </ul>
          </details>
        }
        {location.pathname == '/create-post' &&
          <div className='absolute m-2'>
            <button className='btn btn-sm btn-neutral' onClick={() => navigate("/profile")} >Edit Profile</button>
          </div>
        }
      </div>

      <div className="mt-3 mb-1 flex items-center gap-2">
        <p className="font-bold">{userState.username || 'Username'}</p>
        {isAdmin && (
          <div class="badge badge-primary badge-xs">Administrator ✓</div>
        )}
      </div>
      <div className="flex justify-center">
        {/* <img className='w-5 me-1.5' src={iconLocation} alt="icon" /> */}
        <p className="text-sm">{userState.phone_number || 'Phone Number'}</p>
      </div>
    </div>
  )
}

export default ProfilePreview