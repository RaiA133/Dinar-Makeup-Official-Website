import { useNavigate } from 'react-router-dom';
import ProfilePreview from '../components/ProfilePreview'
import toast, { Toaster } from 'react-hot-toast';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { updateProfile } from '../modules/fetch';

function ProfilePage() {
  const navigate = useNavigate()
  const { userState } = useContext(UserContext)

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const response = await updateProfile(formData);
      if (response.status === 200) {
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
                    <button className="btn max-[640px]:px-10 max-[640px]:btn-sm btn-neutral px-10" type='submit'>SAVE</button>
                    <button className="btn max-[640px]:px-10 max-[640px]:btn-sm btn-neutral px-10" onClick={() => navigate("..", { relative: "path" })}>CENCEL</button>
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
                    <label className="label"><span className="label-text">Phone Number</span></label>
                    <input
                      className="input input-bordered w-full"
                      type="text"
                      name="phone_number"
                      placeholder="Your Phone Number"
                      defaultValue={userState.phone_number}
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label"><span className="label-text">Birth Date</span></label>
                    <input
                      className="input input-bordered w-full"
                      type="date"
                      name="date_of_birth"
                      placeholder=""
                      defaultValue={userState.date_of_birth}
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label"><span className="label-text">Age</span></label>
                    <input
                      className="input input-bordered w-full"
                      type="text"
                      name="age"
                      placeholder="Your Age"
                      defaultValue={userState.age}
                    />
                  </div>
                </div>
                <div className='grid grid-cols-1 gap-4 pb-5'>
                  <div className="form-control w-full">
                    <label className="label"><span className="label-text">NIK</span></label>
                    <input
                      className="input input-bordered w-full"
                      type="text"
                      name="nik"
                      placeholder="Your NIK"
                      defaultValue={userState.nik}
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
                  </div>
                </div>

              </div>
              {/* END FORM EDIT PROFILE */}

            </div>

        </form>

      </div>
    </>
  )
}

export default ProfilePage