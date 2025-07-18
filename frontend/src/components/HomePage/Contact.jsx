import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaInstagram, FaClock } from 'react-icons/fa';

function Contact() {
  return (
    <div className="mx-4 sm:mx-8 lg:mx-20 pb-20">
      {/* Header Section */}
      <div id='header-contact' className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-base-900 mb-4">Kontak Kami</h1>
        <p className="text-lg text-base-600 max-w-2xl mx-auto">
          Hubungi Tim Dinar Makeup
        </p>
      </div>

      {/* Introduction Section */}
      <div id='introduction-contact' className="max-w-4xl mx-auto mb-16 space-y-6 text-center">
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
      <div id='content-contact' className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Map Section */}
        <div id='map-contact' className="rounded-xl overflow-hidden shadow-xl h-96">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.6053260868666!2d107.7463964!3d-7.055574699999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68c728715530df%3A0x852616ff78dd6bc4!2sDinarMakeUp!5e0!3m2!1sen!2sid!4v1746799906670!5m2!1sen!2sid"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Contact Details */}
        <div id='contact-detail' className="space-y-8">
          {/* Address */}
          <div id='address-detail-contact' className="flex items-start gap-6">
            <div className="bg-error/10 p-3 rounded-full text-error">
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
          <div id='phone-detail-contact' className="flex items-start gap-6">
            <div className="bg-error/10 p-3 rounded-full text-error">
              <FaPhone className="text-2xl" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Telepon/WhatsApp</h3>
              <p className="text-base-600">
                <a href="tel:08980000845" className="hover:text-error transition-colors">
                  0898-0000-845
                </a>
              </p>
            </div>
          </div>

          {/* Email */}
          <div id='email-detail-contact' className="flex items-start gap-6">
            <div className="bg-error/10 p-3 rounded-full text-error">
              <FaEnvelope className="text-2xl" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-base-600">
                <a href="mailto:dinar.dumilah@gmail.com" className="hover:text-error transition-colors">
                  dinar.dumilah@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Instagram */}
          <div id='instagram-detail-contact' className="flex items-start gap-6">
            <div className="bg-error/10 p-3 rounded-full text-error">
              <FaInstagram className="text-2xl" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Instagram</h3>
              <p className="text-base-600">
                <a href="https://instagram.com/dinarmakeup" target="_blank" rel="noopener noreferrer" className="hover:text-error transition-colors">
                  @dinarmakeup
                </a>
              </p>
            </div>
          </div>

          {/* Operating Hours */}
          <div id="operation-hour-detail-contact" className="flex items-start gap-6">
            <div className="bg-error/10 p-3 rounded-full text-error">
              <FaClock className="text-2xl" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Jam Operasional</h3>
              <div className="overflow-x-auto">
                  <div className="text-md">
                    <div className="font-medium">Senin - Sabtu</div>
                    <div className="text-base-600">09.00 – 17.00 WIB</div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div id='call-to-action-contact' className="bg-gradient-to-r from-accent to-error text-white rounded-xl p-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Punya Pertanyaan?</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Tim kami siap membantu Anda mewujudkan pernikahan impian Anda. Hubungi kami sekarang!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            id='chat-via-whatsapp-contact'
            href="https://wa.me/628980000845"
            className="btn btn-outline btn-white hover:bg-white hover:text-base-content"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat via WhatsApp
          </a>
          <a
            id='send-email-contact'
            href="mailto:dinar.dumilah@gmail.com"
            className="btn btn-outline btn-white hover:bg-white hover:text-base-content"
          >
            Kirim Email
          </a>
        </div>
      </div>
    </div>
  )
}

export default Contact
