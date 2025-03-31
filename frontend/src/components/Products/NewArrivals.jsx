import React, { useEffect, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import instance from '../../config/axiosConfig'
import { formatCurrency } from '../../helpers/formatCurrency'
import LoadingGrid from '../Loading/LoadingGrid'

export default function NewArrivals() {
  const newArrivalsRef = useRef(null)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)
  const [newArrivals, setNewArrival] = useState([])

  useEffect(() => {
    const fetchNewArrival = async () => {
      try {
        const res = await instance.get('/products/new-arrivals')
        setNewArrival(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchNewArrival()
  }, [])

  useEffect(() => {
    if (newArrivalsRef.current) {
      const swiper = newArrivalsRef.current
      const handleSlideChange = () => {
        setIsBeginning(swiper.isBeginning)
        setIsEnd(swiper.isEnd)
      };

      swiper.on('slideChange', handleSlideChange)

      handleSlideChange();

      return () => {
        swiper.off('slideChange', handleSlideChange)
      }
    }
  }, [newArrivalsRef])


  return (
    <section>
      <div className='container mx-auto max-w-[1400px] text-center mb-10'>
        <h2 className='text-3xl font-bold mb-4'>Mới ra mắt</h2>
        <p className='text-lg text-gray-600 mb-8'>
          Mẫu Mới Nhất – Đón Đầu Xu Hướng!
        </p>
      </div>

      {
        newArrivals.length === 0 ? (
          <LoadingGrid />) : (
          <Swiper
            slidesPerView={1}
            spaceBetween={15}
            modules={[Navigation]}
            onSwiper={(swiper) => (newArrivalsRef.current = swiper)}
            className="mySwiper container mx-auto max-w-[1400px] flex space-x-6 md:mx-0 w-[85%]"
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 30 },
            }}
          >

            {newArrivals.map((product) => (
              <SwiperSlide key={product._id} className='max-w-[100%] sm:max-w-[50%] md:max-w-[30%]'>
                <img src={product.images[0]?.url} alt={product.images[0].altText} className='w-full h-[400px] object-cover rounded-lg' />
                <div className='absolute bottom-0 left-0 right-0 bg-black/20 backdrop-blur text-white p-4 rounded-b-lg'>
                  <Link to={`/product/${product._id}`} className='block'>
                    <h4 className='font-medium'>{product.name}</h4>
                    <p className='mt-1'>{formatCurrency(product.price)}</p>
                  </Link>
                </div>
              </SwiperSlide>
            ))}

            <div className='flex justify-center mt-7 space-x-4'>
              <button
                className={`bg-white text-white rounded-lg border border-gray-700 ${isBeginning ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => newArrivalsRef.current?.slidePrev()}
              >
                <FiChevronLeft className='w-9 h-9 text-gray-700' />
              </button>

              <button
                className={`bg-white text-white rounded-lg border border-gray-700 ${isEnd ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => newArrivalsRef.current?.slideNext()}
              >
                <FiChevronRight className='w-9 h-9 text-gray-700' />
              </button>
            </div>
          </Swiper>

        )
      }

    </section>
  )
}
