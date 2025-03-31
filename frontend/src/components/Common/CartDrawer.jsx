import React from 'react'
import { IoMdClose } from 'react-icons/io';
import CartContent from '../Cart/CartContent';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { formatCurrency } from '../../helpers/formatCurrency';
import { HiOutlineShoppingBag } from 'react-icons/hi2';

export default function CartDrawer({ drawerOpen, toggleDrawer }) {
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)
    const { listCarts, totalPrice } = useSelector((state) => state.carts)

    const handleCheckout = () => {
        navigate('/checkout')
        toggleDrawer()
    }

    const handleLogin = () => {
        navigate('/login')
        toggleDrawer()
    }

    return (
        <div className={`fixed top-0 right-0 bottom-0 w-3/4 sm:w-1/2 md:w-[30rem] bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${drawerOpen ?
            'translate-x-0' : 'translate-x-full'
            }`}>
            <div className='flex justify-end p-4'>
                <button onClick={toggleDrawer} className='cursor-pointer'>
                    <IoMdClose className='w-6 h-6' onClick={toggleDrawer} />
                </button>
            </div>

            {user ? (
                <>
                    <div className='grow p-4 overflow-y-auto'>
                        {listCarts?.products?.length > 0 && (
                            <h2 className='text-xl font-semibold mb-4'>Giỏ hàng</h2>
                        )}
                        <CartContent />
                    </div>

                    {listCarts?.products?.length > 0 && (
                        <div className='p-4 bg-white sticky bottom-0'>
                            <button onClick={handleCheckout} className='w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition'>Thanh toán</button>
                            <p className='text-sm tracking-tighter text-gray-500 mt-2 text-center'>Tổng: {formatCurrency(totalPrice)}</p>
                        </div>
                    )}
                </>
            ) : (
                <div className='flex flex-col items-center justify-center grow p-4'>
                    <HiOutlineShoppingBag className='w-6 h-6' />
                    <p className='text-lg tracking-tighter text-gray-500 mt-2 text-center'>Đăng nhập để truy cập giỏ hàng</p>
                    <button onClick={handleLogin} className='mt-4 bg-black text-white p-3 rounded-lg font-semibold hover:bg-gray-800 transition'>Đăng nhập</button>
                </div>
            )}
        </div>
    )
}
