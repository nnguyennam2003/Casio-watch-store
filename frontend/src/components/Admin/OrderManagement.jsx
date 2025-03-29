import React from 'react'

export default function OrderManagement() {
    const orders = [
        {
            _id: 123123123,
            user: {
                name: 'John Doe',
                email: 'a@b.com'
            },
            totalPrice: 120,
            status: "Processing"
        }
    ]

    const handleStatusChange = (orderId, status) => {
        console.log({ id: orderId, status })
    }

    return (
        <div className='max-w-7xl mx-auto p-6'>
            <h2 className="text-2xl font-bold mb-6">Order Management</h2>

            <div className='overflow-x-auto shadow-md sm:rounded-lg'>
                <table className="min-w-full text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th className="px-4 py-3">
                                Order ID
                            </th>
                            <th className="px-4 py-3">
                                User
                            </th>
                            <th className="px-4 py-3">
                                Total Price
                            </th>
                            <th className="px-4 py-3">
                                Status
                            </th>
                            <th className="px-4 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? orders.map((order) => (
                            <tr key={order._id} className='border-b hover:bg-gray-50 cursor-pointer border-gray-200'>
                                <td className="p-4 font-medium text-gray-900 whitespace-nowrap">{order._id}</td>
                                <td className="p-4">{order.user.name}</td>
                                <td className="p-4">{order.totalPrice}</td>
                                <td className="p-4">
                                    <select onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        value={order.status}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    >
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                                <td className="p-4">
                                    <button className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded'>Mark as delivered</button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={5} className="p-4 text-center text-gray-500">No orders found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
