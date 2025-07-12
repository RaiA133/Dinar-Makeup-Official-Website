import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { FiCopy } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
import TrasactionsPageModal from "../components/TransactionsPage/TrasactionsPageModal";

function TransactionsPage() {
  const [copied, setCopied] = useState(false);
  const { allMyTransaction } = useContext(UserContext);
  const [paymentData, setPaymentData] = useState([])

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
                <section className="cursor-pointer" onClick={() => {
                  setPaymentData(trx)
                  document.getElementById(`my_transaction_modal_${trx.id}`).showModal()
                }}>
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

                  <p className="mx-5 text-base-500 mb-2 flex items-center justify-between gap-5">
                    <div className="text-xs md:text-sm">Waktu Transaksi: {moment(trx.transaction_information.transaction_time).format("DD MMM YYYY HH:mm")}</div>
                    <div className="badge badge-error badge-sm sm:badge-md py-6 sm:py-0 text-center">Batas Pembayaran : {moment(trx.transaction_information.expired_va).format("DD MMM YYYY HH:mm")}</div>
                  </p>

                  <div className="divider my-1"></div>

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
              <TrasactionsPageModal
                trx={trx}
              />
            </dialog>
          ))}
        </>
      )}

    </div>
  );
}

export default TransactionsPage;
