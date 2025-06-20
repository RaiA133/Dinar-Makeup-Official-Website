import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

export default function TestimoniPage() {
  const navigate = useNavigate();

  const testimonials = [
    {
      id: 1,
      name: "Jane D",
      role: "CEO",
      image: "https://i.pravatar.cc/150?img=10",
      rating: 5,
      comment: "Pelayanan dari Dinar Makeup sangat memuaskan! Hasil makeup natural dan tahan lama seharian."
    },
    {
      id: 2,
      name: "Harsh P.",
      role: "Product Designer",
      image: "https://i.pravatar.cc/150?img=11",
      rating: 5,
      comment: "Pelayanan dari Dinar Makeup sangat memuaskan! Hasil makeup natural dan tahan lama seharian."
    },
    {
      id: 3,
      name: "Jane D",
      role: "CEO",
      image: "https://i.pravatar.cc/150?img=12",
      rating: 5,
      comment: "Pelayanan dari Dinar Makeup sangat memuaskan! Hasil makeup natural dan tahan lama seharian."
    },
    {
      id: 4,
      name: "Harsh P.",
      role: "Product Designer",
      image: "https://i.pravatar.cc/150?img=13",
      rating: 5,
      comment: "Pelayanan dari Dinar Makeup sangat memuaskan! Hasil makeup natural dan tahan lama seharian."
    }
  ];

  return (
    <div className="mx-3 my-20">
      {/* Judul hanya di halaman home */}
      {window.location.pathname === "/" && (
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Apa Kata Mereka?</h2>
          <div className="flex justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-amber-400 text-xl" />
            ))}
          </div>
        </div>
      )}

      <section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8 max-w-sm sm:max-w-2xl lg:max-w-full mx-auto">

            <div className="w-full lg:w-2/5">
              <span className="text-sm text-base-500 font-medium mb-4 block">Customers Testimonial</span>
              <h2 className="text-4xl font-bold text-base-900 leading-[3.25rem] mb-8">
                Semua Pelanggan yang Memberikan{' '}
                <span className="bg-clip-text bg-gradient-to-tr text-primary">
                  Feedback
                </span>
              </h2>

              {/* Slider controls */}
              <div className="flex items-center justify-center lg:justify-start gap-5">
                <button id="slider-button-left" className='btn btn-outline btn-primary px-5 w-fit'><FaChevronLeft/></button>
                <button id="slider-button-right" className='btn btn-outline btn-primary px-5 w-fit'><FaChevronRight/></button>
              </div>
            </div>

            <div className="w-full lg:w-3/5">
              <Swiper
                modules={[Navigation]}
                navigation={{
                  nextEl: '#slider-button-right',
                  prevEl: '#slider-button-left',
                  disabledClass: 'opacity-50 cursor-not-allowed'
                }}
                slidesPerView={1}
                spaceBetween={28}
                loop={true}
                breakpoints={{
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 28,
                  },
                  1024: {
                    slidesPerView: 2,
                    spaceBetween: 32,
                  },
                }}
                className="mySwiper"
              >
                {testimonials.map((testimonial) => (
                  <SwiperSlide key={testimonial.id}>
                    <div className="group bg-base-100 border border-solid border-base-300 rounded-2xl max-sm:max-w-sm max-sm:mx-auto p-6 transition-all duration-500 hover:border-primary">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="avatar">
                          <div className="w-16 rounded-full">
                            <img src={testimonial.image} alt="Customer" />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold">{testimonial.name}</h4>
                          <div className="flex gap-1 text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <FaStar key={i} className="text-sm" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-base-600 italic">
                        "{testimonial.comment}"
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}