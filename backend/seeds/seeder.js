const mongoose = require("mongoose")
const dotenv = require("dotenv")
const Product = require("../models/Product")
const User = require("../models/User")
const Cart = require("../models/Cart")
const products = require("../data/products")


dotenv.config()

mongoose.connect(process.env.MONGO_URI)

const seedData = async () => {
    try {
        await Product.deleteMany()
        await User.deleteMany()
        await Cart.deleteMany()
        
        await Product.insertMany(products);

        await User.create({
            name: "Admin user",
            email: "admin@gmail.com",
            password: "123456",
            role: "admin"
        })

        console.log('Data imported')
        process.exit()

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

seedData()