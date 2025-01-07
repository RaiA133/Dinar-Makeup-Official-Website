import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Partner from "../components/Partner";
import { useEffect, useState, useContext } from "react";
import { PostContext } from "../contexts/PostContext";
import DynamicInput from "../components/DynamicInput";
import { NumericFormat } from "react-number-format";
import { getPostDetailBySlug, updatePostBySlug } from "../modules/fetch";
import PostDetailPage from "./PostDetailPage";

function EditPostPage({ PostForm }) {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { postState, categoryTags, postDetailState, setPostDetailState, set_post_img_link } = useContext(PostContext);
  const [GetOutputArray, setGetOutputArray] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // getPostDetailBySlug
  useEffect(() => {
    const handleDetailPost = async (slug) => {
      try {
        const response = await getPostDetailBySlug(slug);
        if (response.status[1] === "Success") { setPostDetailState(response.data) }
        const selectedPost = Array.isArray(postState) ? postState.find((post) => post.slug === slug) : null;
        if (selectedPost.post_img) {
          const link = `${import.meta.env.VITE_BACKEND_BASEURL}/post/picture/` + selectedPost.post_img;
          set_post_img_link(link);
        } else {
          const link = import.meta.env.VITE_POST_PIC_DEFAULT;
          set_post_img_link(link);
        }
      } catch (error) {
        // Handle errors
      } finally { setIsLoading(false) }
    }
    handleDetailPost(slug);
  }, [slug]);

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
    try {
      const response = await updatePostBySlug(formData, slug);
      setSelectedImage("");
      if (response.status[1] === "Success") {
        const successMessage = response.message;
        window.localStorage.setItem('toastMessage', successMessage);
        navigate('/profile')
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

  if (isLoading) { // loadoing animasi untuk mengatasi asycnchrounous handleDetailPost
    return (
      // loading animation
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  console.log('postDetailState : ', postDetailState)

  return (
    <>
      <div className="p-5">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="grid grid-cols-1 gap-6 mb-16">

            <Toaster
              toastOptions={{
                style: {
                  maxWidth: "600px",
                },
              }}
            />

            <div className="col-span-2 p-10 bg-base-100 card shadow-md">
              <div className="flex justify-between">
                <p className="text-4xl font-bold">Edit Postingan</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button className="btn max-[640px]:px-10 max-[640px]:btn-sm btn-neutral px-10" type="submit">
                    SIMPAN
                  </button>
                  <button className="btn max-[640px]:px-10 max-[640px]:btn-sm btn-neutral px-10" onClick={() => navigate("/profile")}>
                    BATAL
                  </button>
                </div>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Title Post</span>
                </label>
                <input 
                  className="input input-bordered w-full" 
                  type="text" 
                  name="post_title" 
                  placeholder="Title of your post / your demand" 
                  defaultValue={postDetailState.post_title} 
                  required 
                />
              </div>

              <div className="form-control w-full"></div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea 
                  className="textarea textarea-bordered h-60" 
                  type="text" 
                  name="post_desc" 
                  placeholder="Description"
                  defaultValue={postDetailState.post_desc}
                  required 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Category</span>
                  </label>
                  <select className="select select-bordered w-full" name="post_category" required defaultValue={postDetailState.post_category}>
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
                  <select className="select select-bordered w-full" name="post_tags" required defaultValue={postDetailState.post_tags}>
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
                        value={postDetailState.min_price}
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
                      value={postDetailState.max_price}
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
                    <input className="input input-bordered w-full me-2" type="number" name="post_worktime" placeholder="00" defaultValue={parseInt(postDetailState.post_worktime.split(/\D/)[0], 10)} required />
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
                <DynamicInput setGetOutputArray={setGetOutputArray} dataDefault={postDetailState.skills} />
              </div>

            </div>

            <PostDetailPage />

          </div>

          <Partner />

        </form>
      </div>
    </>
  );
}

export default EditPostPage;
