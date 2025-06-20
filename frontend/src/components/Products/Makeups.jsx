import { FiCheck, FiX, FiStar, FiInfo, FiCalendar, FiHome, FiMapPin } from 'react-icons/fi';

function Makeups() {
  const regularMakeupPackages = [
    {
      name: "Siraman Package",
      priceOwner: "Rp 750.000",
      priceTeam: "Rp 600.000",
      popular: true,
      features: [
        "Makeup by owner or team",
        "Retouch makeup siraman",
        "Baju siraman included",
        "Bustie included",
        "Stagen included",
        "Samping included",
        "Hijabdo included"
      ],
      terms: [
        "Transport & accommodation not included",
        "Softlens not included",
        "Hairdo 1 look charge Rp 100.000"
      ]
    },
    {
      name: "Pre-Wedding / Tunangan / Wisuda",
      priceOwner: "Rp 350.000",
      priceTeam: "Rp 250.000",
      popular: false,
      features: [
        "Makeup only",
        "Simple hijabdo",
        "Makeup at gallery",
        "Home service available (min 2 people for tunangan/wisuda)"
      ],
      terms: [
        "Booking max H-1 month for weekends",
        "Home service transport & accommodation not included",
        "Softlens not included",
        "Hairdo 1 look charge Rp 50.000"
      ]
    },
    {
      name: "Bridesmaid/Family Makeup",
      priceOwner: "Rp 300.000",
      priceTeam: "Rp 200.000",
      popular: false,
      features: [
        "Makeup only",
        "Simple hijabdo",
        "Makeup at gallery",
        "Home service available (min 3 people)"
      ],
      terms: [
        "Booking max H-1 month",
        "Home service transport & accommodation not included",
        "Softlens not included",
        "Hairdo 1 look charge Rp 50.000"
      ]
    }
  ];

  const weddingMakeupPackages = [
    {
      name: "Basic Wedding Package",
      price: "Rp 7.000.000",
      popular: true,
      features: [
        "Makeup akad",
        "Retouch makeup resepsi",
        "Sepasang baju akad (ready stock)",
        "2 sepasang baju resepsi (ready stock)",
        "2 pasang baju ibu dan bapa besan (ready stock)",
        "Makeup ibu cpw",
        "Makeup ibu cpp (Majalaya only)",
        "4 pasang baju pagar ayu + makeup (ready stock)",
        "2 pasang baju pagar bagus (ready stock)",
        "Free softens (normal only)",
        "Free henna & nail art",
        "Free fresh bunga melati"
      ],
      terms: [
        "DP minimal 50% untuk booking fix",
        "Pelunasan wajib H-7",
        "Jarak >15km kena charge transport",
        "Makeup ibu cpp >5km dari gallery kena charge transport"
      ]
    },
    {
      name: "Standard Wedding Package",
      price: "Rp 6.000.000",
      popular: false,
      features: [
        "Makeup akad",
        "Retouch makeup resepsi",
        "Sepasang baju akad (ready stock)",
        "Sepasang baju resepsi (ready stock)",
        "2 pasang baju ibu dan bapa besan (ready stock)",
        "Makeup ibu cpw (only)",
        "2 pasang baju pagar ayu + makeup (ready stock)",
        "Free softens (normal only)",
        "Free henna & nail art",
        "Free fresh bunga melati"
      ],
      terms: [
        "DP minimal 50% untuk booking fix",
        "Pelunasan wajib H-7",
        "Jarak >15km kena charge transport"
      ]
    },
    {
      name: "Akad Only Package",
      price: "Rp 2.500.000 - Rp 3.000.000",
      popular: false,
      features: [
        "Makeup akad tanpa retouch",
        "Sepasang kebaya pengantin + riasan",
        "Free hena putih",
        "Free softens normal",
        "Siger Sunda (Rp 3.000.000 version)",
        "Free fresh melati (Rp 3.000.000 version)",
        "Free nail art (Rp 3.000.000 version)"
      ],
      terms: [
        "Akad di hari terpisah kena charge Rp 1.5jt",
        "Jam kerja maksimal sampai jam 12",
        "Tidak bisa di retouch dengan MUA lain",
        "Acara harus di dalam rumah"
      ]
    }
  ];

  const generalRegularTerms = [
    "Booking must be made at least 1 month in advance for weekend events",
    "Transportation and accommodation costs are not included in the package price",
    "Contact lenses (softlens) are not included",
    "Additional charges apply for special hairdo requests",
    "Home service available with minimum number of people",
    "Prices may vary for special requests"
  ];

  const generalWeddingTerms = [
    "DP minimal 50% untuk booking fix",
    "Bila akad di hari terpisah kena charge jam kerja dan produk Rp 1.5jt",
    "Tambahan makeup keluarga Rp 200.000/orang",
    "Hairdo charge Rp 500.000/look (paes Rp 850.000)",
    "Pemakaian attire perdana by request kena charge sesuai harga attire",
    "Pengurangan attire tidak mengurangi harga paketan",
    "Pelunasan wajib H-7 (bila tidak dilunasi dianggap cancel)",
    "Jarak >15km kena charge transport",
    "Harga melati sewaktu-waktu bisa berubah",
    "Makeup ibu cpp >5km dari gallery kena charge transport",
    "Acara akad harus di dalam rumah (kecuali booking paket resepsi)"
  ];

  return (
    <div className="mt-20 mx-4 sm:mx-8 lg:mx-20">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Makeup Packages</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Layanan Makeups profesional untuk acara-acara khusus Anda
        </p>
      </div>

      {/* Wedding Makeup Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Wedding Makeup Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {weddingMakeupPackages.map((pkg, index) => (
            <div
              key={index}
              className={`relative rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${pkg.popular ? 'border-2 border-primary' : 'border border-gray-200'}`}
            >
              {pkg.popular && (
                <div className="absolute top-4 right-4 bg-primary text-base-100 text-xs font-bold px-3 py-1 rounded-full flex items-center">
                  <FiStar className="mr-1" /> POPULAR
                </div>
              )}

              <div className="p-6 bg-base-100 h-full flex flex-col"> {/* key line: flex-col */}
                <h2 className="text-2xl font-bold text-gray-900 mb-2 w-2/3">{pkg.name}</h2>

                <div className="mb-6">
                  <div className="flex items-center">
                    <span className="text-xl font-semibold text-primary">{pkg.price}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <FiCheck className="text-success mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="flex items-center text-gray-600 mb-2">
                    <FiInfo className="mr-2" />
                    <span className="font-medium">Package Terms</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-2">
                    {pkg.terms.map((term, i) => (
                      <li key={i} className="flex">
                        <span className="mr-2">•</span>
                        <span>{term}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 👇 Pushes button to bottom */}
                <div className="mt-auto">
                  <button className="btn btn-primary w-full hover:shadow-md transition-all">
                    <FiCalendar className="mr-2" />
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>

        {/* Wedding General Terms */}
        <div className="bg-gray-50 rounded-xl p-6 mb-10">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Wedding General Terms & Conditions</h3>
          <ul className="space-y-3 text-gray-600">
            {generalWeddingTerms.map((term, i) => (
              <li key={i} className="flex">
                <span className="mr-2">•</span>
                <span>{term}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Regular Makeup Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Regular Makeup Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {regularMakeupPackages.map((pkg, index) => (
            <div
              key={index}
              className={`relative rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${pkg.popular ? 'border-2 border-primary' : 'border border-gray-200'}`}
            >
              {pkg.popular && (
                <div className="absolute top-4 right-4 bg-primary text-base-100 text-xs font-bold px-3 py-1 rounded-full flex items-center">
                  <FiStar className="mr-1" /> POPULAR
                </div>
              )}

              <div className="p-6 bg-base-10 h-full flex flex-col"> {/* ← added flex-col */}
                <h2 className="text-2xl font-bold text-gray-900 mb-2 w-2/3">{pkg.name}</h2>

                <div className="mb-6 space-y-2">
                  <div className="flex items-center">
                    <FiHome className="text-primary mr-2" />
                    <span className="font-medium">By Owner:</span>
                    <span className="text-xl font-semibold text-primary ml-2">{pkg.priceOwner}</span>
                  </div>
                  <div className="flex items-center">
                    <FiMapPin className="text-secondary mr-2" />
                    <span className="font-medium">By Team:</span>
                    <span className="text-xl font-semibold text-secondary ml-2">{pkg.priceTeam}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <FiCheck className="text-success mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="flex items-center text-gray-600 mb-2">
                    <FiInfo className="mr-2" />
                    <span className="font-medium">Package Terms</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-2">
                    {pkg.terms.map((term, i) => (
                      <li key={i} className="flex">
                        <span className="mr-2">•</span>
                        <span>{term}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pushes this to the bottom */}
                <div className="mt-auto">
                  <button className="btn btn-primary w-full hover:shadow-md transition-all">
                    <FiCalendar className="mr-2" />
                    Book Now
                  </button>
                </div>
              </div>
            </div>

          ))}
        </div>

        {/* Regular General Terms */}
        <div className="bg-gray-50 rounded-xl p-6 mb-10">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Regular Makeup General Terms & Conditions</h3>
          <ul className="space-y-3 text-gray-600">
            {generalRegularTerms.map((term, i) => (
              <li key={i} className="flex">
                <span className="mr-2">•</span>
                <span>{term}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Contact Info */}
      <div className="text-center bg-primary/10 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">For bookings and inquiries</h3>
        <p className="text-lg text-gray-700 mb-4">Contact us at <a href="tel:0898000845" className="text-primary font-semibold">0898-0000-845</a></p>
        <p className="text-gray-600">Instagram: @dinarmakeup</p>
      </div>
    </div>
  )
}

export default Makeups