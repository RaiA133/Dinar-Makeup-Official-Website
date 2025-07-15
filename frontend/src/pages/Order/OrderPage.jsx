import { useContext, useEffect, useRef, useState } from "react";
import { ProductsContext } from "../../contexts/ProductsContext";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { createOrder, getProductByID, uploadDocumentOrder } from "../../modules/fetch";

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import moment from 'moment';

import toast, { Toaster } from "react-hot-toast";

import { FaCheck, FaShoppingCart, FaRegFileAlt, FaBox, FaCreditCard } from "react-icons/fa";
import ExtraForm from "../../components/OrderPage/ExtraForm";

function OrderPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userState } = useContext(UserContext);
  const { productsByIDState, setProductsByIDState } = useContext(ProductsContext);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await getProductByID(id);
        if (response.status === 200) setProductsByIDState(response.data);
      } catch (error) {
        console.error("Error : ", error);
      }
    };
    if (id) fetchOrderData();
  }, [id]);

  const [formData, setFormData] = useState(null);
  const [tgl_akad, set_tgl_akad] = useState("")
  const [tgl_acara, set_tgl_acara] = useState("")
  const [tgl_tech_meeting, set_tgl_tech_meeting] = useState("")
  const [rangeDP, setRangeDP] = useState(100);
  const [paymentMethod, setPaymentMethod] = useState("bca");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const bookedDate = [] // ['2025-06-1', '2025-06-2', '2025-06-3', '2025-06-4']; // need api for this, couse currect API is for admin
  let notAvailableDate = [
    tgl_akad ? moment(new Date(tgl_akad)).format("YYYY-MM-DD") : "",
    tgl_acara ? moment(new Date(tgl_acara)).format("YYYY-MM-DD") : "",
    tgl_tech_meeting ? moment(new Date(tgl_tech_meeting)).format("YYYY-MM-DD") : "",
    ...bookedDate]
  let amount = (productsByIDState?.price * rangeDP) / 100;

  const handleValidationData = (e = null) => {
    if (e) e.preventDefault(); // akan null jika handleValidationData bukan dari form form-data-order

    const formEl = document.querySelector("#form-data-order");
    if (!formEl) return;

    const data = {
      product_id: productsByIDState.id,
      amount,
      booking_date: moment(new Date()).format("YYYY-MM-DD"),
      payment_method: paymentMethod,
      customer_detail: {
        groom_full_name: formEl.nama_pria.value.trim(),
        groom_address: formEl.alamat_pria.value.trim(),
        groom_email: formEl.email_pria.value.trim(),
        groom_instagram: formEl.ig_pria.value.trim(),
        bride_full_name: formEl.nama_wanita.value.trim(),
        bride_address: formEl.alamat_wanita.value.trim(),
        bride_email: formEl.email_wanita.value.trim(),
        bride_instagram: formEl.ig_wanita.value.trim(),
      },
      detail_order: {
        akad_date: tgl_akad ? moment(new Date(tgl_akad)).format("YYYY-MM-DD") : "",
        location: formEl.lokasi_pernikahan.value.trim(),
        show_date: tgl_acara ? moment(new Date(tgl_acara)).format("YYYY-MM-DD") : "",
        akad_time: formEl.jam_akad.value.trim(),
        guest_count: parseInt(formEl.jumlah_tamu.value),
        tech_meeting: tgl_tech_meeting ? moment(new Date(tgl_tech_meeting)).format("YYYY-MM-DD") : "",
      },
      term_1: formEl.term_1.checked,
      term_2: formEl.term_2.checked,
      notes: formEl.notes.value.trim(),
      documents: formEl.documents.files,
    };

    // Validasi wajib (opsional bisa ditambah lagi)
    const missingFields = [];
    for (const [key, value] of Object.entries(data)) {
      if (["notes", "documents"].includes(key)) continue;
      if ((typeof value === "string" && value.trim() === "") ||
        (typeof value === "boolean" && value === false) ||
        (typeof value === "number" && isNaN(value))) {
        missingFields.push(key);
      }
    }

    if (missingFields.length > 0) {
      if (e == null) {
        toast("Lengkapi semua data untuk membuat AI lebih baik", {
          icon: 'ℹ️',
          duration: 3000,
        });
      } else {
        toast.error("Mohon lengkapi semua data dan setujui syarat & ketentuan.", {
          duration: 3000,
        });
      }
      return;
    }

    // // === Valid Email (opsional tambahan) ===
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(data.groom_email) || !emailRegex.test(data.bride_email)) {
    //   toast.error("Format email tidak valid.", { duration: 3000 });
    //   return;
    // }

    setFormData(data);
    if (e) document.getElementById("checkout_confirm_modal").checked = true;
  };


  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // 1. Buat order
      const response = await createOrder(formData);
      if (response.status === 200) {
        const transactionId = response.data.transaction_id;

        // 2. Upload dokumen (jika ada)
        if (formData.documents?.length > 0) {
          const imageFormData = new FormData();
          imageFormData.append("order_id", transactionId);
          imageFormData.append("file", formData.documents[0]);

          try {
            const uploadResponse = await uploadDocumentOrder(imageFormData);
            toast.success(uploadResponse.message || "Dokumen berhasil diunggah", {
              duration: 3000,
            });
          } catch (uploadErr) {
            const err = uploadErr?.response?.data;

            if (err?.status === 400) {
              toast.error("Upload dokumen gagal: " + err.message, {
                duration: 4000,
              });
            } else {
              toast.error("Gagal upload dokumen. Coba lagi nanti.", {
                duration: 4000,
              });
            }
          }
        }

        // 3. Simpan dan redirect
        sessionStorage.setItem("paymentData", JSON.stringify(response.data));
        toast.success(response.message || "Pemesanan berhasil!", {
          duration: 5000,
        });
        navigate("/payment");

      }
    } catch (error) {
      const err = error?.response?.data;

      if (err?.status === 400) {
        const rawError = err.message;
        // Optional: jika `formatMixedErrors` undefined, gunakan fallback
        if (typeof formatMixedErrors === "function") {
          const errorMessages = formatMixedErrors(rawError);
          errorMessages.forEach((message) =>
            toast.error(message, { duration: 2500 })
          );
        } else {
          toast.error(rawError, { duration: 3000 });
        }
      } else if (err?.status === 500) {
        toast.error(err.message || "Terjadi kesalahan server", {
          duration: 6000,
        });
      } else {
        toast.error(err.message, {
          duration: 6000,
        });
      }
    } finally {
      setIsSubmitting(false);
    }

  }

  const dataBank = [
    { name: "bca", logo: "/img/banks/bca.png" },
    { name: "bri", logo: "/img/banks/bri.png" },
    { name: "bni", logo: "/img/banks/bni.png" },
    { name: "cimb", logo: "/img/banks/cimb.png" },
    // { name: "mandiri", logo: "/img/banks/mandiri.png" }, // belum ada VA
    // { name: "maybank", logo: "/img/banks/maybank.png" }, // belum ada VA
    // { name: "permata", logo: "/img/banks/permata.png" }, // belum ada VA
    // { name: "mega", logo: "/img/banks/mega.png" },       // belum ada VA
  ];

  return (
    <div
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8), rgba(255,255,255,0.8), rgba(255,255,255,0.8), rgba(235,163,169,1)), url(/img/background/bg-1.jpg)',
      }}
    >
      <div className="mx-3 sm:mx-20">
        <div className="text-center py-7 sm:py-16">
          <h1 className="text-2xl md:text-4xl font-bold text-base-900">Wedding Packages</h1>
        </div>

        <Toaster
          toastOptions={{
            style: {
              maxWidth: '600px'
            }
          }}
        />

        {Object.keys(productsByIDState).length > 0 ? (

          <form id="form-data-order" className="grid grid-cols-1 md:grid-cols-12 gap-5 pb-20" onSubmit={handleValidationData}>

            <div className="md:col-span-7 xl:col-span-8 join join-vertical">
              <div className="join join-vertical gap-5">

                {/* SECTION : Review Paket */}
                <div className="bg-base-100 collapse collapse-arrow join-item border-base-300 border">
                  <input type="radio" name="order-accordion" />

                  {/* Header */}
                  <div className="collapse-title font-semibold">
                    <div className="flex items-center gap-5 text-error">
                      <FaBox size={40} />
                      <div className="text-base-content">
                        <div className="text-xs">Nama Pesanan</div>
                        <div className="text-md sm:text-xl">Paket {productsByIDState.name}</div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="collapse-content text-sm px-0">

                    {/* SUB SECTION : Review Paket */}
                    <div>
                      <div className='grid grid-cols-1 lg:grid-cols-2 gap-0'>
                        {/* Image Gallery Section */}
                        <div className="bg-base-50 p-6 flex flex-col h-fit">
                          {/* Header Image Preview*/}
                          <div className="z-10 bg-base-50 pb-4 ">
                            <h3 className="text-lg font-semibold text-base-700">Gallery Preview</h3>
                            <div className="divider my-2"></div>
                          </div>

                          {/* Main Image with Zoom Effect */}
                          <div className="relative flex-grow overflow-hidden rounded-xl bg-base-100 shadow-sm">
                            <img
                              src={productsByIDState?.images?.[0]?.image_url}
                              alt="Main product image"
                              className="w-full h-fit object-contain transition-transform duration-300 hover:scale-105"
                              id="main-image"
                            />
                          </div>

                          {/* Thumbnail Gallery */}
                          {productsByIDState?.images?.length > 1 && (
                            <div className="mt-6">
                              <div className="grid grid-cols-4 gap-3">
                                {productsByIDState?.images?.map((image, index) => (
                                  <button
                                    key={index}
                                    className="aspect-square overflow-hidden rounded-lg border-2 border-transparent hover:border-error transition-all duration-200 relative group"
                                    onClick={() => {
                                      document.getElementById('main-image').src = image.image_url;
                                    }}
                                  >
                                    <img
                                      src={image.image_url}
                                      alt={`Thumbnail ${index + 1}`}
                                      className="h-full w-full object-cover group-hover:opacity-80"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200"></div>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Product Details Section */}
                        <div className="p-8 flex flex-col ">
                          {/* Header with Price */}
                          <div className="border-b border-base-100 pb-6">
                            <h2 className="text-3xl font-bold text-base-900 mb-2">{productsByIDState?.name}</h2>
                            <div className="flex items-center justify-between">
                              <div className="text-2xl font-semibold text-error">
                                {new Intl.NumberFormat('id-ID', {
                                  style: 'currency',
                                  currency: productsByIDState?.currency || 'IDR',
                                  minimumFractionDigits: 0
                                }).format(productsByIDState?.price || 0)}
                              </div>
                              <div className="badge badge-error badge-lg">
                                {productsByIDState?.category?.name || 'Wedding'}
                              </div>
                            </div>
                          </div>

                          <div className="max-h-[75vh] overflow-y-auto">
                            {/* Key Features */}
                            <div className="py-6 border-b border-base-100">
                              <h3 className="text-lg font-semibold text-gray-700 mb-3">Highlight Features</h3>
                              <div className="grid grid-cols-2 gap-3">
                                {productsByIDState?.detail_groups?.slice(0, 4).map((group, idx) => (
                                  <div key={idx} className="flex items-start">
                                    <div className="bg-error/10 p-2 rounded-full mr-3">
                                      <FaCheck className="text-error" />
                                    </div>
                                    <div>
                                      <h4 className="font-medium">{group.group_name}</h4>
                                      <p className="text-sm text-gray-500 line-clamp-1">
                                        {group.detail_items?.[0]?.description || 'Included'}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Detailed Specifications */}
                            <div className="py-6 flex-grow overflow-y-auto">
                              <h3 className="text-lg font-semibold text-base-700 mb-4">Package Details</h3>
                              <div className="space-y-4">
                                {productsByIDState?.detail_groups?.map((group) => (
                                  <div key={group.id} className="collapse collapse-plus bg-base-100 border border-base-200">
                                    <input type="radio" name="product-accordion" />
                                    <div className="collapse-title font-medium text-md sm:text-lg flex items-center">
                                      <div className="w-8 h-8 rounded-full bg-error/10 flex items-center justify-center mr-3">
                                        <span className="text-error font-semibold">{group.group_name.charAt(0)}</span>
                                      </div>
                                      {group.group_name}
                                    </div>
                                    <div className="collapse-content">
                                      <ul className="space-y-3 pl-2">
                                        {group?.detail_items?.map((item) => (
                                          <li key={item?.id} className="flex items-center">
                                            <div className="bg-success/10 p-1 rounded-full mr-3 mt-1">
                                              <FaCheck className="text-success text-sm" />
                                            </div>
                                            <span className="text-base-700 text-xs md:text-md">{item?.description}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>

                  </div>

                </div>

                {/* SECTION : Pengisian FORM Booking */}
                <div className="bg-base-100 collapse collapse-arrow join-item border-base-300 border">
                  <input type="radio" name="order-accordion" defaultChecked />

                  {/* Header */}
                  <div className="collapse-title font-semibold">
                    <div className="flex items-center gap-5 text-error">
                      <FaCreditCard size={40} />
                      <div className="text-base-content">
                        <div className="text-md sm:text-xl">Pengisian Form Booking</div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="collapse-content text-sm">

                    {/* SUB SECTION : Pengisian Form Booking */}
                    <div className="mx-0 lg:mx-5 xl:mx-20">

                      {/* Header */}
                      <div className="text-md sm:text-xl flex font-bold justify-center w-full my-10">Data Diri Pengantin</div>

                      {/* Form Data Diri Pengantin*/}
                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

                        {/* Mempelai Laki-laki */}
                        <div>
                          <fieldset className="fieldset">
                            <legend className="fieldset-legend ms-1">Nama Lengkap Mempelai Pria</legend>
                            <input type="text" className="input w-full" placeholder="Type here" name="nama_pria" />
                          </fieldset>
                          <fieldset className="fieldset">
                            <legend className="fieldset-legend ms-1">Alamat Mempelai Pria</legend>
                            <textarea className="textarea h-24 w-full" placeholder="Masukan Alamat" name="alamat_pria"></textarea>
                          </fieldset>
                          <fieldset className="fieldset">
                            <legend className="fieldset-legend ms-1">Email</legend>
                            <input type="email" className="input w-full" placeholder="dinar.dumilah@gmail.com" name="email_pria" />
                          </fieldset>
                          <fieldset className="fieldset">
                            <legend className="fieldset-legend ms-1">Instagram</legend>
                            <input type="text" className="input w-full" placeholder="Masukan Nama Instagram Mempelai Pria" name="ig_pria" />
                          </fieldset>
                        </div>

                        {/* Mempelai Wanita */}
                        <div>
                          <fieldset className="fieldset">
                            <legend className="fieldset-legend ms-1">Nama Lengkap Mempelai Wanita</legend>
                            <input type="text" className="input w-full" placeholder="Type here" name="nama_wanita" />
                          </fieldset>
                          <fieldset className="fieldset">
                            <legend className="fieldset-legend ms-1">Alamat Mempelai Wanita</legend>
                            <textarea className="textarea h-24 w-full" placeholder="Masukan Alamat" name="alamat_wanita"></textarea>
                          </fieldset>
                          <fieldset className="fieldset">
                            <legend className="fieldset-legend ms-1">Email</legend>
                            <input type="email" className="input w-full" placeholder="dinar.dumilah@gmail.com" name="email_wanita" />
                          </fieldset>
                          <fieldset className="fieldset">
                            <legend className="fieldset-legend ms-1">Instagram</legend>
                            <input type="text" className="input w-full" placeholder="Masukan Nama Instagram Mempelai Wanita" name="ig_wanita" />
                          </fieldset>
                        </div>

                      </div>

                      {/* Header */}
                      <div className="text-md sm:text-xl flex font-bold justify-center w-full my-10">Detail Acara</div>

                      {/* Form Detail Acara*/}
                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

                        {/* Mempelai Laki-laki */}
                        <div className="h-full">
                          <div className="fieldset">
                            <legend className="fieldset-legend ms-1">Tanggal Akad (Bila dipisah)</legend>
                            <button type="button" popoverTarget="tgl_akad" className="input input-border w-full" style={{ anchorName: "--tgl_akad" }}>
                              {tgl_akad ? tgl_akad.toLocaleDateString() : "Pick a date"}
                            </button>
                            <div popover="auto" id="tgl_akad" className="dropdown" style={{ positionAnchor: "--tgl_akad" }}>
                              <DayPicker
                                required
                                className="react-day-picker"
                                mode="single"
                                captionLayout="dropdown"
                                disabled={notAvailableDate.map(dateStr => new Date(dateStr))}
                                defaultMonth={new Date(2024, 6)}
                                startMonth={new Date(2024, 6)}
                                endMonth={new Date(2050, 9)}
                                selected={tgl_akad}
                                onSelect={set_tgl_akad} />
                            </div>
                          </div>
                          <fieldset className="fieldset h-full">
                            <legend className="fieldset-legend ms-1">Lokasi Pernikahan</legend>
                            <textarea className="textarea h-48 w-full" placeholder="Masukan Lokasi Pernikahan" name="lokasi_pernikahan"></textarea>
                          </fieldset>
                        </div>

                        {/* Mempelai Perempuan */}
                        <div>

                          {/* Daypicker Date */}

                          <div className="fieldset">
                            <legend className="fieldset-legend ms-1">Tanggal Acara</legend>
                            <button type="button" popoverTarget="tgl_acara" className="input input-border w-full" style={{ anchorName: "--tgl_acara" }}>
                              {tgl_acara ? tgl_acara.toLocaleDateString() : "Pick a date"}
                            </button>
                            <div popover="auto" id="tgl_acara" className="dropdown" style={{ positionAnchor: "--tgl_acara" }}>
                              <DayPicker
                                className="react-day-picker"
                                mode="single"
                                captionLayout="dropdown"
                                disabled={notAvailableDate.map(dateStr => new Date(dateStr))}
                                defaultMonth={new Date(2024, 6)}
                                startMonth={new Date(2024, 6)}
                                endMonth={new Date(2050, 9)}
                                selected={tgl_acara}
                                onSelect={set_tgl_acara} />
                            </div>
                          </div>
                          <fieldset className="fieldset">
                            <legend className="fieldset-legend ms-1">Jam akad</legend>
                            <input type="time" className="input w-full" name="jam_akad" />
                          </fieldset>
                          <fieldset className="fieldset">
                            <legend className="fieldset-legend ms-1">Jumlah Tamu</legend>
                            <input type="number" className="input w-full" placeholder="100" name="jumlah_tamu" />
                          </fieldset>
                          <div className="fieldset">
                            <legend className="fieldset-legend ms-1">Tanggal Tech Meeting</legend>
                            <button type="button" popoverTarget="tgl_tech_meeting" className="input input-border w-full" style={{ anchorName: "--tgl_tech_meeting" }}>
                              {tgl_tech_meeting ? tgl_tech_meeting.toLocaleDateString() : "Pick a date"}
                            </button>
                            <div popover="auto" id="tgl_tech_meeting" className="dropdown" style={{ positionAnchor: "--tgl_tech_meeting" }}>
                              <DayPicker
                                className="react-day-picker"
                                mode="single"
                                captionLayout="dropdown"
                                disabled={notAvailableDate.map(dateStr => new Date(dateStr))}
                                defaultMonth={new Date(2024, 6)}
                                startMonth={new Date(2024, 6)}
                                endMonth={new Date(2050, 9)}
                                selected={tgl_tech_meeting}
                                onSelect={set_tgl_tech_meeting} />
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* Kententuan */}
                      <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full border p-4 my-5">
                        {/* <legend className="fieldset-legend">Login options</legend> */}
                        <div className="flex items-center gap-3">
                          <input type="checkbox" className="checkbox" name="term_1" />
                          <span>Saya menyetujui syarat dan ketentuan layanan</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <input type="checkbox" className="checkbox" name="term_2" />
                          <span>Saya telah membaca kebijakan pembatalan</span>
                        </div>
                      </fieldset>

                      {/* Data Optional */}
                      <ExtraForm formData={formData} handleValidationData={handleValidationData} />

                    </div>

                  </div>

                </div>

              </div>
            </div>

            {/* Checkout */}
            <div className="md:col-span-5 xl:col-span-4">
              <div className="bg-base-100 border-base-300 border rounded-md p-5">

                <div className="flex items-center gap-3 mb-10">
                  <FaRegFileAlt size={40} className="text-error" />
                  <div className="card-title">Detail Pesanan</div>
                </div>

                <div>Paket {productsByIDState?.name}</div>
                <div className="divider"></div>
                <div className="flex items-center justify-between">
                  <div>Total Harga </div>
                  <div>
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: productsByIDState?.currency || 'IDR',
                      minimumFractionDigits: 0
                    }).format(amount || 0)}
                  </div>
                </div>
                <div className="divider"></div>

                {/* DP */}
                <div className="w-full max-w-full my-5">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={rangeDP}
                    onChange={(e) => setRangeDP(Number(e.target.value))}
                    className="range w-full"
                    step={25}
                  />
                  <div className="flex justify-between px-2.5 mt-2 text-xs">
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                  </div>
                  <div className="flex justify-between px-2.5 mt-2 text-xs">
                    <span>0 %</span>
                    <span>25 %</span>
                    <span>50 %</span>
                    <span>75 %</span>
                    <span>100 %</span>
                  </div>

                  <p className="mt-10 text-sm text-center">DP: {rangeDP} %</p>

                </div>

                <div className="divider my-0"></div>

                {/* Payment Method */}
                <div className="w-full p-4">
                  <h2 className="text-lg font-semibold mb-4">Select Payment Method</h2>

                  <div className="grid grid-cols-1 gap-3">
                    {dataBank.map((bank, index) => (
                      <label key={index}
                        className={`flex items-center gap-3 border-2 rounded-xl p-1 px-3 cursor-pointer transition
                          ${paymentMethod === bank.name
                            ? "border-error bg-error/10"
                            : "border-base-200 hover:border-error/40"}`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={bank.name}
                          checked={paymentMethod === bank.name}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="hidden"
                        />
                        <img src={bank.logo} alt={bank.name} className="w-10 h-10 object-contain" />
                        <span className="text-sm font-medium uppercase">{bank.name} <span className="normal-case">VA</span></span>
                      </label>
                    ))}
                  </div>

                </div>

                <div className="divider"></div>

                {/* MODAL CONFIRM BOOKING */}
                <button className="btn btn-error w-full" type="submit">
                  <FaShoppingCart /> Checkout
                </button>

                <input type="checkbox" id="checkout_confirm_modal" className="modal-toggle" />
                <div className="modal modal-bottom sm:modal-middle">
                  <div className="modal-box sm:min-w-4xl">
                    <h3 className="font-bold text-lg mb-4 text-error">Detail Pesanan</h3>

                    <div className="space-y-6 bg-base-200 p-5">

                      {/* === Informasi Pasangan & Acara === */}
                      <section>
                        <h4 className="font-semibold text-accent mb-2">Informasi Pernikahan</h4>
                        <div className="divider m-0 mb-4"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="space-y-1">
                            <p><span className="font-medium">Nama Pria :</span> {formData?.customer_detail?.groom_full_name}</p>
                            <p><span className="font-medium">Alamat Pria :</span> {formData?.customer_detail?.groom_address}</p>
                            <p><span className="font-medium">Email Pria :</span> {formData?.customer_detail?.groom_email}</p>
                            <p><span className="font-medium">Instagram Pria :</span> {formData?.customer_detail?.groom_instagram}</p>
                          </div>
                          <div className="space-y-1">
                            <p><span className="font-medium">Nama Wanita :</span> {formData?.customer_detail?.bride_full_name}</p>
                            <p><span className="font-medium">Alamat Wanita :</span> {formData?.customer_detail?.bride_address}</p>
                            <p><span className="font-medium">Email Wanita :</span> {formData?.customer_detail?.bride_email}</p>
                            <p><span className="font-medium">Instagram Wanita :</span> {formData?.customer_detail?.bride_instagram}</p>
                          </div>
                          <div className="space-y-1">
                            <p><span className="font-medium">Tanggal Akad :</span> {formData?.detail_order?.akad_date}</p>
                            <p><span className="font-medium">Jam Akad :</span> {formData?.detail_order?.akad_time}</p>
                            <p><span className="font-medium">Tanggal Resepsi :</span> {formData?.detail_order?.show_date}</p>
                          </div>
                          <div className="space-y-1">
                            <p><span className="font-medium">Jumlah Tamu :</span> {formData?.detail_order?.guest_count}</p>
                            <p><span className="font-medium">Tanggal Tech Meeting :</span> {formData?.detail_order?.tech_meeting}</p>
                            <p><span className="font-medium">Lokasi Pernikahan :</span> {formData?.detail_order?.location}</p>
                          </div>
                        </div>
                      </section>

                      {/* === Informasi Produk === */}
                      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        <div>
                          <h4 className="font-semibold text-accent mb-2">Informasi Produk</h4>
                          <div className="divider m-0 mb-4"></div>
                          <div className="space-y-1 text-sm">
                            <p><span className="font-medium">Nama Produk :</span> {productsByIDState?.name}</p>
                            <p>
                              <span className="font-medium">Harga :</span>{" "}
                              {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: productsByIDState?.currency || "IDR",
                                minimumFractionDigits: 0,
                              }).format(productsByIDState?.price || 0)}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          <h4 className="font-semibold text-accent">Rencana Down payment (DP)</h4>
                          <div className="divider m-0 mb-4"></div>
                          <p><span className="font-medium">Rencana DP : </span>
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: productsByIDState?.currency || "IDR",
                              minimumFractionDigits: 0,
                            }).format(amount || 0)}
                          </p>
                          <p><span className="font-medium">Sisa DP : </span>
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: productsByIDState?.currency || "IDR",
                              minimumFractionDigits: 0,
                            }).format(productsByIDState?.price - amount || 0)}
                          </p>
                        </div>

                      </section>

                      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* === Informasi Pembayaran === */}
                        <div>
                          <h4 className="font-semibold text-accent mb-2">Detail Pembayaran</h4>
                          <div className="divider m-0 mb-4"></div>
                          <div className="space-y-1 text-sm">
                            <p>
                              <span className="font-medium">Jumlah Bayar : </span>{" "}
                              {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: productsByIDState?.currency || "IDR",
                                minimumFractionDigits: 0,
                              }).format(amount || 0)}
                            </p>
                            <p><span className="font-medium">Metode Pembayaran :</span> {paymentMethod?.toUpperCase()} Virtual Account</p>
                          </div>
                        </div>

                        {/* === Informasi Pelanggan === */}
                        <div>
                          <h4 className="font-semibold text-accent mb-2">Informasi Pemesan</h4>
                          <div className="divider m-0 mb-4"></div>
                          <div className="space-y-1 text-sm">
                            <p><span className="font-medium">Nama :</span> {userState?.name}</p>
                            <p><span className="font-medium">Email :</span> {userState?.email}</p>
                            <p><span className="font-medium">Telepon :</span> {userState?.phone || '-'}</p>
                            <p><span className="font-medium">Alamat :</span> {userState?.address || '-'}</p>
                          </div>
                        </div>

                      </section>

                      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* === Notes === */}
                        <div>
                          <h4 className="font-semibold text-accent mb-2">Catatan Tambahan</h4>
                          <div className="divider m-0 mb-4"></div>
                          {formData?.notes ? (
                            <div className="rounded-box w-full border border-stone-400 p-4 text-sm">
                              {formData?.notes}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500">Tidak ada catatan ditambahkan.</p>
                          )}
                        </div>

                        {/* === Dokumen === */}
                        <div>
                          <h4 className="font-semibold text-accent mb-2">Desain / Dokumen</h4>
                          <div className="divider m-0 mb-4"></div>
                          {formData?.documents && formData.documents.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              {Array.from(formData.documents).map((file, idx) => {
                                const fileType = file.type;
                                const fileURL = URL.createObjectURL(file);

                                if (fileType.startsWith("image/")) {
                                  return (
                                    <div key={idx}>
                                      <img
                                        src={fileURL}
                                        alt={`Gambar ${idx + 1}`}
                                        className="w-full rounded border cursor-pointer"
                                        onClick={() => document.getElementById(`image_modal_order_${idx}`).showModal()}
                                      />
                                      <dialog id={`image_modal_order_${idx}`} className="modal modal-bottom sm:modal-middle">
                                        <div className="modal-box p-0">
                                          <img
                                            src={fileURL}
                                            alt={`Preview Gambar ${idx + 1}`}
                                            className="w-full max-h-full object-contain rounded-t"
                                          />
                                        </div>
                                        <form method="dialog" className="modal-backdrop">
                                          <button>close</button>
                                        </form>
                                      </dialog>
                                    </div>
                                  );
                                }

                                // Untuk file non-gambar (PDF, DOC, dll)
                                return (
                                  <div key={idx}>
                                    <a
                                      href={fileURL}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="link link-primary"
                                    >
                                      {file.name}
                                    </a>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500">Tidak ada dokumen yang diunggah.</p>
                          )}
                        </div>

                      </section>

                    </div>

                    <div className="modal-action mt-6">
                      <button
                        className="btn btn-error"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="loading loading-spinner"></span>
                        ) : (
                          "Checkout"
                        )}
                      </button>
                      <label htmlFor="checkout_confirm_modal" className="btn" disabled={isSubmitting}>Batal</label>
                    </div>
                  </div>
                </div>

                {/* END MODAL CONFIRM BOOKING */}

              </div>
            </div>

          </form>

        ) : (
          <div className="flex justify-center items-center h-screen">
            <span>No product selected</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderPage;
