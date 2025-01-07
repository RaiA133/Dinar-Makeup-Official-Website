import { useContext } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import logoDinarMakeupCrop from '../assets/logo/logoDinarMakeupCrop.jpg';
import { logout } from "../modules/fetch"
import { UserContext } from "../contexts/UserContext";
import { ChatContext } from "../contexts/ChatContext";
import Notification from "./Notification";

function Navbar() {
  const navigate = useNavigate()
  const { userState, img_profile_link, set_img_profile_link, isAdmin } = useContext(UserContext)
  const { setUser} = useContext(ChatContext)
  const [isLogin, setIsLogin] = useState(false);  

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    }
  }, [window.localStorage.getItem("token")]);

  useEffect(() => { // ketika userState / profile kita diupdate, ubah state context link gambar
    if (userState.img_profile) {
      const link = `${import.meta.env.VITE_BACKEND_BASEURL}/profile/picture/${userState?.img_profile}` || import.meta.env.VITE_PROFILE_DEFAULT
      set_img_profile_link(link)
      setUser(userState)
    } 
  }, [userState])

  return (
    <div className="w-full navbar rounded-2xl bg-base-100">
      <div className="flex-none lg:hidden">
        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </label>
      </div>
      {/* <div className="flex-1 px-2 mx-3 font-bold text-3xl"><a style={{ cursor: 'pointer' }} onClick={() => navigate("/")}><img className="w-10" alt="Tailwind CSS Navbar component" src={logoDinarMakeupCrop} /></a></div> */}
      <div className="flex-1 font-bold text-3xl">
        <a style={{ cursor: 'pointer' }} onClick={() => navigate("/")}>
          <img className="w-10 rounded-full lg:ms-5" src={logoDinarMakeupCrop} />
        </a>
      </div>
      <div className="flex-none hidden md:block gap-2">
        <ul className="menu menu-horizontal">
          {/* Navbar menu content here */}
          {!isLogin && (
            <>
              <li><a onClick={() => navigate("/login")}>Login</a></li>
              <li><a onClick={() => navigate("/register")}>Register</a></li>
            </>
          )}

        </ul>
      </div>
      
      {isLogin && (
        <div className="flex-noneblock gap-2">

          <Notification />

          <div className="dropdown dropdown-end me-5">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={img_profile_link} />
              </div>
            </label>
            <ul tabIndex={0} className="mt-5 z-[50] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <div className="avatar" onClick={() => navigate("/profile")}>
                  <div className="w-8 rounded-full">
                    <img src={img_profile_link} alt="profile" />
                  </div>
                  <span className="overflow-hidden">
                    <p className="text-xs font-bold"> {userState.username || 'username'} </p>
                    <p className="text-xs"> {userState.email || 'email@gmail.com'}  </p>
                  </span>
                </div>
              </li>
              <li>
                <a className="justify-between" onClick={() => navigate("/post")}>
                  Cari Pekerjaan
                </a>
              </li>
              <li>
                <a className="justify-between" onClick={() => navigate("/create-post")}>
                  Buat Tawaran
                </a>
              </li>
              <li>
                <a className="justify-between" onClick={() => navigate("/chat")}>
                  Chat
                </a>
              </li>

              {/* <li><a>Settings</a></li> */}

              {isAdmin && (
                <li><a onClick={() => navigate("/administrator")}>Administrator</a></li>
              )}
              <li><a
                onClick={async () => {

                  try {
                    const response = await logout()
                    if (response.status[1] === 'Success') {
                      setIsLogin(false);
                      window.localStorage.setItem('toastMessage', 'Berhasil Logout');
                      window.localStorage.removeItem("token");
                      window.location.href = "/"
                    }
                  } catch (error) {
                    console.error(error)
                  }
                }}
                className="text-red-600 "
              >Logout</a></li>
            </ul>
          </div>

        </div>
      )}
    </div>
  );
}

export default Navbar