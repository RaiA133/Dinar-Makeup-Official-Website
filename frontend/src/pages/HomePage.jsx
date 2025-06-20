import { useNavigate } from 'react-router-dom';
import defatulAvatar from '../assets/img/users/default.png';
import Weddings from '../components/Products/Weddings';
import About from '../components/HomePage/About';
import Gallery from '../components/HomePage/Gallery';
import Rating from '../components/HomePage/Rating';
import Contact from '../components/HomePage/Contact';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import TestimoniPage from './TestimoniPage';

function HomePage() {
  const navigate = useNavigate()

  useEffect(() => {
    const toastMessage = localStorage.getItem('toastMessage')

    // TOAST Login berhasil : Muncul ketika proses login berhasil
    if (toastMessage == 'Login Success!') {
      toast.success(toastMessage, {
        duration: 2500,
      });
      localStorage.removeItem('toastMessage');
    }

    // TOAST Logout berhasil : Muncul ketika proses logout berhasil
    if (toastMessage == 'Logout Success!') {
      toast(toastMessage, {
        duration: 2500,
        icon: '👏',
      });
      localStorage.removeItem('toastMessage');
    }
  }, []);

  return (

    <div className="mx-3">

      <Toaster
        toastOptions={{
          style: {
            maxWidth: '600px'
          }
        }}
      />

      {/* HERO */}
      <div
        className="hero min-h-screen bg-cover bg-center"
        style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(/img/home/hero.PNG)' }}
      >
        <div className="hero-content text-center text-neutral-content w-fit backdrop-blur-xs">
          <div className="max-w-2xl space-y-6">
            <div className="flex justify-center items-center gap-4">
              <div className="hidden sm:block h-px w-16 bg-amber-400"></div>
              <span className="text-amber-400 font-light tracking-widest">TATA RIAS & WO PROFESIONAL</span>
              <div className="hidden sm:block h-px w-16 bg-amber-400"></div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="text-base-100">DINAR</span>
              <span className="text-amber-400"> MAKEUP</span>
            </h1>

            <p className="text-xs sm:text-sm md-text-md lg-text-lg lg:text-lg font-light leading-relaxed">
              Selamat Datang di Dashboard Pernikahanmu! Semua momen indahmu dimulai dari sini. kami siap menemani perjalanan anda mewujudkan dan mempercantik hari istimewa, menjadi kenangan abadi. Kami percaya bahwa setiap kisah cinta layak dirayakan dengan sempurna.
            </p>

            <div className="pt-4">
              <button
                onClick={() => navigate('/pricing')}
                className="btn btn-primary px-10 py-3 rounded-none border-2 border-transparent hover:border-amber-400 hover:bg-transparent hover:text-amber-400 transition-all duration-300"
              >
                EXPLORE PACKAGES
              </button>
            </div>

            <div className="flex justify-center items-center gap-4 pt-6">
              <div className="h-px w-20 bg-amber-400"></div>
              <span className="text-xs tracking-widest">EST. 2016</span>
              <div className="h-px w-20 bg-amber-400"></div>
            </div>
          </div>
        </div>

        {/* Scrolling indicator */}
        <div className="absolute bottom-0 sm:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>

      {/* About */}
      <About />

      {/* Testimoni */}
      <TestimoniPage />

      {/* Gallery */}
      <Gallery />

      {/* Pricing */}
      <Weddings />

      {/* Rating */}
      {/* <Rating /> */}

      {/* Contact */}
      <Contact />

    </div>
  )
}

export default HomePage