import React from 'react'
import { useSelector } from 'react-redux'
import { formatCurrency } from '../helpers/formatCurrency'


export default function OrderConfirmation() {
  const { order } = useSelector(state => state.checkout)
  const calculateEstimatedDelivery = (createAt) => {
    const orderDate = new Date(createAt)
    orderDate.setDate(orderDate.getDate() + 5)
    return orderDate.toLocaleDateString()
  }

  return (
    <div className='max-w-4xl mx-auto p-6 bg-white'>
      <h1 className='text-4xl font-bold text-center text-emerald-700 mb-8'>
        Bạn đã đặt hàng thành công!
      </h1>

      {
        order && (
          <div className='p-6 rounded-lg border'>
            <div className='flex justify-between mb-20'>
              <div>
                <h2 className='text-xl font-semibold'>
                  Mã đơn hàng: {order._id}
                </h2>
                <p className='text-gray-500'>Order date: {new Date(order.createAt).toLocaleDateString()}</p>
              </div>

              <div>
                <p className='text-emerald-700 text-sm'>
                  Dự kiến giao đến: {" "}
                  {calculateEstimatedDelivery(order.createAt)}
                </p>
              </div>
            </div>

            <div className='mb-20'>
              {order?.orderItems?.map(item => (
                <div key={item.productId} className='flex items-center mb-4'>
                  <img src={item.image} alt={item.name} className='w-16 h-16 object-cover mr-4 rounded-md' />
                  <div>
                    <h4 className='text-xl font-semibold'>
                      {item.name}
                    </h4>
                  </div>
                  <div className='ml-auto text-right'>
                    <p className='text-lg'>{formatCurrency(item.price)}</p>
                    <p className='text-sm text-gray-500'>Số lượng: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className='grid grid-cols-2 gap-8'>
              <div>
                <h4 className='text-lg font-semibold mb-2'>Phương thức thanh toán</h4>
                <p className='text-gray-600'>{order.paymentMethod}</p>
              </div>
              <div>
                <h4 className='text-lg font-semibold mb-2'>Thông tin vận chuyển</h4>
                <p className='text-gray-600'>
                  {order?.shippingAddress?.address}
                </p>
                <p className='text-gray-600'>{order?.shippingAddress?.city}, {" "} {order?.shippingAddress?.country}</p>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}
