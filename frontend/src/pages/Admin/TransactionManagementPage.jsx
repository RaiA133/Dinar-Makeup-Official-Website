import { useContext } from "react";
import { AdminContext } from "../../contexts/AdminContext";
import { deleteUserByID, getAllUsers } from "../../modules/fetch";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

function TransactionManagementPage() {
  let location = useLocation();
  const navigate = useNavigate();
  const { transcactionState, setTranscactionState, refreshCallback } = useContext(AdminContext)

  const totalPages = transcactionState?.metadata?.total_pages || 0;
  const currentPage = transcactionState?.metadata?.current_page || 1;

  return (
    <div className="h-screen m-3 sm:m-5">
      <div className="my-3">

        <Toaster
          toastOptions={{
            style: {
              maxWidth: '600px'
            }
          }}
        />

        <div className="flex justify-center">
          <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mb-3 w-full shadow-sm">
            <div className="overflow-x-auto">
              <table className="table table-xs sm:table-md table-zebra">
                {/* Table Header */}
                <thead>
                  <tr>
                    <th className="w-12">#</th>
                    <th>Order ID</th>
                    <th>Sisa Tagihan</th>
                    <th>Status Bayar</th>
                    <th>Wedding Date</th>
                    <th>Tanggal Transaksi</th>
                    <th className="w-32">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transcactionState?.data
                    ?.sort((a, b) => new Date(b.transaction_information.transaction_time) - new Date(a.transaction_information.transaction_time))
                    .map((transaction, index) => (
                      <tr key={transaction.id} className="hover">
                        <td>{index + 1}</td>
                        <td>
                          <span className="py-7 sm:py-0 badge badge-outline badge-primary badge-sm text-center">
                            {transaction.order_id}
                          </span>
                        </td>
                        <td>
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: transaction?.currency || "IDR",
                            minimumFractionDigits: 0,
                          }).format(transaction.outstanding || 0)}
                        </td>
                        <td>
                          <span className={`badge badge-sm ml-2 ${transaction.transaction_information.payment_status === 'pending'
                            ? 'badge-warning'
                            : transaction.transaction_information.payment_status === 'success'
                              ? 'badge-success'
                              : 'badge-error'
                            }`}>
                            {transaction.transaction_information.payment_status.toUpperCase()}
                          </span>
                        </td>
                        <td>{transaction.wedding_date}</td>
                        <td>{transaction.transaction_information.transaction_time}</td>
                        <td className="flex gap-1">
                          <button
                            className="btn btn-xs btn-ghost"
                            onClick={() => document.getElementById(`transaction_modal_${transaction.id}`).showModal()}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>

                          <button
                            className="btn btn-xs btn-ghost text-error"
                            onClick={() => document.getElementById(`transaction_delete_modal_${transaction.id}`).showModal()}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

              {/* Transaction Detail Modals */}
              {transcactionState?.data?.map((transaction) => (
                <dialog key={`detail_${transaction.id}`} id={`transaction_modal_${transaction.id}`} className="modal">
                  <div className="modal-box max-w-4xl">
                    <h3 className="font-bold text-lg mb-4 text-primary">Detail Transaksi</h3>

                    <div className=" gap-4 bg-base-200 p-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

                        <div className="space-y-2">
                          <h4 className="font-semibold text-accent">Informasi Order</h4>
                          <div className="divider m-0"></div>
                          <p><span className="font-medium">Order ID :</span> {transaction.order_id}</p>
                          <p><span className="font-medium">Waktu Transaksi :</span> {transaction.transaction_information.transaction_time}</p>
                          <p><span className="font-medium">Wedding Date :</span> {transaction.wedding_date}</p>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-semibold text-accent">Informasi Pelanggan</h4>
                          <div className="divider m-0"></div>
                          <p><span className="font-medium">Nama :</span> {transaction.user_information.name}</p>
                          <p><span className="font-medium">Email :</span> {transaction.user_information.email}</p>
                          <p><span className="font-medium">Telepon :</span> {transaction.user_information.phone || '-'}</p>
                          <p><span className="font-medium">NIK :</span> {transaction.user_information.nik}</p>
                          <p><span className="font-medium">Alamat :</span> {transaction.user_information.address}</p>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-semibold text-accent">Detail Pembayaran</h4>
                          <div className="divider m-0"></div>

                          <p><span className="font-medium">Metode Pembayaran :</span> {transaction.transaction_information.payment_method.toUpperCase()} Virtual Account</p>
                          <p><span className="font-medium">VA Number :</span> {transaction.transaction_information.va_number}</p>
                          <p><span className="font-medium">Status Pembayaran :</span>
                            <span className={`badge ml-2 ${transaction.transaction_information.payment_status === 'pending'
                              ? 'badge-warning'
                              : transaction.transaction_information.payment_status === 'success'
                                ? 'badge-success'
                                : 'badge-error'
                              }`}>
                              {transaction.transaction_information.payment_status.toUpperCase()}
                            </span>
                          </p>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-semibold text-accent">Rencana Down payment (DP)</h4>
                          <div className="divider m-0"></div>
                          <p><span className="font-medium">Rencana DP : </span>
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: transaction?.currency || "IDR",
                              minimumFractionDigits: 0,
                            }).format(transaction.installment_amount || 0)}
                          </p>
                          <p><span className="font-medium">Sisa DP : </span>
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: transaction?.currency || "IDR",
                              minimumFractionDigits: 0,
                            }).format(transaction?.outstanding || 0)}
                          </p>
                          <p><span className="font-medium">Status DP :</span>
                            <span className={`badge ml-2 ${transaction.installment_status === 'OUTSTANDING' ? 'badge-warning' : 'badge-success'}`}>
                              {transaction.installment_status}
                            </span>
                          </p>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-semibold text-accent">Data Tambahan</h4>
                          <div className="divider m-0"></div>
                          <p><span className="font-medium">Notes :</span></p>
                          {transaction.notes ? (<div className="rounded-box w-full border border-stone-400 p-4">{transaction.notes}</div>) : '-'}
                          <div className="space-y-2">
                            <p className="font-medium">Dokumen / Desain : </p>
                            {transaction.document_orders ? (
                              <div className="space-y-3">
                                {Array.isArray(transaction.document_orders) ? transaction.document_orders.map((doc, idx) => {
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
                                        <dialog id={`image_modal_${idx}`} className="modal modal-bottom sm:modal-middle">
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
                          <p><span className="font-medium">Paket : </span>{transaction.product_information.name}</p>
                          <p><span className="font-medium">Harga : </span>
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: transaction?.currency || "IDR",
                              minimumFractionDigits: 0,
                            }).format(parseInt(transaction.product_information.price) || 0)}
                          </p>
                        </div>

                      </div>
                    </div>


                    <div className="modal-action">
                      <form method="dialog">
                        <button className="btn">Close</button>
                      </form>
                    </div>
                  </div>
                </dialog>
              ))}

              {/* Delete Confirmation Modals */}
              {transcactionState?.data?.map((transaction) => (
                <dialog key={`delete_${transaction.id}`} id={`transaction_delete_modal_${transaction.id}`} className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">Confirm Deletion</h3>
                    <p className="py-4">Are you sure you want to delete order {transaction.order_id}?</p>
                    <div className="modal-action">
                      <form method="dialog">
                        <button className="btn">Cancel</button>
                        <button
                          disabled
                          className="btn btn-error ml-2"
                          onClick={async () => {
                            try {
                              const response = await deleteTransactionByID(transaction.id);
                              if (response.status === 200) {
                                toast.success(response.message, { duration: 2500 });
                                refreshCallback();
                              }
                            } catch (error) {
                              console.error("Error:", error);
                            }
                          }}
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </div>
                </dialog>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full text-center text-sm stat-desc mb-3">1-10 item Show of 100</div>

        <div className="flex justify-center">
          <div className="join shadow-sm">
            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              return (
                <input
                  key={i}
                  className="join-item btn btn-sm sm:btn-md btn-square"
                  type="radio"
                  name="options"
                  aria-label={pageNum.toString()}
                  checked={pageNum === currentPage}
                  onChange={() => navigate(`/admin/transaction-management?page=${pageNum}`)}
                />
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}

export default TransactionManagementPage;