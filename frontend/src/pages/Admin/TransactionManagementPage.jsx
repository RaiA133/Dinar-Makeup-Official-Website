import { useContext } from "react";
import { AdminContext } from "../../contexts/AdminContext";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import DataFormBooking from "../../components/TransactionsPage/DataFormBooking";
import { deleteTransactionByID } from "../../modules/fetch";

function TransactionManagementPage() {
  let location = useLocation();
  const navigate = useNavigate();
  const { transcactionState, refreshCallback } = useContext(AdminContext)
  console.log(transcactionState);

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
                    .map((trx, index) => (
                      <tr key={trx.id} className="hover">
                        <td>{index + 1}</td>
                        <td>
                          <span className="py-7 sm:py-0 badge badge-outline badge-primary badge-sm text-center">
                            {trx.order_id}
                          </span>
                        </td>
                        <td>
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: trx?.currency || "IDR",
                            minimumFractionDigits: 0,
                          }).format(trx.outstanding || 0)}
                        </td>
                        <td>
                          <span className={`badge badge-sm ml-2 ${trx.transaction_information.payment_status === 'pending'
                            ? 'badge-warning'
                            : trx.transaction_information.payment_status === 'success'
                              ? 'badge-success'
                              : 'badge-error'
                            }`}>
                            {trx.transaction_information.payment_status.toUpperCase()}
                          </span>
                        </td>
                        <td>{trx.wedding_date}</td>
                        <td>{trx.transaction_information.transaction_time}</td>
                        <td className="flex gap-1">
                          <button
                            className="btn btn-xs btn-ghost"
                            onClick={() => document.getElementById(`transaction_modal_${trx.id}`).showModal()}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>

                          <button
                            className="btn btn-xs btn-ghost text-error"
                            onClick={() => document.getElementById(`transaction_delete_modal_${trx.id}`).showModal()}
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
              {transcactionState?.data?.map((trx) => (
                <dialog key={`detail_${trx.id}`} id={`transaction_modal_${trx.id}`} className="modal modal-bottom sm:pb-10 flex justify-center">
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
  
                  <DataFormBooking trx={trx}/>
  
                </div>
                </dialog>
              ))}

              {/* Delete Confirmation Modals */}
              {transcactionState?.data?.map((trx) => (
                <dialog key={`delete_${trx.id}`} id={`transaction_delete_modal_${trx.id}`} className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">Confirm Deletion</h3>
                    <p className="py-4">Are you sure you want to delete order {trx.order_id}?</p>
                    <div className="modal-action">
                      <form method="dialog">
                        <button className="btn">Cancel</button>
                        <button
                          className="btn btn-error ml-2"
                          onClick={async () => {
                            try {
                              const response = await deleteTransactionByID(trx.id);
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