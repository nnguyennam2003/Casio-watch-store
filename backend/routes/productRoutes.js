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
        const { collections, size, color, gender, minPrice, maxPrice, sortBy, search, category, material, brand, limit } = req.query

        const query = {}

        if (collections && collections.toLocaleLowerCase() !== 'all') {
            query.collections = collections
        }

        if (category && category.toLocaleLowerCase() !== 'all') {
            query.category = category
        }

        if (material) {
            query.material = { $in: material.split(',') }
        }

        if (brand) {
            query.brand = { $in: brand.split(',') }
        }

        if (size) {
            query.size = { $in: size.split(',') }
        }

        if (color) {
            query.colors = { $in: color.split(',') }
        }

        if (gender) {
            query.gender = gender
        }

        if (minPrice || maxPrice) {
            query.price = {}
            if (minPrice) {
                query.price.$gte = Number(minPrice)
            }
            if (maxPrice) {
                query.price.$lte = Number(maxPrice)
            }
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ]
        }

        let sort = {}
        if (sortBy) {
            switch (sortBy) {
                case 'priceAsc':
                    sort = { price: 1 }
                    break
                case 'priceDesc':
                    sort = { price: -1 }
                    break
                case 'popular':
                    sort = { rating: -1 }
                    break
                default:
                    break
            }
        }

        let products = await Product.find(query).sort(sort).limit(Number(limit) || 0)
        res.json(products)

    } catch (error) {
        console.log(error)
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