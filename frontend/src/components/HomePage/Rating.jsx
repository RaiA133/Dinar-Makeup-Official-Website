import { useNavigate } from "react-router-dom";

function Rating() {
  const navigate = useNavigate();

  return (
    <div className="mx-1 sm:mx-20">

      {/* Judul (hanya ada di menu home) */}
      {location.pathname == "/" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          <div className="p-2">
            <div className="text-4xl font-semibold mb-2">Rating</div>
            <span className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, nam asperiores.
            </span>
          </div>

          <div className="flex justify-end items-center p-2">
            <a className="link link-info no-underline" onClick={() => navigate('/rating')}>Lihat Semua</a>
          </div>

        </div>
      )
      }

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-20">

        <div className="card w-full bg-base-100 card-md shadow-md">
          <div className="card-body">
            <div className="flex justify-start gap-5 mb-2">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                </div>
              </div>
              <h2 className="card-title">Ariana P</h2>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt nesciunt tempora libero porro aliquam accusantium.</p>
            <div className="flex justify-between">
              <div className="rating rating-sm">
                <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" aria-label="1 star" />
                <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" aria-label="2 star" />
                <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" aria-label="3 star" />
                <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" aria-label="4 star" />
                <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" aria-label="5 star" defaultChecked />
              </div>
              <span>11/12/2020</span>
            </div>
          </div>
        </div>

        <div className="card w-full bg-base-100 card-md shadow-md">
          <div className="card-body">
            <div className="flex justify-start gap-5 mb-2">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                </div>
              </div>
              <h2 className="card-title">Ariana P</h2>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt nesciunt tempora libero porro aliquam accusantium.</p>
            <div className="flex justify-between">
              <div className="rating rating-sm">
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="1 star" />
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="2 star" />
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="3 star" />
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="4 star" />
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="5 star" defaultChecked />
              </div>
              <span>11/12/2020</span>
            </div>
          </div>
        </div>

        <div className="card w-full bg-base-100 card-md shadow-md">
          <div className="card-body">
            <div className="flex justify-start gap-5 mb-2">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                </div>
              </div>
              <h2 className="card-title">Ariana P</h2>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt nesciunt tempora libero porro aliquam accusantium.</p>
            <div className="flex justify-between">
              <div className="rating rating-sm">
                <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" aria-label="1 star" />
                <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" aria-label="2 star" />
                <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" aria-label="3 star" />
                <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" aria-label="4 star" />
                <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" aria-label="5 star" defaultChecked />
              </div>
              <span>11/12/2020</span>
            </div>
          </div>
        </div>

        <div className="card w-full bg-base-100 card-md shadow-md">
          <div className="card-body">
            <div className="flex justify-start gap-5 mb-2">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                </div>
              </div>
              <h2 className="card-title">Ariana P</h2>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt nesciunt tempora libero porro aliquam accusantium.</p>
            <div className="flex justify-between">
              <div className="rating rating-sm">
                <input type="radio" name="rating-4" className="mask mask-star-2 bg-orange-400" aria-label="1 star" />
                <input type="radio" name="rating-4" className="mask mask-star-2 bg-orange-400" aria-label="2 star" />
                <input type="radio" name="rating-4" className="mask mask-star-2 bg-orange-400" aria-label="3 star" />
                <input type="radio" name="rating-4" className="mask mask-star-2 bg-orange-400" aria-label="4 star" />
                <input type="radio" name="rating-4" className="mask mask-star-2 bg-orange-400" aria-label="5 star" defaultChecked />
              </div>
              <span>11/12/2020</span>
            </div>
          </div>
        </div>

        <div className="card w-full bg-base-100 card-md shadow-md">
          <div className="card-body">
            <div className="flex justify-start gap-5 mb-2">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                </div>
              </div>
              <h2 className="card-title">Ariana P</h2>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt nesciunt tempora libero porro aliquam accusantium.</p>
            <div className="flex justify-between">
              <div className="rating rating-sm">
                <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" aria-label="1 star" />
                <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" aria-label="2 star" />
                <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" aria-label="3 star" />
                <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" aria-label="4 star" />
                <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" aria-label="5 star" defaultChecked />
              </div>
              <span>11/12/2020</span>
            </div>
          </div>
        </div>

        <div className="card w-full bg-base-100 card-md shadow-md">
          <div className="card-body">
            <div className="flex justify-start gap-5 mb-2">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                </div>
              </div>
              <h2 className="card-title">Ariana P</h2>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt nesciunt tempora libero porro aliquam accusantium.</p>
            <div className="flex justify-between">
              <div className="rating rating-sm">
                <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" aria-label="1 star" />
                <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" aria-label="2 star" />
                <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" aria-label="3 star" />
                <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" aria-label="4 star" />
                <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" aria-label="5 star" defaultChecked />
              </div>
              <span>11/12/2020</span>
            </div>
          </div>
        </div>

        <div className="card w-full bg-base-100 card-md shadow-md">
          <div className="card-body">
            <div className="flex justify-start gap-5 mb-2">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                </div>
              </div>
              <h2 className="card-title">Ariana P</h2>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt nesciunt tempora libero porro aliquam accusantium.</p>
            <div className="flex justify-between">
              <div className="rating rating-sm">
                <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" aria-label="1 star" />
                <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" aria-label="2 star" />
                <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" aria-label="3 star" />
                <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" aria-label="4 star" />
                <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" aria-label="5 star" defaultChecked />
              </div>
              <span>11/12/2020</span>
            </div>
          </div>
        </div>

        <div className="card w-full bg-base-100 card-md shadow-md">
          <div className="card-body">
            <div className="flex justify-start gap-5 mb-2">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                </div>
              </div>
              <h2 className="card-title">Ariana P</h2>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt nesciunt tempora libero porro aliquam accusantium.</p>
            <div className="flex justify-between">
              <div className="rating rating-sm">
                <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" aria-label="1 star" />
                <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" aria-label="2 star" />
                <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" aria-label="3 star" />
                <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" aria-label="4 star" />
                <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" aria-label="5 star" defaultChecked />
              </div>
              <span>11/12/2020</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Rating