import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../config/axiosConfig";

export const getListOrders = createAsyncThunk("order/getListOrders", async (orderData, { rejectWithValue }) => {
    try {
        const res = await instance.get('/orders/my-orders', orderData)
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const getOrderDetail = createAsyncThunk("order/getOrderDetail", async (orderId, { rejectWithValue }) => {
    try {
        const res = await instance.get(`/orders/${orderId}`)
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const orderSlice = createSlice({
    name: "order",
    initialState: {
        orders: [],
        loading: false,
        error: null,
        orderDetail: {}
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getListOrders.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getListOrders.fulfilled, (state, action) => {
                state.loading = false
                state.orders = action.payload
            })
            .addCase(getListOrders.rejected, (state, action) => {
                state.loading = false            
                state.error = action.payload    
            })

            .addCase(getOrderDetail.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getOrderDetail.fulfilled, (state, action) => {
                state.loading = false
                state.orderDetail = action.payload
            })
            .addCase(getOrderDetail.rejected, (state, action) => {
                state.loading = false            
                state.error = action.payload    
            })
    }       
})

export default orderSlice.reducer