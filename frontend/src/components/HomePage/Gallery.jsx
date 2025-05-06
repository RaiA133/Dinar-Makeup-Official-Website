import { useNavigate } from "react-router-dom";

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
      )
      }

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>

        <div className="card bg-base-100 w-full shadow-md">
          <figure>
            <img
              src="https://placehold.co/1980x1080"
              alt="Shoes" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Makeup</h2>
          </div>
        </div>

        <div className="card bg-base-100 w-full shadow-md">
          <figure>
            <img
              src="https://placehold.co/1980x1080"
              alt="Shoes" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Dekorasi</h2>
          </div>
        </div>

        <div className="card bg-base-100 w-full shadow-md">
          <figure>
            <img
              src="https://placehold.co/1980x1080"
              alt="Shoes" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Dokumentasi</h2>
          </div>
        </div>

        <div className="card bg-base-100 w-full shadow-md">
          <figure>
            <img
              src="https://placehold.co/1980x1080"
              alt="Shoes" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Event Organizer</h2>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Gallery