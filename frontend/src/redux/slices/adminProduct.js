import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../config/axiosConfig";

export const getListProducts = createAsyncThunk("admin/getListProducts", async (_, { rejectWithValue }) => {
    try {
        const res = await instance.get('/admin/products')
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const getDetailProduct = createAsyncThunk("admin/getDetailProduct", async (id, { rejectWithValue }) => {
    try {
        const res = await instance.get(`/admin/products/${id}`)
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const adminProductSlice = createSlice({
    name: "adminProduct",
    initialState: {
        products: [],
        loading: false,
        error: null,
        detailProduct: {}
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getListProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getListProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        });
        builder.addCase(getListProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(getDetailProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getDetailProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.detailProduct = action.payload;
        });
        builder.addCase(getDetailProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },    
})

export default adminProductSlice.reducer