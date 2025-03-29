import React from 'react'
import { Link } from 'react-router-dom'

export default function FeaturedCollection() {
    return (
        <section className='py-16 px-4 lg:px-0'>
            <div className='container mx-auto max-w-[1400px] flex flex-col-reverse lg:flex-row items-center bg-green-50 rounded-3xl'>
                {/* Left content */}
                <div className='lg:w-1/2 p-8 text-center lg:text-left'>
                    <h2 className='text-lg font-semibold text-gray-700 mb-2'>
                        Comfort and Style
                    </h2>
                    <h2 className='text-4xl lg:text-5xl font-bold mb-6'>
                        Lorem ipsum dolor sit amet consectetur.
                    </h2>
                    <p className='text-lg text-gray-600 mb-6'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum eum ipsam
                        sit minus dicta, reprehenderit illo eos quo debitis veniam!
                    </p>
                    <Link to={'/collections/all'} className='bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition'>
                        Shop now
                    </Link>
                </div>
                {/* Right content */}
                <div className='lg:w-1/2'>
                    <img src='https://www.casio.com/content/casio/locales/vn/vi/products/_jcr_content/root/responsivegrid/container_1790102794/content_panel_list/content_panel_2021030223222084211/image.casiocoreimg.jpeg/1677474624173/gshock-brand-banner.jpeg'
                        className='w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl'
                        alt="image" />
                </div>
            </div>
        </section>
    )
}
