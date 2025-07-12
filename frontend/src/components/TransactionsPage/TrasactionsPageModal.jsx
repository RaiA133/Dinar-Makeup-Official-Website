import { useNavigate } from "react-router-dom";
import { BiSolidDetail } from "react-icons/bi";
import {
  FaMale, FaHeart, FaFemale,
  FaCalendarAlt, FaMapMarkerAlt,
  FaFileAlt, FaStickyNote, FaFile,
  FaFileUpload, FaTimes, FaUsers,
} from 'react-icons/fa';
import { FaCheck, FaShoppingCart, FaRegFileAlt, FaBox, FaCreditCard } from "react-icons/fa";
import ExtraForm from "../../components/OrderPage/ExtraForm";
import DataFormBooking from "./DataFormBooking";

function TrasactionsPageModal({ trx }) {
  const navigate = useNavigate();

  const paymentData = {
    transaction_id: trx.id,
    order_id: trx.order_id,
    gross_amount: trx.down_payment.installment_amount.toFixed(2),
    payment_type: "bank_transfer",
    transaction_time: trx.transaction_information.transaction_time,
    transaction_status: trx.transaction_information.order_status,
    fraud_status: "accept",
    status_code: "",
    bank_name: trx.transaction_information.payment_method,
    va: trx.transaction_information.va_number,
    status_message: "Success, Bank Transfer transaction is created",
    currency: "IDR",
    expiry_time: trx.transaction_information.expired_va
  };

  return (
    <div className="modal-box max-w-5xl sm:rounded-b-2xl px-2 sm:p-6">

      {/* Tombol X */}
      <div className="sticky top-0 z-50 flex justify-end">
        <form method="dialog" className="ml-auto">
          <button className="btn btn-sm btn-circle btn-error">✕</button>
        </form>
      </div>

      <h3 className="font-bold mb-4 text-neutral text-center text-2xl">Detail Transaksi</h3>
      <div className="divider"></div>

      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-2xl border border-base-300 gap-4 mb-12 text-sm sm:text-base">
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

        <div className="w-full">
          <div className="divider"></div>
          <div className="flex justify-center">
            <button className="btn btn-outline" onClick={() => {
              sessionStorage.setItem("paymentData", JSON.stringify(paymentData));
              navigate("/payment")
            }}>Detail Pembayaran</button>
          </div>
        </div>

      </div>

      <DataFormBooking trx={trx}/>

    </div>
  )
}

export default TrasactionsPageModal