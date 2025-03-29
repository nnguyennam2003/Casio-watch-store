const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

const userRoutes = require('./routes/userRoutes.js')
const productRoutes = require('./routes/productRoutes.js')
const cartRoutes = require('./routes/cartRoutes.js')
const checkoutRoutes = require('./routes/checkoutRoutes.js')
const orderRoutes = require('./routes/orderRoutes.js')
const uploadRoutes = require('./routes/uploadRoutes.js')
const subscriberRoutes = require('./routes/subscribeRoutes.js')
const adminRoutes = require('./routes/adminRoutes.js')
const productAdminRoutes = require('./routes/productAdminRoutes.js')
const ordersAdminRoutes = require('./routes/ordersAdminRoutes.js')
const filterRoutes = require('./routes/FilterRoute.js')

const app = express()

app.use(express.json())
app.use(cors())

dotenv.config()

const PORT = process.env.PORT || 3000

connectDB()

app.get('/', (req, res) => {
    res.send('Casio server is running')
})

// API routes
// user
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/checkout', checkoutRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/subscribe', subscriberRoutes)
app.use('/api/filters', filterRoutes)

//admin
app.use('/api/admin/users', adminRoutes)
app.use('/api/admin/products', productAdminRoutes)
app.use('/api/admin/orders', ordersAdminRoutes)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})