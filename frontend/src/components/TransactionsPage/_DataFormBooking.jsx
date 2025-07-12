import MarkdownRenderer from "../MarkdownRenderer";

function dataFormBooking() {
  return (
    <div className="grid grid-cols-1 gap-5 mb-5">
      <div className="space-y-2">
        <h4 className="font-semibold text-neutral text-center text-2xl">Data Form Booking</h4>
        <div className="divider"></div>

        <div className="space-y-6">

          {/* Data Diri Pengantin - Modern Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7">
              <div className="card bg-base-100 rounded-3xl border border-base-300 transition-all duration-300 shadow-md hover:shadow-xl">
                <div className="card-body p-5">
                  <div className="flex items-center gap-5 ">
                    <FaHeart className="text-error text-2xl" />
                    <h4 className="text-2xl font-bold text-base-800">Data Diri Pengantin</h4>
                  </div>
                  <div className="divider mb-2 mt-0"></div>

                  <div className="space-y-6">
                    {/* Groom Section */}
                    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-2xl border border-base-300">
                      <div className="flex items-center gap-3 mb-4">
                        <FaMale className="text-error text-xl" />
                        <h5 className="font-semibold text-accent">Mempelai Pria</h5>
                      </div>
                      <div className="space-y-3 pl-8">
                        <div className="flex items-start">
                          <span className="font-medium min-w-[80px]">Nama</span>
                          <span className="text-base-600">: {trx.data_form.customer_detail.groom_full_name}</span>
                        </div>
                        <div className="flex items-start">
                          <span className="font-medium min-w-[80px]">Alamat</span>
                          <span className="text-base-600">: {trx.data_form.customer_detail.groom_address}</span>
                        </div>
                        <div className="flex items-start">
                          <span className="font-medium min-w-[80px]">Email</span>
                          <span className="text-base-600">: {trx.data_form.customer_detail.groom_email}</span>
                        </div>
                        <div className="flex items-start">
                          <span className="font-medium min-w-[80px]">Instagram</span>
                          <span className="text-base-600">: {trx.data_form.customer_detail.groom_instagram}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bride Section */}
                    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-2xl border border-base-300">
                      <div className="flex items-center gap-3 mb-4">
                        <FaFemale className="text-error text-xl" />
                        <h5 className="font-semibold text-accent">Mempelai Wanita</h5>
                      </div>
                      <div className="space-y-3 pl-8">
                        <div className="flex items-start">
                          <span className="font-medium min-w-[80px]">Nama</span>
                          <span className="text-base-600">: {trx.data_form.customer_detail.bride_full_name}</span>
                        </div>
                        <div className="flex items-start">
                          <span className="font-medium min-w-[80px]">Alamat</span>
                          <span className="text-base-600">: {trx.data_form.customer_detail.bride_address}</span>
                        </div>
                        <div className="flex items-start">
                          <span className="font-medium min-w-[80px]">Email</span>
                          <span className="text-base-600">: {trx.data_form.customer_detail.bride_email}</span>
                        </div>
                        <div className="flex items-start">
                          <span className="font-medium min-w-[80px]">Instagram</span>
                          <span className="text-base-600">: {trx.data_form.customer_detail.bride_instagram}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detail Acara - Modern Card */}
            <div className="lg:col-span-5">
              <div className="card bg-base-100 rounded-3xl border border-base-300 transition-all duration-300 shadow-md hover:shadow-xl">
                <div className="card-body p-5">
                  <div className="flex items-center gap-3">
                    <BiSolidDetail className="text-error text-2xl" />
                    <h4 className="text-2xl font-bold text-base-800">Detail Acara</h4>
                  </div>
                  <div className="divider mb-2 mt-0"></div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      {/* Akad Nikah */}
                      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-3 rounded-2xl border border-base-300">
                        <div className="flex items-center gap-3 mb-3">
                          <FaCalendarAlt className="text-error" />
                          <h5 className="font-semibold text-accent">Akad Nikah</h5>
                        </div>
                        <p className="pl-8 text-base-600">
                          {trx.data_form.detail_order.akad_date} - {trx.data_form.detail_order.akad_time}
                        </p>
                      </div>

                      {/* Resepsi */}
                      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-3 rounded-2xl border border-base-300">
                        <div className="flex items-center gap-3 mb-3">
                          <FaCalendarAlt className="text-error" />
                          <h5 className="font-semibold text-accent">Resepsi</h5>
                        </div>
                        <p className="pl-8 text-base-600">
                          {trx.data_form.detail_order.show_date}
                        </p>
                      </div>

                      {/* Lokasi */}
                      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-3 rounded-2xl border border-base-300">
                        <div className="flex items-center gap-3 mb-3">
                          <FaMapMarkerAlt className="text-error" />
                          <h5 className="font-semibold text-accent">Lokasi</h5>
                        </div>
                        <p className="pl-8 text-base-600">
                          {trx.data_form.detail_order.location}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Jumlah Tamu */}
                        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-3 rounded-2xl border border-base-300">
                          <div className="flex items-center gap-3 mb-3">
                            <FaUsers className="text-error" />
                            <h5 className="font-semibold text-accent">Jumlah Tamu</h5>
                          </div>
                          <p className="pl-8 text-base-600">
                            {trx.data_form.detail_order.guest_count} orang
                          </p>
                        </div>

                        {/* Tech Meeting */}
                        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-3 rounded-2xl border border-base-300">
                          <div className="flex items-center gap-3 mb-3">
                            <FaCalendarAlt className="text-error" />
                            <h5 className="font-semibold text-accent">Tech Meeting</h5>
                          </div>
                          <p className="pl-8 text-base-600">
                            {trx.data_form.detail_order.tech_meeting}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Data Opsional */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
            <div className="lg:col-span-12">
              <div className="card bg-base-100 rounded-3xl border border-base-300 transition-all duration-300 shadow-md hover:shadow-xl">
                <div className="card-body p-6">
                  <div className="flex items-center gap-3">
                    <FaFileAlt className="text-error text-2xl" />
                    <h4 className="text-2xl font-bold text-base-800">Data Opsional</h4>
                  </div>
                  <div className="divider my-2"></div>

                  <div className="space-y-6">
                    {/* Notes Section */}
                    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-2xl border border-base-300">
                      <div className="flex items-center gap-3 mb-4">
                        <FaStickyNote className="text-error" />
                        <h5 className="font-semibold text-accent">Catatan</h5>
                      </div>
                      {trx.notes ? (
                        <div className="rounded-box w-full p-4 bg-base-200 text-base-600 border border-base-300">
                          <MarkdownRenderer>{trx.notes}</MarkdownRenderer>
                        </div>
                      ) : (
                        <p className="text-base-600">-</p>
                      )}
                    </div>

                    {/* Documents Section */}
                    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-2xl border border-base-300">
                      <div className="flex items-center gap-3 mb-4">
                        <FaFileUpload className="text-error" />
                        <h5 className="font-semibold text-accent">Dokumen / Desain</h5>
                      </div>
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default dataFormBooking