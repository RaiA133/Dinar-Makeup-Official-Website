import iconLocation from '../../assets/icon/map-pin.svg';
import iconGlobe from '../../assets/icon/globe-alt.svg';
import iconGithub from '../../assets/icon/github.svg';
import iconFacebook from '../../assets/icon/facebook.svg';
import iconInstagram from '../../assets/icon/instagram.svg';

function PostProfilePreview({ hisProfile }) {
  return (
    <div className='row-span-2 flex flex-col text-xl items-center pt-6 pb-7 bg-base-100 card shadow-md h-fit lg:sticky top-0'>

      <div className="flex justify-center w-fit">
        <p className="text-xl font-bold">Posted By</p>
      </div>

      <div className='divider' />

      <div className="avatar">
        <div className="w-40 xl:w-80 rounded-xl">
          <img src={`${import.meta.env.VITE_BACKEND_BASEURL}/profile/picture/${hisProfile.img_profile}`} />
        </div>
      </div>

      <div className="mt-3 mb-1">
        <p className="font-bold">{hisProfile.username || 'Username'}</p>
      </div>
      <div className="flex justify-center">
        <img className='w-5 me-1.5' src={iconLocation} alt="icon" />
        <p className="text-sm">{hisProfile.city || 'Kota'}, {hisProfile.country || 'Negara'}</p>
      </div>
      <div className="rounded-xl bg-base-200 p-5 mt-4 text-sm w-fit mx-5 max-h-96">{hisProfile.about || 'About Me'}</div>
      <div className='grid gap-2 grid-cols-4 mt-4 justify-center items-center'>
        {hisProfile.web_link && <img src={iconGlobe} className='w-7 hover:cursor-pointer' alt="Personal Website" onClick={() => window.open(hisProfile.web_link || "#", "_blank")} />}
        {hisProfile.github_link && <img src={iconGithub} className='w-6 hover:cursor-pointer' alt="Personal Github" onClick={() => window.open(hisProfile.github_link || "#", "_blank")} />}
        {hisProfile.fb_link && <img src={iconFacebook} className='w-6 hover:cursor-pointer' alt="Personal Facebook" onClick={() => window.open(hisProfile.fb_link || "#", "_blank")} />}
        {hisProfile.ig_link && <img src={iconInstagram} className='w-6 hover:cursor-pointer' alt="Personal Github" onClick={() => window.open(hisProfile.ig_link || "#", "_blank")} />}
      </div>
    </div>
  )
}

export default PostProfilePreview