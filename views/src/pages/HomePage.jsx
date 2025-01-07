import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Partner from '../components/Partner';
import toast, { Toaster } from 'react-hot-toast';
import affan from '../../../assets/img/team/affan.jpeg';
import holid from '../../../assets/img/team/holid.png';
import iffat from '../../../assets/img/team/iffat.png';
import ikhsan from '../../../assets/img/team/ikhsan.png';
import raie from '../../../assets/img/team/raie.png';
import hadi from '../../../assets/img/team/hadi.jpg';

function HomePage() {
  const navigate = useNavigate()

  useEffect(() => {
    const toastMessage = localStorage.getItem('toastMessage')

    // TOAST Login berhasil : Muncul ketika proses login berhasil
    if (toastMessage == 'Anda Berhasil Login') {
      toast.success(toastMessage, {
        duration: 2500,
      });
      localStorage.removeItem('toastMessage');
    }

    // TOAST Logout berhasil : Muncul ketika proses logout berhasil
    if (toastMessage == 'Berhasil Logout') {
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

      <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)' }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-lg">
            <h1 className="mb-5 text-7xl font-bold">DINAR MAKEUP</h1>
            <p className="mb-5">
              Apakah Anda sedang mencari ahli di bidang desain, penulisan, pengembangan web, atau pekerjaan freelance lainnya? Dengan DEFINED, Anda dapat terhubung orang orang yang profesional dan berbakat yang siap membantu mewujudkan visi Anda. Atau, jadilah profesional yang dibutuhkan dan raih kesempatan baru!
            </p>
            <button onClick={() => navigate('/post')} className="btn px-12 btn-primary">Pilih Paket</button>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-4 my-20'>
        <div className="">
          <div className='absolute max-[640px]:mt-16 max-[640px]:text-xs min-[640px]:mt-20 min-[640px]:ms-1 min-[768px]:mt-16 min-[768px]:ms-8 min-[640px]:text-sm min-[768px]:text-md min-[1024px]:text-lg min-[1280px]:text-xl font-bold '>
            Team.<br />!undifined
          </div>
          <div className="avatar-group -space-x-6 rtl:space-x-reverse pb-10 min-[768px]:ms-16 min-[1024px]:ms-20 min-[1280px]:ms-24 mt-5">
            <div className="avatar">
              <div className="w-16">
                <img src={affan} title='Affan'/>
              </div>
            </div>
            <div className="avatar">
              <div className="w-16">
                <img src={ikhsan} title='Ikhsan'/>
              </div>
            </div>
            <div className="avatar">
              <div className="w-16">
                <img src={hadi} title='Hadi'/>
              </div>
            </div>
            <div className="avatar">
              <div className="w-16">
                <img src={iffat} title='Iffat'/>
              </div>
            </div>
            <div className="avatar">
              <div className="w-16">
                <img src={holid} title='Holid'/>
              </div>
            </div>
            <div className="avatar">
              <div className="w-16">
                <img src={raie} title='Raie'/>
              </div>
            </div>
            
          </div>
        </div>

        <div className="col-span-2 min-[640px]:text-xl min-[768px]:text-2xl min-[1024px]:text-3xl min-[1280px]:text-5xl font-semibold">
          <div className='lg:me-20'>
          Jelaskan keinginan dan persyaratan proyek Anda dengan rinci menggunakan fitur "Buat Tawaran". Pilih kategori, tentukan anggaran, dan berikan tenggat waktu. Kami menyederhanakan proses ini sehingga Anda dapat berkonsentrasi pada hasil akhir yang diinginkan. <br />
            {/* <button className='btn lg:btn-lg max-[640px]:px-12  min-[640px]:px-16 min-[768px]:px-20 btn-primary mt-20' onClick={() => navigate("create-post")}>Post Now</button> */}
          </div>
        </div>

      </div>

      <Partner />

    </div>
  )
}

export default HomePage