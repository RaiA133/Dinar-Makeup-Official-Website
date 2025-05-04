import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import PricingPage from './pages/PricingPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import ForgotPasswordPage from './pages/Auth/ForgotPasswordPage';

// Framer Motion (Efek Transisi Perpindahan Page)
const PageMotionWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
);

function App() {
  let location = useLocation();
  const hideOnRegisterLogin = location.pathname !== '/register' && location.pathname !== '/login' && location.pathname !== '/forgot-password'; // location.pathname : untuk cek current url

  return (
    <div data-theme="light">

      {/* NAVBAR */}
      <AnimatePresence mode="wait" initial={false}>
        {hideOnRegisterLogin && (<Navbar />)}
      </AnimatePresence>

      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageMotionWrapper><HomePage /></PageMotionWrapper>} />
        <Route path="/pricing" element={<PageMotionWrapper><PricingPage /></PageMotionWrapper>} />
        <Route path="/login" element={<PageMotionWrapper><LoginPage /></PageMotionWrapper>} />
        <Route path="/register" element={<PageMotionWrapper><RegisterPage /></PageMotionWrapper>} />
        <Route path="/forgot-password" element={<PageMotionWrapper><ForgotPasswordPage /></PageMotionWrapper>} />
      </Routes>

      {/* FOOTER */}
      <AnimatePresence mode="wait" initial={false}>
        {hideOnRegisterLogin && (<Footer />)}
      </AnimatePresence>


    </div>
  )
}

export default App
