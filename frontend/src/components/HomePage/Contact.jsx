function Contact() {
  return (
    <div className="mt-20 mx-1 sm:mx-20">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
        <div className="p-2">
          <div className="text-4xl font-semibold mb-2">Contact</div>
          <span className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, nam asperiores.
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
        <div>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3211.1459651311807!2d107.64228604005275!3d-6.924532276515779!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e7debe338885%3A0xa8ccdf80a557fad9!2sJl.%20Jembatan%20Opat%2C%20Kec.%20Batununggal%2C%20Kota%20Bandung%2C%20Jawa%20Barat!5e0!3m2!1sen!2sid!4v1746374922013!5m2!1sen!2sid" width="600" height="450" style={{ color: 'red' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>

        <div>
          <div className="flex items-center gap-5 mb-10">
            <div className="avatar avatar-placeholder">
              <div className="bg-neutral-content text-neutral w-12 rounded-full">
              </div>
            </div>
            <div>Jalan Merpati No. 45, Kelurahan Sukamaju, Kecamatan Cempaka, Kota Bunga, 12345, Indonesia</div>
          </div>

          <div className="flex items-center gap-5 mb-10">
            <div className="avatar avatar-placeholder">
              <div className="bg-neutral-content text-neutral w-12 rounded-full">
              </div>
            </div>
            <div>0813 2913 1020 4010</div>
          </div>

          <div className="flex items-center gap-5 mb-10">
            <div className="avatar avatar-placeholder">
              <div className="bg-neutral-content text-neutral w-12 rounded-full">
              </div>
            </div>
            <div>weddingonline@gmail.com</div>
          </div>

          <div className="flex items-center gap-5 mb-3">
            <div className="avatar avatar-placeholder">
              <div className="bg-neutral-content text-neutral w-12 rounded-full">
              </div>
            </div>
            <div>Waktu Operasional</div>
          </div>

          <div className="overflow-x-auto w-1/2">
            <table className="table">
              <tbody className="text-md">
                <tr>
                  <td>Senin - Jumat</td>
                  <td>08.00 - 16.00</td>
                </tr>
                <tr>
                  <td>Sabtu - Minggu</td>
                  <td>12.00 - 16.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Contact