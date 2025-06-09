import { useContext } from "react";
import { AdminContext } from "../../contexts/AdminContext";
import { deleteUserByID, getAllUsers } from "../../modules/fetch";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

function UserManagementPage() {
  let location = useLocation();
  const navigate = useNavigate();
  const { usersState, setUsersState, refreshCallback } = useContext(AdminContext);

  const totalPages = usersState?.metadata?.total_pages || 0;
  const currentPage = usersState?.metadata?.current_page || 1;

  return (
    <div className="h-screen m-3 sm:m-5">
      <div className="my-3">

        <Toaster
          toastOptions={{
            style: {
              maxWidth: '600px'
            }
          }}
        />

        <div className="flex justify-center">
          <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mb-3 w-full shadow-sm">
            <table className="table table-xs sm:table-md table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {usersState?.data?.map((user, index) => (
                  <tr key={user.id || index}>
                    <th>{index + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td className="flex gap-2">
                      <button className="btn btn-xs btn-ghost" onClick={() => document.getElementById(`users_modal_${user.id}`).showModal()}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="btn btn-xs btn-ghost text-error" onClick={() => document.getElementById(`users_delete_modal_${user.id}`).showModal()}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Users Detail Modals */}
            {usersState?.data?.map((user) => (
              <dialog key={`detail_${user.id}`} id={`users_modal_${user.id}`} className="modal">
                <div className="modal-box max-w-2xl">
                  <h3 className="font-bold text-lg mb-4 text-primary">User Details</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-accent">Information</h4>
                      <div className="divider m-0"></div>
                      <p><span className="font-medium">User ID:</span> {user.id}</p>
                      <p><span className="font-medium">Username:</span> {user.username}</p>
                      <p><span className="font-medium">Age:</span> {user.age || "-"}</p>
                      <p><span className="font-medium">Address:</span> {user.address || "-"}</p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-accent">Contact</h4>
                      <div className="divider m-0"></div>
                      <p><span className="font-medium">Email:</span> {user.email || "-"}</p>
                      <p><span className="font-medium">Phone Number:</span> {user.phone_number || "-"}</p>
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

            {/* Delete Confirmation Modals */}
            {usersState?.data?.map((user) => (
              <dialog key={`delete_${user.id}`} id={`users_delete_modal_${user.id}`} className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Confirm Deletion</h3>
                  <p className="py-4">Are you sure you want to delete user {user.email}?</p>
                  <div className="modal-action">
                    <form method="dialog">
                      <button className="btn">Cancel</button>
                      <button
                        className="btn btn-error ml-2"
                        onClick={async () => {
                          try {
                            const response = await deleteUserByID(user.id);
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
        </div>

        <div className="w-full text-center text-sm stat-desc mb-3">1-10 item Show of 100</div>

        <div className="flex justify-center">
          <div className="join shadow-sm">
            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              return (
                <input
                  key={i}
                  className="join-item btn btn-sm sm:btn-md btn-square"
                  type="radio"
                  name="options"
                  aria-label={pageNum.toString()}
                  checked={pageNum === currentPage}
                  onChange={() => navigate(`/admin/user-management?page=${pageNum}`)}
                />
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}

export default UserManagementPage;