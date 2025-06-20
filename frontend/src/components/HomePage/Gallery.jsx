import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FaBrush, FaPalette, FaCamera, FaCalendarAlt } from "react-icons/fa";

function Gallery() {
  const navigate = useNavigate();

  return (
    <div className="mt-20 mx-1 sm:mx-20">

      {/* Judul (hanya ada di menu home) */}
      {window.location.pathname === "/" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 items-center">
          <div className="p-2">
            <h2 className="text-4xl font-bold mb-4 text-primary">Gallery</h2>
            <p className="text-lg text-base-600">
              Kenangan Terindah Untuk Pasangan yang Serasi
            </p>
          </div>

          <div className="flex justify-end items-center p-2">
            <button
              className="btn btn-primary btn-outline hover:btn-primary"
              onClick={() => navigate('/gallery')}
            >
              Lihat Selengkapnya
            </button>
          </div>
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6'>
        {/* Makeup Card */}
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 group overflow-hidden" onClick={() => navigate('/gallery')} style={{cursor: "pointer"}}> 
          <figure className="relative overflow-hidden">
            <LazyLoadImage
              effect="opacity"
              src={`/img/gallery/weddings/main/makeup.png`}
              alt="Makeup Service"
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </figure>
          <div className="card-body items-center text-center p-4">
            <h2 className="card-title text-lg font-semibold text-base-800">Makeup</h2>
            <div className="w-10 h-1 bg-primary mt-2 mb-3"></div>
            <p className="text-sm text-base-500">Tata rias profesional untuk penampilan sempurna</p>
          </div>
        </div>

        {/* Dekorasi Card */}
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 group overflow-hidden" onClick={() => navigate('/gallery')} style={{cursor: "pointer"}}>
          <figure className="relative overflow-hidden">
            <LazyLoadImage
              effect="opacity"
              src={`/img/gallery/weddings/main/dekorasi.png`}
              alt="Decoration Service"
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </figure>
          <div className="card-body items-center text-center p-4">
            <h2 className="card-title text-lg font-semibold text-base-800">Dekorasi</h2>
            <div className="w-10 h-1 bg-secondary mt-2 mb-3"></div>
            <p className="text-sm text-base-500">Transformasi ruangan sesuai tema pernikahan Anda</p>
          </div>
        </div>

        {/* Dokumentasi Card */}
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 group overflow-hidden" onClick={() => navigate('/gallery')} style={{cursor: "pointer"}}>
          <figure className="relative overflow-hidden">
            <LazyLoadImage
              effect="opacity"
              src={`/img/gallery/weddings/main/dokumentasi.png`}
              alt="Photography Service"
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </figure>
          <div className="card-body items-center text-center p-4">
            <h2 className="card-title text-lg font-semibold text-base-800">Dokumentasi</h2>
            <div className="w-10 h-1 bg-accent mt-2 mb-3"></div>
            <p className="text-sm text-base-500">Abadikan momen berharga dengan hasil terbaik</p>
          </div>
        </div>

        {/* Wedding Organizer Card */}
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 group overflow-hidden" onClick={() => navigate('/gallery')} style={{cursor: "pointer"}}>
          <figure className="relative overflow-hidden">
            <LazyLoadImage
              effect="opacity"
              src={`/img/gallery/weddings/main/wedding_organizer.png`}
              alt="Wedding Organizer"
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </figure>
          <div className="card-body items-center text-center p-4">
            <h2 className="card-title text-lg font-semibold text-base-800">Wedding Organizer</h2>
            <div className="w-10 h-1 bg-info mt-2 mb-3"></div>
            <p className="text-sm text-base-500">Kelola seluruh acara pernikahan dengan profesional</p>
          </div>
        </div>
      </div>

      {location.pathname !== "/" && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="grid gap-4">
            <div >
              <LazyLoadImage
                className="h-auto max-w-full rounded-lg object-cover object-center"
                effect="opacity"
                src={`/img/gallery/weddings/IMG_5814.PNG`}
                alt="gallery-photo"
              />
            </div>
            <div>
              <LazyLoadImage
                className="h-auto max-w-full rounded-lg object-cover object-center"
                effect="opacity"
                src={`/img/gallery/makeups/IMG_5787.PNG`}
                alt="gallery-photo"
              />
            </div>
            <div>
              <LazyLoadImage
                className="h-auto max-w-full rounded-lg object-cover object-center"
                effect="opacity"
                src={`/img/gallery/weddings/IMG_5819.PNG`}
                alt="gallery-photo"
              />
            </div>
            <div>
              <LazyLoadImage
                className="h-auto max-w-full rounded-lg object-cover object-center"
                effect="opacity"
                src={`/img/gallery/weddings/IMG_5847.PNG`}
                alt="gallery-photo"
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div>
              <LazyLoadImage
                className="h-auto max-w-full rounded-lg object-cover object-center"
                effect="opacity"
                src={`/img/gallery/makeups/IMG_5777.PNG`}
                alt="gallery-photo"
              />
            </div>
            <div>
              <LazyLoadImage
                className="h-auto max-w-full rounded-lg object-cover object-center"
                effect="opacity"
                src={`/img/gallery/weddings/IMG_5851.PNG`}
                alt="gallery-photo"
              />
            </div>
            <div>
              <LazyLoadImage
                className="h-auto max-w-full rounded-lg object-cover object-center"
                effect="opacity"
                src={`/img/gallery/makeups/IMG_5786.PNG`}
                alt="gallery-photo"
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div>
              <LazyLoadImage
                className="h-auto max-w-full rounded-lg object-cover object-center"
                effect="opacity"
                src={`/img/gallery/weddings/IMG_5805.PNG`}
                alt="gallery-photo"
              />
            </div>
            <div>
              <LazyLoadImage
                className="h-auto max-w-full rounded-lg object-cover object-center"
                effect="opacity"
                src={`/img/gallery/makeups/IMG_5794.PNG`}
                alt="gallery-photo"
              />
            </div>
            <div>
              <LazyLoadImage
                className="h-auto max-w-full rounded-lg object-cover object-center"
                effect="opacity"
                src={`/img/gallery/weddings/IMG_5797.PNG`}
                alt="gallery-photo"
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div>
              <LazyLoadImage
                className="h-auto max-w-full rounded-lg object-cover object-center"
                effect="opacity"
                src={`/img/gallery/weddings/IMG_5848.PNG`}
                alt="gallery-photo"
              />
            </div>
            <div>
              <LazyLoadImage
                className="h-auto max-w-full rounded-lg object-cover object-center"
                effect="opacity"
                src={`/img/gallery/weddings/IMG_5803.PNG`}
                alt="gallery-photo"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Gallery