import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaInstagram, FaClock } from 'react-icons/fa';

function Contact() {
  return (
    <div className="mt-20 mx-4 sm:mx-8 lg:mx-20">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-base-900 mb-4">Contact Us</h1>
        <p className="text-lg text-base-600 max-w-2xl mx-auto">
          Hubungi Tim Dinar Makeup
        </p>
      </div>

      {/* Introduction Section */}
      <div className="max-w-4xl mx-auto mb-16 space-y-6 text-center">
        <p className="text-xl text-base-700 italic">
          "Siap merancang hari spesial Anda? Hubungi kami untuk konsultasi gratis. Kami dengan senang hati akan membantu menjawab semua pertanyaan Anda dan memberikan solusi terbaik untuk pernikahan Anda."
        </p>
        {/* <div className="pt-6">
          <button className="btn btn-primary px-8 py-3 text-lg hover:shadow-lg transition-all">
            Jadwalkan Konsultasi Sekarang
          </button>
        </div> */}
      </div>

      {/* Contact Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Map Section */}
        <div className="rounded-xl overflow-hidden shadow-xl h-96">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.6053260868666!2d107.7463964!3d-7.055574699999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68c728715530df%3A0x852616ff78dd6bc4!2sDinarMakeUp!5e0!3m2!1sen!2sid!4v1746799906670!5m2!1sen!2sid"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Contact Details */}
        <div className="space-y-8">
          {/* Address */}
          <div className="flex items-start gap-6">
            <div className="bg-primary/10 p-3 rounded-full text-primary">
              <FaMapMarkerAlt className="text-2xl" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Alamat Studio</h3>
              <p className="text-base-600">
                KP Pangakalan Raja, Jl. Pangkalan Raja, RT.001/RW.005 Desa, Sukamukti, Kec. Majalaya, Kabupaten Bandung, Jawa Barat 40382
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-6">
            <div className="bg-primary/10 p-3 rounded-full text-primary">
              <FaPhone className="text-2xl" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Telepon/WhatsApp</h3>
              <p className="text-base-600">
                <a href="tel:08980000845" className="hover:text-primary transition-colors">
                  0898-0000-845
                </a>
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-6">
            <div className="bg-primary/10 p-3 rounded-full text-primary">
              <FaEnvelope className="text-2xl" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-base-600">
                <a href="mailto:dinar.dumilah@gmail.com" className="hover:text-primary transition-colors">
                  dinar.dumilah@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Instagram */}
          <div className="flex items-start gap-6">
            <div className="bg-primary/10 p-3 rounded-full text-primary">
              <FaInstagram className="text-2xl" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Instagram</h3>
              <p className="text-base-600">
                <a href="https://instagram.com/dinarmakeup" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  @dinarmakeup
                </a>
              </p>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="flex items-start gap-6">
            <div className="bg-primary/10 p-3 rounded-full text-primary">
              <FaClock className="text-2xl" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Jam Operasional</h3>
              <div className="overflow-x-auto">
                  <div className="text-md">
                    <div className="font-medium">Senin - Sabtu</div>
                    <div className="text-base-600">09.00 – 17.00 WIB0</div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl p-8 text-center mb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Punya Pertanyaan?</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Tim kami siap membantu Anda mewujudkan pernikahan impian Anda. Hubungi kami sekarang!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="https://wa.me/628980000845"
            className="btn btn-outline btn-white hover:bg-white hover:text-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat via WhatsApp
          </a>
          <a
            href="mailto:dinar.dumilah@gmail.com"
            className="btn btn-outline btn-white hover:bg-white hover:text-primary"
          >
            Kirim Email
          </a>
        </div>
      </div>
    </div>
  )
}

export default Contact