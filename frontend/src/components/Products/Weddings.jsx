import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductsContext } from "../../contexts/ProductsContext";
import { getProductByID } from "../../modules/fetch";
import { UserContext } from "../../contexts/UserContext";
import toast from "react-hot-toast";

function Weddings() {
  let location = useLocation();
  const navigate = useNavigate();
  const {
    productsState,
    productsByIDState, setProductsByIDState
  } = useContext(ProductsContext);

  const { isLogin, userState } = useContext(UserContext);
  const isProfileFulfill = !!userState.nik && !!userState.phone_number;

  const handleClickDetailProducts = async (id) => {
    try {
      const response = await getProductByID(id);
      if (response.status === 200) setProductsByIDState(response.data);
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  return (
    <div className="mt-20 mx-1 sm:mx-20">

      {/* Judul (hanya ada di menu home) */}
      {location.pathname == "/" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          <div className="p-2">
            <div className="text-4xl font-semibold mb-2">Pricing</div>
            <span className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, nam asperiores.
            </span>
          </div>

          <div className="flex justify-end items-center p-2">
            <a className="link link-info no-underline" onClick={() => navigate('/pricing')}>Lihat Semua</a>
          </div>

        </div>
      )
      }

      {location.pathname == "/pricing" && (<div className="divider text-3xl mb-10">Weedings</div>)}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-20">

        {productsState?.data?.map((product, index) => (
          <div className="card w-full bg-base-200 shadow-md" key={index}>
            <figure>
              <img src={product?.banner} />
            </figure>
            <div className="card-body">
              {/* <span className="badge badge-xs badge-warning">Most Popular</span> */}
              <ul className="mb-3 flex flex-col gap-2 text-xs">
                {product?.detail_groups?.map((group, index) => (
                  <li key={index}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{group.name}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 h-full flex items-end">
                <div className="w-full">
                  <div className="mb-5 w-full">
                    <h2 className="text-3xl font-bold mb-2">{product?.name}</h2>
                    <span className="text-xl">
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: product?.currency || 'IDR',
                        minimumFractionDigits: 0
                      }).format(product?.price || 0)}
                    </span>
                  </div>
                  {/* You can open the modal using document.getElementById('ID').showModal() method */}
                  <div className="w-full flex gap-2">
                    <button className="btn btn-primary w-1/2" onClick={() => {
                      if (isLogin) {
                        if (isProfileFulfill) navigate(`/order/${product?.id}`);
                        else {
                          navigate('/profile');
                          toast.error('NIK & Phone Number is required', {
                            duration: 4000,
                          });
                        }
                      } else {
                        navigate('/login');
                        toast.error('Login is required', {
                          duration: 4000,
                        });
                      }
                    }}>Buy</button>
                    <button className="btn w-1/2" onClick={() => {
                      handleClickDetailProducts(product?.id);
                      document.getElementById('my_modal_product').showModal();
                    }
                    }>Detail</button>
                  </div>
                </div>

                {/* MODAL DETAIl */}
                <dialog id="my_modal_product" className="modal">
                  <div className="modal-box w-11/12 max-w-7xl max-h-11/12 overflow-y-auto rounded-4xl">
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-0'>
                      {/* Image Gallery Section */}
                      <div className="relative z-20">
                        {/* Main Image */}
                        <div className="overflow-hidden">
                          <img
                            src={productsByIDState?.images?.[0]?.image_url}
                            alt="Main product image"
                            className="object-contain transition-opacity duration-300"
                            id="main-image"
                          />
                        </div>

                        {/* Thumbnail Grid */}
                        {productsByIDState?.images?.length > 1 && (
                          <section>
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
                      <div className="overflow-y-auto max-h-[85vh]">
                        {/* Product Title */}
                        <div className="sticky top-0 bg-base-100 p-5 z-10">
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

                        {/* Action Buttons */}
                        <div className="modal-action sticky bottom-0 bg-base-100 p-5">
                          <form method="dialog" className="w-full flex gap-2">
                            <button className="btn btn-primary flex-1" onClick={() => {
                              if (isLogin) {
                                if (isProfileFulfill) navigate(`/order/${product?.id}`);
                                else {
                                  navigate('/profile');
                                  toast.error('NIK & Phone Number is required', {
                                    duration: 4000,
                                  });
                                }
                              } else {
                                navigate('/login');
                                toast.error('Login is required', {
                                  duration: 4000,
                                });
                              }
                            }}>Buy Now</button>
                            <button className="btn flex-1">Close</button>
                          </form>
                        </div>

                      </div>
                    </div>
                  </div>
                </dialog>

              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Weddings