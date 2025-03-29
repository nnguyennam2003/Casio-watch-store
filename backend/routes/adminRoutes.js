const express = require('express')
const { protect, admin } = require('../MiddleWare/authMiddleware')
const User = require('../models/User')

const router = express.Router()

router.get('/', protect, admin, async (req, res) => {
    try {
        const user = await User.find({})
        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
})

router.post('/', protect, admin, async (req, res) => {
    const { name, email, password, role } = req.body

    try {
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ errors: [{ message: 'User already exists' }] })
        }

        user = new User({
            name,
            email,
            password,
            role: role || "customer"
        })

        await user.save()
        res.status(201).json({ message: "User created successfully", user })
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
})

router.put("/:id", protect, admin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (user) {
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email
            user.role = req.body.role || user.role
        }
        const updatedUser = await user.save()
        res.json({ message: "User updated successfully", user: updatedUser })
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
})

router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (user) {
            await user.deleteOne()
            res.json({ message: "User removed" })
        } else {
            res.status(404).json({ message: 'User not found' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
})

module.exports = router