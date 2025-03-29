const express = require('express')
const { protect } = require('../MiddleWare/authMiddleware')
const Order = require('../models/Order')

const router = express.Router()

router.get('/my-orders', protect, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 })
        res.json(orders)
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
})

router.get('/:id', protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name email")
        if (!order) {
            return res.status(404).json({ message: 'Order not found' })
        }

        res.json(order)
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
})

module.exports = router