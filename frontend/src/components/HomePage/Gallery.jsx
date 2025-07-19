import { useLocation, useNavigate } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FaBrush, FaPalette, FaCamera, FaCalendarAlt } from "react-icons/fa";

function Gallery() {
  const navigate = useNavigate();
  let location = useLocation()

  const dataGallery = [
    {
      title: "Makeup",
      src: "/img/gallery/main/makeup.png",
      desc: "Tata rias profesional untuk penampilan sempurna",
      borderColor: "border-primary"
    },
    {
      title: "Dekorasi",
      src: "/img/gallery/main/dekorasi.png",
      desc: "Transformasi ruangan sesuai tema pernikahan Anda",
      borderColor: "border-secondary"
    },
    {
      title: "Dokumentasi",
      src: "/img/gallery/main/dokumentasi.png",
      desc: "Abadikan momen berharga dengan hasil terbaik",
      borderColor: "border-accent"
    },
    {
      title: "Wedding Organizer",
      src: "/img/gallery/main/wedding_organizer.png",
      desc: "Kelola seluruh acara pernikahan dengan profesional",
      borderColor: "border-info"
    }
  ]

  const gallerySections = [
    {
      title: "Makeup",
      images: [
        "/img/gallery/makeup/1.PNG",
        "/img/gallery/makeup/2.PNG",
        "/img/gallery/makeup/3.PNG",
        "/img/gallery/makeup/4.PNG",
        "/img/gallery/makeup/5.PNG",
        "/img/gallery/makeup/6.PNG",
        "/img/gallery/makeup/7.PNG",
      ]
    },
    {
      title: "Attire",
      images: [
        "/img/gallery/attire/1.jpg",
        "/img/gallery/attire/2.jpg",
        "/img/gallery/attire/3.jpg",
        "/img/gallery/attire/4.jpg",
        "/img/gallery/attire/5.jpg",
        "/img/gallery/attire/6.jpg",
        "/img/gallery/attire/7.jpg",
      ]
    },
    {
      title: "Dekorasi",
      images: [
        "/img/gallery/dekorasi/1.PNG",
        "/img/gallery/dekorasi/2.PNG",
        "/img/gallery/dekorasi/3.PNG",
        "/img/gallery/dekorasi/4.PNG",
        "/img/gallery/dekorasi/5.PNG",
        "/img/gallery/dekorasi/6.PNG",
        "/img/gallery/dekorasi/7.PNG",
      ]
    },
    {
      title: "Hiburan Lengser",
      images: [
        "/img/gallery/hiburanLengser/1.PNG",
        "/img/gallery/hiburanLengser/2.PNG",
        "/img/gallery/hiburanLengser/3.PNG",
        "/img/gallery/hiburanLengser/4.PNG",
        "/img/gallery/hiburanLengser/5.PNG",
        "/img/gallery/hiburanLengser/6.PNG",
        "/img/gallery/hiburanLengser/7.PNG",
      ]
    },
    {
      title: "Hantaram",
      images: [
        "/img/gallery/hantaran/1.PNG",
        "/img/gallery/hantaran/2.PNG",
        "/img/gallery/hantaran/3.PNG",
        "/img/gallery/hantaran/4.PNG",
        "/img/gallery/hantaran/5.PNG",
        "/img/gallery/hantaran/6.PNG",
        "/img/gallery/hantaran/7.PNG",
      ]
    },
    {
      title: "MC",
      images: [
        "/img/gallery/mc/1.PNG",
        "/img/gallery/mc/2.PNG",
        "/img/gallery/mc/3.PNG",
        "/img/gallery/mc/4.PNG",
        "/img/gallery/mc/5.PNG",
        "/img/gallery/mc/6.PNG",
        "/img/gallery/mc/7.PNG",
      ]
    },
    {
      title: "Katering",
      images: [
        "/img/gallery/katering/1.PNG",
        "/img/gallery/katering/2.PNG",
        "/img/gallery/katering/3.PNG",
        "/img/gallery/katering/4.PNG",
        "/img/gallery/katering/5.PNG",
        "/img/gallery/katering/6.PNG",
        "/img/gallery/katering/7.PNG",
      ]
    },
    {
      title: "Hiburan Band",
      images: [
        "/img/gallery/hiburanBand/1.PNG",
        "/img/gallery/hiburanBand/2.PNG",
        "/img/gallery/hiburanBand/3.PNG",
        "/img/gallery/hiburanBand/4.PNG",
        "/img/gallery/hiburanBand/5.PNG",
        "/img/gallery/hiburanBand/6.PNG",
        "/img/gallery/hiburanBand/7.PNG",
      ]
    },
    {
      title: "WO",
      images: [
        "/img/gallery/wo/1.PNG",
        "/img/gallery/wo/2.PNG",
        "/img/gallery/wo/3.PNG",
        "/img/gallery/wo/4.PNG",
        "/img/gallery/wo/5.PNG",
        "/img/gallery/wo/6.PNG",
        "/img/gallery/wo/7.PNG",
      ]
    },
  ]

  return (
    <div className="mx-1 sm:mx-20">

      {/* Judul (hanya ada di menu home) */}
      {window.location.pathname === "/" && (
        <div id="header-gallery-packages" className="flex justify-center text-center gap-10 my-10 items-center">
          <div className="p-2">
            <h2 className="text-5xl font-bold mb-7 text-base-950">Galeri Kami</h2>
            <p className="text-lg text-base-600">
              Kenangan Terindah Untuk Pasangan yang Serasi
            </p>
          </div>
        </div>
      )}

      <section>

        {location.pathname == "/gallery" && (
          <div id="header-wedding-packages-type-wedding" className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-base-900 mb-4">Galeri Kami</h1>
          </div>
        )}

        {window.location.pathname === "/" && (
          <div className={`grid grid-cols-1 md:grid-cols-2 ${location.pathname == '/gallery' && 'lg:grid-cols-4'} gap-6 mb-6`}>
            {dataGallery
              .slice(0, location.pathname === '/gallery' ? 4 : 2)
              .map((item, i) => (
                <div
                  key={i}
                  onClick={() => navigate('/gallery')}
                  className="relative group overflow-hidden rounded-2xl cursor-pointer transition-transform duration-300 hover:scale-105 shadow-md flex justify-center"
                >
                  <LazyLoadImage
                    src={item.src}
                    alt={item.title}
                    effect="opacity"
                    className="w-full h-full object-cover"
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
        )}

        {window.location.pathname === "/gallery" && (
          <section>
            {gallerySections.map((section, index) => (
              <div key={index} className="mb-12">
                <div className="grid grid-cols-3 gap-4 mb-20 mx-0 lg:mx-20">
                  {/* Kolom Kiri */}
                  <div className="flex flex-col gap-4">
                    <div className="relative h-full w-full overflow-hidden rounded-lg flex-1">
                      <LazyLoadImage
                        effect="opacity"
                        src={section.images[0]}
                        alt={`${section.title} 1`}
                        wrapperClassName="w-full h-full"
                        className="w-full h-full object-cover object-center rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-end justify-center p-10">
                        <div>
                          <p className="text-white text-sm sm:text-2xl font-semibold">{section.title}</p>
                          <div className="mx-auto mt-2 mb-3 w-10 h-0.5 sm:h-1 bg-base-100"></div>
                        </div>
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-lg flex-1 h-full">
                      <LazyLoadImage
                        effect="opacity"
                        src={section.images[1]}
                        alt={`${section.title} 2`}
                        wrapperClassName="w-full h-full"
                        className="w-full h-full object-cover object-center rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Kolom Tengah */}
                  <div className="flex flex-col gap-4">
                    {section.images.slice(2, 5).map((img, imgIndex) => (
                      <div key={imgIndex} className="overflow-hidden rounded-lg h-full">
                        <LazyLoadImage
                          effect="opacity"
                          src={img}
                          alt={`${section.title} ${imgIndex + 3}`}
                          wrapperClassName="w-full h-full"
                          className="w-full h-full object-cover object-center rounded-lg"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Kolom Kanan */}
                  <div className="flex flex-col gap-4">
                    <div className="overflow-hidden rounded-lg flex-1 h-full">
                      <LazyLoadImage
                        effect="opacity"
                        src={section.images[5]}
                        alt={`${section.title} 6`}
                        wrapperClassName="w-full h-full"
                        className="w-full h-full object-cover object-center rounded-lg"
                      />
                    </div>
                    <div className="overflow-hidden rounded-lg flex-1 h-full">
                      <LazyLoadImage
                        effect="opacity"
                        src={section.images[6]}
                        alt={`${section.title} 7`}
                        wrapperClassName="w-full h-full"
                        className="w-full h-full object-cover object-center rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}

      </section>

      {window.location.pathname === "/" && (
        <div className="flex justify-center text-center gap-10 my-10 items-center">

          <div className="flex justify-end items-center p-2">
            <button
              className="btn btn-error btn-outline text-base-content hover:btn-error btn-lg"
              onClick={() => navigate('/gallery')}
            >
              Selengkapnya
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

export default Gallery