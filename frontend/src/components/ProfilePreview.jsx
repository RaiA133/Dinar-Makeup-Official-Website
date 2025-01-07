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
  const { userState, img_profile_link, set_img_profile_link } = useContext(UserContext)

  return (

    <div className={`row-span-2 flex flex-col text-xl items-center pt-6 pb-10 bg-base-100 card shadow-md h-fit lg:sticky top-0 ${location.pathname === '/profile' ? 'ms-6' : ''}`}>

      <div className="flex justify-center w-80">
        <p className="text-2xl font-bold">Profile Preview</p>
      </div>

      <div className='divider' />

      <div className="avatar">
        <div className="w-60 xl:w-80 rounded-xl">
          <img src={img_profile_link || `${import.meta.env.VITE_BACKEND_BASEURL}/profile/picture/${userState.img_profile}`} className='w-20' />
        </div>
        {location.pathname == '/profile' &&
          <details className="dropdown dropdown-top absolute">
            <summary className="m-1 btn btn-sm btn-neutral">Edit</summary>
            <ul className="ms-1 p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-36 overflow-hidden">
              <li>
                <input
                  className="file-input file-input-md w-[130px]"
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
              <li>
                <a onClick={async () => {
                  const formData = new FormData();
                  formData.append('hapus_img', 'default.png');
                  formData.append('username', userState.username);
                  const hapus_img = await updateProfile(formData);
                  if (hapus_img.status[1] == "Success") {
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

      <div className="mt-3 mb-1">
        <p className="font-bold">{userState.username || 'Username'}</p>
      </div>
      <div className="flex justify-center">
        <img className='w-5 me-1.5' src={iconLocation} alt="icon" />
        <p className="text-sm">{userState.city || 'Kota'}, {userState.country || 'Negara'}</p>
      </div>
      <div className='grid gap-2 grid-cols-4 my-4 justify-center items-center'>
        {userState.web_link && <img src={iconGlobe} className='w-7 hover:cursor-pointer' alt="Personal Website" onClick={() => window.open(userState.web_link || "#", "_blank")} />}
        {userState.github_link && <img src={iconGithub} className='w-6 hover:cursor-pointer' alt="Personal Github" onClick={() => window.open(userState.github_link || "#", "_blank")} />}
        {userState.fb_link && <img src={iconFacebook} className='w-6 hover:cursor-pointer' alt="Personal Facebook" onClick={() => window.open(userState.fb_link || "#", "_blank")} />}
        {userState.ig_link && <img src={iconInstagram} className='w-6 hover:cursor-pointer' alt="Personal Github" onClick={() => window.open(userState.ig_link || "#", "_blank")} />}
      </div>
      <div className="rounded-xl bg-base-200 p-5 text-sm w-60 xl:w-80 max-h-96">{userState.about || 'About Me'}</div>
    </div>
  )
}

export default ProfilePreview