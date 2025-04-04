import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getListProducts } from '../../redux/slices/adminProduct'

export default function ProductManage() {
    const { products } = useSelector((state) => state.adminProducts)
    const dispatch = useDispatch()

    useEffect(() => {  
        dispatch(getListProducts())
    }, [dispatch])

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            console.log({ id })
        }
    }

    return (
        <div className='max-w-full mx-auto p-6'>
            <h2 className='text-2xl font-bold mb-6'>Product Management</h2>
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <table className="min-w-full text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th scope="col" className="px-4 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-4 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-4 py-3">
                                SKU
                            </th>
                            <th scope="col" className="px-4 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>{products.length > 0 ? (
                        products.map((product) => (
                            <tr key={product._id} className="bg-white border-b hover:bg-gray-50 border-gray-200">
                                <td className="p-4 font-medium text-gray-900 whitespace-nowrap">{product.name}</td>
                                <td className="p-4">${product.price}</td>
                                <td className="p-4">{product.sku}</td>
                                <td className="p-4">
                                    <Link to={`/admin/products/${product._id}/edit`} className="text-white bg-yellow-500 px-2 py-1 rounded mr-2 hover:bg-yellow-600">Edit</Link>
                                    <button onClick={() => handleDelete(product._id)} className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 cursor-pointer'>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="p-4 text-center text-gray-500">
                                No products found
                            </td>
                        </tr>
                    )}</tbody>
                </table>
            </div>
        </div>
    )
}
