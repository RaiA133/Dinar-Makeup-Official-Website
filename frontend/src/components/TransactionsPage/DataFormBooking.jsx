import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import MarkdownRenderer from "../MarkdownRenderer";
import moment from "moment";

function dataFormBooking({ trx }) {
  console.log(trx);
  return (
    <section>

      {/* Main Header */}
      <h3 className="font-bold mb-4 text-neutral text-center text-2xl">Pengisian Form Booking</h3>
      <div className="divider"></div>

      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-2xl border border-base-300 gap-4 mb-12">
        <div className="mx-0 lg:mx-5 xl:mx-20">

          {/* Header */}
          <div className="text-md sm:text-xl flex font-bold justify-center w-full my-10 text-accent">Data Diri Pengantin</div>

          {/* Form Data Diri Pengantin*/}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

            {/* Mempelai Laki-laki */}
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend ms-1">Nama Lengkap Mempelai Pria</legend>
                <input type="text" className="input w-full bg-transparent" placeholder="Type here" name="nama_pria" value={trx.data_form.customer_detail.groom_full_name} />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend ms-1">Alamat Mempelai Pria</legend>
                <textarea className="textarea h-24 w-full bg-transparent" placeholder="Masukan Alamat" name="alamat_pria" value={trx.data_form.customer_detail.groom_address}></textarea>
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend ms-1">Email</legend>
                <input type="email" className="input w-full bg-transparent" placeholder="dinar.dumilah@gmail.com" name="email_pria" value={trx.data_form.customer_detail.groom_email} />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend ms-1">Instagram</legend>
                <input type="text" className="input w-full bg-transparent" placeholder="Masukan Nama Instagram Mempelai Pria" name="ig_pria" value={trx.data_form.customer_detail.groom_instagram} />
              </fieldset>
            </div>

            {/* Mempelai Wanita */}
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend ms-1">Nama Lengkap Mempelai Wanita</legend>
                <input type="text" className="input w-full bg-transparent" placeholder="Type here" name="nama_wanita" value={trx.data_form.customer_detail.bride_full_name} />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend ms-1">Alamat Mempelai Wanita</legend>
                <textarea className="textarea h-24 w-full bg-transparent" placeholder="Masukan Alamat" name="alamat_wanita" value={trx.data_form.customer_detail.bride_address}></textarea>
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend ms-1">Email</legend>
                <input type="email" className="input w-full bg-transparent" placeholder="dinar.dumilah@gmail.com" name="email_wanita" value={trx.data_form.customer_detail.bride_email} />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend ms-1">Instagram</legend>
                <input type="text" className="input w-full bg-transparent" placeholder="Masukan Nama Instagram Mempelai Wanita" name="ig_wanita" value={trx.data_form.customer_detail.bride_instagram} />
              </fieldset>
            </div>

          </div>

          {/* Header */}
          <div className="text-md sm:text-xl flex font-bold justify-center w-full my-10 text-accent">Detail Acara</div>

          {/* Form Detail Acara*/}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

            {/* Mempelai Laki-laki */}
            <div className="h-full">
              <div className="fieldset">
                <legend className="fieldset-legend ms-1">Tanggal Akad (Bila dipisah)</legend>
                <button type="button" popoverTarget={`tgl_akad_${trx.id}`} className="input input-border w-full bg-transparent" style={{ anchorName: "--tgl_akad" }}>
                  {trx.data_form.detail_order.akad_date}
                </button>
                <div popover="auto" id={`tgl_akad_${trx.id}`} className="dropdown" style={{ positionAnchor: "--tgl_akad" }}>
                  <DayPicker
                    required
                    className="react-day-picker"
                    mode="single"
                    captionLayout="dropdown"
                    defaultMonth={moment(trx.data_form.detail_order.akad_date).format("YYYY MMM")}
                    startMonth={new Date(2024, 6)}
                    endMonth={new Date(2050, 9)}
                    selected={trx.data_form.detail_order.akad_date} />
                </div>
              </div>
              <fieldset className="fieldset h-full">
                <legend className="fieldset-legend ms-1">Lokasi Pernikahan</legend>
                <textarea className="textarea h-48 w-full bg-transparent" placeholder="Masukan Lokasi Pernikahan" name="lokasi_pernikahan" value={trx.data_form.detail_order.location}></textarea>
              </fieldset>
            </div>

            {/* Mempelai Perempuan */}
            <div>

              {/* Daypicker Date */}

              <div className="fieldset">
                <legend className="fieldset-legend ms-1">Tanggal Acara</legend>
                <button type="button" popoverTarget={`tgl_acara_${trx.id}`} className="input input-border w-full bg-transparent" style={{ anchorName: "--tgl_acara" }}>
                  {trx.data_form.detail_order.show_date}
                </button>
                <div popover="auto" id={`tgl_acara_${trx.id}`} className="dropdown" style={{ positionAnchor: "--tgl_acara" }}>
                  <DayPicker
                    className="react-day-picker"
                    mode="single"
                    captionLayout="dropdown"
                    defaultMonth={moment(trx.data_form.detail_order.show_date).format("YYYY MMM")}
                    startMonth={new Date(2024, 6)}
                    endMonth={new Date(2050, 9)}
                    selected={trx.data_form.detail_order.show_date} />
                </div>
              </div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend ms-1">Jam akad</legend>
                <input type="time" className="input w-full bg-transparent" name="jam_akad" value={trx.data_form.detail_order.akad_time} />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend ms-1">Jumlah Tamu</legend>
                <input type="number" className="input w-full bg-transparent" placeholder="dinar.dumilah@gmail.com" name="jumlah_tamu" value={trx.data_form.detail_order.guest_count} />
              </fieldset>
              <div className="fieldset">
                <legend className="fieldset-legend ms-1">Tanggal Tech Meeting</legend>
                <button type="button" popoverTarget={`tgl_tech_meeting_${trx.id}`} className="input input-border w-full bg-transparent" style={{ anchorName: "--tgl_tech_meeting" }}>
                  {trx.data_form.detail_order.tech_meeting}
                </button>
                <div popover="auto" id={`tgl_tech_meeting_${trx.id}`} className="dropdown" style={{ positionAnchor: "--tgl_tech_meeting" }}>
                  <DayPicker
                    className="react-day-picker"
                    mode="single"
                    captionLayout="dropdown"
                    defaultMonth={moment(trx.data_form.detail_order.tech_meeting).format("YYYY MMM")}
                    startMonth={new Date(2024, 6)}
                    endMonth={new Date(2050, 9)}
                    selected={trx.data_form.detail_order.tech_meeting} />
                </div>
              </div>
            </div>

          </div>

          {/* Kententuan */}
          <fieldset className="fieldset border-base-300 rounded-box w-full border p-4 my-5 bg-transparent">
            {/* <legend className="fieldset-legend">Login options</legend> */}
            <div className="flex items-center gap-3">
              <input type="checkbox" className="checkbox" name="term_1" defaultChecked />
              <span>Saya menyetujui syarat dan ketentuan layanan</span>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" className="checkbox" name="term_2" defaultChecked />
              <span>Saya telah membaca kebijakan pembatalan</span>
            </div>
          </fieldset>

          <div className="md:mb-10">
            {/* Header */}
            <div className="text-md sm:text-xl flex font-bold justify-center w-full my-10 text-accent">Data Opsional</div>

            <fieldset className="fieldset h-full">
              <legend className="fieldset-legend">Notes <span>(opsional)</span></legend>
              {trx.notes ? (
                <div className="rounded-box w-full p-4 bg-transparent text-base-600 border border-base-300">
                  <MarkdownRenderer>{trx.notes}</MarkdownRenderer>
                </div>
              ) : (
                <p className="text-base-600">-</p>
              )}
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">File <span>(opsional)</span></legend>
              {trx.document_orders ? (
                <div className="space-y-6">
                  {Array.isArray(trx.document_orders) ? (
                    trx.document_orders.map((doc, idx) => {
                      const fileUrl = doc.url || doc;
                      const fileName = doc.file_name || fileUrl.split('/').pop();
                      const fileExt = fileUrl.split('.').pop().toLowerCase();

                      return (
                        <div key={idx} className="group">
                          {fileExt === 'pdf' ? (
                            <div className="border rounded-2xl overflow-hidden transition-all duration-300 group-hover:shadow-lg">
                              <iframe
                                src={`https://docs.google.com/gview?url=${encodeURIComponent(fileUrl)}&embedded=true`}
                                className="w-full h-80 border-0"
                                title={`Dokumen ${idx + 1}`}
                              />
                              <div className="p-3 bg-base-200">
                                <p className="text-base-600 truncate">{fileName}</p>
                              </div>
                            </div>
                          ) : ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(fileExt) ? (
                            <div className="relative">
                              <img
                                src={fileUrl}
                                alt={`Gambar ${idx + 1}`}
                                className="max-w-full rounded-2xl border transition-all duration-300 group-hover:shadow-lg"
                              />
                              <div onClick={() => document.getElementById(`image_modal_${idx}`).showModal()} className="cursor-pointer absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 rounded-2xl">
                                <span className="text-white">{fileName}</span>
                              </div>

                              <dialog id={`image_modal_${idx}`} className="modal">
                                <div className="modal-box max-w-5xl p-0 bg-transparent shadow-none">
                                  <div className="relative">
                                    <img
                                      src={fileUrl}
                                      alt={`Preview ${fileName}`}
                                      className="w-full max-h-[80vh] object-contain rounded-2xl"
                                    />
                                  </div>
                                </div>
                                <form method="dialog" className="modal-backdrop">
                                  <button>close</button>
                                </form>
                              </dialog>
                            </div>
                          ) : (
                            <div className="flex items-center gap-3 p-4 bg-base-200 rounded-2xl hover:bg-base-300 transition-colors duration-200">
                              <FaFile className="text-accent" />
                              <a
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="link link-accent hover:link-primary"
                              >
                                {fileName}
                              </a>
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-base-600">Tipe dokumen tidak valid</p>
                  )}
                </div>
              ) : (
                <p className="text-base-600">-</p>
              )}
            </fieldset>
          </div>

        </div>
      </div>

    </section>
  )
}

export default dataFormBooking