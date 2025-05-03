import { useNavigate } from 'react-router-dom';
import defatulAvatar from '../assets/img/users/default.png';
import Weddings from '../components/Products/Wedings';

function HomePage() {
  const navigate = useNavigate()


  return (

    <div className="mx-3">

      {/* HERO */}
      <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)' }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-lg">
            <h1 className="mb-5 text-7xl font-bold">DINAR MAKEUP</h1>
            <p className="mb-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis laboriosam tenetur, repudiandae eum rerum quas distinctio fuga, hic autem quisquam possimus cupiditate neque nihil delectus est rem aliquam voluptatibus sequi quam dolorem explicabo assumenda! Facilis nemo excepturi cupiditate esse voluptate?
            </p>
            <button onClick={() => navigate('/product')} className="btn px-12 btn-primary">Pilih Paket</button>
          </div>
        </div>
      </div>

      {/* Service Description */}
      <div className='grid grid-cols-3 gap-4 my-20'>
        <div className="">
          <div className='absolute max-[640px]:mt-16 max-[640px]:text-xs min-[640px]:mt-20 min-[640px]:ms-1 min-[768px]:mt-16 min-[768px]:ms-8 min-[640px]:text-sm min-[768px]:text-md min-[1024px]:text-lg min-[1280px]:text-xl font-bold '>
            Team.<br />Dinar Makeup
          </div>
          <div className="avatar-group -space-x-6 rtl:space-x-reverse pb-10 min-[768px]:ms-16 min-[1024px]:ms-20 min-[1280px]:ms-24 mt-5">
            <div className="avatar">
              <div className="w-16">
                <img src={defatulAvatar} title='defatulAvatar' />
              </div>
            </div>
            <div className="avatar">
              <div className="w-16">
                <img src={defatulAvatar} title='defatulAvatar' />
              </div>
            </div>
            <div className="avatar">
              <div className="w-16">
                <img src={defatulAvatar} title='defatulAvatar' />
              </div>
            </div>
            <div className="avatar">
              <div className="w-16">
                <img src={defatulAvatar} title='defatulAvatar' />
              </div>
            </div>
            <div className="avatar">
              <div className="w-16">
                <img src={defatulAvatar} title='defatulAvatar' />
              </div>
            </div>
            <div className="avatar">
              <div className="w-16">
                <img src={defatulAvatar} title='defatulAvatar' />
              </div>
            </div>

          </div>
        </div>

        <div className="col-span-2 min-[640px]:text-xl min-[768px]:text-2xl min-[1024px]:text-3xl min-[1280px]:text-5xl font-semibold">
          <div className='lg:me-20'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci dolore, dolores necessitatibus alias perferendis qui aliquam sequi reiciendis fugiat accusantium ex, quo consequatur inventore, minus sint odio nemo. Non, quo.
          </div>
        </div>


      </div>

      {/* List Product/Paket */}
      <div className="mt-20">
        <Weddings />
      </div>

      <div className="flex justify-center items-enter mb-20">
        <button onClick={() => navigate('/product')} className="btn btn-lg btn-wide">More</button>
      </div>

    </div>
  )
}

export default HomePage