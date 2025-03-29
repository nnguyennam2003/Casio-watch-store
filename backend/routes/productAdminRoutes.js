const express = require('express')
const { protect, admin } = require('../MiddleWare/authMiddleware')
const Product = require('../models/Product')

const router = express.Router()

router.get('/', protect, admin, async (req, res) => {
    try {
        const products = await Product.find({})
        res.json(products)
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
})

router.get('/:id', protect, admin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.json(product)
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
})



module.exports = router