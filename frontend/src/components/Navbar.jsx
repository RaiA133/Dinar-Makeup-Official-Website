import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import logoDinarMakeupCrop from '/img/logo/logoDinarMakeupCrop.jpg';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from "js-cookie";
import { UserContext } from '../contexts/UserContext';
import { googleLogout } from '@react-oauth/google';


function Navbar() {
  let location = useLocation();
  const navigate = useNavigate()

  const { userState, img_profile_link, set_img_profile_link, isAdmin } = useContext(UserContext)
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsLogin(true);
    }
  }, []);

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start gap-2">
        <div className="dropdown">

          {/* User / Admin Sidebar Hamburger */}
          {location.pathname.startsWith('/admin') && (
            <label htmlFor="admin-sidebar" className="btn drawer-button lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </label>
          )}

          {!location.pathname.startsWith('/admin') && (
            <div tabIndex={0} role="button" className="btn lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
          )}

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li><a onClick={() => navigate("/")} className={location.pathname == '/' ? 'menu-active' : ''}>Home</a></li>
            <li><a onClick={() => navigate("/about")} className={location.pathname == '/about' ? 'menu-active' : ''}>About</a></li>
            <li><a onClick={() => navigate("/gallery")} className={location.pathname == '/gallery' ? 'menu-active' : ''}>Gallery</a></li>
            <li><a onClick={() => navigate("/pricing")} className={location.pathname == '/pricing' ? 'menu-active' : ''}>Pricing</a></li>
            {/* <li><a onClick={() => navigate("/rating")} className={location.pathname == '/rating' ? 'menu-active' : ''}>Rating</a></li> */}
            <li><a onClick={() => navigate("/contact")} className={location.pathname == '/contact' ? 'menu-active' : ''}>Contact</a></li>
          </ul>

        </div>

        {/* Logo Dinar Makeup */}
        <a style={{ cursor: 'pointer' }} onClick={() => navigate("/")} className='flex items-center gap-3'>
          <img className="w-10 rounded-full lg:ms-5" src={logoDinarMakeupCrop} />
          <span>Dinar Makeups</span>
        </a>

      </div>

      {!location.pathname.startsWith('/admin') && (
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            <li><a onClick={() => navigate("/")} className={location.pathname == '/' ? 'menu-active' : ''}>Home</a></li>
            <li><a onClick={() => navigate("/about")} className={location.pathname == '/about' ? 'menu-active' : ''}>About</a></li>
            <li><a onClick={() => navigate("/gallery")} className={location.pathname == '/gallery' ? 'menu-active' : ''}>Gallery</a></li>
            <li><a onClick={() => navigate("/pricing")} className={location.pathname == '/pricing' ? 'menu-active' : ''}>Pricing</a></li>
            {/* <li><a onClick={() => navigate("/rating")} className={location.pathname == '/rating' ? 'menu-active' : ''}>Rating</a></li> */}
            <li><a onClick={() => navigate("/contact")} className={location.pathname == '/contact' ? 'menu-active' : ''}>Contact</a></li>
          </ul>
        </div>
      )}
      <div className="navbar-end">
        {!isLogin ? (
          <a onClick={() => navigate("/login")} className="btn btn-primary">Login</a>
        ) : (

          <div className="flex-noneblock gap-2">

            <div className="dropdown dropdown-end me-5">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img alt="Tailwind CSS Navbar component" src={userState.avatar || import.meta.env.VITE_PROFILE_DEFAULT} />
                </div>
              </label>
              <ul tabIndex={0} className="mt-5 z-[50] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-fit">
                <li>
                  <div className="avatar p-2" onClick={() => navigate("/profile")}>
                    <div className="w-8 rounded-full">
                      <img src={userState.avatar || import.meta.env.VITE_PROFILE_DEFAULT} alt="profile" />
                    </div>
                    <span className="overflow-hidden">
                      <p className="text-xs font-bold"> {userState.username} </p>
                      <p className="text-xs"> {userState.email}  </p>
                    </span>
                  </div>
                </li>

                <li><a>Settings</a></li>

                {isAdmin && (
                  <li><a onClick={() => navigate("/admin")}>Administrator</a></li>
                )}

                <li><a
                  onClick={() => {
                    googleLogout();
                    setIsLogin(false);
                    Cookies.remove("token");
                    navigate('/')
                    toast("You have been logout", {
                      icon: '👏',
                      duration: 2500,
                    });
                  }}
                  className="text-red-600 "
                >Logout</a></li>
              </ul>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar