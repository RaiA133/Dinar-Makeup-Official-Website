import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { FiCopy } from "react-icons/fi";
import { BiSolidDetail } from "react-icons/bi";
import {
  FaMale, FaHeart, FaFemale,
  FaCalendarAlt, FaMapMarkerAlt,
  FaFileAlt, FaStickyNote, FaFile,
  FaFileUpload, FaTimes, FaUsers,
} from 'react-icons/fa';
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";

function TransactionsPage() {
  const [copied, setCopied] = useState(false);
  const { allMyTransaction } = useContext(UserContext);
  console.log("allMyTransaction", allMyTransaction);
  const dataBank = [
    { name: "bca", logo: "/img/banks/bca.png" },
    { name: "bri", logo: "/img/banks/bri.png" },
    { name: "bni", logo: "/img/banks/bni.png" },
    { name: "cimb", logo: "/img/banks/cimb.png" },
    { name: "mandiri", logo: "/img/banks/mandiri.png" },
    { name: "maybank", logo: "/img/banks/maybank.png" },
    { name: "permata", logo: "/img/banks/permata.png" },
    { name: "mega", logo: "/img/banks/mega.png" },
  ];

  // Enrich transactions with logo
  const transactions = Array.isArray(allMyTransaction)
    ? allMyTransaction.map(trx => {
      const foundBank = dataBank.find(bank => bank.name === trx.transaction_information.payment_method);
      return {
        ...trx,
        bank_logo: foundBank?.logo || null,
      };
    })
    : [];

  return (
    <div className="m-5 md:m-20">

      <Toaster
        toastOptions={{
          style: {
            maxWidth: '600px',
            background: '#4F46E5',
            color: '#fff'
          }
        }}
      />

      <h2 className="text-xl font-bold mb-5 mx-5">Riwayat Transaksi</h2>

      {(transactions.length === 0) ? (
        <div className="text-center text-base-500">Belum ada transaksi.</div>
      ) : (
        <>
          <div className="grid gap-6">
            {transactions.map((trx) => (
              <div
                key={trx.id}
                className="rounded-xl shadow border border-stone-300 bg-gradient-to-r from-primary/5 to-secondary/5 p-6 bg-base-100 hover:shadow-md transition"
              >
                <section className="cursor-pointer" onClick={() => document.getElementById(`my_transaction_modal_${trx.id}`).showModal()}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-base text-error grid grid-cols-1 sm:grid-cols-2 items-center gap-5">
                      <span className="badge badge-outline badge-primary">{trx.order_id}</span>
                      <p>
                        <span>Tagihan : </span>
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        }).format(trx.down_payment.installment_amount || 0)}
                      </p>
                    </h3>
                    <span className={`badge ml-2 ${trx.transaction_information.payment_status === 'pending'
                      ? 'badge-warning'
                      : trx.transaction_information.payment_status === 'success'
                        ? 'badge-success'
                        : 'badge-error'
                      }`}>
                      {trx.transaction_information.payment_status.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-sm text-base-500 mb-2">
                    Waktu Transaksi: {moment(trx.transaction_information.transaction_time).format("DD MMM YYYY HH:mm")}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p><span className="font-medium">Nama Pemesan :</span> {trx.user_information.name}</p>
                      <p><span className="font-medium">Telepon :</span> {trx.user_information.phone}</p>
                    </div>
                    <div>
                      <p><span className="font-medium">Paket :</span> {trx.product_information.name}</p>
                      <p><span className="font-medium">Harga : </span>
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        }).format(parseInt(trx.product_information.price) || 0)}
                      </p>
                    </div>
                    <div>
                      <p><span className="font-medium">Tanggal & Jam Akad :</span> {trx.data_form.detail_order.akad_date} - {trx.data_form.detail_order.akad_time}</p>
                      <p><span className="font-medium">BANK :</span> {trx.transaction_information.payment_method.toUpperCase()}</p>
                    </div>
                  </div>
                </section>

                {trx.transaction_information.va_number && (
                  <div className="z-99 mt-5 flex items-center justify-between p-1 px-3 rounded-xl border border-stone-300 cursor-pointer hover:bg-base-50 transition-colors"
                    onClick={() => {
                      navigator.clipboard.writeText(trx.transaction_information.va_number).then(() => {
                        setCopied(true);
                        setTimeout(() => setCopied(false), 1500);
                        toast.success('VA Number copied!');
                      });
                    }}
                  >
                    <div className="flex items-center gap-5">
                      <img src={trx.bank_logo} alt={trx.transaction_information.payment_method} className="w-10 h-10 object-contain" />
                      <span className="text-xs sm:text-sm">{trx.transaction_information.va_number}</span>
                    </div>
                    <FiCopy className="text-base-500" />
                  </div>
                )}

                {trx.notes && (
                  <div className="mt-3 text-sm">
                    <div className="rounded-xl w-full border border-stone-300 p-4 text-sm">
                      {trx.notes}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* MODAL DETAIL */}
          {transactions.map((trx, idx) => (
            <dialog key={`my_transaction_detail_${trx.id}`} id={`my_transaction_modal_${trx.id}`} className="modal modal-bottom sm:pb-10 flex justify-center">
              <div className="modal-box max-w-5xl sm:rounded-b-2xl">

                {/* Tombol X */}
                <div className="sticky top-0 z-50 flex justify-end">
                  <form method="dialog" className="ml-auto">
                    <button className="btn btn-sm btn-circle btn-error">✕</button>
                  </form>
                </div>

                <h3 className="font-bold mb-4 text-neutral text-center text-2xl">Detail Transaksi</h3>
                <div className="divider"></div>

                <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-2xl border border-base-300 gap-4 mb-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

                    <div className="space-y-2">
                      <h4 className="font-semibold text-accent">Informasi Order</h4>
                      <div className="divider m-0"></div>
                      <p><span className="font-medium">Order ID :</span> <span className="badge badge-outline badge-primary">{trx.order_id}</span></p>
                      <p><span className="font-medium">Waktu Transaksi :</span> {trx.transaction_information.transaction_time}</p>
                      <p><span className="font-medium">Tanggal Acara :</span> {trx.data_form.detail_order.show_date}</p>
                      <p><span className="font-medium">Paket :</span> {trx.product_information.name}</p>
                      <p><span className="font-medium">Harga : </span>
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        }).format(parseInt(trx.product_information.price) || 0)}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-accent">Informasi Pelanggan</h4>
                      <div className="divider m-0"></div>
                      <p><span className="font-medium">Nama :</span> {trx.user_information.name}</p>
                      <p><span className="font-medium">Email :</span> {trx.user_information.email}</p>
                      <p><span className="font-medium">Telepon :</span> {trx.user_information.phone}</p>
                      <p><span className="font-medium">NIK :</span> {trx.user_information.nik}</p>
                      <p><span className="font-medium">Alamat :</span> {trx.user_information.address}</p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-accent">Detail Pembayaran</h4>
                      <div className="divider m-0"></div>
                      <p><span className="font-medium">Metode Pembayaran :</span> {trx.transaction_information.payment_method.toUpperCase()} Virtual Account</p>
                      <p><span className="font-medium">VA Number :</span> {trx.transaction_information.va_number}</p>
                      <p><span className="font-medium">Status Pembayaran :</span>
                        <span className={`badge ml-2 ${trx.transaction_information.payment_status === 'pending'
                          ? 'badge-warning'
                          : trx.transaction_information.payment_status === 'success'
                            ? 'badge-success'
                            : 'badge-error'
                          }`}>
                          {trx.transaction_information.payment_status.toUpperCase()}
                        </span>
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-accent">Rencana Down payment (DP)</h4>
                      <div className="divider m-0"></div>
                      <p><span className="font-medium">Rencana DP : </span>
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: trx?.currency || "IDR",
                          minimumFractionDigits: 0,
                        }).format(trx.down_payment.installment_amount || 0)}
                      </p>
                      <p><span className="font-medium">Sisa DP : </span>
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: trx?.currency || "IDR",
                          minimumFractionDigits: 0,
                        }).format(trx.down_payment.outstanding || 0)}
                      </p>
                      <p><span className="font-medium">Status DP :</span>
                        <span className={`badge ml-2 ${trx.down_payment.installment_status === 'OUTSTANDING' ? 'badge-warning' : 'badge-success'}`}>
                          {trx.down_payment.installment_status}
                        </span>
                      </p>
                    </div>

                  </div>
                </div>

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
                                      {trx.notes}
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

              </div>
            </dialog>
          ))}
        </>
      )}

    </div>
  );
}

export default TransactionsPage;
