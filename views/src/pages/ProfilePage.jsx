import { useNavigate } from 'react-router-dom';
import ProfilePreview from '../components/ProfilePreview'
import AllYourPost from '../components/ProfilePage/AllYourPost'
import Partner from '../components/Partner';
import { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import toast, { Toaster } from 'react-hot-toast';
import { updateProfile } from "../modules/fetch";

function ProfilePage() {
  const navigate = useNavigate()
  const { userState, img_profile_link, set_img_profile_link } = useContext(UserContext)
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const response = await updateProfile(formData);
      if (response.status[1] === 'Success' && response.halaman == 'updateProfile') {
        const toastMessage = response.message;
        toast.success(
          <>
            <span className='leading-normal'>{toastMessage}</span>
          </>,
          { duration: 2500 }
        )
      }
    } catch (error) {
      let failedMessage = error.message
      console.log(error)
      console.error(failedMessage)
      toast.error(failedMessage, {
        duration: 2500,
      });
    }
  }

  useEffect(() => {
    const toastMessage = localStorage.getItem('toastMessage')
    if (toastMessage == 'Postingan berhasil di update!') {
      toast.success(toastMessage, {
        duration: 2500,
      });
      localStorage.removeItem('toastMessage');
    }
    if (toastMessage == 'Hapus Photo Berhasil!') {
      toast.success(toastMessage, {
        duration: 2500,
      });
      localStorage.removeItem('toastMessage');
    }
    if (toastMessage == 'Postingan berhasil di delete!') {
      toast.success(toastMessage, {
        duration: 2500,
      });
      localStorage.removeItem('toastMessage');
    }
  }, [img_profile_link]);


  return (
    <>
      <div className="p-5">

        <form action="" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">

            <Toaster
              toastOptions={{
                style: {
                  maxWidth: '600px'
                }
              }}
            />

            <ProfilePreview />

            {/* FORM EDIT PROFILE */}
            <div className="row-span-3 col-span-2">

              <div className='p-10 bg-base-100 card shadow-md'>
                <div className="flex justify-between">
                  <p className="text-4xl font-bold">Edit Profile</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button className="btn max-[640px]:px-10 max-[640px]:btn-sm btn-neutral px-10" type='submit'>SIMPAN</button>
                    <button className="btn max-[640px]:px-10 max-[640px]:btn-sm btn-neutral px-10" onClick={() => navigate("..", { relative: "path" })}>BATAL</button>
                  </div>
                </div>

                <div className='divider' />

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 pb-5'>
                  <div className="form-control w-full">
                    <label className="label"><span className="label-text">Name</span></label>
                    <input
                      className="input input-bordered w-full"
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      defaultValue={userState.name}
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label"><span className="label-text">Username</span></label>
                    <input
                      className="input input-bordered w-full"
                      type="text"
                      name="username"
                      placeholder="Your Username"
                      defaultValue={userState.username}
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label"><span className="label-text">Email</span></label>
                    <input
                      className="input input-bordered w-full"
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      defaultValue={userState.email}
                      disabled
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label"><span className="label-text">Address</span></label>
                    <input
                      className="input input-bordered w-full"
                      type="text"
                      name="address"
                      placeholder="Your Address"
                      defaultValue={userState.address}
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label"><span className="label-text">Birth Date</span></label>
                    <input
                      className="input input-bordered w-full"
                      type="date"
                      name="birth_date"
                      placeholder=""
                      defaultValue={userState.birth_date}
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label"><span className="label-text">Birth Place</span></label>
                    <input
                      className="input input-bordered w-full"
                      type="text"
                      name="birth_place"
                      placeholder="Your Birth Place"
                      defaultValue={userState.birth_place}
                    />
                  </div>
                </div>
                <div className="form-control w-full">
                  <label className="label"><span className="label-text">About Me</span></label>
                  <textarea
                    className="textarea textarea-bordered h-40"
                    type="text"
                    name="about"
                    placeholder="Your Bio"
                    defaultValue={userState.about}
                  />
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 py-5'>
                  <div className="form-control w-full">
                    <label className="label"><span className="label-text">Job</span></label>
                    <input
                      className="input input-bordered w-full"
                      type="text"
                      name="job"
                      placeholder="Your Job"
                      defaultValue={userState.job}
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label"><span className="label-text">Company</span></label>
                    <input
                      className="input input-bordered w-full"
                      type="text"
                      name="company"
                      placeholder="Current Company"
                      defaultValue={userState.company}
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label"><span className="label-text">Country</span></label>
                    <input
                      className="input input-bordered w-full"
                      type="text"
                      name="country"
                      placeholder="Your country"
                      defaultValue={userState.country}
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label"><span className="label-text">Contact</span></label>
                    <input
                      className="input input-bordered w-full"
                      type="text"
                      name="contact"
                      placeholder="Your Contact"
                      defaultValue={userState.contact}
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label"><span className="label-text">Github Link</span></label>
                    <input
                      className="input input-bordered w-full"
                      type="text"
                      name="github_link"
                      placeholder="Your Github Link"
                      defaultValue={userState.github_link}
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label"><span className="label-text">Personal Website Link</span></label>
                    <input
                      className="input input-bordered w-full"
                      type="text"
                      name="web_link"
                      placeholder="Your Personal Web Link"
                      defaultValue={userState.web_link}
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label"><span className="label-text">Facebook Link</span></label>
                    <input
                      className="input input-bordered w-full"
                      type="text"
                      name="fb_link"
                      placeholder="Your Facebook Link"
                      defaultValue={userState.fb_link}
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label"><span className="label-text">Instagram Link</span></label>
                    <input
                      className="input input-bordered w-full"
                      type="text"
                      name="ig_link"
                      placeholder="Your Instagram Link"
                      defaultValue={userState.ig_link}
                    />
                  </div>
                </div>
              </div>

              <AllYourPost />

            </div>
            {/* END FORM EDIT PROFILE */}

          </div>

          <Partner />

        </form>

      </div>
    </>
  )
}

export default ProfilePage