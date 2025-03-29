import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineUser, HiBars3BottomRight, HiOutlineShoppingBag } from 'react-icons/hi2';
import SearchBar from './SearchBar';
import CartDrawer from './CartDrawer';
import { IoMdClose } from 'react-icons/io';
import { useSelector } from 'react-redux';

export default function Navbar() {
    const { listCarts } = useSelector((state) => state.carts)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [navDrawerOpen, setNavDrawerOpen] = useState(false)

    const toggleNavDrawer = () => {
        setNavDrawerOpen(!navDrawerOpen)
    }

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen)
    }

    return (
        <>
            <nav className='container mx-auto max-w-[1400px] flex items-center justify-between py-4 px-6'>
                {/* Logo */}
                <div>
                    <Link to={'/'} className='text-2xl font-medium'>Logo</Link>
                </div>

                <div className='hidden md:flex space-x-6'>
                    <Link to={'/collection/all'} className='text-gray-700 hover:text-black text-sm font-medium uppercase'>Nam</Link>
                    <Link to={'#'} className='text-gray-700 hover:text-black text-sm font-medium uppercase'>Nữ</Link>
                    <Link to={'#'} className='text-gray-700 hover:text-black text-sm font-medium uppercase'>Cặp đôi</Link>
                    <Link to={'#'} className='text-gray-700 hover:text-black text-sm font-medium uppercase'>Phụ kiện</Link>
                </div>
                <div className='flex items-center space-x-4'>
                    <Link to={'/profile'} className='hover:text-black'>
                        <HiOutlineUser className='w-6 h-6' />
                    </Link>
                    <button onClick={toggleDrawer} className='relative hover:text-black cursor-pointer'>
                        <HiOutlineShoppingBag className='w-6 h-6 text-gray-700' />
                        <span className='absolute text-white text-xs rounded-full -top-1 px-2 py-0.5 bg-top-bar'>{listCarts?.products?.length ?? 0}</span>
                    </button>

                    {/* Search */}
                    <div className='overflow-hidden'>
                        <SearchBar />
                    </div>

                    <button className='md:hidden' onClick={toggleNavDrawer}>
                        <HiBars3BottomRight className='w-6 h-6 text-gray-700' />
                    </button>
                </div>
            </nav>

            <CartDrawer toggleDrawer={toggleDrawer} drawerOpen={drawerOpen} />

            {/* Mobile navbar */}
            <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${navDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className='flex justify-end p-4'>
                    <button onClick={toggleNavDrawer}>
                        <IoMdClose className='w-6 h-6 text-gray-600' />
                    </button>
                </div>
                <div className='p-4'>
                    <h2 className='text-xl font-semibold mb-4'>Menu</h2>
                    <nav className='space-y-4'>
                        <Link to="#" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>Nam</Link>
                        <Link to="#" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>Nữ</Link>
                        <Link to="#" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>Cặp đôi</Link>
                        <Link to="#" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>Phụ kiện</Link>
                    </nav>
                </div>
            </div>
        </>
    )
}
