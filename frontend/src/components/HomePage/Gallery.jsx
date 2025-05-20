import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';

function Gallery() {
  const navigate = useNavigate();

  return (
    <div className="mt-20 mx-1 sm:mx-20">

      {/* Judul (hanya ada di menu home) */}
      {location.pathname == "/" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          <div className="p-2">
            <div className="text-4xl font-semibold mb-2">Gallery</div>
            <span className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, nam asperiores.
            </span>
          </div>

          <div className="flex justify-end items-center p-2">
            <a className="link link-info no-underline" onClick={() => navigate('/gallery')}>Lihat Semua</a>
          </div>

        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-6'>

        <div className="card bg-base-100 w-full shadow-md">
          <figure>
            <LazyLoadImage
              efect="opacity"
              src="https://placehold.co/1980x1080"
              alt="gallery-photo"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Makeup</h2>
          </div>
        </div>

        <div className="card bg-base-100 w-full shadow-md">
          <figure>
            <LazyLoadImage
              effect="opacity"
              src="https://placehold.co/1980x1080"
              alt="Shoes"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Dekorasi</h2>
          </div>
        </div>

        <div className="card bg-base-100 w-full shadow-md">
          <figure>
            <LazyLoadImage
              effect="opacity"
              src="https://placehold.co/1980x1080"
              alt="Shoes"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Dokumentasi</h2>
          </div>
        </div>

        <div className="card bg-base-100 w-full shadow-md">
          <figure>
            <LazyLoadImage
              effect="opacity"
              src="https://placehold.co/1980x1080"
              alt="Shoes"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Wedding Organizer</h2>
          </div>
        </div>

      </div>

      {location.pathname !== "/" && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="grid gap-4">
            <div>
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