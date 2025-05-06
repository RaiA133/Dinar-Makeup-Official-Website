import { useNavigate } from "react-router-dom"

function About() {
  const navigate = useNavigate();

  return (
    <div className="mt-20 mx-1 sm:mx-20">

      {/* Judul (hanya ada di menu home) */}
      {location.pathname == "/" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          <div className="p-2">
            <div className="text-4xl font-semibold mb-2">About</div>
            <span className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, nam asperiores.
            </span>
          </div>

          <div className="flex justify-end items-center p-2">
            <a className="link link-info no-underline" onClick={() => navigate('/about')}>Lihat Semua</a>
          </div>

        </div>
      )
      }

      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>

        <div>
          <img
            src="https://placehold.co/1980x1080"
            className="w-full rounded-lg shadow-2xl"
          />
        </div>

        <div>
          <div className='text-justify'>
            <div className="mb-5">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor, vero a! Doloremque, voluptate. Facilis tempora doloribus labore voluptatibus rerum harum deserunt vitae repudiandae? Hic, minima. Perspiciatis corrupti facere nihil molestiae non commodi porro minima vitae exercitationem atque, quod nesciunt dignissimos ut ea velit excepturi id esse iure, minus aperiam aliquid!
            </div>
            <div className="mb-5">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor, vero a! Doloremque, voluptate. Facilis tempora doloribus labore voluptatibus rerum harum deserunt vitae repudiandae? Hic, minima. Perspiciatis corrupti facere nihil molestiae non commodi porro minima vitae exercitationem atque, quod nesciunt dignissimos ut ea velit excepturi id esse iure, minus aperiam aliquid!
            </div>
            <div className="mb-5">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor, vero a! Doloremque, voluptate. Facilis tempora doloribus labore voluptatibus rerum harum deserunt vitae repudiandae? Hic, minima. Perspiciatis corrupti facere nihil molestiae non commodi porro minima vitae exercitationem atque, quod nesciunt dignissimos ut ea velit excepturi id esse iure, minus aperiam aliquid!
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default About