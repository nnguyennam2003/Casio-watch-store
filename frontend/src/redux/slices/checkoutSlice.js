import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../config/axiosConfig";
import { clearCart } from "./cartSlice";

export const createCheckout = createAsyncThunk("checkout/createCheckout", async (orderData, { rejectWithValue }) => {
    try {
        const res = await instance.post('/checkout', orderData)
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const updatePaymentStatus = createAsyncThunk("checkout/updatePaymentStatus", async ({ checkoutId, paymentData }, { rejectWithValue }) => {
    try {
        const res = await instance.put(`/checkout/${checkoutId}/pay`, paymentData)
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const finalizeOrder = createAsyncThunk("checkout/finalizeOrder", async (checkoutId, { dispatch, rejectWithValue }) => {
    try {
        const res = await instance.post(`/checkout/${checkoutId}/finalize`)
        dispatch(clearCart())
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const checkoutSlice = createSlice({
    name: "checkout",
    initialState: {
        checkout: {},
        loading: false,
        error: null,
        order: {}
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createCheckout.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createCheckout.fulfilled, (state, action) => {
                state.loading = false
                state.checkout = action.payload
                state.error = null
            })
            .addCase(createCheckout.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(updatePaymentStatus.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updatePaymentStatus.fulfilled, (state, action) => {
                state.loading = false
                state.checkout = { ...state.checkout, ...action.payload }
                state.error = null
            })
            .addCase(updatePaymentStatus.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(finalizeOrder.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(finalizeOrder.fulfilled, (state, action) => {
                state.loading = false
                state.checkout = {}
                state.order = action.payload
                state.error = null
            })
            .addCase(finalizeOrder.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            });
    }
})

export default checkoutSlice.reducer