import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductsContext } from "../../contexts/ProductsContext";
import { getProductByID } from "../../modules/fetch";
import { UserContext } from "../../contexts/UserContext";
import toast from "react-hot-toast";
import { FiCheck, FiShoppingCart } from "react-icons/fi";

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
    <div className="mx-1 sm:mx-20">

      {/* Header Section */}
      {window.location.pathname === "/" && (
        <div className="flex justify-center text-center gap-10 my-10 items-center">
          <div className="p-2">
            <h2 className="text-5xl font-bold mb-7 text-base-950">Paket</h2>
            <p className="text-lg text-base-600">
              Paket yang Disesuaikan untuk Setiap Cerita Cinta
            </p>
          </div>
        </div>
      )}

      <section>

        {location.pathname == "/pricing" && (
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-base-900 mb-4">Wedding Packages</h1>
            <p className="text-lg text-base-600 max-w-2xl mx-auto">
              Paket yang Disesuaikan untuk Setiap Cerita Cinta
            </p>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-20">
          {productsState?.data?.map((product, index) => (
            <div
              // onClick={() => {
              //   handleClickDetailProducts(product?.id);
              //   document.getElementById('my_modal_product').showModal();
              // }}
              // style={{ cursor: "pointer" }}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden"
              key={index}>

              <div
                onClick={() => {
                  handleClickDetailProducts(product?.id);
                  document.getElementById('my_modal_product').showModal();
                }}
                style={{ cursor: "pointer" }}
              >
                <figure className="relative h-60 overflow-hidden">
                  <img
                    src={product?.banner}
                    alt={product?.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </figure>

                <div className="card-body p-6">
                  <div className="flex flex-col h-full">
                    <div className="flex-grow">
                      <h2 className="card-title text-2xl font-bold mb-2">{product?.name}</h2>

                      <div className="text-xl font-semibold text-error mb-4">
                        {new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: product?.currency || 'IDR',
                          minimumFractionDigits: 0
                        }).format(product?.price || 0)}
                      </div>

                      <ul className="space-y-2 mb-6">
                        {product?.detail_groups?.slice(0, 3).map((group, index) => (
                          <li key={index} className="flex items-start">
                            <FiCheck className="text-success mt-1 mr-2 flex-shrink-0" />
                            <span className="text-base-600">{group.name}</span>
                          </li>
                        ))}
                        {product?.detail_groups?.length > 3 && (
                          <li className="text-base-500">+ {product.detail_groups.length - 3} more features</li>
                        )}
                      </ul>
                    </div>


                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-auto p-6">
                <button
                  className="btn btn-error flex-1 gap-2"
                  onClick={() => {
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
                  }}
                >
                  <FiShoppingCart /> Order
                </button>

                {/* <button
                    className="btn btn-outline flex-1 gap-2"
                    onClick={() => {
                      handleClickDetailProducts(product?.id);
                      document.getElementById('my_modal_product').showModal();
                    }}
                  >
                    <FiInfo /> Details
                  </button> */}
              </div>
            </div>
          ))}
        </div>

        {/* Product Detail modal */}
        <dialog id="my_modal_product" className="modal">
          <div className="modal-box p-0 max-w-7xl rounded-xl overflow-auto lg:overflow-hidden shadow-2xl max-h-[90vh]">
            <div className="grid grid-cols-1 lg:grid-cols-2 h-fit">

              {/* Image Gallery Section */}
              <div className="bg-base-50 p-3 sm:p-6 flex flex-col h-fit">
                {/* Header Image Preview*/}
                <div className="z-10 bg-base-50 mb-1 ">
                  <h3 className="text-lg font-semibold text-base-700">Gallery Preview</h3>
                  <div className="divider my-0 sm:my-2"></div>
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
                          className="aspect-square overflow-hidden rounded-lg border-2 border-transparent hover:border-primary transition-all duration-200 relative group"
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
              <div className="p-5 sm:p-8 flex flex-col ">
                {/* Header with Price */}
                <div className="border-b border-base-100 pb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-base-900 mb-2">{productsByIDState?.name}</h2>
                  <div className="flex items-center justify-between">
                    <div className="text-xl sm:text-2xl font-semibold text-error">
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: productsByIDState?.currency || 'IDR',
                        minimumFractionDigits: 0
                      }).format(productsByIDState?.price || 0)}
                    </div>
                    <div className="badge badge-error badge-sm sm:badge-lg">
                      {productsByIDState?.category?.name || 'Wedding'}
                    </div>
                  </div>
                </div>

                <div className="max-h-[75vh] overflow-y-auto">
                  {/* Key Features */}
                  <div className="py-6 border-b border-base-100">
                    <h3 className="text-lg font-semibold text-base-700 mb-3">Highlight Features</h3>
                    <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm md:text-md">
                      {productsByIDState?.detail_groups?.slice(0, 4).map((group, idx) => (
                        <div key={idx} className="flex items-start">
                          <div className="bg-error/10 p-2 rounded-full mr-3">
                            <FiCheck className="text-error" />
                          </div>
                          <div>
                            <h4 className="font-medium">{group.group_name}</h4>
                            <p className="text-sm text-base-500 line-clamp-1">
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
                            <div className="absolute w-8 h-8 rounded-full bg-error/10 flex items-center justify-center mr-3">
                              <span className="text-error font-semibold">{group.group_name.charAt(0)}</span>
                            </div>
                            <div className="ms-12">
                              {group.group_name}
                            </div>
                          </div>
                          <div className="collapse-content">
                            <ul className="space-y-3 pl-2">
                              {group?.detail_items?.map((item) => (
                                <li key={item?.id} className="flex items-center">
                                  <div className="bg-success/10 p-1 rounded-full mr-3 mt-1">
                                    <FiCheck className="text-success text-sm" />
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

                {/* Sticky Footer */}
                <div className="sticky bottom-0 bg-base-100 pt-4 pb-7 border-t border-base-100">
                  <div className="flex gap-4">
                    <button
                      className="btn btn-error flex-1 gap-2 hover:shadow-lg transition-all"
                    >
                      <FiShoppingCart /> Order Now
                    </button>
                    <form method="dialog" className="flex-1">
                      <button className="btn btn-outline w-full hover:bg-base-50">
                        Cencel
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </dialog>

      </section>

      {window.location.pathname === "/" && (
        <div className="flex justify-center text-center gap-10 my-10 items-center">
          <div className="flex justify-end items-center p-2">
            <button
              className="btn btn-error btn-outline text-base-content hover:btn-error btn-lg"
              onClick={() => navigate('/pricing')}
            >
              Selengkapnya
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

export default Weddings