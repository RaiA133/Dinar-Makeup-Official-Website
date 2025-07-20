import { useContext, useState } from "react";
import { AdminContext } from "../../../contexts/AdminContext";
import toast from 'react-hot-toast';
import moment from "moment";
import { deleteAIHistory } from "../../../modules/fetch";

function AIHistoryAll() {
  const { AIHistoryState, refreshCallback } = useContext(AdminContext);
  const confirmDeleteTextKey = "Saya yakin hapus semua AI History user";
  const [inputDeleteAllData, setInputDeleteAllData] = useState('');

  return (
    <section className="flex justify-center">

      <button className="btn btn-error btn-sm absolute top-4 right-3 sm:right-5" onClick={() => document.getElementById(`ai_delete_modal_all`).showModal()}>Hapus Semua Data</button>

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mb-3 w-full shadow-sm">
        <table className="table table-xs sm:table-md table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>user_id</th>
              <th>Sender</th>
              <th>Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {AIHistoryState?.map((ai, index) => (
              <tr key={ai.id || index}>
                <th>{index + 1}</th>
                <td className="max-w-20 truncate whitespace-nowrap overflow-hidden">{ai.user_id}</td>
                <td>
                  {ai.sender === 'bot' ? (
                    <span className="badge badge-soft badge-primary badge-sm sm:badge-md">Bot</span>
                  ) : (
                    <span className="badge badge-soft badge-success badge-sm sm:badge-md">User</span>
                  )}
                </td>
                <td className="max-w-xs truncate whitespace-nowrap overflow-hidden">{ai.message}</td>
                <td className="truncate">{moment(ai.timestamp).utc().format('YYYY-MM-DD HH:mm:ss')}</td>
                <td className="flex gap-2">
                  <button className="btn btn-xs btn-ghost" onClick={() => document.getElementById(`ai_modal_all_${ai.id}`).showModal()}>
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
          <dialog key={`detail_${ai.id}`} id={`ai_modal_all_${ai.id}`} className="modal">
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
                        <td>: {ai.message}</td>
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

        {/* Delete ALL Confirmation Modals */}
        <dialog id={`ai_delete_modal_all`} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Deletion</h3>
            <p className="py-4">Apakah anda yakin untuk delete semua file?</p>
            <fieldset className="fieldset">
              <legend>Ketik "<span className="font-bold">{confirmDeleteTextKey}</span>"" jika anda yakin</legend>
              <input type="text" className="input w-full" placeholder="Type here" 
                onChange={(e) => setInputDeleteAllData(e.target.value)}
              />
            </fieldset>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Cancel</button>
                <button
                  disabled={inputDeleteAllData == confirmDeleteTextKey ? false : true}
                  className="btn btn-error ml-2"
                  onClick={async () => {
                    try {
                      const response = await deleteAIHistory();
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

      </div>
    </section>
  )
}

export default AIHistoryAll