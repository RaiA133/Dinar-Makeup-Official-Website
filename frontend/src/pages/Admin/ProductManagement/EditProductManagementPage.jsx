import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";
import { ProductsContext } from "../../../contexts/ProductsContext";
import { getProductByID } from "../../../modules/fetch";

function EditProductManagementPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userState } = useContext(UserContext);
  const { id } = useParams();
  const { productsState, productsByIDState, setProductsByIDState } = useContext(ProductsContext);
  const [detailGroups, setDetailGroups] = useState([]);
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    const fetchProductByID = async () => {
      try {
        const response = await getProductByID(id);
        setProductsByIDState(response.data);
        setDetailGroups(response.data.detail_groups || []);
        setImages(response.data.images || []);
      } catch (err) {
        console.log(err);
      }
    };
    if (location.pathname === `/admin/product-management/edit/${id}`) {
      fetchProductByID();
    }
  }, [id, location.pathname, navigate, setProductsByIDState]);


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
        id: `temp-${Date.now()}`,
        group_name: "New Group",
        detail_items: [{ id: `temp-item-${Date.now()}`, description: "" }]
      }
    ]);
  };

  const addNewItem = (groupIndex) => {
    const updatedGroups = [...detailGroups];
    updatedGroups[groupIndex].detail_items.push({
      id: `temp-item-${Date.now()}`,
      description: ""
    });
    setDetailGroups(updatedGroups);
  };

  const removeGroup = (groupIndex) => {
    const updatedGroups = [...detailGroups];
    updatedGroups.splice(groupIndex, 1);
    setDetailGroups(updatedGroups);
  };

  const removeItem = (groupIndex, itemIndex) => {
    const updatedGroups = [...detailGroups];
    updatedGroups[groupIndex].detail_items.splice(itemIndex, 1);
    setDetailGroups(updatedGroups);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImagePreviews = files.map(file => ({
      id: `temp-${Date.now()}-${file.name}`,
      image_url: URL.createObjectURL(file),
      file // Store the actual file object
    }));
    setNewImages([...newImages, ...newImagePreviews]);
  };

  const removeImage = (imageId, isNew) => {
    if (isNew) {
      setNewImages(newImages.filter(img => img.id !== imageId));
    } else {
      setImages(images.filter(img => img.id !== imageId));
    }
  };

  const moveImageUp = (index, isNew) => {
    if (isNew) {
      if (index > 0) {
        const updatedImages = [...newImages];
        [updatedImages[index], updatedImages[index - 1]] =
          [updatedImages[index - 1], updatedImages[index]];
        setNewImages(updatedImages);
      }
    } else {
      if (index > 0) {
        const updatedImages = [...images];
        [updatedImages[index], updatedImages[index - 1]] =
          [updatedImages[index - 1], updatedImages[index]];
        setImages(updatedImages);
      }
    }
  };

  const moveImageDown = (index, isNew) => {
    if (isNew) {
      if (index < newImages.length - 1) {
        const updatedImages = [...newImages];
        [updatedImages[index], updatedImages[index + 1]] =
          [updatedImages[index + 1], updatedImages[index]];
        setNewImages(updatedImages);
      }
    } else {
      if (index < images.length - 1) {
        const updatedImages = [...images];
        [updatedImages[index], updatedImages[index + 1]] =
          [updatedImages[index + 1], updatedImages[index]];
        setImages(updatedImages);
      }
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Create a FormData object for the API call
    const apiFormData = new FormData();
    apiFormData.append("name", formData.get("name"));
    apiFormData.append("price", formData.get("price"));
    apiFormData.append("description", formData.get("description"));
    apiFormData.append("notes", formData.get("notes"));
    apiFormData.append("detail_groups", JSON.stringify(detailGroups));

    // Append existing images that haven't been deleted
    images.forEach(img => {
      apiFormData.append("existing_images[]", img.id);
    });

    // Append new image files
    newImages.forEach(img => {
      apiFormData.append("images", img.file);
    });

    try {
      const response = await updateProduct(id, apiFormData); // Make sure your API accepts FormData
      if (response.status === 200) {
        toast.success(response.message, { duration: 2500 });
        // Optionally refresh the data
        const updatedResponse = await getProductByID(id);
        setProductsByIDState(updatedResponse.data);
        setImages(updatedResponse.data.images || []);
        setNewImages([]);
      }
    } catch (error) {
      toast.error(error.message || "Failed to update product", { duration: 2500 });
    }
  }

  return (
    <div className="m-3 sm:m-5">
      <div className="row-span-3 col-span-2">
        <form onSubmit={handleSubmit}>
          <div className="p-10 bg-base-100 card shadow-md">
            <div className="flex justify-between">
              <p className="text-4xl font-bold">Edit Product</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button className="btn max-[640px]:px-10 max-[640px]:btn-sm btn-neutral px-10" type="submit">
                  SAVE
                </button>
                <button
                  className="btn max-[640px]:px-10 max-[640px]:btn-sm btn-neutral px-10"
                  onClick={() => navigate("..", { relative: "path" })}
                  type="button"
                >
                  CANCEL
                </button>
              </div>
            </div>

            <div className="divider" />

            {/* Data Product Edit */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-5">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Product Name</span>
                </label>
                <input
                  className="input input-bordered w-full"
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  defaultValue={productsByIDState?.name || ""}
                  required
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Price (IDR)</span>
                </label>
                <input
                  className="input input-bordered w-full"
                  type="number"
                  name="price"
                  placeholder="Price"
                  defaultValue={productsByIDState?.price || ""}
                  required
                />
              </div>
              <div className="form-control w-full col-span-2">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  name="description"
                  placeholder="Product description"
                  defaultValue={productsByIDState?.description || ""}
                  rows={3}
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
                  defaultValue={productsByIDState?.notes || ""}
                  rows={3}
                />
              </div>
            </div>

            <div className="divider"></div>

            {/* Image Form Builder */}
            <div className="">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">Product Images</h3>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text mr-2">Add Images</span>
                    <input
                      type="file"
                      className="file-input file-input-bordered file-input-sm"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              </div>

              {/* Current Images */}
              {images.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3">Current Images</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                      <div key={image.id} className="relative group">
                        <img
                          src={image.image_url}
                          alt="Product"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                          <div className="flex justify-end">
                            <button
                              type="button"
                              className="btn btn-circle btn-error btn-xs"
                              onClick={() => removeImage(image.id, false)}
                            >
                              ×
                            </button>
                          </div>
                          <div className="flex justify-center gap-1">
                            <button
                              type="button"
                              className="btn btn-circle btn-xs"
                              disabled={index === 0}
                              onClick={() => moveImageUp(index, false)}
                            >
                              ↑
                            </button>
                            <button
                              type="button"
                              className="btn btn-circle btn-xs"
                              disabled={index === images.length - 1}
                              onClick={() => moveImageDown(index, false)}
                            >
                              ↓
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Images */}
              {newImages.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3">New Images</h4>
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
                              onClick={() => removeImage(image.id, true)}
                            >
                              ×
                            </button>
                          </div>
                          <div className="flex justify-center gap-1">
                            <button
                              type="button"
                              className="btn btn-circle btn-xs"
                              disabled={index === 0}
                              onClick={() => moveImageUp(index, true)}
                            >
                              ↑
                            </button>
                            <button
                              type="button"
                              className="btn btn-circle btn-xs"
                              disabled={index === newImages.length - 1}
                              onClick={() => moveImageDown(index, true)}
                            >
                              ↓
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {images.length === 0 && newImages.length === 0 && (
                <div className="alert alert-info">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>No images added yet. Upload some images to display them here.</span>
                  </div>
                </div>
              )}
            </div>

            <div className="divider"></div>

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
                <div key={group.id} className="mb-6 p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-xs font-bold text-lg"
                      value={group.group_name}
                      onChange={(e) => handleGroupChange(groupIndex, "group_name", e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-error btn-sm"
                      onClick={() => removeGroup(groupIndex)}
                    >
                      Remove Group
                    </button>
                  </div>

                  <div className="space-y-2">
                    {group.detail_items.map((item, itemIndex) => (
                      <div key={item.id} className="flex items-center gap-2">
                        <input
                          type="text"
                          className="input input-bordered flex-1"
                          value={item.description}
                          onChange={(e) => handleItemChange(groupIndex, itemIndex, e.target.value)}
                        />
                        <button
                          type="button"
                          className="btn btn-error btn-sm"
                          onClick={() => removeItem(groupIndex, itemIndex)}
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

export default EditProductManagementPage;