const express = require('express')
const Cart = require('../models/Cart')
const Product = require('../models/Product')
const { protect } = require('../MiddleWare/authMiddleware')

const router = express.Router()

const getCart = async (userId) => {
    if (userId) {
        return await Cart.findOne({ user: userId })
    }
    //  else if (guestId) {
    //     return await Cart.findOne({ guestId })
    // }
    return null
}

router.post('/', async (req, res) => {
    const { productId, quantity, userId } = req.body

    try {
        const product = await Product.findById(productId)
        if (!product) return res.status(404).json({ message: 'Product not found' })

        let cart = await getCart(userId)

        if (cart) {
            const productIndex = cart.products.findIndex((p) => p.productId.toString() === productId)

            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity
            } else {
                cart.products.push({
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    quantity
                })
            }

            cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0)

            await cart.save()
            return res.status(200).json(cart)
        } else {
            const newCart = await Cart.create({
                user: userId ? userId : undefined,
                products: [{
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    quantity
                }],
                totalPrice: product.price
            })

            return res.status(200).json(newCart)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
})

router.put('/', async (req, res) => {
    const { productId, quantity, userId } = req.body

    try {
        let cart = await getCart(userId)
        if (!cart) return res.status(404).json({ message: 'Cart not found' })

        const productIndex = cart.products.findIndex((p) => p.productId.toString() === productId)

        if (productIndex > -1) {
            if (quantity > 0) {
                cart.products[productIndex].quantity = quantity
            } else {
                cart.products.splice(productIndex, 1)
            }

            cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0)
            await cart.save()
            return res.status(200).json(cart)
        } else {
            return res.status(404).json({ message: "Product not found in cart" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
})

router.delete('/', async (req, res) => {
    const { productId, userId } = req.body
    try {
        let cart = await getCart(userId)

        if (!cart) return res.status(404).json({ message: 'Cart not found' })

        const productIndex = cart.products.findIndex((p) => p.productId.toString() === productId)

        if (productIndex > -1) {
            cart.products.splice(productIndex, 1)

            cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0)
            await cart.save()
            return res.status(200).json(cart)
        } else {
            return res.status(404).json({ message: "Product not found in cart" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
})

router.get('/', async (req, res) => {
    const { userId } = req.query

    try {
        const cart = await getCart(userId)
        if(cart) {
            res.json(cart)
        } else {
            // res.status(404).json({ message: 'Cart not found' })
            res.json({ products: [] });
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
})

router.post('/merge', protect, async (req, res) => {
    const { guestId } = req.body

    try {
        const guestCart = await Cart.findOne({ guestId })
        const userCart = await Cart.findOne({ user: req.user._id})
        
        if(guestCart) {
            if(guestCart.products.length === 0) {
                return res.status(400).json({ message: 'Guest cart is empty' })
            }

            if(userCart) {
                guestCart.products.forEach((guestItem) => {
                    const productIndex = userCart.products.findIndex((item) => item.productId.toString() === guestItem.productId.toString() && userItem.size === guestItem.size && userItem.color === guestItem.color)

                    if(productIndex > -1) {
                        userCart.products[productIndex].quantity += guestItem.quantity
                    } else {
                        userCart.products.push(guestItem)
                    }
                })

                userCart.totalPrice = userCart.products.reduce((acc, item) => acc + item.price * item.quantity, 0)

                await userCart.save()

                try {
                    await Cart.findOneAndDelete({ guestId })
                } catch (error) {
                    console.log(error)
                }
                res.status(200).json(guestCart)
            } else {
                guestCart.user = req.user._id
                guestCart.guestId = undefined
                await guestCart.save()

                res.status(200).json(guestCart)
            }
        } else {
            if(userCart) {
                return res.status(200).json(userCart)
            }
            res.status(404).json({ message: 'Guest cart not found' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
})

module.exports = router