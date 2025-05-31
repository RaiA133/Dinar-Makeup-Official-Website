import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";
import { ProductsContext } from "../../../contexts/ProductsContext";
import { createProduct, uploadImageProduct } from "../../../modules/fetch";
import toast, { Toaster } from 'react-hot-toast';

function CreateProductManagementPage() {
  const navigate = useNavigate();
  const { userState } = useContext(UserContext);
  const { setProductsState } = useContext(ProductsContext);

  // Form state
  const [detailGroups, setDetailGroups] = useState([{
    group_name: "Package Inclusions",
    detail_items: [{ description: "" }],
  }]);

  const [newImages, setNewImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Detail Groups Handlers
  const handleGroupChange = (groupIndex, field, value) => {
    const updatedGroups = [...detailGroups];
    updatedGroups[groupIndex][field] = value;
    setDetailGroups(updatedGroups);
  };

  const handleItemChange = (groupIndex, itemIndex, value) => {
    const updatedGroups = [...detailGroups];
    updatedGroups[groupIndex].detail_items[itemIndex].description = value;
    setDetailGroups(updatedGroups);
  };

  const addNewGroup = () => {
    setDetailGroups([
      ...detailGroups,
      {
        group_name: "New Group",
        detail_items: [{ description: "" }]
      }
    ]);
  };

  const addNewItem = (groupIndex) => {
    const updatedGroups = [...detailGroups];
    updatedGroups[groupIndex].detail_items.push({
      description: ""
    });
    setDetailGroups(updatedGroups);
  };

  const removeGroup = (groupIndex) => {
    if (detailGroups.length > 1) {
      const updatedGroups = [...detailGroups];
      updatedGroups.splice(groupIndex, 1);
      setDetailGroups(updatedGroups);
    }
  };

  const removeItem = (groupIndex, itemIndex) => {
    const updatedGroups = [...detailGroups];
    if (updatedGroups[groupIndex].detail_items.length > 1) {
      updatedGroups[groupIndex].detail_items.splice(itemIndex, 1);
      setDetailGroups(updatedGroups);
    }
  };

  // Image Handlers
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImagePreviews = files.map(file => ({
      id: Date.now() + Math.random().toString(36).substr(2, 9), // Generate unique ID
      image_url: URL.createObjectURL(file),
      file // Store the actual file object
    }));
    setNewImages([...newImages, ...newImagePreviews]);
  };

  const removeImage = (imageId) => {
    setNewImages(newImages.filter(img => img.id !== imageId));
  };

  const moveImageUp = (index) => {
    if (index > 0) {
      const updatedImages = [...newImages];
      [updatedImages[index], updatedImages[index - 1]] =
        [updatedImages[index - 1], updatedImages[index]];
      setNewImages(updatedImages);
    }
  };

  const moveImageDown = (index) => {
    if (index < newImages.length - 1) {
      const updatedImages = [...newImages];
      [updatedImages[index], updatedImages[index + 1]] =
        [updatedImages[index + 1], updatedImages[index]];
      setNewImages(updatedImages);
    }
  };

  // Form Submission
  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. First create the product without images
      const productData = {
        name: e.target.name.value,
        price: parseFloat(e.target.price.value),
        description: e.target.description.value,
        notes: e.target.notes.value,
        detail_groups: detailGroups
      };

      const productResponse = await createProduct(productData);

      if (productResponse.status !== 200) {
        throw new Error("Failed to create product");
      }

      const productId = productResponse.data.id;

      // 2. Upload images separately if there are any
      if (newImages.length > 0) {
        const imageUploadPromises = newImages.map(image => {
          const imageFormData = new FormData();
          imageFormData.append("id", productId);
          imageFormData.append("file", image.file); // Changed from "file" to "image" to match typical API expectations
          return uploadImageProduct(imageFormData);
        });

        await Promise.all(imageUploadPromises);
      }

      // 3. Update products list in context
      setProductsState(prev => ({
        ...prev,
        data: [productResponse.data, ...prev.data]
      }));

      toast.success("Product created successfully!", { duration: 2500 });
      navigate("/admin/product-management");
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error(error.message || "Failed to create product", { duration: 2500 });
    } finally {
      setIsSubmitting(false);
    }
  }


  return (
    <div className="m-3 sm:m-5">

      <Toaster
        toastOptions={{
          style: {
            maxWidth: '600px'
          }
        }}
      />

      <div className="row-span-3 col-span-2">
        <form onSubmit={handleSubmit}>
          <div className="p-10 bg-base-100 card shadow-md">

            <div className="flex justify-between">
              <p className="text-4xl font-bold">Create New Product</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  className="btn max-[640px]:px-10 max-[640px]:btn-sm btn-neutral px-10"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "CREATE"
                  )}
                </button>
                <button
                  className="btn max-[640px]:px-10 max-[640px]:btn-sm btn-neutral px-10"
                  onClick={() => navigate("/admin/product-management")}
                  type="button"
                  disabled={isSubmitting}
                >
                  CANCEL
                </button>
              </div>
            </div>

            <div className="divider" />

            {/* Basic Product Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-5">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Product Name*</span>
                </label>
                <input
                  className="input input-bordered w-full"
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  required
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Price (IDR)*</span>
                </label>
                <input
                  className="input input-bordered w-full"
                  type="number"
                  name="price"
                  placeholder="Price"
                  min="0"
                  required
                />
              </div>
              <div className="form-control w-full col-span-2">
                <label className="label">
                  <span className="label-text">Description*</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  name="description"
                  placeholder="Product description"
                  rows={3}
                  required
                />
              </div>
              <div className="form-control w-full col-span-2">
                <label className="label">
                  <span className="label-text">Notes</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  name="notes"
                  placeholder="Additional notes"
                  rows={3}
                />
              </div>
            </div>

            <div className="divider" />

            {/* Image Form Builder */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">Product Images</h3>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text mr-2">Add Images*</span>
                    <input
                      type="file"
                      className="file-input file-input-bordered file-input-sm"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      required={newImages.length === 0}
                    />
                  </label>
                </div>
              </div>

              {/* New Images Preview */}
              {newImages.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {newImages.map((image, index) => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.image_url}
                        alt="New product"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                        <div className="flex justify-end">
                          <button
                            type="button"
                            className="btn btn-circle btn-error btn-xs"
                            onClick={() => removeImage(image.id)}
                          >
                            ×
                          </button>
                        </div>
                        <div className="flex justify-center gap-1">
                          <button
                            type="button"
                            className="btn btn-circle btn-xs"
                            disabled={index === 0}
                            onClick={() => moveImageUp(index)}
                          >
                            ↑
                          </button>
                          <button
                            type="button"
                            className="btn btn-circle btn-xs"
                            disabled={index === newImages.length - 1}
                            onClick={() => moveImageDown(index)}
                          >
                            ↓
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="alert alert-info">
                  <div role="alert" className="alert alert-info">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-6 w-6 shrink-0 stroke-current">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>No images added yet. Please upload at least one image.</span>
                  </div>
                </div>
              )}
            </div>

            <div className="divider" />

            {/* Package Details Builder */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">Package Details</h3>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={addNewGroup}
                >
                  Add New Group
                </button>
              </div>

              {detailGroups.map((group, groupIndex) => (
                <div key={groupIndex} className="mb-6 p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-xs font-bold text-lg"
                      value={group.group_name}
                      onChange={(e) => handleGroupChange(groupIndex, "group_name", e.target.value)}
                      placeholder="Group name"
                    />
                    <button
                      type="button"
                      className="btn btn-error btn-sm"
                      onClick={() => removeGroup(groupIndex)}
                      disabled={detailGroups.length <= 1}
                    >
                      Remove Group
                    </button>
                  </div>

                  <div className="space-y-2">
                    {group.detail_items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center gap-2">
                        <input
                          type="text"
                          className="input input-bordered flex-1"
                          value={item.description}
                          onChange={(e) => handleItemChange(groupIndex, itemIndex, e.target.value)}
                          placeholder="Item description"
                        />
                        <button
                          type="button"
                          className="btn btn-error btn-sm"
                          onClick={() => removeItem(groupIndex, itemIndex)}
                          disabled={group.detail_items.length <= 1}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="btn btn-sm mt-3"
                    onClick={() => addNewItem(groupIndex)}
                  >
                    + Add Item
                  </button>
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProductManagementPage;