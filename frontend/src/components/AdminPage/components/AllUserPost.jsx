import { useContext, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { PostContext } from "../../../contexts/PostContext";
import { delYourPostinganById } from "../../../modules/fetch";

function AllUserPost() {
  const navigate = useNavigate()
  const { userPostByUniqueId } = useContext(PostContext);

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // jumlah baris per 1 halaman pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(userPostByUniqueId || '')
    ? userPostByUniqueId
      .slice(indexOfFirstItem, indexOfLastItem)
    : [];

  return (
    <div className="px-6 py-1 bg-base-100 mt-5 overflow-auto w-full" id='asd'>

      <div>
        <h3 className="text-lg leading-6 font-medium text-base-900 flex justify-between items-center">
          <span>Postingan User</span>
        </h3>
        <p className="mt-3 max-w-2xl text-sm text-base-500">
          This is all this user posted.
        </p>
      </div>

      <div className="divider" />
      <div className="overflow-x-auto table-container sm:w-[500px] md:w-full">
        {userPostByUniqueId && userPostByUniqueId.length > 0 ? (
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name | Category & Tags</th>
                <th>Job & revenue</th>
                <th>Created At</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {currentItems.map((post, id) => (
                <tr key={id}>
                  <th>
                    {id + 1}
                  </th>
                  <td>
                    <div className="flex items-center gap-3 w-60">
                      <div className="truncate overflow-hidden ...">
                        <div className="font-bold truncate" title={post.post_title}>{post.post_title}</div>
                        <span className="badge badge-warning badge-sm w-full lg:w-fit h-fit truncate" title={post.post_category}>{post.post_category}</span>
                        <span className="badge badge-sencodary badge-sm w-full lg:w-fit h-fit truncate" title={'#' + post.post_tags}>#{post.post_tags}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="w-64 truncate overflow-hidden ..." title={post.post_desc}>
                      {post.post_desc}
                    </p>
                    <span className="badge badge-ghost badge-sm h-fit text-center px-5" title={post.min_price + ' - ' + post.max_price} >{post.min_price} - {post.max_price}</span>
                  </td>
                  <td className="truncate" title={post.createdAt}>{post.createdAt}</td>
                  <th className="truncate">
                    <button className="btn btn-ghost btn-xs me-2" onClick={() => {
                      navigate(`/post/${post.slug}`)
                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                      });
                    }}>details</button>
                    <button className="btn btn-error btn-xs text-base-100" onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('my_modal_delete_post').showModal()
                    }}
                    >delete</button>
                    <dialog id="my_modal_delete_post" className="modal">
                      <div className="modal-box w-fit">
                        <h3 className="font-bold text-lg text-center">Delete a post</h3>
                        <p className="pt-4 text-center">Are you sure ?</p>
                        <div className="modal-action flex justify-between gap-20">
                          <button className="btn btn-error w-20"
                            onClick={async (e) => {
                              e.preventDefault();
                              const hapus_post = await delYourPostinganById(post.id);
                              console.log(hapus_post)
                              if (hapus_post.status[1] === "Success") {
                                const toastMessage = hapus_post.message;
                                window.localStorage.setItem('toastMessage', toastMessage);
                                window.location.reload();
                                setTimeout(() => {
                                  localStorage.removeItem('toastMessage');
                                }, 100);
                              }
                            }}>Yes</button>
                          <form method="dialog">
                            <button className="btn w-20">Close</button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                  </th>
                </tr>
              ))}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th></th>
                <th>Name | Category & Tags</th>
                <th>Job & revenue</th>
                <th>Created At</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        ) : (
          <div className="flex justify-center items-center py-10 text-sm">User ini belum melakukan posting</div>
        )}

        <div className="join grid grid-cols-2 w-64 my-10">
          <button className="join-item btn btn-outline"
            onClick={(e) => {
              e.preventDefault()
              setCurrentPage(currentPage - 1)
            }}
            disabled={currentPage === 1}
          >
            Previous page
          </button>
          <button className="join-item btn btn-outline" onClick={(e) => {
            e.preventDefault()
            setCurrentPage(currentPage + 1)
          }}
            disabled={currentItems.length < itemsPerPage}>
            Next
          </button>
        </div>

      </div>
    </div>
  )
}

export default AllUserPost