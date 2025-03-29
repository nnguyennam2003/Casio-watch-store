import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PaypalButton from './PaypalButton'
import { useDispatch, useSelector } from 'react-redux'
import { formatCurrency } from '../../helpers/formatCurrency'
import SelectedProvince from '../Province/SelectedProvince'
import { createCheckout, finalizeOrder, updatePaymentStatus } from '../../redux/slices/checkoutSlice'

export default function Checkout() {
    const { listCarts, totalPrice } = useSelector((state) => state.carts)
    const { checkout } = useSelector((state) => state.checkout)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [shippingAddress, setShippingAddress] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        district: "",
        ward: "",
        phone: ""
    })

    const handleCreateCheckout = async (e) => {
        e.preventDefault();

        const orderData = {
            checkoutItems: listCarts.products,
            paymentMethod: 'PayPal',
            shippingAddress,
            totalPrice: totalPrice
        };

        console.log(orderData)
        dispatch(createCheckout(orderData));
    }

    const handlePaymentSuccess = async (details) => {
        console.log('Payment success:', details);

        if (!checkout.checkoutId) {
            return alert("Error: Missing checkout ID!");
        }

        const paymentData = {
            paymentStatus: 'Paid',
            paymentDetails: {
                id: details.id,
                status: details.status,
                update_time: details.update_time,
                payer: {
                    email_address: details.payer.email_address,
                    payer_id: details.payer.payer_id,
                    name: details.payer.name.full_name
                },
                purchase_units: details.purchase_units.map(unit => ({
                    amount: unit.amount,
                    payee: unit.payee
                }))
            }
        };

        try {
            const response = await dispatch(updatePaymentStatus({
                checkoutId: checkout.checkoutId,
                paymentData
            }));

            if (response.payload?.isPaid) {
                dispatch(finalizeOrder(checkout.checkoutId));
                navigate('/order-confirmation');
            } else {
                alert("Payment update failed");
            }
        } catch (error) {
            console.error("Error updating payment:", error);
        }
    }

    const getAddress = (selectedAddress) => {
        setShippingAddress(prev => ({
            ...prev,
            city: selectedAddress.city,
            district: selectedAddress.district,
            ward: selectedAddress.ward
        }));
    }

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter'>
            <div className='bg-white rounded-lg p-6'>
                <h2 className='text-2xl uppercase mb-4'>Đặt hàng</h2>
                <form onSubmit={handleCreateCheckout}>
                    <h3 className='text-lg mb-4'>Thông tin liên hệ</h3>
                    <div className='mb-4'>
                        <label className="block mb-2 text-gray-700">Email</label>
                        <input type="email" value={JSON.parse(localStorage.getItem('user')).email} className="w-full p-2 border rounded" disabled />
                    </div>
                    <div className='mb-4 grid grid-cols-2 gap-4'>
                        <div>
                            <label className="block text-gray-700">Họ</label>
                            <input type="text" className="w-full p-2 border rounded"
                                value={shippingAddress.firstName}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Tên</label>
                            <input type="text" className="w-full p-2 border rounded"
                                value={shippingAddress.lastName}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <SelectedProvince getAddress={getAddress}/>

                    <div className='mb-4'>
                        <label className="block text-gray-700">Số nhà</label>
                        <input type="text" value={shippingAddress.address}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className='mb-4'>
                        <label className="block text-gray-700">Số điện thoại</label>
                        <input type="tel" value={shippingAddress.phone}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className='mt-6'>
                        {!checkout.checkoutId ? (
                            <button type='submit' className='w-full bg-black text-white py-3 rounded'>Continue to payment</button>
                        ) : (
                            <div>
                                <h3 className='text-lg mb-4'>Pay with Paypal</h3>
                                <PaypalButton amount={100} onSuccess={handlePaymentSuccess} onError={() => alert('Payment failed')} />
                            </div>
                        )}
                    </div>
                </form>
            </div>

            {/* Right Section */}
            <div className='p-6 rounded-lg'>
                <h3 className='text-lg mb-4'>Order Summary</h3>
                <div className='border-t border-gray-200 py-4 mb-4'>
                    {listCarts.products.map((product, index) => (
                        <div key={index} className='flex items-start justify-between py-2 border-b border-gray-200'>
                            <div className='flex items-start'>
                                <img src={product.image} alt={product.name} className='w-20 h-24 object-cover mr-4' />

                                <div>
                                    <h3 className='text-md mb-2'>{product.name}</h3>
                                    <p className='text-gray-500'>Quantity: {product.quantity}</p>
                                </div>
                            </div>
                            <p className='text-xl'>{formatCurrency(product.price)}</p>
                        </div>
                    ))}
                </div>
                <div className='flex justify-between items-center text-lg mb-4'>
                    <p>Subtotal</p>
                    <p>{formatCurrency(totalPrice)}</p>
                </div>
                <div className='flex justify-between items-center text-lg'>
                    <p>Shipping</p>
                    <p>Free</p>
                </div>
                <div className='flex justify-between items-center text-lg mt-4 border-t border-gray-200 pt-4'>
                    <p>Total</p>
                    <p>{formatCurrency(totalPrice)}</p>
                </div>
            </div>
        </div>
    )
}
