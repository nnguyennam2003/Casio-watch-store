import React from 'react'
import { Link } from 'react-router-dom'

export default function FeaturedCollection() {
    return (
        <section className='py-16 px-4 lg:px-0'>
            <div className='container mx-auto max-w-[1400px] flex flex-col-reverse lg:flex-row items-center bg-green-50 rounded-3xl'>
                {/* Left content */}
                <div className='lg:w-1/2 p-8 text-center lg:text-left'>
                    <h2 className='text-lg font-semibold text-gray-700 mb-2'>
                        Bền bỉ và hiện đại
                    </h2>
                    <h2 className='text-4xl lg:text-5xl font-bold mb-6'>
                        G-SHOCK - Mẫu đồng hồ không ngừng đặt ra các tiêu chuẩn mới về độ bền
                    </h2>
                    <p className='text-lg text-gray-600 mb-6'>
                        CASIO GSHOCK GBD-200UU-1D là một mẫu đồng hồ mang màu đen đơn sắc được kết hợp với dây đeo bằng vải nhiều người ưa thích bởi sự hữu dụng và tính thời trang cao.
                    </p>
                    <Link to={'/product/67ea0feec98254f72f6465b7'} className='bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition'>
                        Xem ngay
                    </Link>
                </div>
                {/* Right content */}
                <div className='lg:w-1/2'>
                    <img src='https://casio-hcm.vn/wp-content/uploads/2022/12/3-1.jpg'
                        className='w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl'
                        alt="image" />
                </div>
            </div>
        </section>
    )
}
