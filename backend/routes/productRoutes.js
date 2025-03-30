const express = require('express')
const { protect, admin } = require('../MiddleWare/authMiddleware')
const Product = require('../models/Product')

const router = express.Router()

router.post('/', protect, admin, async (req, res) => {
    try {
        const { name, description, price, discountPrice, countInStock, category, brand, size, colors, collections, material, gender, images, isFeatured, isPublished, tags, dimensions, sku, weight } = req.body

        const product = new Product({
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            size,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            sku,
            weight,
            user: req.user._id
        })

        const createdProduct = await product.save()
        res.status(201).json(createdProduct)
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
})

router.put('/:id', protect, admin, async (req, res) => {
    try {
        const { name, description, price, discountPrice, countInStock, category, brand, size, colors, collections, material, gender, images, isFeatured, isPublished, tags, dimensions, sku, weight } = req.body

        const product = await Product.findById(req.params.id)

        if (product) {
            product.name = name || product.name
            product.description = description || product.description
            product.price = price || product.price
            product.discountPrice = discountPrice || product.discountPrice
            product.countInStock = countInStock || product.countInStock
            product.category = category || product.category
            product.brand = brand || product.brand
            product.size = size || product.size
            product.colors = colors || product.colors
            product.collections = collections || product.collections
            product.material = material || product.material
            product.gender = gender || product.gender
            product.images = images || product.images
            product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured
            product.isPublished = isPublished !== undefined ? isPublished : product.isPublished
            product.tags = tags || product.tags
            product.dimensions = dimensions || product.dimensions
            product.sku = sku || product.sku
            product.weight = weight || product.weight

            const updatedProduct = await product.save()
            res.json(updatedProduct)
        } else {
            res.status(404).json({ message: 'Product not found' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
})

router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (product) {
            await product.deleteOne()
            res.json({ message: "Product removed" })
        }
    } catch (error) {
        res.status(404).json({ message: 'Product not found' })
    }
})

router.get('/', async (req, res) => {
    try {
        console.log("Received query params:", req.query)
        const { category, gender } = req.query

        const query = {}
        if (category) query.category = category
        if (gender) query.gender = gender

        const products = await Product.find(query)
        res.json(products)
    } catch (error) {
        console.error(error)
        res.status(500).send("Server Error")
    }
})

router.get('/similar/:id', async (req, res) => {
    const { id } = req.params
    try {
        const product = await Product.findById(id)

        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        const similarProducts = await Product.find({
            _id: { $ne: id },
            gender: product.gender,
            category: product.category
        }).limit(4)

        res.json(similarProducts)

    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
})

router.get('/best-seller', async (req, res) => {
    try {
        const bestseller = await Product.find().limit(12)
        res.json(bestseller)
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
})

router.get('/new-arrivals', async (req, res) => {
    try {
        const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8)
        res.json(newArrivals)
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
})

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (product) {
            res.json(product)
        } else {
            res.status(404).json({ message: 'Product not found' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
})

module.exports = router