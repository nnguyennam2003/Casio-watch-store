import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDetailProduct } from '../../redux/slices/adminProduct'
import { useParams } from 'react-router-dom'

export default function EditProduct() {
    const { detailProduct } = useSelector(state => state.adminProducts)
    const dispatch = useDispatch()
    const {id} = useParams()

    const [editedProduct, setEditedProduct] = useState({
        name: "",
        description: "",
        price: 0,
        discountPrice: 0,
        countInStock: 0,
        sku: "",
        gender: "",
        caseMaterial: "",
        bandMaterial: "",
        movement: "",
        waterResistance: "",
        dialDiameter: "",
        images: []
    })

    useEffect(() => {
        if (detailProduct) {
            setEditedProduct(detailProduct);
        }
    }, [detailProduct]);

    useEffect(() => {
        dispatch(getDetailProduct(id))
    }, [dispatch, id])

    const handleChange = (e) => {
        const { name, value } = e.target
        setEditedProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleImageUpload = async (e) => {
        const file = e.target.files[0]
        console.log(file)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Dữ liệu cập nhật:", editedProduct)
    }

    return (
        <div className='max-w-5x mx-auto p-6 shadow-md rounded-md'>
            <h2 className="text-3xl font-bold mb-6">Edit product</h2>

            <form onSubmit={handleSubmit}>
                <div className='mb-6'>
                    <label className='block font-bold mb-2'>Product Name</label>
                    <input type="text" name="name" value={detailProduct.name} onChange={handleChange} className='w-full p-2 border border-gray-300 rounded-md' required />
                </div>
                <div className='mb-6'>
                    <label className='block font-bold mb-2'>Description</label>
                    <textarea rows="4" name="description" value={detailProduct.description} onChange={handleChange} className='w-full p-2 border border-gray-300 rounded-md' required />
                </div>
                <div className='mb-6'>
                    <label className='block font-bold mb-2'>Price</label>
                    <input type="number" name="price" value={detailProduct.price} onChange={handleChange} className='w-full p-2 border border-gray-300 rounded-md' required />
                </div>
                <div className='mb-6'>
                    <label className='block font-bold mb-2'>Discount price</label>
                    <input type="number" name="price" value={detailProduct.discountPrice} onChange={handleChange} className='w-full p-2 border border-gray-300 rounded-md' required />
                </div>
                <div className='mb-6'>  
                    <label className='block font-bold mb-2'>Count In Stock</label>
                    <input type="number" name="countInStock" value={detailProduct.countInStock} onChange={handleChange} className='w-full p-2 border border-gray-300 rounded-md' required />
                </div>
                <div className='mb-6'>  
                    <label className='block font-bold mb-2'>SKU</label>
                    <input type="text" name="sku" value={detailProduct.sku} onChange={handleChange} className='w-full p-2 border border-gray-300 rounded-md' required />
                </div>
                <div className='mb-6'>  
                    <label className='block font-bold mb-2'>Gender</label>
                    <div className="flex gap-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="Men"
                                checked={detailProduct.gender === "Men"}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Men
                        </label>

                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="Women"
                                checked={detailProduct.gender === "Women"}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Women
                        </label>

                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="Unisex"
                                checked={detailProduct.gender === "Unisex"}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Unisex
                        </label>
                    </div>
                </div>
                <div className='mb-6'>  
                    <label className='block font-bold mb-2'>Case Material</label>
                    <input type="text" name="case" value={detailProduct.caseMaterial} onChange={handleChange} className='w-full p-2 border border-gray-300 rounded-md' required />
                </div>
                <div className='mb-6'>
                    <label className='block font-bold mb-2'>Band Material</label>
                    <input type="text" name="band" value={detailProduct.bandMaterial} onChange={handleChange} className='w-full p-2 border border-gray-300 rounded-md' required />
                </div>
                <div className='mb-6'>
                    <label className='block font-bold mb-2'>Movement</label>
                    <input type="text" name="movement" value={detailProduct.movement} onChange={handleChange} className='w-full p-2 border border-gray-300 rounded-md' required />
                </div>
                <div className='mb-6'>
                    <label className='block font-bold mb-2'>Band Material</label>
                    <input type="text" name="color" value={detailProduct.waterResistance} onChange={handleChange} className='w-full p-2 border border-gray-300 rounded-md' required />
                </div>
                <div className='mb-6'>
                    <label className='block font-bold mb-2'>Dial Diameter</label>
                    <input type="text" name="color" value={detailProduct.dialDiameter} onChange={handleChange} className='w-full p-2 border border-gray-300 rounded-md' required />
                </div>
                <div className='mb-6'>
                    <label className='block font-bold mb-2'>Upload</label>
                    <input type="file" onChange={handleImageUpload} />
                    <div className='flex gap-4 mt-4'>
                        {detailProduct?.images?.map((image, index) => (
                            <div className="" key={index}>
                                <img src={image.url} alt={image.altText || 'Product image'}
                                    className="w-20 h-20 object-cover rounded-md shadow-md"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <button type='submit' className='w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600'>Update</button>
            </form>
        </div>
    )
}
