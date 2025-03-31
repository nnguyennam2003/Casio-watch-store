import React from 'react'
import { TbBrandMeta } from 'react-icons/tb';
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Topbar() {
    return (
        <div className='bg-top-bar text-white'>
            <div className='container mx-auto max-w-[1400px] flex justify-between items-center py-3 px-4'>
                <div className='hidden md:flex items-center space-x-4'>
                    <a href="#" className='hover:text-gray-300'>
                        <FaFacebook className='h-5 w-5' />
                    </a>
                    <a href="#" className='hover:text-gray-300'>
                        <FaInstagram className='h-5 w-5' />
                    </a>
                    <a href="#" className='hover:text-gray-300'>
                        <FaYoutube className='h-5 w-5' />
                    </a>
                </div>
                <div className='text-sm text-center grow'>
                    <span>Miễn phí giao hàng - Cam kết chính hãng</span>
                </div>
                <div className='text-sm hidden md:block'>
                    <a href="tel:+1234567890" className='hover:text-gray-300'>
                        +1 345-6789
                    </a>
                </div>
            </div>
        </div>
    )
}
