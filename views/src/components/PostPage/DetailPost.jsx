import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { PostContext } from '../../contexts/PostContext';

function DeatilPost({ data }) {
  const navigate = useNavigate();
  const { post_img_link } = useContext(PostContext);

  return (
    <div>
      {data.unique_id ? (
        <>
          <div className="hero h-fit bg-base-200 py-5 px-2">
            <div className="hero-content flex-col lg:flex-row">

              <div className="ms-2">
                <div className="flex">
                  <img src={post_img_link} className="max-w-[330px] rounded-lg shadow-2xl" onClick={() => document.getElementById('my_modal_4').showModal()} />
                  <div className="col p-5">
                    <div className="flex gap-2 mb-2">
                      {data.post_category && <kbd className="kbd kbd-md w-fit text-xs">{data.post_category}</kbd>}
                      {data.post_tags && <kbd className="kbd kbd-md w-fit text-xs">#{data.post_tags}</kbd>}
                    </div>
                    <h1 className="text-4xl font-bold h-fit">{data.post_title}</h1>
                    <div className="flex mt-3">
                      <img src={`${import.meta.env.VITE_BACKEND_BASEURL}/profile/picture/${data.user.img_profile}`} alt="gambar projek" className="w-10 h-10 object-cover rounded-full" />
                      <p className="ms-3 my-auto">{data.user.username} - {data.user.job}</p>
                    </div>
                  </div>
                </div>
                <div className="divider mb-0" />
                <div className="flex">
                  <p className="py-6 w-1/2">{data.post_desc}</p>
                  <div className="p-6 text-sm">
                    <span className="font-bold">Min Revenue : </span>
                    {data.min_price} <br />
                    <span className="font-bold">Max Revenue : </span>
                    {data.max_price}
                    <p><span className="font-bold">Project Status: </span>On Going</p>
                    <p><span className="font-bold">Worktime: </span>{data.post_worktime}</p>
                    <button onClick={() => navigate(`/post/${data.slug}`)} className="btn btn-primary mt-5">
                      More Detail
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 font-light">Posted : {data.createdAt}</div>

        </>
      ) : (
        <div className="flex justify-center items-center h-64">
          Anda Belum Memilih Pekerjaan
        </div>
      )}

      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <img src={post_img_link} className="w-full rounded-lg shadow-2xl" />
        </div>
      </dialog>

    </div>
  );
}

export default DeatilPost;