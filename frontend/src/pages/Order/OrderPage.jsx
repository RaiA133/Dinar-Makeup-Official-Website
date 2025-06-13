import { useContext, useEffect, useRef, useState } from "react";
import { ProductsContext } from "../../contexts/ProductsContext";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { createOrder, getProductByID } from "../../modules/fetch";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import moment from 'moment';
import toast, { Toaster } from "react-hot-toast";

function OrderPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rangeDP, setRangeDP] = useState(100);
  const [paymentMethod, setPaymentMethod] = useState("bca");
  const [selected, setSelected] = useState("");

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
    <div className="m-3 sm:m-5">
      <div className="my-3">

        <Toaster
          toastOptions={{
            style: {
              maxWidth: '600px'
            }
          }}
        />

        {Object.keys(productsByIDState).length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">

            <div className="md:col-span-7 xl:col-span-9 p-5 border border-base-300 shadow-lg rounded-box">
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-0'>
                {/* Image Gallery Section */}
                <div className="relative z-20">

                  <div className="overflow-hidden"> {/* Main Image */}
                    <img
                      src={productsByIDState?.images?.[0]?.image_url}
                      alt="Main product image"
                      className="object-contain transition-opacity duration-300"
                      id="main-image"
                    />
                  </div>

                  {productsByIDState?.images?.length > 1 && (
                    <section> {/* Thumbnail Grid */}
                      <div className="divider"></div>
                      <div className="mt-4 grid grid-cols-6 gap-2">
                        {productsByIDState?.images?.map((image, index) => (
                          <button
                            key={index}
                            className="aspect-square overflow-hidden rounded-lg border-2 border-transparent hover:border-primary transition-all"
                            onClick={() => {
                              document.getElementById('main-image').src = image.image_url;
                            }}
                          >
                            <img
                              src={image.image_url}
                              alt={`Thumbnail ${index + 1}`}
                              className="h-full w-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                      <div className="divider"></div>
                    </section>
                  )}

                </div>

                {/* Product Details Section */}
                <div className="overflow-y-auto max-h-[85vh] my-5">
                  {/* Product Title */}
                  <div className="sticky top-0 bg-base-100 p-5 z-10 px-9">
                    <h2 className="text-3xl font-bold mb-2">{productsByIDState?.name}</h2>
                    <span className="text-xl font-semibold text-primary">
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: productsByIDState?.currency || 'IDR',
                        minimumFractionDigits: 0
                      }).format(productsByIDState?.price || 0)}
                    </span>
                    <div className="divider my-2"></div>
                  </div>

                  {/* Product Details */}
                  <div className="space-y-4 px-5">
                    {productsByIDState?.detail_groups?.map((group) => (
                      <div key={group.id} className="collapse collapse-plus bg-base-100 border border-base-300">
                        <input type="radio" name="product-accordion" />
                        <div className="collapse-title font-semibold text-lg">
                          {group.group_name}
                        </div>
                        <div className="collapse-content">
                          <ul className="list-disc pl-5 space-y-2">
                            {group?.detail_items?.map((item) => (
                              <li key={item?.id}>{item?.description}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 xl:col-span-3">

              {/* Calendar */}
              <div className="flex justify-center mb-5 py-5 border-base-300 shadow-lg rounded-box text-xs">
                <DayPicker
                  animate
                  mode="single"
                  disabled={notAvailableDate.map(dateStr => new Date(dateStr))}
                  selected={selected}
                  onSelect={setSelected}
                  footer={
                    selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."
                  }
                />
              </div>

              {/* Checkout */}
              <div className="border border-base-300 shadow-lg rounded-box p-5">

                <span className="text-xl font-semibold text-primary">
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: productsByIDState?.currency || 'IDR',
                    minimumFractionDigits: 0
                  }).format(amount || 0)}
                </span>

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

                  <p className="mt-2 text-sm text-center">DP: {rangeDP} %</p>

                </div>

                <div className="divider my-0"></div>

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
                        className="radio radio-primary"
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
                        className="radio radio-primary"
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
                        className="radio radio-primary"
                      />
                      <span>Danamon Virtual Account</span>
                    </label>
                  </div>


                </div>

                {/* <p className="mt-4 text-sm">Selected: <strong>{paymentMethod}</strong></p> */}

                <div className="divider"></div>

                <button className="btn btn-primary w-full" onClick={() => handlePreSubmit()}>Checkout</button>
                <dialog id="checkout_confirm_modal" className="modal modal-bottom sm:modal-middle">
                  <div className="modal-box sm:min-w-2xl">
                    <h3 className="font-bold text-lg mb-4 text-primary">Order Details</h3>

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
                      <button className="btn btn-primary" onClick={() => handleSubmit()}>Checkout</button>
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