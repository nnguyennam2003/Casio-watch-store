import React from 'react'
import { Link } from 'react-router-dom'
import { TbBrandMeta } from 'react-icons/tb';
import { FiPhoneCall } from 'react-icons/fi';

export default function Footer() {
    return (
        <footer className='border-t py-12 border-gray-200'>
            <div className='container mx-auto max-w-[1400px] grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0'>
                <div>
                    <h3 className='text-lg text-gray-800 mb-4'>Newsletter</h3>
                    <p className='text-gray-500 mb-4'>
                        Be the first to know about new arrivals, sales & promos!
                    </p>
                    <p className='text-sm font-medium text-gray-800 mb-6'>
                        Sign up for our newsletter
                    </p>

                    <form className='flex'>
                        <input type="email" placeholder='Enter your email' className='p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all' required />
                        <button type='submit' className='bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-800 transition-all'>Subscribe</button>
                    </form>
                </div>
                {/* Shop links */}
                <div>
                    <h3 className='text-lg text-gray-800 mb-4'>
                        Shop
                    </h3>
                    <ul className='space-y-2 text-gray-600'>
                        <li>
                            <Link to='#' className='hover:text-gray-800 transition-colors'>Nam</Link>
                        </li>
                        <li>
                            <Link to='#' className='hover:text-gray-800 transition-colors'>Nữ</Link>
                        </li>
                        <li>
                            <Link to='#' className='hover:text-gray-800 transition-colors'>Cặp đôi</Link>
                        </li>
                        <li>
                            <Link to='#' className='hover:text-gray-800 transition-colors'>Phụ kiện</Link>
                        </li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className='text-lg text-gray-800 mb-4'>Support</h3>
                    <ul className='space-y-2 text-gray-600'>
                        <li>
                            <Link to='#' className='hover:text-gray-800 transition-colors'>FAQ</Link>
                        </li>
                        <li>
                            <Link to='#' className='hover:text-gray-800 transition-colors'>Shipping</Link>
                        </li>
                        <li>
                            <Link to='#' className='hover:text-gray-800 transition-colors'>Returns</Link>
                        </li>
                        <li>
                            <Link to='#' className='hover:text-gray-800 transition-colors'>Contact</Link>
                        </li>
                    </ul>
                </div>

                {/* Follow us */}
                <div>
                    <h3 className='text-lg text-gray-800 mb-4'>Follow us</h3>
                    <div className='flex items-center gap-1 mb-6'>
                        <a href="#" target='_blank' rel='noreferrer' className='hover:text-gray-500'><TbBrandMeta className='w-5 h-5' /></a>
                        <a href="#" target='_blank' rel='noreferrer' className='hover:text-gray-500'><TbBrandMeta className='w-5 h-5' /></a>
                        <a href="#" target='_blank' rel='noreferrer' className='hover:text-gray-500'><TbBrandMeta className='w-5 h-5' /></a>
                    </div>
                    <p className='text-gray-500'>Call Us</p>
                    <p>
                        <FiPhoneCall className='inline-block mr-2' />
                        0987654321
                    </p>
                </div>
            </div>
            <div className='container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6'>
                <p className='text-gray-500 text-sm tracking-tighter text-center'>
                    © 2025, compileTab. All rights reserved.
                </p>
            </div>
        </footer>
    )
}
