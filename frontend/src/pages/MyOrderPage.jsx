import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getListOrders } from '../redux/slices/orderSlice'

export default function MyOrderPage() {
  const navigate = useNavigate()
  const { orders } = useSelector(state => state.orders)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getListOrders())
  }, [dispatch])

  const handleNavigate = (orderId) => {
    navigate(`/order/${orderId}`)
  }

  return (
    <div className='max-w-7xl mx-auto p-4 sm:p-6'>
      <h2 className='text-xl sm:text-2xl font-bold mb-6'>Đơn hàng của tôi</h2>
      <div className='relative shadow-md sm:rounded-lg overflow-hidden'>
        <table className='min-w-full text-left text-gray-500'>
          <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
            <tr>
              <th className='py-2 px-4 sm:py-3'>Ảnh</th>
              <th className='py-2 px-4 sm:py-3'>Mã đơn hàng</th>
              <th className='py-2 px-4 sm:py-3'>Ngày đặt</th>
              <th className='py-2 px-4 sm:py-3'>Thông tin</th>
              <th className='py-2 px-4 sm:py-3'>Sản phẩm</th>
              <th className='py-2 px-4 sm:py-3'>Giá</th>
              <th className='py-2 px-4 sm:py-3'>Tình trạng</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} onClick={() => handleNavigate(order._id)} className=' hover:bg-gray-50 cursor-pointer'>
                  <td className='py-2 px-2 sm:py-4 sm:px-4'>
                    <img src={order.orderItems[0].image} alt={order.orderItems[0].name} className='w-10 h-10 sm:h-12 rounded-lg object-cover' />
                  </td>
                  <td className='py-2 px-2 sm:py-4 sm:px-4 text-gray-900 font-medium whitespace-nowrap'>#{order._id}</td>
                  <td className='py-2 px-2 sm:py-4 sm:px-4'>{new Date(order.createdAt).toLocaleDateString()}{new Date(order.createdAt).toLocaleTimeString()}</td>
                  <td className='py-2 px-2 sm:py-4 sm:px-4'>{order.shippingAddress ? `${order.shippingAddress.city}, ${order.shippingAddress.country}` : 'N/A'}</td>
                  <td className='py-2 px-2 sm:py-4 sm:px-4'>
                    {order.orderItems.length}
                  </td>
                  <td className='py-2 px-2 sm:py-4 sm:px-4'>${order.totalPrice}</td>
                  <td className='py-2 px-2 sm:py-4 sm:px-4'>
                    <span className={`${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} text-xs sm:text-sm font-medium mr-2 px-2.5 py-0.5 rounded`}>{order.isPaid ? 'Paid' : 'Unpaid'}</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className='py-4 px-4 text-center text-gray-500'>
                  Bạn chưa có đơn hàng nào!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
