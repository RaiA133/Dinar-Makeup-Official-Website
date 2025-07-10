import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { FiCopy } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";

function TransactionsPage() {
  const [copied, setCopied] = useState(false);
  const { allMyTransaction } = useContext(UserContext);

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
                className="rounded-xl shadow border border-stone-300 p-5 bg-base-100 hover:shadow-md transition"
              >

                <section className="cursor-pointer" onClick={() => document.getElementById(`my_transaction_modal_${trx.id}`).showModal()}>

                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-base text-error grid grid-cols-1 sm:grid-cols-2 items-center gap-5">
                      <span className="badge badge-outline badge-primary">{trx.order_id}</span>
                      <p>
                        <span>Tagihan : </span>
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: trx?.currency || "IDR",
                          minimumFractionDigits: 0,
                        }).format(trx.installment_amount || 0)}
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
                      <p><span className="font-medium">Harga :</span> Rp{parseInt(trx.product_information.price).toLocaleString()}</p>
                    </div>
                    <div>
                      <p><span className="font-medium">Tanggal Nikah :</span> {trx.wedding_date}</p>
                      <p><span className="font-medium">BANK :</span> {trx.transaction_information.payment_method.toUpperCase()}</p>
                    </div>
                  </div>

                </section>

                {trx.transaction_information.va_number && (
                  <div className="z-99 mt-5 flex items-center justify-between p-1 px-3 bg-base-100 rounded-lg border border-stone-300 cursor-pointer hover:bg-base-50 transition-colors"
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
                      {trx?.notes}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* MODAL DETAIL */}
          {transactions?.map((trx) => (
            <dialog key={`my_transaction_detail_${trx.id}`} id={`my_transaction_modal_${trx.id}`} className="modal modal-bottom sm:pb-10 flex justify-center">
              <div className="modal-box max-w-5xl sm:rounded-b-2xl">

                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-5">✕</button>
                </form>
                <h3 className="font-bold text-lg mb-4 text-error">Detail Transaksi</h3>

                <div className=" gap-4 bg-base-200 p-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

                    <div className="space-y-2">
                      <h4 className="font-semibold text-accent">Informasi Order</h4>
                      <div className="divider m-0"></div>
                      <p><span className="font-medium">Order ID :</span> <span className="badge badge-outline badge-primary">{trx.order_id}</span></p>
                      <p><span className="font-medium">Waktu Transaksi :</span> {trx.transaction_information.transaction_time}</p>
                      <p><span className="font-medium">Wedding Date :</span> {trx.wedding_date}</p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-accent">Informasi Pelanggan</h4>
                      <div className="divider m-0"></div>
                      <p><span className="font-medium">Nama :</span> {trx.user_information.name}</p>
                      <p><span className="font-medium">Email :</span> {trx.user_information.email}</p>
                      <p><span className="font-medium">Telepon :</span> {trx.user_information.phone || '-'}</p>
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
                        }).format(trx.installment_amount || 0)}
                      </p>
                      <p><span className="font-medium">Sisa DP : </span>
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: trx?.currency || "IDR",
                          minimumFractionDigits: 0,
                        }).format(trx?.outstanding || 0)}
                      </p>
                      <p><span className="font-medium">Status DP :</span>
                        <span className={`badge ml-2 ${trx.installment_status === 'OUTSTANDING' ? 'badge-warning' : 'badge-success'}`}>
                          {trx.installment_status}
                        </span>
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-accent">Data Tambahan</h4>
                      <div className="divider m-0"></div>
                      <p><span className="font-medium">Notes :</span></p>
                      {trx.notes ? (<div className="rounded-box w-full border border-stone-400 p-4">{trx.notes}</div>) : '-'}
                      <div className="space-y-2">
                        <p className="font-medium">Dokumen / Desain : </p>
                        {trx.document_orders ? (
                          <div className="space-y-3">
                            {Array.isArray(trx.document_orders) ? trx.document_orders.map((doc, idx) => {
                              const fileUrl = doc; // Ganti jika object: doc.url atau doc.path
                              const fileExt = fileUrl.file_name.split('.').pop().toLowerCase();
                              if (fileExt === 'pdf') {
                                return (
                                  <iframe
                                    key={idx}
                                    src={`https://docs.google.com/gview?url=${encodeURIComponent(fileUrl.url)}&embedded=true`}
                                    className="w-full h-64 border rounded"
                                    title={`Dokumen ${idx + 1}`}
                                  />
                                );
                              }
                              if (['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(fileExt)) {
                                return (
                                  <div key={idx}>
                                    <img
                                      src={fileUrl.url}
                                      alt={`Gambar ${idx + 1}`}
                                      className="max-w-full rounded border cursor-pointer"
                                      onClick={() => document.getElementById(`image_modal_${idx}`).showModal()}
                                    />
                                    <dialog id={`image_modal_${idx}`} className="modal modal-top sm:modal-middle">
                                      <div className="modal-box p-0">
                                        <img src={fileUrl.url} alt={`Preview Gambar ${idx + 1}`} className="w-full max-h-full object-contain rounded-t" />
                                      </div>
                                      <form method="dialog" className="modal-backdrop">
                                        <button>close</button>
                                      </form>
                                    </dialog>
                                  </div>
                                );
                              } else {
                                return (
                                  <div key={idx}>
                                    <a href={fileUrl.url} target="_blank" rel="noopener noreferrer" className="link link-primary">
                                      {fileUrl.file_name}
                                    </a>
                                  </div>
                                );
                              }
                            }) : (
                              <p>Tipe dokumen tidak valid</p>
                            )}
                          </div>
                        ) : (
                          <p>-</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-accent">Informasi Produk</h4>
                      <div className="divider m-0"></div>
                      <p><span className="font-medium">Paket : </span>{trx.product_information.name}</p>
                      <p><span className="font-medium">Harga : </span>
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: trx?.currency || "IDR",
                          minimumFractionDigits: 0,
                        }).format(parseInt(trx.product_information.price) || 0)}
                      </p>
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
