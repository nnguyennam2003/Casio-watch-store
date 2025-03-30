import React from 'react'
import { Link } from 'react-router-dom'

export default function Hero() {

    return (
        <section className='relative'>
            <img src="https://www.casio-vietnam.vn/wp-content/uploads/2024/09/z5834462923434_9dd34cd3042bf9563757bd84509876af.jpg" alt="Casio"
                className='w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover'
            />
            <div className='absolute inset-0 bg-current/30 flex items-center justify-center'>
                <div className='text-center text-white p-6'>
                    <h1 className='text-3xl md:text-7xl font-bold tracking-tighter uppercase mb-4'>Casio Official Store</h1>
                    <p className='text-sm tracking-tighter md:text-lg mb-6'></p>
                    <Link to={"#"} className='bg-white text-gray-950 px-6 py-2 rounded-sm text-lg' >Mua ngay</Link>
                </div>
            </div>
        </section>
    )
}
