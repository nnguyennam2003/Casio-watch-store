import React, { useEffect, useState } from 'react'
import ProductGrid from './ProductGrid'
import { useParams } from 'react-router-dom'
import instance from '../../config/axiosConfig'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../redux/slices/cartSlice'
import {formatCurrency} from '../../helpers/formatCurrency'

export default function ProductDetail() {
    const { id } = useParams()
    const [mainImage, setMainImage] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [similarProducts, setSimilarProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null)
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.carts)

    const userId = JSON.parse(localStorage.getItem('user'))?._id

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id])

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await instance.get(`/products/${id}`);
                setSelectedProduct(response.data);
            } catch (err) {
                console.log(err);
            }
        }

        const fetchSimilarProducts = async () => {
            try {
                const response = await instance.get(`/products/similar/${id}`);
                setSimilarProducts(response.data);
            } catch (err) {
                console.log(err);
            }
        }

        fetchProduct()
        fetchSimilarProducts()
    }, [id]);

    useEffect(() => {
        if (selectedProduct?.images?.length > 0) {
            setMainImage(selectedProduct.images[0].url)
        }
    }, [selectedProduct])

    const handleAddToCart = () => {
        if (selectedProduct) {
            dispatch(addToCart({
                productId: selectedProduct._id,
                quantity,
                userId
            }))
        } 
    }

    const handleQuantityChange = (type) => {
        if (type === 'plus') setQuantity(quantity + 1);
        if (type === 'minus' && quantity > 1) setQuantity(quantity - 1)
    }

    return (
        <div className='p-6'>
            <div className='max-w-6xl mx-auto py-8 bg-white rounded-lg'>
                <div className='flex flex-col md:flex-row'>
                    {/* Left thumbnail */}
                    <div className='hidden md:flex flex-col space-y-4 mr-6'>
                        {
                            selectedProduct?.images?.map((image, index) => (
                                <img key={index} src={image.url} alt={image.altText} className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImage === image.url ? 'border-black' : 'border-gray-300'}`}
                                    onClick={() => setMainImage(image.url)}
                                />
                            ))
                        }
                    </div>
                    {/* Main image */}
                    <div className='md:w-1/2'>
                        <div className='mb-4'>
                            {selectedProduct?.images?.length > 0 && (
                                <img src={mainImage} alt={selectedProduct.images[0].altText || "Product image"} className='w-full h-auto md:h-[650px] object-cover rounded-lg' />
                            )}
                        </div>
                    </div>

                    {/* Mobile thumbnail */}
                    <div className='md:hidden flex overflow-x-scroll space-x-4 mb-4'>
                        {
                            selectedProduct?.images?.map((image, index) => (
                                <img key={index} src={image.url} alt={image.altText} className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImage === image.url ? 'border-black' : 'border-gray-300'}`}
                                    onClick={() => setMainImage(image.url)}
                                />
                            )
                            )}
                    </div>

                    {/* Right side */}
                    <div className='md:w-1/2 md:ml-10'>
                        <h1 className='text-2xl md:text-3xl font-semibold mb-2'>
                            {selectedProduct?.name}
                        </h1>

                        <p className='text-lg text-gray-600 mb-1 line-through'>
                            {formatCurrency(selectedProduct?.price && `${selectedProduct.price}`)}
                        </p>
                        <p className='text-xl text-red-500 font-semibold mb-2'>
                            {formatCurrency(selectedProduct?.discountPrice)}
                        </p>
                        <p className='text-gray-600 mb-4'>
                            {selectedProduct?.description}
                        </p>
                       

                        <div className='mb-6'>
                            <p className='text-gray-700'>Quantity:</p>
                            <div className='flex items-center space-x-4 mt-2'>
                                <button className='px-2 py-1 bg-gray-200 rounded text-lg'
                                    onClick={() => handleQuantityChange("minus")}
                                >
                                    -
                                </button>
                                <span className='w-6 text-center'>{quantity}</span>
                                <button className='px-2 py-1 bg-gray-200 rounded text-lg'
                                    onClick={() => handleQuantityChange("plus")}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <button onClick={handleAddToCart} disabled={loading} className={`bg-black text-white py-2 px-6 rounded w-full mb-4 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-900'}`}>
                            {loading ? 'Đang thêm...' : 'Thêm vào giỏ hàng'}
                        </button>

                        <div className='mt-10 text-gray-700'>
                            <h3 className='text-xl font-bold mb-4'>Chi tiết sản phẩm:</h3>
                            <table className='w-full text-left text-sm text-gray-600'>
                                <tbody>
                                    <tr>
                                        <td className='py-1'>Thương hiệu</td>
                                        <td className='py-1'>Casio</td>
                                    </tr>
                                    <tr>
                                        <td className='py-1'>Mặt đồng hồ</td>
                                        <td className='py-1'>{selectedProduct?.caseMaterial}</td>
                                    </tr>
                                    <tr>
                                        <td className='py-1'>Chất liệu dây đeo</td>
                                        <td className='py-1'>{selectedProduct?.bandMaterial}</td>
                                    </tr>
                                    <tr>
                                        <td className='py-1'>Loại máy</td>
                                        <td className='py-1'>{selectedProduct?.movement}</td>
                                    </tr>
                                    <tr>
                                        <td className='py-1'>Kích thước bề mặt</td>
                                        <td className='py-1'>{selectedProduct?.dialDiameter}mm</td>
                                    </tr>
                                    <tr>
                                        <td className='py-1'>Chống nước</td>
                                        <td className='py-1'>{selectedProduct?.waterResistance}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='mt-20'>
                    <h2 className='text-2xl text-center font-medium mb-4'>
                        Sản phẩm tương tự
                    </h2>
                    <ProductGrid products={similarProducts} />
                </div>
            </div>
        </div>
    )
}