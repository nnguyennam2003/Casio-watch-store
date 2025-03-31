import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getOrderDetail } from '../redux/slices/orderSlice'

export default function OrderDetail() {
  const { id } = useParams()
  const { orderDetail } = useSelector(state => state.orders)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrderDetail(id))
  }, [dispatch, id])

  return (
    <div className='max-w-7xl mx-auto p-4 sm:p-6'>
      <h2 className='text-2x md:text-3xl font-bold mb-6'>Chi tiết đơn hàng</h2>
      {!orderDetail ? (<p>No Order details found</p>) : (
        <div className='p-4 sm:p-6 rounded-lg border'>
          <div className='flex flex-col sm:flex-row justify-between mb-8'>
            <div>
              <h3 className='text-gray-600'>
                {new Date(orderDetail.createAt).toLocaleDateString()}
              </h3>
            </div>
            <div className='flex flex-col items-start sm:items-end mt-4 sm:mt-0'>
              <span className={`${orderDetail.isPaid ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'} px-3 py-1 rounded-full text-sm font-medium mb-2`}>
                {orderDetail.isPaid ? 'Approved' : 'Pending'}
              </span>
              <span className={`${orderDetail.isDelivered ? 'text-green-700 bg-green-100' : 'text-yellow-700 bg-yellow-100'} px-3 py-1 rounded-full text-sm font-medium mb-2`}>
                {orderDetail.isDelivered ? 'Delivered' : 'Pending'}
              </span>
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8'>
            <div>
              <h4 className='text-lg font-semibold mb-2'>Thông tin thanh toán</h4>
              <p>Phương thức thanh toán: {orderDetail.paymentMethod}</p>
              <p>Tình trạng: {orderDetail.isPaid ? "Paid" : "Unpaid"}</p>
            </div>
          </div>

          <div className='overflow-x-auto'>
            <h4 className='text-lg font-semibold mb-4'>Sản phẩm</h4>
            <table className='min-w-full text-gray-600 mb-4'>
              <thead className="bg-gray-100">
                <tr>
                  <th className='py-2 px-4'>Tên</th>
                  <th className='py-2 px-4'>Giá</th>
                  <th className='py-2 px-4'>Số lượng</th>
                  <th className='py-2 px-4'>Tổng giá</th>
                </tr>
              </thead>
              <tbody>
                {!orderDetail.orderItems ? (<tr>
                  <td>Chưa có đơn hàng nào!</td>
                </tr>) : (
                  orderDetail.orderItems.map((item) => (
                    <tr key={item.productId} className='border-b border-gray-200'>
                      <td className='py-2 px-4 flex items-center'>
                        <img src={item.image} alt={item.name} className='w-12 h-12 object-cover rounded-lg mr-4' />
                        <Link to={`/product/${item.productId}`} className='text-blue-500 hover:underline'>
                          {item.name}
                        </Link>
                      </td>
                      <td className="py-2 px-4 text-center">${item.price}</td>
                      <td className="py-2 px-4 text-center">{item.quantity}</td>
                      <td className="py-2 px-4 text-center">${item.price * item.quantity}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <Link to={'/my-orders'} className='text-blue-500 hover:underline'>Quay về</Link>
        </div>
      )}
    </div>
  )
}