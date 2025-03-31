import React from 'react'
import { HiArrowPathRoundedSquare, HiOutlineCreditCard, HiShoppingBag } from 'react-icons/hi2'

export default function FeaturesSection() {
    return (
        <section className='py-16 px-4 bg-white'>
            <div className='container mx-auto max-w-[1400px] grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
                {/* Feature 1*/}
                <div className='flex flex-col items-center'>
                    <div className='p-4 rounded-full mb-4'>
                        <HiShoppingBag className='text-5xl' />
                    </div>
                    <h4 className='tracking-tighter mb-2'>
                        Miễn phí giao hàng
                    </h4>
                    <p className='text-gray-600 text-sm tracking-tighter'>
                        Đơn hàng trên 1.500.000 đ
                    </p>
                </div>

                {/* Feature 2*/}
                <div className='flex flex-col items-center'>
                    <div className='p-4 rounded-full mb-4'>
                        <HiArrowPathRoundedSquare className='text-5xl' />
                    </div>
                    <h4 className='tracking-tighter mb-2'>
                        Đổi trả hàng
                    </h4>
                    <p className='text-gray-600 text-sm tracking-tighter'>
                        Kiểm tra trước khi nhận hàng
                    </p>
                </div>

                {/* Feature 3*/}
                <div className='flex flex-col items-center'>
                    <div className='p-4 rounded-full mb-4'>
                        <HiOutlineCreditCard className='text-5xl' />
                    </div>
                    <h4 className='tracking-tighter mb-2'>
                        Thanh toán trực tuyến
                    </h4>
                    <p className='text-gray-600 text-sm tracking-tighter'>
                        ZaloPay, Momo, VNPAY
                    </p>
                </div>
            </div>

        </section>
    )
}
