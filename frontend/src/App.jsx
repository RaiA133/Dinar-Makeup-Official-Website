import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import RegisterPage from './pages/Auth/RegisterPage';
import LoginPage from './pages/Auth/LoginPage';
import ForgotPasswordPage from './pages/Auth/ForgotPasswordPage';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import PricingPage from './pages/PricingPage';
import RatingPage from './pages/RatingPage';
import ContactPage from './pages/ContactPage';

// Framer Motion (Efek Transisi Faded Perpindahan Page)
const PageMotionWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
  >
    {children}
  </motion.div>
);

function App() {
  let location = useLocation();
  const hideOnRegisterLogin = location.pathname !== '/register' && location.pathname !== '/login' && location.pathname !== '/forgot-password'; // location.pathname : untuk cek current url

  return (
    <div data-theme="winter" className='bg-base-100'>

      {/* NAVBAR */}
      <AnimatePresence mode="wait" initial={false}>
        {hideOnRegisterLogin && (<Navbar />)}
      </AnimatePresence>

      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageMotionWrapper><HomePage /></PageMotionWrapper>} />
          <Route path="/about" element={<PageMotionWrapper><AboutPage /></PageMotionWrapper>} />
          <Route path="/gallery" element={<PageMotionWrapper><GalleryPage /></PageMotionWrapper>} />
          <Route path="/pricing" element={<PageMotionWrapper><PricingPage /></PageMotionWrapper>} />
          <Route path="/rating" element={<PageMotionWrapper><RatingPage /></PageMotionWrapper>} />
          <Route path="/contact" element={<PageMotionWrapper><ContactPage /></PageMotionWrapper>} />
          <Route path="/login" element={<PageMotionWrapper><LoginPage /></PageMotionWrapper>} />
          <Route path="/register" element={<PageMotionWrapper><RegisterPage /></PageMotionWrapper>} />
          <Route path="/forgot-password" element={<PageMotionWrapper><ForgotPasswordPage /></PageMotionWrapper>} />
        </Routes>
      </AnimatePresence>

      {/* FOOTER */}
      <AnimatePresence mode="wait" initial={false}>
        {hideOnRegisterLogin && (<Footer />)}
      </AnimatePresence>


    </div>
  )
}

export default App
