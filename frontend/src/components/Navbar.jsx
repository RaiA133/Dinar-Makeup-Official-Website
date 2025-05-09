import { useLocation, useNavigate } from 'react-router-dom';
import logoDinarMakeupCrop from '/img/logo/logoDinarMakeupCrop.jpg';


function Navbar() {
  let location = useLocation();
  const navigate = useNavigate()

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li><a onClick={() => navigate("/")} className={location.pathname == '/' ? 'menu-active' : ''}>Home</a></li>
            <li><a onClick={() => navigate("/about")} className={location.pathname == '/about' ? 'menu-active' : ''}>About</a></li>
            <li><a onClick={() => navigate("/gallery")} className={location.pathname == '/gallery' ? 'menu-active' : ''}>Gallery</a></li>
            <li><a onClick={() => navigate("/pricing")} className={location.pathname == '/pricing' ? 'menu-active' : ''}>Pricing</a></li>
            <li><a onClick={() => navigate("/rating")} className={location.pathname == '/rating' ? 'menu-active' : ''}>Rating</a></li>
            <li><a onClick={() => navigate("/contact")} className={location.pathname == '/contact' ? 'menu-active' : ''}>Contact</a></li>
          </ul>
        </div>
        <a style={{ cursor: 'pointer' }} onClick={() => navigate("/")}>
          <img className="w-10 rounded-full lg:ms-5" src={logoDinarMakeupCrop} />
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li><a onClick={() => navigate("/")} className={location.pathname == '/' ? 'menu-active' : ''}>Home</a></li>
          <li><a onClick={() => navigate("/about")} className={location.pathname == '/about' ? 'menu-active' : ''}>About</a></li>
          <li><a onClick={() => navigate("/gallery")} className={location.pathname == '/gallery' ? 'menu-active' : ''}>Gallery</a></li>
          <li><a onClick={() => navigate("/pricing")} className={location.pathname == '/pricing' ? 'menu-active' : ''}>Pricing</a></li>
          <li><a onClick={() => navigate("/rating")} className={location.pathname == '/rating' ? 'menu-active' : ''}>Rating</a></li>
          <li><a onClick={() => navigate("/contact")} className={location.pathname == '/contact' ? 'menu-active' : ''}>Contact</a></li>
        </ul>
      </div>
      <div className="navbar-end">
        <a onClick={() => navigate("/login")} className="btn btn-primary">Login</a>
      </div>
    </div>
  );
}

export default Navbar