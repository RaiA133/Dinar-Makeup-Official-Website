import { useContext } from "react";
import { AdminContext } from "../../contexts/AdminContext";
import { deleteUserByID, getAllUsers } from "../../modules/fetch";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

function UserManagementPage() {
  let location = useLocation();
  const navigate = useNavigate();
  const { usersState, setUsersState, refreshCallback } = useContext(AdminContext)

  const totalPages = usersState?.metadata?.total_pages || 0;
  const currentPage = usersState?.metadata?.current_page || 1;

  return (
    <div className="h-screen mx-1 sm:mx-3">
      <div className="my-3">

        <Toaster
          toastOptions={{
            style: {
              maxWidth: '600px'
            }
          }}
        />

        <div className="flex justify-center">
          <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mb-3 w-fit shadow-sm">
            <table className="table table-xs sm:table-md">
              {/* head */}
              <thead>
                <tr>
                  <th>No</th>
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
                      <button className="btn btn-xs" disabled>details</button>
                      <button className="btn btn-xs btn-danger" onClick={() => document.getElementById('delete_user_modal').showModal()}>delete</button>
                      <dialog id="delete_user_modal" className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                          <h3 className="font-bold text-lg">Are you sure?</h3>
                          {/* <p className="py-4">Press ESC key or click the button below to close</p> */}
                          <div className="modal-action">
                            <form method="dialog">
                              <button className="btn" onClick={async () => {
                                try {
                                  const response = await deleteUserByID(user.id);
                                  if (response.status === 200) {
                                    toast.success(response.message, {
                                      duration: 2500,
                                    });
                                    refreshCallback();
                                  }
                                } catch (error) {
                                  console.error("Error : ", error);
                                }
                              }}>Yes</button>
                              <button className="btn">Cencel</button>
                            </form>
                          </div>
                        </div>
                      </dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>



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