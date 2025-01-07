import iconInstagram from '../../../assets/icon/instagram.svg';
import iconFacebook from '../../../assets/icon/facebook.svg';
import iconLocation from '../../../assets/icon/map-pin.svg';
import iconGlobe from '../../../assets/icon/globe-alt.svg';
import iconGithub from '../../../assets/icon/github.svg';
import { deleteUserByUniqueIdAdmin } from '../../../modules/fetch';
import { getPostByUniqueId } from '../../../modules/fetch';
import toast, { Toaster } from 'react-hot-toast';
import { useContext, useEffect } from 'react';
import { PostContext } from '../../../contexts/PostContext';
import AllUserPost from './AllUserPost';

function Detail({ data }) {
  const { setUserPostByUniqueId } = useContext(PostContext);

  useEffect(() => {
    const FetchDetailPost = async () => {
      try {
        const response = await getPostByUniqueId(data.unique_id);
        if (response.status[1] === "Success") {
          setUserPostByUniqueId(response.data);
        } else {
          setUserPostByUniqueId(null);
        }
      } catch (error) {
        console.error("Error fetching post:", error.message);
        setUserPostByUniqueId(null);
      }
    };
    FetchDetailPost();
  }, [data]);


  async function handleDeleteUser(unique_id) {
    try {
      const secondConfirm = confirm('Apakah Anda yakin ? Hapus Beserta Postingannya')
      if (secondConfirm) {
        const response = await deleteUserByUniqueIdAdmin(unique_id);
        if (response.status[1] === 'Success') {
          toast.success(response.message, {
            duration: 6000,
          })
        }
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message, {
        duration: 6000,
      })
      window.location.reload()
      console.error('An error occurred while deleting user:', error.message);
    }
  }

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-3'>
        <Toaster
          toastOptions={{
            style: {
              maxWidth: '600px'
            }
          }}
        />
        <div className='md:h-[80rem] mt-5'>
          <div className='border col-span-1 row-span-2 flex flex-col text-xl items-center pt-6 pb-5 bg-base-100 card shadow-md h-fit px-5 sticky top-0'>
            <div className="avatar">
              <div className="w-32 rounded-xl">
                <img src={import.meta.env.VITE_PROFILE_DEFAULT || `${import.meta.env.VITE_BACKEND_BASEURL}/profile/picture/${data.img_profile}`} />
              </div>
            </div>
            <div className="mt-3 mb-1 text-2xl">
              <p className="font-bold">{data.username || 'Username'}</p>
            </div>
            <div className="flex justify-center">
              <img className='w-5 me-1.5' src={iconLocation} alt="icon" />
              <p className="text-sm">{data.city || 'Kota'}, {data.country || 'Negara'}</p>
            </div>
            <div className='grid gap-2 grid-cols-4 my-4 justify-center items-center'>
              <img src={iconGlobe} className='w-7 hover:cursor-pointer' alt="Personal Website" onClick={() => window.open(data.web_link || "https://tailwindcss.com", "_blank")} />
              <img src={iconGithub} className='w-6 hover:cursor-pointer' alt="Personal Github" onClick={() => window.open(data.github_link || "https://tailwindcss.com", "_blank")} />
              <img src={iconFacebook} className='w-6 hover:cursor-pointer' alt="Personal Facebook" onClick={() => window.open(data.fb_link || "https://tailwindcss.com", "_blank")} />
              <img src={iconInstagram} className='w-6 hover:cursor-pointer' alt="Personal Github" onClick={() => window.open(data.ig_link || "https://tailwindcss.com", "_blank")} />
            </div>
            <div className="rounded-xl bg-base-200 p-5 text-sm min-w-40 md:min-w-60 xl:min-w-72 max-h-96">{data.about || 'About Me'}</div>
          </div>
        </div>

        <div className='col-span-2 bg-base-100 mt-5 h-[40rem] md:ms-10'>
          <div className="bg-base-100 overflow-hidden shadow rounded-lg border">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-base-900 flex justify-between items-center">
                <span>User Profile</span>
                <span>
                  {data.user_role_id === 2 && (
                    <button className="btn btn-error btn-xs ml-2 text-base-100" onClick={(e) => {
                      document.getElementById('my_modal_delete_user').showModal()
                      e.preventDefault()
                    }}>delete</button>
                  )}
                </span>
              </h3>
              <p className="mt-3 max-w-2xl text-sm text-base-500">
                This is some information about the user.
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-base-500">
                    Unique ID
                  </dt>
                  <dd className="mt-1 text-sm text-base-900 sm:mt-0 sm:col-span-2">
                    {data.unique_id || '-'}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-base-500">
                    Role
                  </dt>
                  <dd className="mt-1 text-sm text-base-900 sm:mt-0 sm:col-span-2">
                    {data.user_role_id === 1 ? 'Administrator' : 'User'}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-base-500">
                    Full Name
                  </dt>
                  <dd className="mt-1 text-sm text-base-900 sm:mt-0 sm:col-span-2">
                    {data.name || '-'}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-base-500">
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm text-base-900 sm:mt-0 sm:col-span-2">
                    {data.email || '-'}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-base-500">
                    Contact
                  </dt>
                  <dd className="mt-1 text-sm text-base-900 sm:mt-0 sm:col-span-2">
                    {data.contact || '-'}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-base-500">
                    Address
                  </dt>
                  <dd className="mt-1 text-sm text-base-900 sm:mt-0 sm:col-span-2">
                    {data.address || '-'}<br />
                    {data.city || '-'}, {data.country || '-'}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-base-500">
                    Job
                  </dt>
                  <dd className="mt-1 text-sm text-base-900 sm:mt-0 sm:col-span-2">
                    {data.job || '-'}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className='w-full overflow-x-auto shadow-md card mt-10 border'>
            <AllUserPost />
          </div>

        </div>

        {/* MODAL POPUP BOX */}
        <dialog id="my_modal_delete_user" className="modal">
          <div className="modal-box w-fit">
            <h3 className="font-bold text-lg text-center">Are you sure ?</h3>
            <p className="pt-4 text-center mx-5">Hapus user <span className='font-bold'>{data.username}</span> beserta <span className='text-error'>semua postingannya</span></p>
            <div className="modal-action flex justify-between gap-20">
              <form method="dialog">
                <button className="btn btn-error w-20" onClick={() => {
                  handleDeleteUser(data.unique_id)
                }}>Yes</button>
              </form>
              <form method="dialog">
                <button className="btn w-20">Close</button>
              </form>
            </div>
          </div>
        </dialog>

      </div>

    </div>

  )
}

export default Detail