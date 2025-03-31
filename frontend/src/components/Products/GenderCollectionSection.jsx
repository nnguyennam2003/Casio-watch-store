import React from 'react'

export default function GenderCollectionSection() {
    return (
        <section className='py-16 px-4 lg:px-0'>
            <div className='container mx-auto max-w-[1400px] flex flex-col md:flex-row gap-8'>
                {/* Women Collection */}
                <div className='relative flex-1'>
                    <img src="https://curnonwatch.com/blog/wp-content/uploads/2021/04/cac-loai-dong-ho-deo-tay-nu-098.jpg" alt="women"
                        className='w-full h-[500px] object-cover rounded-2xl'
                    />
                    <div className='absolute bottom-8 left-8 bg-white/80 rounded-2xl p-4'>
                        <h2 className='text-2xl font-bold text-gray-900'>
                            Đồng hồ nữ
                        </h2>
                    </div>
                </div>
                <div className='relative flex-1'>
                    <img src="https://www.homepaylater.vn/static/02a5449a3572799ffe846f3f0296655d/dbc82/cach_chon_dong_ho_nam_nhat_dinh_ban_phai_biet_ab2d8971b0.webp" alt="men"
                        className='w-full h-[500px] object-cover rounded-2xl'
                    />
                    <div className='absolute bottom-8 left-8 bg-white/80 rounded-2xl p-4'>
                        <h2 className='text-2xl font-bold text-gray-900'>
                            Đồng hồ nam
                        </h2>
                    </div>
                </div>
            </div>
        </section>
    )
}
