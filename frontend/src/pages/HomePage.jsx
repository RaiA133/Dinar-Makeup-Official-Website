import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import defatulAvatar from '../assets/img/users/default.png';
import Weddings from '../components/Products/Weddings';
import About from '../components/HomePage/About';
import Gallery from '../components/HomePage/Gallery';
import Rating from '../components/HomePage/Rating';
import Contact from '../components/HomePage/Contact';
import TestimoniPage from './TestimoniPage';
import Team from '../components/HomePage/Team';

function HomePage() {
  const navigate = useNavigate();

  // Acak rotasi untuk 4 bunga
  const rotateAngles = useMemo(
    () => Array.from({ length: 4 }, () => Math.floor(Math.random() * 60) - 30),
    []
  );

  useEffect(() => {
    const toastMessage = localStorage.getItem('toastMessage');
    if (toastMessage === 'Login Success!') {
      toast.success(toastMessage, { duration: 2500 });
      localStorage.removeItem('toastMessage');
    }
    if (toastMessage === 'Logout Success!') {
      toast(toastMessage, { duration: 2500, icon: '👏' });
      localStorage.removeItem('toastMessage');
    }
  }, []);

  return (
    <div className="mx-0">
      <Toaster toastOptions={{ style: { maxWidth: '600px' } }} />

      {/* HERO */}
      <div
        className="hero min-h-lvh bg-cover bg-center pb-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.0), rgba(0,0,0,0.0), rgba(0,0,0,0.0), rgba(235,163,169,1)), url(/img/home/hero.jpg)',
        }}
      >
        <div className="hero-content text-center w-fit backdrop-blur-xs">
          <div className="max-w-2xl space-y-4">
            <div className="flex justify-center items-center gap-4">
              <div className="h-0.5 w-15 sm:w-25 bg-neutral"></div>
              <span className="text-neutral-700 font-light tracking-widest">TATA RIAS & WO PROFESIONAL</span>
              <div className="h-0.5 w-15 sm:w-25 bg-neutral"></div>
            </div>

            <h1 className="text-5xl md:text-5xl font-poppins-bold leading-tight">
              <span className="text-neutral-700">DINAR</span>
              <span className="text-error"> MAKEUP</span>
            </h1>

            <p className="text-md sm:text-sm md-text-md lg-text-lg lg:text-2xl font-light leading-relaxed text-neutral-700">
              Dengan Konsep Modern dan Kontemporer
            </p>

            <div className="pt-4">
              <button
                onClick={() => navigate('/pricing')}
                className="btn btn-error px-15 text-neutral-700 py-3 rounded-md hover:border-neutral hover:bg-transparent hover:text-neutral-700 transition-all duration-300"
              >
                JELAJAHI
              </button>
            </div>
          </div>
        </div>

        {/* Scrolling indicator */}
        <div className="absolute bottom-0 sm:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className='grid gap-4 justify-center'>
            <div className="avatar avatar-placeholder flex justify-center">
              <div className="bg-error w-12 rounded-full"></div>
            </div>
            <div className="avatar avatar-placeholder flex justify-center">
              <div className="bg-error w-8 rounded-full"></div>
            </div>
            <div className="avatar avatar-placeholder flex justify-center">
              <div className="bg-error w-6 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION UTAMA DENGAN BUNGA */}
      <div
        className="relative overflow-hidden"
        style={{
          backgroundImage:
            'linear-gradient(rgba(235,163,169,1), rgba(0,0,0,0.0), rgba(0,0,0,0.0), rgba(0,0,0,0.0), rgba(0,0,0,0.0), rgba(0,0,0,0.0), rgba(235,163,169,1))',
        }}
      >
        {/* Bunga-bunga (4 buah) */}
        <img
          src="/img/home/bg-flower.png"
          alt="flower"
          className="absolute top-[10%] left-[-60px] w-full sm:w-1/2 opacity-30 z-0 pointer-events-none"
          style={{ transform: `rotate(${rotateAngles[0]}deg)` }}
        />
        <img
          src="/img/home/bg-flower.png"
          alt="flower"
          className="absolute top-[50%] left-[-80px] w-full sm:w-1/2 opacity-30 z-0 pointer-events-none"
          style={{ transform: `rotate(${rotateAngles[1]}deg)` }}
        />
        <img
          src="/img/home/bg-flower.png"
          alt="flower"
          className="absolute top-[20%] right-[-60px] w-full sm:w-1/2 opacity-30 z-0 pointer-events-none"
          style={{ transform: `rotate(${rotateAngles[2]}deg)` }}
        />
        <img
          src="/img/home/bg-flower.png"
          alt="flower"
          className="absolute top-[65%] right-[-80px] w-full sm:w-1/2 opacity-30 z-0 pointer-events-none"
          style={{ transform: `rotate(${rotateAngles[3]}deg)` }}
        />

        {/* Konten utama */}
        <div className="relative z-10 mx-3">
          <div className="pt-40"><About /></div>
          <div className="pt-40"><Gallery /></div>
          <div className="pt-40"><Weddings /></div>
          <div className="pt-40"><TestimoniPage /></div>
          <div className="pt-40"><Team /></div>
          <div className="pt-40"><Contact /></div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
