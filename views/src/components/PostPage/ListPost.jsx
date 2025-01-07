import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { PostContext } from "../../contexts/PostContext";
import { getPostDetailBySlug } from "../../modules/fetch";

function ListPost({ post, id }) {
  const navigate = useNavigate();
  const { postState, set_post_img_link, setPostDetailState } = useContext(PostContext);

  // getPostDetailBySlug
  async function handleDetailPost(slug) {
    const response = await getPostDetailBySlug(slug); // Fetch data
    if (response.status[1] === "Success") {
      setPostDetailState(response.data); // Set state if the response is successful
    }
    const selectedPost = Array.isArray(postState) ? postState.find((post) => post.slug === slug) : null;
    if (selectedPost.post_img) {
      const link = `${import.meta.env.VITE_BACKEND_BASEURL}/post/picture/` + selectedPost.post_img
      set_post_img_link(link)
    }
    else {
      const link = import.meta.env.VITE_POST_PIC_DEFAULT
      set_post_img_link(link)
    }
  }
  
  return (
    <div className="bg-base-100 card shadow-md p-10">
      <h2 className="text-xl font-bold mb-2">{post.post_title}</h2>
      <div className="flex items-center mb-2">
        <img src={`${import.meta.env.VITE_BACKEND_BASEURL}/profile/picture/${post.user.img_profile}`} alt="gambar projek" className="w-10 h-10 object-cover rounded-full" />
        <p className="ms-3">{post.user.username || "username"}</p>
      </div>
      <p className="text-sm max-h-20 overflow-hidden">{post.post_desc}</p>
      <div className="divider" />
      <div className="flex gap-2">
        {post.post_category && <kbd className="kbd kbd-md w-fit text-xs">{post.post_category}</kbd> }
        {post.post_tags && <kbd className="kbd kbd-md w-fit text-xs">#{post.post_tags}</kbd> }
      </div>
      <div className="text-sm mt-3">
        <span>Max Revenue :</span>
        {post.max_price}
        <p>Project Status: On Going</p>
        <p>Worktime: {post.post_worktime}</p>
      </div>
      <div className="mt-4">
        <button onClick={() => navigate(`/post/${post.slug}`)} className="btn btn-neutral btn-sm lg:hidden">
          View Detail
        </button>
        <button onClick={() => handleDetailPost(post.slug)} className="btn btn-neutral btn-sm hidden lg:block">
          View Detail
        </button>
      </div>
      <div className="text-sm mt-5 font-light">
        {post.createdAt}
      </div>
    </div>
  )
}

export default ListPost