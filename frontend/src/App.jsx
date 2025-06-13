import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import LoginRoute from './components/ValidationRoute/LoginRoute';
import AdminRoute from './components/ValidationRoute/AdminRoute';
import AdminSidebar from './components/Admin/AdminSidebar';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import PricingPage from './pages/PricingPage';
import RatingPage from './pages/RatingPage';
import ContactPage from './pages/ContactPage';

import RegisterPage from './pages/Auth/RegisterPage';
import LoginPage from './pages/Auth/LoginPage';
import ForgotPasswordPage from './pages/Auth/ForgotPasswordPage';

import ProfilePage from './pages/ProfilePage';

import DashboardPage from './pages/Admin/DashboardPage';
import TransactionManagementPage from './pages/Admin/TransactionManagementPage';
import UserManagementPage from './pages/Admin/UserManagementPage';

import ProductManagementPage from './pages/Admin/ProductManagement/ProductManagementPage';
import EditProductManagementPage from './pages/Admin/ProductManagement/EditProductManagementPage';
import CreateProductManagementPage from './pages/Admin/ProductManagement/CreateProductManagementPage';
import OrderPage from './pages/Order/OrderPage';
import PaymentPage from './pages/Order/PaymentPage';

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
          {/* <Route path="/rating" element={<PageMotionWrapper><RatingPage /></PageMotionWrapper>} /> */}
          <Route path="/contact" element={<PageMotionWrapper><ContactPage /></PageMotionWrapper>} />

          <Route path="/login" element={<PageMotionWrapper><LoginPage /></PageMotionWrapper>} />
          <Route path="/register" element={<PageMotionWrapper><RegisterPage /></PageMotionWrapper>} />
          <Route path="/forgot-password" element={<PageMotionWrapper><ForgotPasswordPage /></PageMotionWrapper>} />

          {/* Login Route */}
          <Route path="/profile" element={<LoginRoute><PageMotionWrapper><ProfilePage /></PageMotionWrapper></LoginRoute>} />
          <Route path="/order/:id" element={<LoginRoute><PageMotionWrapper><OrderPage /></PageMotionWrapper></LoginRoute>} />
          <Route path="/payment" element={<LoginRoute><PageMotionWrapper><PaymentPage /></PageMotionWrapper></LoginRoute>} />

          {/* Admin Route */}
          <Route path="/admin/" element={<LoginRoute><AdminRoute><AdminSidebar><PageMotionWrapper><DashboardPage /></PageMotionWrapper></AdminSidebar></AdminRoute></LoginRoute>} />
          <Route path="/admin/dashboard" element={<LoginRoute><AdminRoute><AdminSidebar><PageMotionWrapper><DashboardPage /></PageMotionWrapper></AdminSidebar></AdminRoute></LoginRoute>} />
          
          <Route path="/admin/product-management" element={<LoginRoute><AdminRoute><AdminSidebar><PageMotionWrapper><ProductManagementPage /></PageMotionWrapper></AdminSidebar></AdminRoute></LoginRoute>} />
          <Route path="/admin/product-management/edit/:id" element={<LoginRoute><AdminRoute><AdminSidebar><PageMotionWrapper><EditProductManagementPage /></PageMotionWrapper></AdminSidebar></AdminRoute></LoginRoute>} />
          <Route path="/admin/product-management/create" element={<LoginRoute><AdminRoute><AdminSidebar><PageMotionWrapper><CreateProductManagementPage /></PageMotionWrapper></AdminSidebar></AdminRoute></LoginRoute>} />

          <Route path="/admin/transaction-management" element={<LoginRoute><AdminRoute><AdminSidebar><PageMotionWrapper><TransactionManagementPage /></PageMotionWrapper></AdminSidebar></AdminRoute></LoginRoute>} />
          <Route path="/admin/user-management" element={<LoginRoute><AdminRoute><AdminSidebar><PageMotionWrapper><UserManagementPage /></PageMotionWrapper></AdminSidebar></AdminRoute></LoginRoute>} />
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
