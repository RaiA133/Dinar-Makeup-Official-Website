import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FaBrush, FaPalette, FaCamera, FaCalendarAlt } from "react-icons/fa";

function Gallery() {
  const navigate = useNavigate();

  const dataGallery = [
    {
      title: "Makeup",
      src: "/img/gallery/weddings/main/makeup.png",
      desc: "Tata rias profesional untuk penampilan sempurna",
      borderColor: "border-primary"
    },
    {
      title: "Dekorasi",
      src: "/img/gallery/weddings/main/dekorasi.png",
      desc: "Transformasi ruangan sesuai tema pernikahan Anda",
      borderColor: "border-secondary"
    },
    {
      title: "Dokumentasi",
      src: "/img/gallery/weddings/main/dokumentasi.png",
      desc: "Abadikan momen berharga dengan hasil terbaik",
      borderColor: "border-accent"
    },
    {
      title: "Wedding Organizer",
      src: "/img/gallery/weddings/main/wedding_organizer.png",
      desc: "Kelola seluruh acara pernikahan dengan profesional",
      borderColor: "border-info"
    }
  ]

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {dataGallery.map((item, i) => (
          <div
            key={i}
            onClick={() => navigate('/gallery')}
            className="relative group overflow-hidden rounded-2xl cursor-pointer transition-transform duration-300 hover:scale-105 shadow-md flex justify-center"
          >
            <LazyLoadImage
              src={item.src}
              alt={item.title}
              effect="opacity"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>
            <div className="absolute bottom-0 p-5 w-full text-center text-base-100">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <div className={`mx-auto mt-2 mb-3 w-10 h-1 ${item.borderColor} bg-current`}></div>
              <p className="text-sm text-base-300">{item.desc}</p>
            </div>
          </div>
        ))}
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