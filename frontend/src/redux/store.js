import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import adminUsersReducer from './slices/adminUser'
import adminProductReducer from './slices/adminProduct'
import cartReducer from './slices/cartSlice'
import checkoutReducer from './slices/checkoutSlice'
import orderReducer from './slices/orderSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminUsers: adminUsersReducer,
        adminProducts: adminProductReducer,
        carts: cartReducer,
        checkout: checkoutReducer,
        orders: orderReducer
    }
})

export default store