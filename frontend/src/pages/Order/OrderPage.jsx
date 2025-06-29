import { useContext, useEffect, useRef, useState } from "react";
import { ProductsContext } from "../../contexts/ProductsContext";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { createOrder, getProductByID } from "../../modules/fetch";

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import moment from 'moment';

import toast, { Toaster } from "react-hot-toast";

import { FaCheck, FaShoppingCart, FaRegFileAlt, FaBox, FaCreditCard } from "react-icons/fa";

function OrderPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rangeDP, setRangeDP] = useState(100);
  const [paymentMethod, setPaymentMethod] = useState("bca");
  const [selected, setSelected] = useState("");

  const [dateTest, setDateTest] = useState();

  const {
    productsState, productsByIDState, setProductsByIDState
  } = useContext(ProductsContext);

  const { userState } = useContext(UserContext);

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

  let amount = (productsByIDState?.price * rangeDP) / 100;


  const date = new Date(selected);
  const formattedDate = moment(date).format('YYYY-MM-DD');
  const notAvailableDate = ['2025-06-1', '2025-06-2', '2025-06-3', '2025-06-4']; // need api for this, couse currect API is for admin
  const data = {
    product_id: id,
    amount,
    booking_date: formattedDate,
    payment_method: paymentMethod,
    Notes: `DP ${rangeDP} %`
  }

  const handlePreSubmit = () => {
    if (formattedDate == 'Invalid date') {
      toast.error('Date is required', {
        duration: 2500,
      });
    } else document.getElementById('checkout_confirm_modal').showModal();
  }

  const handleSubmit = async () => {
    try {
      const response = await createOrder(data);
      console.log(response);
      if (response.status === 200) {
        const successMessage = response.message;
        sessionStorage.setItem('paymentData', JSON.stringify(response.data));
        toast.success(successMessage, {
          duration: 6000,
        });
        navigate("/payment")
      }
    } catch (error) {
      if (error.response.data.status === 400) { // error validation
        const rawError = error.response.data.message;
        const errorMessages = formatMixedErrors(rawError);
        errorMessages.forEach(message => {
          toast.error(message, {
            duration: 2500,
          });
        });
      } else if (error.response.data.status === 500) {
        toast.error(error.response.data.message, {
          duration: 6000,
        });
      }
      return;
    }
  }



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

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pb-20">

            <div className="md:col-span-7 xl:col-span-8 join join-vertical">
              <div className="join join-vertical gap-5">

                {/* SECTION : Review Paket */}
                <div className="bg-base-100 collapse collapse-arrow join-item border-base-300 border">
                  <input type="radio" name="my-accordion-4" />

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
                  <input type="radio" name="my-accordion-4" defaultChecked />

                  {/* Header */}
                  <div className="collapse-title font-semibold">
                    <div className="flex items-center gap-5 text-error">
                      <FaCreditCard size={40} />
                      <div className="text-md sm:text-xl text-base-content">Pengisian Form Booking</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="collapse-content text-sm">

                    {/* SUB SECTION : Pengisian Form Booking */}
                    <div className="mx-0 sm:mx-10 md:mx-20">

                      {/* Header */}
                      <div className="text-md sm:text-xl flex font-bold justify-center w-full my-5">Data Diri Pengantin</div>

                      {/* Form Data Diri Pengantin*/}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* Mempelai Laki-laki */}
                        <div>
                          <fieldset className="fieldset">
                            <legend className="fieldset-legend ms-1">Nama Lengkap Mempelai Pria</legend>
                            <input type="text" className="input w-full" placeholder="Type here" name="ISI" />
                          </fieldset>
                          <fieldset className="fieldset">
                            <legend className="fieldset-legend ms-1">Alamat Mempelai Pria</legend>
                            <textarea className="textarea h-24 w-full" placeholder="Masukan Alamat"></textarea>
                          </fieldset>
                          <fieldset className="fieldset">
                            <legend className="fieldset-legend ms-1">Email</legend>
                            <input type="text" className="input w-full" placeholder="dinar.dumilah@gmail.com" name="ISI" />
                          </fieldset>
                          <fieldset className="fieldset">
                            <legend className="fieldset-legend ms-1">Instagram</legend>
                            <input type="text" className="input w-full" placeholder="Masukan Nama Instagram Mempelai Pria" name="ISI" />
                          </fieldset>
                        </div>

                        {/* Mempelai Wanita */}
                        <div>
                          <fieldset className="fieldset">
                            <legend className="fieldset-legend ms-1">Nama Lengkap Mempelai Wanita</legend>
                            <input type="text" className="input w-full" placeholder="Type here" name="ISI" />
                          </fieldset>
                          <fieldset className="fieldset">
                            <legend className="fieldset-legend ms-1">Alamat Mempelai Wanita</legend>
                            <textarea className="textarea h-24 w-full" placeholder="Masukan Alamat"></textarea>
                          </fieldset>
                          <fieldset className="fieldset">
                            <legend className="fieldset-legend ms-1">Email</legend>
                            <input type="text" className="input w-full" placeholder="dinar.dumilah@gmail.com" name="ISI" />
                          </fieldset>
                          <fieldset className="fieldset">
                            <legend className="fieldset-legend ms-1">Instagram</legend>
                            <input type="text" className="input w-full" placeholder="Masukan Nama Instagram Mempelai Wanita" name="ISI" />
                          </fieldset>
                        </div>

                      </div>

                      {/* Header */}
                      <div className="text-md sm:text-xl flex font-bold justify-center w-full my-5">Detail Acara</div>

                      {/* Form Detail Acara*/}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* Mempelai Laki-laki */}
                        <div className="h-full">
                          <fieldset className="fieldset">
                            <legend className="fieldset-legend ms-1">Tanggal Akad (Bila dipisah)</legend>
                            <input type="date" className="input w-full" />
                          </fieldset>
                          <fieldset className="fieldset h-full">
                            <legend className="fieldset-legend ms-1">Lokasi Pernikahan</legend>
                            <textarea className="textarea h-48 w-full" placeholder="Masukan Lokasi Pernikahan"></textarea>
                          </fieldset>
                        </div>

                        {/* Mempelai Perempuan */}
                        <div>

                          {/* Daypicker Date */}
                          {/* <div className="fieldset">
                            <legend className="fieldset-legend ms-1">Tanggal Acara</legend>
                            <button popoverTarget="rdp-popover" className="input input-border w-full" type="date" style={{ anchorName: "--rdp" }}>
                              {dateTest ? dateTest.toLocaleDateString() : "Pick a date"}
                            </button>
                            <div popover="auto" id="rdp-popover" className="dropdown" style={{ positionAnchor: "--rdp" }}>
                              <DayPicker
                                className="react-day-picker"
                                mode="single"
                                captionLayout="dropdown"
                                defaultMonth={new Date(2024, 6)}
                                startMonth={new Date(2024, 6)}
                                endMonth={new Date(2050, 9)}
                                selected={dateTest}
                                onSelect={setDateTest} />
                            </div>
                          </div> */}

                          <fieldset className="fieldset">
                            <legend className="fieldset-legend ms-1">Tanggal Acara</legend>
                            <input type="date" className="input w-full" />
                          </fieldset>
                          <fieldset className="fieldset">
                            <legend className="fieldset-legend ms-1">Jam akad</legend>
                            <input type="time" className="input w-full" />
                          </fieldset>
                          <fieldset className="fieldset">
                            <legend className="fieldset-legend ms-1">Jumlah Tamu</legend>
                            <input type="text" className="input w-full" placeholder="dinar.dumilah@gmail.com" name="ISI" />
                          </fieldset>
                          <fieldset className="fieldset">
                            <legend className="fieldset-legend ms-1">Tanggal Acara</legend>
                            <input type="date" className="input w-full" />
                          </fieldset>
                        </div>

                      </div>

                      {/* Kententuan */}
                      <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full border p-4 my-5">
                        {/* <legend className="fieldset-legend">Login options</legend> */}
                        <label className="label gap-3">
                          <input type="checkbox" defaultChecked className="checkbox" required />
                          Saya menyetujui syarat dan ketentuan layanan
                        </label>
                        <label className="label gap-3">
                          <input type="checkbox" defaultChecked className="checkbox" required />
                          Saya telah membaca kebijakan pembatalan
                        </label>
                      </fieldset>

                    </div>

                  </div>

                </div>

              </div>
            </div>

            <div className="md:col-span-5 xl:col-span-4">

              {/* Calendar */}
              {/* <div className="bg-base-100 flex justify-center mb-5 py-5 border-base-300 border rounded-md text-xs text-center">
                <DayPicker
                  animate
                  mode="single"
                  // size='small'
                  disabled={notAvailableDate.map(dateStr => new Date(dateStr))}
                  selected={selected}
                  onSelect={setSelected}
                  footer={
                    selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."
                  }
                />
              </div> */}

              {/* Checkout */}
              <div className="bg-base-100 border-base-300 border rounded-md p-5">

                <div className="flex items-center gap-3 mb-10">
                  <FaRegFileAlt size={40} className="text-error" />
                  <div className="card-title">Detail Pesanan</div>
                </div>

                <div>{productsByIDState.name}</div>
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

                  <div className="flex flex-col gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value="bca"
                        checked={paymentMethod === "bca"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="radio radio-error"
                      />
                      <span>BCA Virtual Account</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        disabled
                        type="radio"
                        name="payment"
                        value="mandiri"
                        checked={paymentMethod === "mandiri"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="radio radio-error"
                      />
                      <span>Mandiri Virtual Account</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        disabled
                        type="radio"
                        name="payment"
                        value="danamon"
                        checked={paymentMethod === "danamon"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="radio radio-error"
                      />
                      <span>Danamon Virtual Account</span>
                    </label>
                  </div>


                </div>

                {/* <p className="mt-4 text-sm">Selected: <strong>{paymentMethod}</strong></p> */}

                <div className="divider"></div>

                {/* MODAL CONFIRM BOOKING */}
                <button className="btn btn-error w-full" onClick={() => handlePreSubmit()}>
                  <FaShoppingCart /> Checkout
                </button>

                <dialog id="checkout_confirm_modal" className="modal modal-bottom sm:modal-middle">
                  <div className="modal-box sm:min-w-2xl">
                    <h3 className="font-bold text-lg mb-4 text-error">Order Details</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-accent">Order Information</h4>
                        <div className="divider m-0"></div>
                        <p><span className="font-medium">Wedding Date:</span> {data.booking_date}</p>
                        <p><span className="font-medium">Notes:</span> {data.Notes}</p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-accent">Payment Details</h4>
                        <div className="divider m-0"></div>
                        <p><span className="font-medium">Amount: </span>
                          {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: productsByIDState?.currency || 'IDR',
                            minimumFractionDigits: 0
                          }).format(productsByIDState?.price || 0)}
                        </p>
                        <p><span className="font-medium">Method:</span> {data.payment_method.toUpperCase()} Virtual Account</p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-accent">Customer Information</h4>
                        <div className="divider m-0"></div>
                        <p><span className="font-medium">Name:</span> {userState.name}</p>
                        <p><span className="font-medium">Email:</span> {userState.email}</p>
                        <p><span className="font-medium">Phone:</span> {userState.phone || '-'}</p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-accent">Product Information</h4>
                        <div className="divider m-0"></div>
                        <p><span className="font-medium">Package:</span> {productsByIDState.name}</p>
                        <p><span className="font-medium">Price: </span>
                          {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: productsByIDState?.currency || 'IDR',
                            minimumFractionDigits: 0
                          }).format(productsByIDState?.price || 0)}
                        </p>
                      </div>
                    </div>

                    <div className="modal-action">
                      <button className="btn btn-error" onClick={() => handleSubmit()}>Checkout</button>
                      <form method="diaog">
                        <div className="flex gap-2">
                          <button className="btn">Cencel</button>
                        </div>
                      </form>
                    </div>

                  </div>
                </dialog>

              </div>

            </div>

          </div>

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