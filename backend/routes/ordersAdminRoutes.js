const express = require('express')
const { protect, admin } = require('../MiddleWare/authMiddleware')
const Order = require('../models/Order')

const router = express.Router()

router.get('/', protect, admin, async (req, res) => {
    try {
        const orders = await Order.find({}).populate("user", "name email")
        res.json(orders)
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
})

router.put('/:id', protect, admin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        if (order) {
            order.status = req.body.status || order.status
            order.isDelivered = req.body.status === 'Delivered' ? true : order.isDelivered
            order.deliveredAt = req.body.status === 'Delivered' ? Date.now() : order.deliveredAt

            const updatedOrder = await order.save()
            res.json(updatedOrder)
        } else {
            res.status(404).json({ message: 'Order not found' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
})

router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        if (order) {
            await order.deleteOne()
            res.json({ message: "Order removed" })
        } else {
            res.status(404).json({ message: 'Order not found' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
})

module.exports = router