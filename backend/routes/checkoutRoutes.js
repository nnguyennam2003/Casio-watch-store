const express = require('express')
const { protect } = require('../MiddleWare/authMiddleware')
const Checkout = require('../models/Checkout')
const Order = require('../models/Order')
const Cart = require('../models/Cart')

const router = express.Router()

router.post('/', protect, async (req, res) => {
    const { checkoutItems, paymentMethod, shippingAddress, totalPrice } = req.body

    if (!checkoutItems || checkoutItems.length === 0) {
        return res.status(400).json({ message: 'No checkout items' })
    }

    try {
        const newCheckout = await Checkout.create({
            user: req.user._id,
            checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus: 'Pending',
            isPaid: false
        })

        res.status(201).json({ checkoutId: newCheckout._id, success: true })
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
})

router.put('/:id/pay', protect, async (req, res) => {
    const { paymentStatus, paymentDetails } = req.body

    try {
        const checkout = await Checkout.findById(req.params.id)

        if (!checkout) {
            return res.status(404).json({ message: 'Checkout not found' })
        }

        if (paymentStatus === 'Paid') {
            checkout.isPaid = true
            checkout.paymentDetails = paymentDetails
            checkout.paymentStatus = paymentStatus
            checkout.paidAt = Date.now()
            await checkout.save()

            res.status(200).json(checkout)
        } else {
            res.status(400).json({ message: 'Payment not successful' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
})

router.post('/:id/finalize', protect, async (req, res) => {
    try {
        const checkout = await Checkout.findById(req.params.id)

        if (!checkout) {
            return res.status(404).json({ message: 'Checkout not found' })
        }

        if (checkout.isPaid && !checkout.isFinalized) {
            const finalOrder = await Order.create({
                user: checkout.user,
                orderItems: checkout.checkoutItems,
                shippingAddress: checkout.shippingAddress,
                paymentMethod: checkout.paymentMethod,
                totalPrice: checkout.totalPrice,
                isPaid: true,
                isDelivered: false,
                paidAt: checkout.paidAt,
                paymentStatus: 'paid',
                paymentDetails: checkout.paymentDetails
            })

            checkout.isFinalized = true
            checkout.finalizedAt = Date.now()
            await checkout.save()

            await Cart.findOneAndDelete({ user: checkout.user })
            res.status(201).json(finalOrder)
        } else if (checkout.isFinalized) {
            res.status(400).json({ message: 'Checkout already finalized' })
        } else {
            res.status(400).json({ message: 'Checkout not paid' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
})

module.exports = router