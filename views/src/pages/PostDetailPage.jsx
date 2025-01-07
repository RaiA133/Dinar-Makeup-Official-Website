import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useContext } from "react";
import { PostContext } from '../contexts/PostContext';
import PostProfilePreview from "../components/PostPage/PostProfilePreview";
import Partner from "../components/Partner";
import { createUserChat } from "../modules/fetch";
import { ChatContext } from "../contexts/ChatContext";
import toast, { Toaster } from 'react-hot-toast';

function PostDetailPage() {
  const location = useLocation()
  const navigate = useNavigate();
  const { slug } = useParams(); // Mendapatkan SLUG dari URL
  const { postState, post_img_link, set_post_img_link } = useContext(PostContext);
  const selectedPost = Array.isArray(postState) ? postState.find((post) => post.slug === slug) : null;
  const { user, userChats, updateCurrentChat } = useContext(ChatContext)

  const findDataWithMembers = (data, user1, user2) => {
    return data?.filter(item => {
      return (
        item.members.includes(user1) && item.members.includes(user2) ||
        item.members.includes(user2) && item.members.includes(user1)
      );
    });
  };
  const resultData = findDataWithMembers(userChats, user?.unique_id, selectedPost?.user?.unique_id);

  if (!selectedPost) {
    return <div className="flex justify-center items-center h-64">Postingan tidak ditemukan.</div>;
  }

  if (selectedPost.post_img) {
    const link = `${import.meta.env.VITE_BACKEND_BASEURL}/post/picture/` + selectedPost.post_img
    set_post_img_link(link)
  }
  else {
    const link = import.meta.env.VITE_POST_PIC_DEFAULT
    set_post_img_link(link)
  }

  async function directMessage(e) {
    e.preventDefault();
    const friend = false
    try {
      const response = await createUserChat(user?.unique_id, selectedPost?.user?.unique_id, friend);
      if (response.status[1] === "Success") {
        window.localStorage.setItem("chatCreated", `${selectedPost?.user?.username}`)
        navigate("/chat")
      } else {
        console.error("Gagal direct message");
      }
      updateCurrentChat(resultData[0])
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>

      <div className="grid grid-cols-1 lg:grid-cols-3 mb-16 mt-6 mx-5 card shadow-md bg-base-200">

        <div className="col-span-2 p-10 pt-8 bg-base-100 lg:sticky top-0">
          <div className="flex justify-between">
            <h3 className="text-2xl font-extrabold text-base-900 sm:text-3xl" id="title">{selectedPost.post_title}</h3>
            {location.pathname == `/post/${selectedPost.slug}` && <button className="btn btn-sm btn-circle btn-ghost right-2 top-2" onClick={() => navigate("/post")} >✕</button>}
          </div>
          {location.pathname !== `/post/${selectedPost.slug}` && <div>Edit Post Preview</div>}

          <p className="mt-6 text-base text-base-500">
            {selectedPost.post_desc}
          </p>

          <div className="flex gap-2 my-5">
            {selectedPost.post_category && <kbd className="kbd kbd-md w-fit text-xs">{selectedPost.post_category}</kbd>}
            {selectedPost.post_tags && <kbd className="kbd kbd-md w-fit text-xs">#{selectedPost.post_tags}</kbd>}
          </div>

          <p><span className="font-bold">Project Status: </span>On Going</p>
          <p><span className="font-bold">Worktime: </span>{selectedPost.post_worktime}</p>

          <div className="divider divider-start text-primary mt-8">Skill Needed</div>

          <div className="block md:flex justify-between">
            <div className="mb-5">

              {selectedPost.skills.map((skill, index) => (
                <li key={index} className="flex items-start md:col-span-1 mb-3">
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <p className="ml-3 text-sm text-base-700">{skill}</p>
                </li>
              ))}

            </div>
            <div className="flex justify-center md:w-2/3">
              <img src={post_img_link} className="w-[280px] md:w-fit h-fit rounded-lg shadow-2xl" onClick={() => document.getElementById('my_modal_4').showModal()} />
            </div>
          </div>

        </div>

        <div className="row-span-2 p-5 bg-base-200 px-auto">

          <div className="block md:flex lg:block h-fit">
            <div className="stats bg-primary text-secondary-content h-fit w-full lg:w-full mb-5 mr-4 lg:mr-0">
              <div className="stat w-full">
                <div className="stat-title text-base-100">Minimum Revenue</div>
                <div className="stat-value">{selectedPost.min_price}</div>
                <div className="divider mb-2 divider-secondary" />
                <div className="stat-title text-base-100">Maximum Revenue</div>
                <div className="stat-value">{selectedPost.max_price}</div>
                {selectedPost?.user?.unique_id !== user?.unique_id && (
                  <div className="stat-actions">
                      <button className="btn btn-sm mr-2" onClick={directMessage}>Chat Owner</button>
                      {/* <button className="btn btn-sm">Ambil Kerjaan</button> */}
                  </div>
                )}
              </div>
            </div>
            <div className="stats text-base-content w-full md:w-1/2 lg:w-full mx-auto lg:ms-0 mb-0">
              {/* <div className="stat w-fit"> */}
              <PostProfilePreview hisProfile={selectedPost.user} />
              {/* </div> */}
            </div>
          </div>

        </div>

        <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <img src={post_img_link} className="w-full rounded-lg shadow-2xl" />
          </div>
        </dialog>

      </div>

      <Partner />

    </div>
  );
}

export default PostDetailPage;
