import { useNavigate } from 'react-router-dom';
import logoDinarMakeupCrop from '../assets/img/logo/logoDinarMakeupCrop.jpg';


function Navbar() {
  const navigate = useNavigate()


  return (
    <div className="w-full navbar rounded-2xl bg-base-100 shadow-md">

      <div className="flex-none md:hidden">
        <div className="drawer">
          <input id="sidebar" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label htmlFor="sidebar" className="btn drawer-button">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </label>
          </div>
          <div className="drawer-side">
            <label htmlFor="sidebar" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              {/* Sidebar content here */}
              <li><a onClick={() => navigate("/login")}>Login</a></li>
              <li><a onClick={() => navigate("/register")}>Register</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex-1 font-bold text-3xl">
        <a style={{ cursor: 'pointer' }} onClick={() => navigate("/")}>
          <img className="w-10 rounded-full lg:ms-5" src={logoDinarMakeupCrop} />
        </a>
      </div>
      <div className="flex-none hidden md:block gap-2">
        <ul className="menu menu-horizontal">

          <>
            <li><a onClick={() => navigate("/login")}>Login</a></li>
            <li><a onClick={() => navigate("/register")}>Register</a></li>
          </>

        </ul>
      </div>



    </div>
  );
}

export default Navbar