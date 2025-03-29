import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../config/axiosConfig";

export const getListCart = createAsyncThunk("products/getListCart", async (_, { rejectWithValue }) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"))
        const userId = user ? user._id : null

        const res = await instance.get(`/cart?userId=${userId}`)
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const addToCart = createAsyncThunk("cart/addToCart", async ({ productId, quantity, userId }, { rejectWithValue }) => {
    try {
        const res = await instance.post('/cart', { productId, quantity, userId })
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const deleteCart = createAsyncThunk("cart/deleteCart", async ({ productId, userId }, { rejectWithValue }) => {
    try {
        const res = await instance.delete(`/cart`, { data: { productId, userId } })
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const editQuantityCart = createAsyncThunk("cart/editQuantityCart", async ({ productId, quantity, userId }, { rejectWithValue }) => {
    try {
        const res = await instance.put(`/cart`, { productId, quantity, userId })
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        listCarts: { products: [] },
        loading: false,
        error: null,
        totalPrice: 0
    },
    reducers: {
        updateTotalPrice: (state) => {
            state.totalPrice = state.listCarts.products?.reduce(
                (total, item) => total + item.quantity * item.price, 0
            ) || 0;
        },
        clearCart: (state) => {
            state.listCarts = { products: [] }
            state.totalPrice = 0
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getListCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getListCart.fulfilled, (state, action) => {
                state.listCarts = action.payload || { products: [] };
                state.loading = false;
                state.error = null;
                cartSlice.caseReducers.updateTotalPrice(state)
            })
            .addCase(getListCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.listCarts = { products: [] };
            })

            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.listCarts = action.payload
                state.error = null;
                cartSlice.caseReducers.updateTotalPrice(state)
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(deleteCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCart.fulfilled, (state, action) => {
                state.loading = false;
                state.listCarts = action.payload
                state.error = null;
                cartSlice.caseReducers.updateTotalPrice(state)
            })
            .addCase(deleteCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(editQuantityCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editQuantityCart.fulfilled, (state, action) => {
                state.loading = false;
                state.listCarts = action.payload
                state.error = null;
            })
            .addCase(editQuantityCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
})

export const { updateTotalPrice, clearCart } = cartSlice.actions
export default cartSlice.reducer