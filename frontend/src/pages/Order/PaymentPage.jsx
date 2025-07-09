import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../contexts/ProductsContext";
import toast, { Toaster } from "react-hot-toast";
import { FiCopy, FiClock, FiCheckCircle, FiInfo } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

function PaymentPage() {
  const [copied, setCopied] = useState(false);
  const {
    productsByIDState, setProductsByIDState
  } = useContext(ProductsContext);

  const paymentData = JSON.parse(sessionStorage.getItem('paymentData'));

  const targetDate = new Date(paymentData.expiry_time);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      if (paymentData.transaction_status === "pending") {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [paymentData.transaction_status, targetDate]);

  return (
    <div className="min-h-screen bg-base-50 py-8 px-4 sm:px-6 lg:px-8">
      <Toaster
        toastOptions={{
          style: {
            maxWidth: '600px',
            background: '#4F46E5',
            color: '#fff'
          }
        }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Payment Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-base-900 mb-2">Detail Pembayaran</h1>
          <p className="text-base-600">Selesaikan pembayaran Anda untuk mengamankan pemesanan Anda</p>
        </div>

        {/* Payment Status Card */}
        <div className="bg-base-100 rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            {paymentData.transaction_status === "pending" ? (
              <div className="flex items-center bg-base-200 text-info p-4 rounded-lg mb-6">
                <FiClock className="text-2xl mr-3" />
                <div>
                  <h3 className="font-semibold">Menunggu Pembayaran</h3>
                  <p className="text-sm">Harap selesaikan pembayaran Anda sebelum batas waktu yang ditentukan</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center bg-base-200 text-success p-4 rounded-lg mb-6">
                <FiCheckCircle className="text-2xl mr-3" />
                <div>
                  <h3 className="font-semibold">Pembayaran Terkonfirmasi!</h3>
                  <p className="text-sm">Pemesanan Anda sekarang sudah diamankan</p>
                </div>
              </div>
            )}

            {/* Progress Steps */}
            <div className="mb-8">
              <div className="steps steps-horizontal w-full">
                <div className={`step ${paymentData.transaction_status == "pending" ? 'step-neutral' : ''}`}>
                  <div className="step-circle">1</div>
                  <div className="step-title">Pembayaran</div>
                </div>
                <div className={`step ${paymentData.transaction_status == "" ? 'step-neutral' : ''}`}>
                  <div className="step-circle">2</div>
                  <div className="step-title">Konfirmasi</div>
                </div>
                <div className={`step ${paymentData.transaction_status == "" ? 'step-neutral' : ''}`}>
                  <div className="step-circle">3</div>
                  <div className="step-title">Persiapan</div>
                </div>
                <div className={`step ${paymentData.transaction_status == "" ? 'step-neutral' : ''}`}>
                  <div className="step-circle">4</div>
                  <div className="step-title">Hari Pernikahan</div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="space-y-6">
              {/* VA Number & Countdown */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-base-50 p-5 rounded-lg border border-neutral-600">
                  <h3 className="font-medium text-base-700 mb-3">Virtual Account</h3>
                  <div
                    className="flex items-center justify-between p-3 bg-base-100 rounded-lg border border-neutral-600 cursor-pointer hover:bg-base-50 transition-colors"
                    onClick={() => {
                      navigator.clipboard.writeText(paymentData.va).then(() => {
                        setCopied(true);
                        setTimeout(() => setCopied(false), 1500);
                        toast.success('VA Number copied!');
                      });
                    }}
                  >
                    <span className="font-mono">{paymentData.va}</span>
                    <FiCopy className="text-base-500" />
                  </div>
                  <p className="text-sm text-base-500 mt-2">Klik Untuk copy VA number</p>
                </div>

                {/* Countdown Timer */}
                <div className="bg-base-50 p-5 rounded-lg border border-neutral-600">
                  <h3 className="font-medium text-base-700 mb-3">Batas Pembayaran</h3>
                  <div className="grid grid-flow-col gap-2 text-center auto-cols-max justify-center">
                    {Object.entries(timeLeft).map(([unit, value]) => (
                      <div key={unit} className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-base-100 rounded-lg shadow-sm border-1 border-neutral-600 flex items-center justify-center">
                          <span className="text-2xl font-bold text-base-800">{value}</span>
                        </div>
                        <span className="text-xs text-base-500 mt-1 uppercase">{unit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-base-50 p-5 rounded-lg border border-neutral-600">
                <h3 className="font-medium text-base-700 mb-4">Detail Transaksi</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-base-500">Order ID</p>
                    <p className="font-medium">{paymentData.order_id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-base-500">Total</p>
                    <p className="font-medium">
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: paymentData?.currency || 'IDR',
                        minimumFractionDigits: 0
                      }).format(paymentData?.gross_amount || 0)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-base-500">Bank</p>
                    <p className="font-medium">{paymentData.bank_name.toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-base-500">Waktu Transaksi</p>
                    <p className="font-medium">{paymentData.transaction_time}</p>
                  </div>
                </div>
              </div>

              {/* Help Section */}
              <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
                <div className="flex items-start">
                  <FiInfo className="text-blue-500 text-xl mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium text-blue-800 mb-2">Butuh Bantuan?</h3>
                    <p className="text-sm text-blue-700 mb-3">
                      Jika Anda mengalami masalah dengan pembayaran Anda, silakan hubungi dukungan pelanggan kami.
                    </p>
                    <a
                      href={`https://wa.me/123?text=Hi, I need help with my payment for order ${paymentData.order_id}`}
                      className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaWhatsapp className="mr-2" />
                      Chat dari WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;