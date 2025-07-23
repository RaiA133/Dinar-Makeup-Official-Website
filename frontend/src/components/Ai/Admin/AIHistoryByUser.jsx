import { useContext, useState } from "react";
import { deleteAIHistory, getAIHistory } from "../../../modules/fetch";
import { UserContext } from "../../../contexts/UserContext";
import { AdminContext } from "../../../contexts/AdminContext";
import toast from 'react-hot-toast';
import moment from "moment";
import MarkdownRenderer from "../../MarkdownRenderer";
import RefreshButton from "../../Admin/RefreshButton";

function AIHistoryByUser() {
  const [AIHistoryByUserID, setAIHistoryByUserID] = useState([])
  const { usersState, AIHistoryState, refreshCallback } = useContext(AdminContext);
  const { userState } = useContext(UserContext);

  const AllAIHistoryUserID = [...new Set(AIHistoryState?.map(item => item.user_id))]; // semua user_id yang punya history pakai AI
  const filteredUsers = usersState?.data?.filter(user => AllAIHistoryUserID.includes(user.id)); // filter dari semua user database, difilter sesuai AllAIHistoryUserID

  const checkAdminHaveAIHistory = AIHistoryState?.some(data => data.user_id === userState.id); // Cek Apakah ID di userstate ada di salah satu data AIHistoryState
  if (checkAdminHaveAIHistory) filteredUsers?.push(userState) //  jika ada, push data admin yang sedang login, karena usersState tidak get data yang sedang login

  const handleClickDetailAIHistory = async (id) => {
    try {
      const getAIHistoryByUserID = await getAIHistory({ user_id: id });
      if (getAIHistoryByUserID.status === 200) setAIHistoryByUserID(getAIHistoryByUserID.data);
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  return (
    <section className="flex justify-center">
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mb-3 w-full shadow-sm">
        <table className="table table-xs sm:table-md table-zebra max-h-[86vh] overflow-auto">
          {/* head */}
          <thead>
            <tr>
              <th>
                <RefreshButton/>
              </th>
              <th>User ID</th>
              <th>Email</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.map((user, index) => (
              <tr key={user.id || index}>
                <th className="text-center sm:text-start">{index + 1}</th>
                <td className="max-w-20 truncate whitespace-nowrap overflow-hidden">{user.id}</td>
                <td className="max-w-20 truncate whitespace-nowrap overflow-hidden">{user.email}</td>
                <td className="max-w-20 truncate whitespace-nowrap overflow-hidden">{user.name}</td>
                <td className="flex gap-2">
                  <button className="btn btn-xs btn-ghost" onClick={async () => {
                    handleClickDetailAIHistory(user.id)
                    document.getElementById(`ai_modal_by_user_id`).showModal()
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button className="btn btn-xs btn-ghost text-error" onClick={() => document.getElementById(`ai_delete_modal_by_user_id_${user.id}`).showModal()}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ai Detail Modals */}
        <dialog id={`ai_modal_by_user_id`} className="modal">
          <div className="modal-box max-w-fit">
            <h3 className="font-bold text-lg mb-4 text-primary">Details</h3>

            <div className="space-y-2">
              <h4 className="font-semibold text-accent">Information AI History</h4>
              <div className="divider m-0"></div>

              <div className="overflow-x-auto">

                <table className="table table-xs sm:table-md table-zebra">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Sender</th>
                      <th>Message</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AIHistoryByUserID?.map((ai, index) => (
                      <tr key={ai.id || index}>
                        <th className="text-center sm:text-start">{index + 1}</th>
                        <td>
                          {ai.sender === 'bot' ? (
                            <span className="badge badge-soft badge-primary badge-sm sm:badge-md">Bot</span>
                          ) : (
                            <span className="badge badge-soft badge-success badge-sm sm:badge-md">User</span>
                          )}
                        </td>
                        <td className="max-w-xs truncate whitespace-nowrap overflow-hidden">{ai.message}</td>
                        <td className="truncate">{moment(ai.timestamp).utc().format('YYYY-MM-DD HH:mm:ss')}</td>
                        <td>
                          <button className="btn btn-xs btn-ghost" onClick={() => document.getElementById(`ai_modal_by_user_id_${ai.id}`).showModal()}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* ai Detail Modals */}
                {AIHistoryState?.map((ai) => (
                  <dialog key={`detail_${ai.id}`} id={`ai_modal_by_user_id_${ai.id}`} className="modal">
                    <div className="modal-box max-w-2xl">
                      <h3 className="font-bold text-lg mb-4 text-primary">Details</h3>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-accent">Information AI History</h4>
                        <div className="divider m-0"></div>

                        <div className="overflow-x-auto">
                          <table className="table w-full">
                            <tbody>
                              <tr>
                                <th className="text-left">ID</th>
                                <td>: {ai.id}</td>
                              </tr>
                              <tr>
                                <th className="text-left">User ID</th>
                                <td>: {ai.user_id}</td>
                              </tr>
                              <tr>
                                <th className="text-left">Sender</th>
                                <td>
                                  {ai.sender === 'bot' ? (
                                    <span className="badge badge-soft badge-primary">Bot</span>
                                  ) : (
                                    <span className="badge badge-soft badge-success">User</span>
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <th className="text-left">Message</th>
                                <td><MarkdownRenderer>{ai.message}</MarkdownRenderer></td>
                              </tr>
                              <tr>
                                <th className="text-left">Date</th>
                                <td>: {moment(ai.timestamp).utc().format('YYYY-MM-DD HH:mm:ss')}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                      </div>

                      <div className="modal-action">
                        <form method="dialog">
                          <button className="btn">Close</button>
                        </form>
                      </div>

                    </div>
                  </dialog>
                ))}

              </div>

            </div>

            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>

          </div>
        </dialog>

        {/* Delete Confirmation Modals */}
        {filteredUsers?.map((user) => (
          <dialog key={`delete_${user.id}`} id={`ai_delete_modal_by_user_id_${user.id}`} className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Confirm Deletion</h3>
              <p className="py-4">Apakah anda yakin hapus semua AI History milik {user.name}?</p>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Cancel</button>
                  <button
                    className="btn btn-error ml-2"
                    onClick={async () => {
                      try {
                        const response = await deleteAIHistory({ user_id: user.id });
                        if (response.status === 200) {
                          toast.success(response.message, { duration: 2500 });
                          refreshCallback();
                        }
                      } catch (error) {
                        console.error("Error:", error);
                      }
                    }}
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        ))}

      </div>
    </section>
  )
}

export default AIHistoryByUser