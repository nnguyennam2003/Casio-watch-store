import React from 'react'
import { TbBrandMeta } from 'react-icons/tb';
// import { RiTwitterXLine } from 'react-icons/ri';

export default function Topbar() {
    return (
        <div className='bg-top-bar text-white'>
            <div className='container mx-auto max-w-[1400px] flex justify-between items-center py-3 px-4'>
                <div className='hidden md:flex items-center space-x-4'>
                    <a href="#" className='hover:text-gray-300'>
                        <TbBrandMeta className='h-5 w-5' />
                    </a>
                    <a href="#" className='hover:text-gray-300'>
                        <TbBrandMeta className='h-5 w-5' />
                    </a>
                    <a href="#" className='hover:text-gray-300'>
                        <TbBrandMeta className='h-5 w-5' />
                    </a>
                </div>
                <div className='text-sm text-center grow'>
                    <span>We ship worldwide - Fast a reliable shipping!</span>
                </div>
                <div className='text-sm hidden md:block'>
                    <a href="tel:+1234567890" className='hover:text-gray-300'>
                        +1 (234) 567-890
                    </a>
                </div>
            </div>
        </div>
    )
}
