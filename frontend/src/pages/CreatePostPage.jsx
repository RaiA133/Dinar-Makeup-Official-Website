import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { createPost } from "../modules/fetch";
import Partner from "../components/Partner";
import { useEffect, useState, useContext } from "react";
import ProfilePreview from "../components/ProfilePreview";
import { PostContext } from "../contexts/PostContext";
import DynamicInput from "../components/DynamicInput";
import { NumericFormat } from "react-number-format";

function CreatePostPage({ PostForm }) {
  const navigate = useNavigate();
  const [GetOutputArray, setGetOutputArray] = useState([]);
  const { postState, categoryTags } = useContext(PostContext);
  const [selectedImage, setSelectedImage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!selectedImage) {
      const successMessage = "File Gambar Wajib Dimasukan";
      toast.error(
        <>
          <span className="leading-normal">{successMessage}</span>
        </>,
        { duration: 2500 }
      );
      return;
    }
    const formData = new FormData(e.target);
    formData.append("skills", GetOutputArray);
    // const formDataObject = Object.fromEntries(formData);
    // console.log('formDataObject', formDataObject);
    // return
    try {
      const response = await createPost(formData);
      setSelectedImage("");
      if (response.status[0] === 201) {
        const successMessage = response.message;
        const newPostSlug = response.data.slug;
        toast.success(
          <>
            {postState.length > 0 && (
              <div>
                <span className="leading-normal">{successMessage}</span>
                <button
                  className="ms-4 btn btn-xs my-0"
                  onClick={() => navigate(`/post/${newPostSlug}`)} // Menggunakan ID postingan baru di sini
                >
                  Lihat
                </button>
              </div>
            )}
          </>,
          { duration: 2500 }
        );
        e.target.reset(); // reset form ketika berhasil
      }
    } catch (error) {
      let failedMessage = error.message;
      console.log(error);
      console.error(failedMessage);
      toast.error(failedMessage, {
        duration: 2500,
      });
    }
  }

  useEffect(() => {
    if (PostForm?.image) {
      setSelectedImage(`http://localhost:8000/${PostForm?.image}`);
    }
  }, [PostForm]);

  const [currency, setCurrency] = useState('Rp'); // merubah RP/$ dari select
  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const categories = categoryTags.categories
  const tags = categoryTags.tags

  return (
    <>
      <div className="p-5">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">

            <Toaster
              toastOptions={{
                style: {
                  maxWidth: "600px",
                },
              }}
            />

            <div className="col-span-2 p-10 bg-base-100 card shadow-md">
              <div className="flex justify-between">
                <p className="text-4xl font-bold">Tambah Postingan</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button className="btn max-[640px]:px-10 max-[640px]:btn-sm btn-neutral px-10" type="submit">
                    SIMPAN
                  </button>
                  <button className="btn max-[640px]:px-10 max-[640px]:btn-sm btn-neutral px-10" onClick={() => navigate("..", { relative: "path" })}>
                    BATAL
                  </button>
                </div>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Title Post</span>
                </label>
                <input className="input input-bordered w-full" type="text" name="post_title" placeholder="Title of your post / your demand" required />
              </div>

              <div className="form-control w-full"></div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea className="textarea textarea-bordered h-60" type="text" name="post_desc" placeholder="Description" required />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Category</span>
                  </label>
                  <select className="select select-bordered w-full" name="post_category" required defaultValue="">
                    <option value="" disabled hidden>
                      Post Category
                    </option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Tags</span>
                  </label>
                  <select className="select select-bordered w-full" name="post_tags" required defaultValue="">
                    <option value="" disabled hidden>
                      Post Tags
                    </option>
                    {tags.map((tag, index) => (
                      <option key={index} value={tag}>
                        {tag}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Price Range</span>
                </label>
                <div className="flex items-center w-full">

                  <div className="block sm:flex w-full">
                    <div className="flex items-center w-full">
                      <select
                        className="select select-bordered w-fit mr-2"
                        value={currency}
                        onChange={handleCurrencyChange}
                      >
                        <option value="Rp">Rp</option>
                        <option value="$">$</option>
                      </select>
                      <NumericFormat
                        className="input input-bordered w-full"
                        autoComplete="off"
                        value={0}
                        name="min_price"
                        prefix={currency + ' '}
                        thousandSeparator="."
                        decimalSeparator=","
                        required
                      />
                    </div>
                    <div className="text-2xl font-bold mx-3 text-center sm:mt-2">-</div>
                    <NumericFormat
                      className="input input-bordered w-full"
                      autoComplete="off"
                      value={0}
                      name="max_price"
                      prefix={currency + ' '}
                      thousandSeparator="."
                      decimalSeparator=","
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Worktime</span>
                  </label>
                  <div className="flex justify-center">
                    <input className="input input-bordered w-full me-2" type="number" name="post_worktime" placeholder="00" required />
                    <select className="select select-bordered join-item" name="post_worktime_time" defaultValue="">
                      <option value="Day">Day</option>
                      <option value="Week">Week</option>
                      <option value="Month">Month</option>
                    </select>
                  </div>
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Picture</span>
                  </label>
                  <div className="flex items-center">
                    <input
                      className="file-input file-input-bordered w-full"
                      type="file"
                      name="file"
                      placeholder="Upload Image"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setSelectedImage(URL.createObjectURL(file));
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="form-control w-full">
                <DynamicInput setGetOutputArray={setGetOutputArray} />
              </div>

            </div>

            <ProfilePreview />

          </div>

          <Partner />

        </form>
      </div>
    </>
  );
}

export default CreatePostPage;
