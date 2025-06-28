import { useNavigate } from "react-router-dom";
import { FaQuoteLeft, FaQuoteRight, FaHeart, FaPalette, FaHandsHelping, FaRegLightbulb } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { GiLipstick } from "react-icons/gi";
import { MdOutlineCelebration, MdBrush } from "react-icons/md";

function About() {
  const navigate = useNavigate();

  return (
    <div className="mx-4 sm:mx-8 lg:mx-16 xl:mx-24">
      {/* Header Section */}
      {window.location.pathname === "/" && (
        <div className="flex justify-center text-center gap-10 my-10 items-center">
          <div className="p-2">
            <h2 className="text-5xl font-bold mb-7 text-base-950">Tentang Kami</h2>
            <p className="text-lg text-base-600">
              Kami hadir untuk menjadikan hari istimewa Anda lebih berkesan melalui layanan yang elegan, personal, dan profesional.
            </p>
          </div>
        </div>
      )}


      <section className="">

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start text-justify">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Hero Image */}
            <div className="relative group overflow-hidden rounded-3xl shadow-2xl">
              <img
                src="/img/about/IMG_5926.PNG"
                className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-105"
                alt="Dinar Makeup Professional Team"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                <span className="text-base-100 text-xl font-medium">Tim Profesional Dinar Makeup</span>
              </div>
            </div>

            {/* Philosophy Card */}
            <div className="card bg-gradient-to-br from-error to-accent text-base-100 p-10 transition-all duration-500 hover:shadow-2xl">
              <div className="flex justify-end gap-4 mb-4">
                <FaHeart className="text-3xl" />
                <h3 className="text-2xl font-bold">Filosofi Kami</h3>
              </div>
              <FaQuoteLeft className="opacity-20 absolute top-15 left-5" />
              <p className="italic">
                Dinar Makeup hadir dari kecintaan mendalam terhadap dunia kecantikan dan momen pernikahan, dengan tujuan memberikan pengalaman yang elegan, personal, dan tak terlupakan bagi setiap calon pengantin.
              </p>
              <FaQuoteRight className="opacity-20 absolute bottom-5 right-5" />
            </div>

          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Vision & Mission */}
            <div className="space-y-6">
              {/* Vision Card */}
              <div className="bg-base-100 p-8 rounded-3xl shadow-lg border border-base-300 transition-all duration-300 hover:shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-base-300 p-3 rounded-xl">
                    <FaRegLightbulb className="text-primary text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-base-800">Visi Kami</h3>
                  </div>
                </div>
                <div className="space-y-4 text-base-600 leading-relaxed">
                  <p>
                    Menjadi mitra terpercaya dan pilihan utama dalam dunia Wedding Organizer dan Makeup Profesional di Bandung dan sekitarnya, dengan mengutamakan kualitas layanan, kepercayaan, dan estetika yang konsisten.
                  </p>
                </div>
              </div>

              {/* Mission Card */}
              <div className="bg-base-100 p-8 rounded-3xl shadow-lg border border-base-300  transition-all duration-300 hover:shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-base-300 p-3 rounded-xl">
                    <GoGoal className="text-accent text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-base-800">Misi Kami</h3>
                  </div>
                </div>
                <div className="space-y-4 text-base-600 leading-relaxed">
                  <p>
                    "Membantu pasangan pengantin merancang dan melaksanakan pernikahan dengan sempurna melalui layanan yang profesional, personal, dan inovatif."
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="stats shadow bg-base-200 transition-all duration-500 hover:shadow-lg w-full">

              <div className="stat">
                <div className="stat-figure text-accent">
                  <FaHandsHelping className="text-1xl sm:text-3xl" />
                </div>
                <div className="stat-title">Pengalaman</div>
                <div className="stat-value text-accent">5+ Tahun</div>
                <div className="stat-desc">Di industri pernikahan | Since 2016</div>
              </div>

              <div className="stat">
                <div className="stat-figure text-secondary">
                  <FaPalette className="text-1xl sm:text-3xl" />
                </div>
                <div className="stat-title">Spesialisasi</div>
                <div className="stat-value text-secondary">Makeup</div>
                <div className="stat-desc">Profesional & Elegant</div>
              </div>

            </div>
          </div>
        </div>

        {/* About Description */}
        {window.location.pathname === "/about" && (
          <div className="mt-16 bg-gradient-to-r from-primary/5 to-secondary/5 p-10 rounded-3xl shadow-inner">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <MdBrush className="text-3xl text-primary" />
                <h3 className="text-2xl font-bold text-base-800">Tentang Dinar Makeup</h3>
              </div>

              <div className="space-y-6 text-base-600 text-lg leading-relaxed">
                <p>
                  Kami memahami bahwa setiap pasangan memiliki cerita dan impian unik. Misi kami adalah mewujudkan impian tersebut melalui layanan yang personal, penuh perhatian, dan berkualitas tinggi.
                </p>

                <p>
                  Dari tata rias hingga pengelolaan acara, kami hadir untuk membantu Anda menikmati setiap momen dengan mudah dan tanpa khawatir. Setiap detail diperhatikan dengan seksama untuk menciptakan pengalaman yang sempurna.
                </p>

                <p>
                  Sebagai penyedia layanan wedding organizer terpercaya, Dinar Makeup berkomitmen untuk mewujudkan momen istimewa Anda menjadi kenangan tak terlupakan. Dengan perpaduan pengalaman profesional dan pendekatan personal, kami menawarkan solusi lengkap untuk pernikahan Anda.
                </p>

                <p>
                  Bersama kami, impian pernikahan Anda bukan sekadar rencana, melainkan realita yang indah dan penuh makna. Setiap pernikahan adalah cerita unik yang layak mendapatkan sentuhan spesial.
                </p>
              </div>
            </div>
          </div>
        )}

      </section>

      {window.location.pathname === "/" && (
        <div className="flex justify-center text-center gap-10 my-10 items-center">
          <div className="flex justify-end items-center p-2">
            <button
              className="btn btn-error btn-outline text-base-content hover:btn-error btn-lg"
              onClick={() => navigate('/about')}
            >
              Selengkapnya
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

export default About;