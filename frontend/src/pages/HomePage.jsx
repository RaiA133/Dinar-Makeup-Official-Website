import { useNavigate } from 'react-router-dom';
import defatulAvatar from '../assets/img/users/default.png';
import Weddings from '../components/Products/Wedings';
import About from '../components/HomePage/About';
import Gallery from '../components/HomePage/Gallery';
import Rating from '../components/HomePage/Rating';
import Contact from '../components/HomePage/Contact';

function HomePage() {
  const navigate = useNavigate()


  return (

    <div className="mx-3">

      {/* HERO */}
      <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)' }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-lg">
            <div className="divider divider-warning">Tata Rias</div>
            <h1 className="mb-5 text-7xl font-bold">DINAR MAKEUP</h1>
            <p className="mb-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis laboriosam tenetur, repudiandae eum rerum quas distinctio fuga, hic autem quisquam possimus cupiditate neque nihil delectus est rem aliquam voluptatibus sequi quam dolorem explicabo assumenda! Facilis nemo excepturi cupiditate esse voluptate?
            </p>
            <button onClick={() => navigate('/pricing')} className="btn px-12 btn-primary">Pilih Paket</button>
            <div className="divider divider-warning"></div>
          </div>
        </div>
      </div>

      {/* About */}
      <About />

      {/* Gallery */}
      <Gallery />

      {/* Pricing */}
      <Weddings />

      {/* Rating */}
      <Rating />

      {/* Contact */}
      <Contact />

    </div>
  )
}

export default HomePage