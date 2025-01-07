import './App.css'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import ProfilePage from './pages/ProfilePage';
import PostDetailPage from './pages/PostDetailPage'
import CreatePostPage from './pages/CreatePostPage';
import ChatPage from './pages/ChatPage';
import AdminPage from './pages/AdminPage';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './contexts/UserContext';
import EditPostPage from './pages/EditPostPage';
import VerifyEmail from './pages/VerifyEmail';
import ResendVerificationPage from './pages/ResendVerificationPage';

function App() {
  let location = useLocation();
  const hideOnRegisterLogin = location.pathname !== '/register' && location.pathname !== '/login' && location.pathname !== '/verify-email' && location.pathname !== '/verify-email/resend'; // location.pathname : untuk cek current url
  const { isAdmin } = useContext(UserContext)

  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    }
  }, [window.localStorage.getItem("token")]);

  return (
    <div className="mx-auto bg-base-300 pt-3 w-full" data-theme="light">

      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col bg-base-300">
          {/* Navbar */}
          {hideOnRegisterLogin && <Navbar />}

          {/* Page content here SEKALIGUS Define ROUTE URL*/}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/verify-email/resend" element={<ResendVerificationPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/post" element={<PostPage />} />
            <Route path="/post/:slug" element={<PostDetailPage />} />
            <Route path="/profile" element={<PrivateRoute> <ProfilePage /> </PrivateRoute>} />
            <Route path="/create-post" element={<PrivateRoute> <CreatePostPage /> </PrivateRoute>} />
            <Route path="/edit-post/:slug" element={<PrivateRoute> <EditPostPage /> </PrivateRoute>} />
            <Route path="/chat" element={<PrivateRoute> <ChatPage /> </PrivateRoute>} />
            <Route path='/administrator' element={<PrivateRoute> <AdminRoute> <AdminPage /> </AdminRoute> </PrivateRoute>} />
          </Routes>

        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200">
            {/* Sidebar content here */}
            <li><a onClick={() => navigate("/")}>Home</a></li>
            {!isLogin && (<li><a onClick={() => navigate("/login")}>Login</a></li>)}
            {!isLogin && (<li><a onClick={() => navigate("/register")}>Register</a></li>)}
            {isLogin && (<li><a onClick={() => navigate("/post")}>Cari Pekerjaan</a></li>)}
            {isLogin && (<li><a onClick={() => navigate("/create-post")}>Buat Tawaram</a></li>)}
            {isLogin && (<li><a onClick={() => navigate("/chat")}>Chat</a></li>)}
            {isAdmin && <li><a onClick={() => navigate("/administrator")}>Administrator</a></li>}
          </ul>
        </div>
      </div>

      {/* Footer */}
      {hideOnRegisterLogin && location.pathname !== '/chat' && <Footer />}
    </div>
  );
}

export default App;