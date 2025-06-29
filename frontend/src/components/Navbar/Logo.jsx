import logoDinarMakeupCrop from '/img/logo/logoDinarMakeupCrop.jpg';

function Logo() {
  return (
    <section className='flex items-center gap-5'>
      <img className="w-10 rounded-full lg:ms-5" src={logoDinarMakeupCrop} />
      <span className='font-rochester text-sm sm:text-xl md:text-2xl '>Dinar Makeups</span>
    </section>
  )
}

export default Logo