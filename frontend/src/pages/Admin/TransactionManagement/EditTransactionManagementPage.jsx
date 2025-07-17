import { useParams } from "react-router-dom";
import { editTransactionByID } from "../../../modules/fetch";
import DataFormBooking from "../../../components/TransactionsPage/DataFormBooking";

function EditTransactionManagementPage() {
  const { id } = useParams();

  // DATA DUMMY 
  const transcactionStateByID = {
    transaction_id: "b1e7b477-1ae3-464b-bdbb-95d70fc35bb0",
    order_id: "DNRWO-110725-4XWLQ",

    user_information: {
      name: "John Doe",
      email: "john@example.com",
      phone: "081234567890",
      nik: "1234567890123456",
      address: "Jl. Contoh No. 1"
    },


    // Payment & Order Update
    transaction_information: {
      order_status: "pending",
      payment_status: "pending",
      payment_method: "bca",
      transaction_time: "2025-07-11 19:53:09",
      expired_va: "2025-07-12 19:53:09",
    },
    product_information: {
      id: "75896cf0-b853-4380-a77f-c9c759581f69",
      name: "Wedding Silver",
      price: "27000000"
    },

    // Optional: down payment jika ingin diubah
    down_payment: {
      installment_amount: 1500000,
      outstanding: 25500000,
      installment_status: "OUTSTANDING"
    },

    // Optional: jika admin juga bisa edit data form
    data_form: {
      customer_detail: {
        groom_full_name: "John Doe",
        bride_full_name: "Jane Smith",
        groom_address: "Jl. Mawar No. 10",
        bride_address: "Jl. Melati No. 7",
        groom_email: "john@example.com",
        bride_email: "jane@example.com",
        groom_instagram: "@johndoe",
        bride_instagram: "@janesmith"
      },
      detail_order: {
        akad_date: "2025-12-04",
        show_date: "2025-12-05",
        location: "Gedung Serbaguna Cempaka",
        akad_time: "09:00",
        guest_count: 300,
        tech_meeting: "2025-12-01"
      }
    },

    notes: "Pakai dekorasi rustic",
    document_orders: null
  };

  const handleUpdateTransaction = async () => {
    try {
      const response = await editTransactionByID(id)
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="p-2 sm:p-10">
      <div>Edit Data Transactions : {id}</div>

      <h3 className="font-bold my-4 text-neutral text-center text-2xl">Edit Transaksi</h3>
      <div className="divider"></div>

      <form onSubmit={handleUpdateTransaction}> {/* Ganti dengan handler update */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-2xl border border-base-300 gap-4 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

            {/* Informasi Order */}
            <div className="space-y-2">
              <h4 className="font-semibold text-accent">Informasi Order</h4>
              <div className="divider m-0"></div>
              <p><span className="font-medium">Order ID :</span> <span className="badge badge-outline badge-primary">{transcactionStateByID.order_id}</span></p>
              <p><span className="font-medium">Waktu Transaksi :</span> {transcactionStateByID.transaction_information.transaction_time}</p>
              <p><span className="font-medium">Tanggal Acara :</span> {transcactionStateByID.data_form.detail_order.show_date}</p>
              <p><span className="font-medium">Paket :</span> {transcactionStateByID.product_information.name}</p>
              <p><span className="font-medium">Harga :</span>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(parseInt(transcactionStateByID.product_information.price) || 0)}
              </p>
            </div>

            {/* Informasi Pelanggan */}
            <div className="space-y-2">
              <h4 className="font-semibold text-accent">Informasi Pelanggan</h4>
              <div className="divider m-0"></div>
              <p><span className="font-medium">Nama :</span> {transcactionStateByID.user_information.name}</p>
              <p><span className="font-medium">Email :</span> {transcactionStateByID.user_information.email}</p>
              <p><span className="font-medium">Telepon :</span> {transcactionStateByID.user_information.phone}</p>
              <p><span className="font-medium">NIK :</span> {transcactionStateByID.user_information.nik}</p>
              <p><span className="font-medium">Alamat :</span> {transcactionStateByID.user_information.address}</p>
            </div>

            {/* Informasi Pembayaran */}
            <div className="space-y-2">
              <h4 className="font-semibold text-accent">Detail Pembayaran</h4>
              <div className="divider m-0"></div>
              <p><span className="font-medium">Metode Pembayaran :</span> {transcactionStateByID.transaction_information.payment_method.toUpperCase()} Virtual Account</p>
              <p><span className="font-medium">VA Number :</span> {transcactionStateByID.transaction_information.va_number}</p>
              <div>
                <label className="font-medium">Status Pembayaran:</label>
                <select name="payment_status" defaultValue={transcactionStateByID.transaction_information.payment_status} className="select select-bordered w-full">
                  <option value="pending">PENDING</option>
                  <option value="success">SUCCESS</option>
                  <option value="failed">FAILED</option>
                  <option value="cancel">CANCEL</option>
                </select>
              </div>
            </div>

            {/* Down Payment */}
            <div className="space-y-2">
              <h4 className="font-semibold text-accent">Rencana Down payment (DP)</h4>
              <div className="divider m-0"></div>
              <p><span className="font-medium">Rencana DP : </span>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: transcactionStateByID?.currency || "IDR",
                  minimumFractionDigits: 0,
                }).format(transcactionStateByID.down_payment.installment_amount || 0)}
              </p>
              <p><span className="font-medium">Sisa DP : </span>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: transcactionStateByID?.currency || "IDR",
                  minimumFractionDigits: 0,
                }).format(transcactionStateByID.down_payment.outstanding || 0)}
              </p>
              <p><span className="font-medium">Status DP :</span>
                <span className={`badge ml-2 ${transcactionStateByID.down_payment.installment_status === 'OUTSTANDING' ? 'badge-warning' : 'badge-success'}`}>
                  {transcactionStateByID.down_payment.installment_status}
                </span>
              </p>
            </div>

          </div>
        </div>

        {/* Komponen Form */}
        <DataFormBooking trx={transcactionStateByID} />

        {/* Tombol Submit */}
        <div className="mt-6 flex justify-end">
          <button type="submit" className="btn btn-primary">Simpan Perubahan</button>
        </div>
      </form>
    </div>
  );
}

export default EditTransactionManagementPage;
