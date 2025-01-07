import { useContext, useState } from "react";
import { AllUserContext } from "../../components/AdminRoute";
import { getUserByUniqueId } from "../../modules/fetch";
import Detail from "./components/Detail";

function TableAllUser() {
  const { allUser, getRole, tableRole, setTableRole } = useContext(AllUserContext)
  const [detailData, setDetailData] = useState(null);
  const handleRoleChange = (e) => setTableRole(e.target.value);

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // jumlah baris per 1 halaman pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(allUser || '')
    ? allUser
      .slice(indexOfFirstItem, indexOfLastItem)
    : [];

  async function handleDetail(unique_id) {
    const response2 = await getUserByUniqueId(unique_id)
    if (response2.status[1] === 'Success') {
      setDetailData(response2.data);
    }
  }

  let no = 1

  return (
    <>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box w-fit max-w-5xl">
          <div className="flex justify-center w-full">
            <p className="text-xl font-bold">Detail Users</p>
          </div>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <div className='divider' />
          <span className="pb-2 flex justify-start">
            <Detail data={detailData || ''} />
          </span>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <div className="flex justify-center">
        <select className="select select-bordered select-sm w-sm" onChange={(e) => {
          setCurrentPage(1); // membuat hamalan jumlah baris table yg dipisah drowpdown fit
          handleRoleChange(e);
        }}>
          <option value='2'>User</option>
          <option value='1'>Administrator</option>
        </select>
      </div>
      <div className="flex justify-center h-[31rem]">
        <div className="overflow-x-auto w-screen h-30 mt-5 h-fit">
          <table className="table w-[1000px] bg-base-100 mx-auto">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th className="text-center text-black font-black px-0">Action</th>
                <th className="text-center text-black font-black">Name, Role & Country</th>
                <th className="text-center text-black font-black">Unique_id</th>
                <th className="text-center text-black font-black">Company & Job</th>
              </tr>
            </thead>
            <tbody>

              {currentItems
                .filter(user => user.user_role_id === parseInt(tableRole) )
                .map((user) => (
                  <tr key={user.unique_id}>
                    <th className="px-7 text-center">
                      {no++}
                    </th>
                    <th className="px-0 flex justify-center">

                      <button className="btn btn-neutral btn-xs absolute mt-2" onClick={() => {
                        handleDetail(user.unique_id)
                        document.getElementById('my_modal_2').showModal()
                      }}>details</button>

                    </th>
                    <td className="ps-10">
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12 px-0">
                            <img
                              src={import.meta.env.VITE_PROFILE_DEFAULT || `${import.meta.env.VITE_BACKEND_BASEURL}/profile/picture/${user.img_profile}`}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold truncate w-24" title={user.username}>{user.username}</div>
                          <span className={`badge ${parseInt(tableRole) === 1 ? 'badge-warning' : 'badge-success text-base-100'} badge-sm`}>
                            {parseInt(tableRole) === 1 ? getRole[0].role : getRole[1].role}
                          </span>
                        </div>
                        <div className="text-sm opacity-50">{user.country}
                        </div>
                      </div>
                    </td>
                    <td className="min-w-[150px]" title={user.unique_id}>{user.unique_id}</td>
                    <td className="flex flex-col items-center">
                      <div className="text-center">
                        {user.company || '-'}
                        <br />
                        <span className="badge badge-ghost badge-sm w-[200px]">
                          {user.job || '-'}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}

            </tbody>
          </table>

        </div>
      </div>
      <div className="flex justify-center">

        <div className="join grid grid-cols-2 w-80 mt-10">
          <button className="join-item btn btn-outline" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
            Previous page
          </button>
          <button className="join-item btn btn-outline" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentItems.length < itemsPerPage}>
            Next
          </button>
        </div>

      </div>
    </>
  )
}

export default TableAllUser