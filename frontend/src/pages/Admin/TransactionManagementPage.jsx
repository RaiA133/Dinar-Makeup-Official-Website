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
    <div className="h-screen mx-1 sm:mx-3">
      <div className="my-3">

        <Toaster
          toastOptions={{
            style: {
              maxWidth: '600px'
            }
          }}
        />

        <div className="flex justify-center">
          <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mb-3 w-fit shadow-sm">
            <div className="overflow-x-auto">
              <table className="table table-xs sm:table-md table-zebra">
                {/* Table Header */}
                <thead>
                  <tr>
                    <th className="w-12">#</th>
                    <th>Order ID</th>
                    <th>Status</th>
                    <th>Wedding Date</th>
                    <th className="w-32">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transcactionState?.data?.map((transaction, index) => (
                    <tr key={transaction.id} className="hover">
                      <td>{index + 1}</td>
                      <td>
                        <span className="badge badge-outline badge-primary badge-xs sm:badge-md">
                          {transaction.order_id}
                        </span>
                      </td>
                      <td>
                        <span className={`badge badge-xs sm:badge-md ${transaction.transaction_information.payment_status === 'pending' ? 'badge-warning' : 'badge-success'}`}>
                          {transaction.transaction_information.payment_status}
                        </span>
                      </td>
                      <td>{transaction.wedding_date}</td>
                      <td className="flex gap-1">
                        <button
                          className="btn btn-xs"
                          onClick={() => document.getElementById(`transaction_modal_${transaction.id}`).showModal()}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>

                        <button
                          className="btn btn-xs text-error"
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
                  <div className="modal-box max-w-2xl">
                    <h3 className="font-bold text-lg mb-4">Transaction Details</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold">Order Information</h4>
                        <div className="divider m-0"></div>
                        <p><span className="font-medium">Order ID:</span> {transaction.order_id}</p>
                        <p><span className="font-medium">Status:</span>
                          <span className={`badge ml-2 ${transaction.transaction_information.payment_status === 'pending' ? 'badge-warning' : 'badge-success'}`}>
                            {transaction.transaction_information.payment_status}
                          </span>
                        </p>
                        <p><span className="font-medium">Wedding Date:</span> {transaction.wedding_date}</p>
                        <p><span className="font-medium">Notes:</span> {transaction.notes}</p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold">Payment Details</h4>
                        <div className="divider m-0"></div>
                        <p><span className="font-medium">Amount:</span> Rp{transaction.installment_amount.toLocaleString()}</p>
                        <p><span className="font-medium">Outstanding:</span> Rp{transaction.outstanding.toLocaleString()}</p>
                        <p><span className="font-medium">Method:</span> {transaction.transaction_information.payment_method.toUpperCase()}</p>
                        <p><span className="font-medium">VA Number:</span> {transaction.transaction_information.va_number}</p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold">Customer Information</h4>
                        <div className="divider m-0"></div>
                        <p><span className="font-medium">Name:</span> {transaction.user_information.name}</p>
                        <p><span className="font-medium">Email:</span> {transaction.user_information.email}</p>
                        <p><span className="font-medium">Phone:</span> {transaction.user_information.phone || '-'}</p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold">Product Information</h4>
                        <div className="divider m-0"></div>
                        <p><span className="font-medium">Package:</span> {transaction.product_information.name}</p>
                        <p><span className="font-medium">Price:</span> Rp{parseInt(transaction.product_information.price).toLocaleString()}</p>
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