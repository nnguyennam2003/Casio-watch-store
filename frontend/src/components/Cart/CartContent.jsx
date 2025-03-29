import React from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCart } from '../../redux/slices/cartSlice';
import { formatCurrency } from '../../helpers/formatCurrency'
export default function CartContent() {
    const { listCarts } = useSelector((state) => state.carts)
    const dispatch = useDispatch()
    const userId = JSON.parse(localStorage.getItem('user'))?._id

    if (!listCarts || !listCarts.products) {
        return <p className="text-center py-4">Giỏ hàng trống</p>;
    }

    const handleDeleteCart = (productId) => {
        dispatch(deleteCart({ productId, userId }))
        console.log({ productId, userId })
    }

    return (
        <>
            {
                listCarts.products.length > 0 ? (
                    listCarts.products.map((product, index) => (
                        <div key={index} className='flex items-start justify-between py-4 border-b'>
                            <div className='flex items-start'>
                                <img src={product.image} alt={product.image} className='w-20 h-24 object-cover mr-4 rounded' />
                                <div>
                                    <h3>{product.name}</h3>
                                    <div className='flex items-center mt-2'>
                                        <button className='border rounded px-2 py-1 text-xl font-medium'>-</button>
                                        <span className='mx-4'>{product.quantity}</span>
                                        <button className='border rounded px-2 py-1 text-xl font-medium'>+</button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className='font-medium'>{formatCurrency(product.price)}</p>
                                <button>
                                    <RiDeleteBin6Line onClick={() => handleDeleteCart(product.productId)} className='w-6 h-6 mt-3 text-red-600' />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='flex align-center justify-center'>
                        <p className="text-center py-4">Không có sản phẩm nào trong giỏ hàng của bạn</p>
                    </div>
                )
            }
        </>
    )
}
