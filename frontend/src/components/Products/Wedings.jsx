import { useLocation, useNavigate } from "react-router-dom";

function Weddings() {
  let location = useLocation();
  const navigate = useNavigate();

  const product = {
    "Wedding": {
      "Wedding Bronze": {
        "images": "",
        "price": "Rp. 24.000.000",
        "detail": {
          "Makeup": [
            "Makeup pengantin wanita + retouch makeup resepsi",
            "Sepasang baju akad (ready stock)",
            "Sepasang baju resepsi (ready stock)",
            "2 pasang baju ibu dan bapak (ready stock)",
            "Makeup ibu CPW (satu lokasi dengan makeup pengantin)",
            "2 baju pagar ayu (ready stock) + makeup only"
          ],
          "dokumentasi": [
            "8 jam kerja (1 fotografer & 1 videografer)",
            "Ceta perbesaran 16 + frame",
            "1 magazine",
            "Video sinematik (2/3 menit)",
            "Unlimited file",
            "Flashdisk"
          ],
          "MC Wedding": [
            "Memandu acara akad",
            "Memandu adat sunda",
            "Mengatur list foto keluarga",
            "Techmet 1x pertemuan"
          ],
          "Hiburan": [
            "Dangdut",
            "Soundsistem"
          ],
          "Dekorasi": [
            "Pelaminan max 6x3meter (ready stok)",
            "Panggung pelaminan max 6x3meter",
            "1 set kursi/sofa pelaminan",
            "Taman pelaminan",
            "Kotak uang",
            "Fotobhoot (ready stok)",
            "Red karpet sepanjang jalan venue",
            "1 set meja akad / meja pagar ayu",
            "Tenda max 100m/segi",
            "Panggung hiburan 4×3meter",
            "Kursi tappa bungkus 100pcs",
            "Piring, sendok, garpu 100pcs",
            "Meja stand max 2pcs",
            "Meja parasmanan + pemanas sedang 1 set",
            "*BELUM TERMASUK KAIN DALAM RUMAH",
            "*BELUM TERMASUK JANUR"
          ],
          "Hantaran": [
            "Hias hantaran",
            "10 mix (akrilik, mika dan keranjang)"
          ],
          "Free": [
            "Softlen (normal only)",
            "Henna (putih / maroon / nude)",
            "Nail art (ready stok)",
            "Fresh melati 1 set"
          ],
          "Syarat dan ketentuan berlaku": [
            "DP minimal 15% dari total paket",
            "Cancel sepihak DP hangus",
            "Pelunasan H-7",
            "Penambahan item di luar list akan dikenakan charge",
            "Untuk melati bila ada kenaikan harga di luar budget akan dikenakan charge sesuai harga melati (harga melati tidak bisa diprediksi jauh-jauh hari, keluar harga biasanya di H-3)",
            "Bila akad di hari yang berbeda, akan dikenakan charge produk dan jam kerja seharga Rp 1.500.000",
            "Tambahan makeup keluarga/bridesmaid @Rp 200.000/org makeupnya saja",
            "Pemakaian attire perdana pengantin kena charge pertama = 1jt, ke 2 = 750rb, ke 3 = 500rb",
            "Pemakaian attire perdana ortu, kena charge pertama 1jt, ke 2 = 750rb, ke 3 = 500rb",
            "Perdana by request dikenakan charge 35% dari total biaya pembikinan attire",
            "Pengurangan attire tidak mengurangi harga paketan",
            "Penambahan tenda charge 30.000/meter",
            "Tambahan WO start from 3jt",
            "Jarak lebih dari 15 km dikenakan transport dan akomodasi",
            "Sistem pembayaran sebanyak 3x: pertama DP, ke 2 pas cek lokasi / sebelum fitting, ke 3 pelunasan H-7",
            "Bila ada kerusakan atau kehilangan akan ditanggung oleh pengantin",
            "Masuk DP berarti pengantin sudah setuju dengan syarat dan ketentuan tersebut"
          ]
        }
      },
      "Wedding Silver": {
        "price": "Rp. 27.000.000",
        "detail": {
          "Makeup": [
            "Makeup pengantin wanita + retoch makeup resepsi",
            "Sepasang baju akad (ready stock)",
            "Sepasang baju resepsi ( ready stock )",
            "2 pasang baju ibu dan bapak ( ready stock )",
            "Makeup ibu CPW ( satu lokasi dengan makeup pengantin )",
            "Makeup ibu CPP ( majalaya only atau dekat dengan lokasi wedding )",
            "4 baju pagar ayu ( ready stock ) + makeup only"
          ],
          "dokumentasi": [
            "8 jam kerja (1 fotografer & 1 videografer)",
            "cetar perbesaran 16 + frame",
            "1 magazine",
            "Video sinematik (2/3 menit )",
            "unlimited file",
            "Flashdisk"
          ],
          "MC Wedding": [
            "memandu acara akad",
            "Memandu adat sunda",
            "mengatur list foto keluarga",
            "Techmet 1x pertemuan"
          ],
          "Hiburan": [
            "dangdut / pop akustik/ religi **",
            "** Pilih salah satu",
            "soundsistem"
          ],
          "Dekorasi": [
            "pelaminan max 6x3meter ( ready stok )",
            "panggung pelaminan max 6x3meter",
            "1 set kursi/sofa pelaminan",
            "taman pelaminan",
            "Kotak uang",
            "Fotobhoot (ready stok)",
            "red karpet sepanjang jalan venue",
            "1 set meja akad / meja pagar ayu",
            "tenda max 120m/segi",
            "Panggung hiburan 4×3meter",
            "kursi bungkus 100pcs",
            "Puring, sendok, garpuh 100pcs",
            "meja stand max 2pcs",
            "meja parasmanan + pennanas sedang 1 set",
            "*BELUM TERMASUK KAIN DALAM RUMAH",
            "* BELUM TERMASUK JANUR"
          ],
          "Hantaran": [
            "hias hantaran",
            "10 mix ( akrilik , mika dan keranjang )"
          ],
          "Free": [
            "Softlen (normal only)",
            "Henna (putih / maroon / nude)",
            "Nail art (ready stok)",
            "Fresh melati 1 set"
          ],
          "Syarat dan ketentuan berlaku": [
            "FIX Dp minimal 15 % dari total paket",
            "cancel seplhak DP hangus",
            "Pelunasan H-7",
            "penambahan item di luar list akan di kenakan charge",
            "untuk melati bila ada kenalkan harga di luar budget akan di kenakan charge sesuai harga melati ( harga melati tidak bisa di prediksi jauh2 hari, keluar harga biasanya di H-3 )",
            "bila akad di hari yang berbeda , akan di kenakan charge produk dan jam kerja seharga Rp 1.500.000",
            "tambahan makeup keluarga/ bridesmaid @Rp 200.000/ org makeupnya saja",
            "pemakaian attire perdana pengantin kena charge pertama = 1jt, ke 2 = 750rb, ke 3 = 500rb",
            "pemakaian attire perdana ortu, kena charge pertama 1jt, ke 2 = 750rb, ke 3 = 500rb",
            "perdana by request di kenakan charge 35% dari total biaya pembikinan attire",
            "pengurangan attire tidak mengurangi harga paketan.",
            "penambahan tenda charge 30.000/meter",
            "Tambahan WO star from 3jt",
            "jarak lebih dari 15 km dikenakan transport dan akomodasi",
            "sistem pembayaran sebanyak 3 x, pertama Dp , ke 2 pas cek lokasi / sebelum fitting , ke 3 pelunasan H-7",
            "Bila ada kerusakam atau ke hilangan akan di tanggung oleh pengantin",
            "masuk Dp berarti pengantin sudah setuju dengan syarat dan ketentuan tersebut",
            "08980000845",
            "@dinarmakeup"
          ]
        }
      },
      "Wedding Gold": {
        "price": "Rp. 37.000.000",
        "detail": {
          "Makeup": [
            "Makeup pengantin wanita + retoch makeup resepsi",
            "Sepasang baju akad (ready stock)",
            "Max 2 pasang baju resepsi (ready stock)",
            "2 pasang baju ibu dan bapak (ready stock)",
            "Makeup ibu CPW (satu lokasi dengan makeup pengantin)",
            "Makeup ibu CPP (majalaya only atau dekat dengan lokasi wedding)",
            "4 baju pagar ayu (ready stock) + makeup only",
            "2 baju pagar bagus (ready stock)"
          ],
          "dokumentasi": [
            "8 jam kerja (1 fotografer & 1 videografer)",
            "cetar perbesaran 16 + frame",
            "1 magazine",
            "Video sinematik (2/3 menit )",
            "unlimited file",
            "Flashdisk"
          ],
          "MC Wedding": [
            "memandu acara akad",
            "Memandu adat sunda",
            "mengatur list foto keluarga",
            "Techmet 1x pertemuan"
          ],
          "Lengser": [
            "Rampak kendang",
            "4 penari",
            "1 Baksa ( pembawa payung )",
            "sinden dan pemusik live",
            "abah & ambu"
          ],
          "Hiburan": [
            "dangdut / pop akustik/ religi **",
            "** Pilih salah satu",
            "soundsistem"
          ],
          "Dekorasi": [
            "pelaminan max 8x3meter ( ready stok )",
            "panggung pelaminan max 8x3meter",
            "1 set kursi/sofa pelaminan",
            "taman pelaminan",
            "Kotak uang",
            "Fotobhoot (ready stok)",
            "red karpet sepanjang jalan venue",
            "meja tamu 1 set",
            "Backdrop meja tamu",
            "backdrop pangang hiburan",
            "1 set meja akad",
            "tenda max 150m/segi",
            "Panggung hiburan 4×4 meter",
            "kursi bungkus 100pcs",
            "Puring, sendok, garpuh 200pcs",
            "meja stand max 4pcs",
            "meja parasmanan + pennanas sedang 1 set",
            "*BELUM TERMASUK KAIN DALAM RUMAH",
            "* BELUM TERMASUK JANUR"
          ],
          "Hantaran": [
            "hias hantaran",
            "10 mix ( akrilik , mika dan keranjang )"
          ],
          "Free": [
            "Softlen (normal only)",
            "Henna (putih / maroon / nude)",
            "Nail art (ready stok)",
            "Fresh melati 1 set"
          ],
          "Syarat dan ketentuan berlaku": [
            "FIX Dp minimal 15 % dari total paket",
            "cancel seplhak DP hangus",
            "Pelunasan H-7",
            "penambahan item di luar list akan di kenakan charge",
            "untuk melati bila ada kenalkan harga di luar budget akan di kenakan charge sesuai harga melati ( harga melati tidak bisa di prediksi jauh2 hari, keluar harga biasanya di H-3 )",
            "bila akad di hari yang berbeda , akan di kenakan charge produk dan jam kerja seharga Rp 1.500.000",
            "tambahan makeup keluarga/ bridesmaid @Rp 200.000/ org makeupnya saja",
            "pemakaian attire perdana pengantin kena charge pertama = 1jt, ke 2 = 750rb, ke 3 = 500rb",
            "pemakaian attire perdana ortu, kena charge pertama 1jt, ke 2 = 750rb, ke 3 = 500rb",
            "perdana by request di kenakan charge 35% dari total biaya pembikinan attire",
            "pengurangan attire tidak mengurangi harga paketan.",
            "penambahan tenda charge 30.000/meter",
            "Tambahan WO star from 3jt",
            "jarak lebih dari 15 km dikenakan transport dan akomodasi",
            "sistem pembayaran sebanyak 3 x, pertama Dp , ke 2 pas cek lokasi / sebelum fitting , ke 3 pelunasan H-7",
            "Bila ada kerusakam atau ke hilangan akan di tanggung oleh pengantin",
            "masuk Dp berarti pengantin sudah setuju dengan syarat dan ketentuan tersebut",
            "08980000845",
            "@dinarmakeup"
          ]
        }
      },
    },
    "Makeup": {
      "Makeup Reguler": {},
      "Makeup Wedding": {},
    },
  }

  return (
    <div className="mt-20 mx-1 sm:mx-20">

      {/* Judul (hanya ada di menu home) */}
      {location.pathname == "/" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          <div className="p-2">
            <div className="text-4xl font-semibold mb-2">Pricing</div>
            <span className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, nam asperiores.
            </span>
          </div>

          <div className="flex justify-end items-center p-2">
            <a className="link link-info no-underline" onClick={() => navigate('/pricing')}>Lihat Semua</a>
          </div>

        </div>
      )
      }

      {location.pathname == "/pricing" && (<div className="divider text-3xl mb-10">Weedings</div>)}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">

        {Object.keys(product.Wedding).map((weddingType, index) => (
          <div className="card w-full bg-base-200 shadow-md" key={index}>
            <figure>
              <img
                src="https://placehold.co/1980x1080"
              />
            </figure>
            <div className="card-body">
              {/* <span className="badge badge-xs badge-warning">Most Popular</span> */}
              <ul className="mb-3 flex flex-col gap-2 text-xs">
                {Object.keys(product.Wedding[weddingType].detail).map((detailKey, detailIndex) => (
                  <li key={detailIndex}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{detailKey}</span>
                  </li>
                ))}
              </ul>
              <div className="">
                <h2 className="text-3xl font-bold">{weddingType}</h2>
                <span className="text-xl">{product.Wedding[weddingType].price}</span>
              </div>
              <div className="mt-6">

                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                <div className="flex gap-2">
                  <button className="btn btn-primary w-1/2">Buy</button>
                  <button className="btn w-1/2" onClick={() => document.getElementById('my_modal_4').showModal()}>Detail</button>
                </div>

                <dialog id="my_modal_4" className="modal">
                  <div className="modal-box w-12/12 max-w-7xl">
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                      <div>
                        {/* Judul Product */}
                        <div className="mb-4">
                          <h2 className="text-3xl font-bold">{weddingType}</h2>
                          <span className="text-xl">{product.Wedding[weddingType].price}</span>
                        </div>
                        {/* Images Product */}
                        <div className="carousel rounded-box">
                          <div className="carousel-item">
                            <img
                              src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
                              alt="Burger" />
                          </div>
                          <div className="carousel-item">
                            <img
                              src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
                              alt="Burger" />
                          </div>
                          <div className="carousel-item">
                            <img
                              src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
                              alt="Burger" />
                          </div>
                          <div className="carousel-item">
                            <img
                              src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
                              alt="Burger" />
                          </div>
                          <div className="carousel-item">
                            <img
                              src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp"
                              alt="Burger" />
                          </div>
                          <div className="carousel-item">
                            <img
                              src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp"
                              alt="Burger" />
                          </div>
                          <div className="carousel-item">
                            <img
                              src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
                              alt="Burger" />
                          </div>
                        </div>
                      </div>
                      {/* Detail Product */}
                      <div>
                        <div className='text-justify'>
                          <div className="gap-2">
                            {Object.entries(product.Wedding[weddingType].detail).map(([category, items], detailIndex) => (
                    

                              <div key={detailIndex} className="collapse collapse-plus bg-base-100 border border-base-300">
                                <input type="radio" name="my-accordion"/>
                                <div className="collapse-title font-semibold text-lg">{category}</div>
                                <div className="collapse-content text-sm">
                                {Array.isArray(items) ? (
                                    <ul className="list-disc pl-5 text-md">
                                      {items.map((item, itemIndex) => (
                                        <li key={itemIndex}>{item}</li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <p>{items}</p>
                                  )}
                                </div>
                              </div>

                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-action">
                      <form method="dialog">
                        <button className="btn btn-primary">Buy</button>
                        <button className="btn ms-2">Close</button>
                      </form>
                    </div>
                  </div>
                </dialog>

              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Weddings