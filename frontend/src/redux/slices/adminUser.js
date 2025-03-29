import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../config/axiosConfig";

export const getListUsers = createAsyncThunk("admin/getListUsers", async (_, { rejectWithValue }) => {
    try {
        const res = await instance.get('/admin/users')
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const createUser = createAsyncThunk("admin/createUser", async (userData, { rejectWithValue }) => {
    try {
        const res = await instance.post('/admin/users', userData)
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const changeRoleUser = createAsyncThunk("admin/changeRoleUser", async ({ userId, newRole }, { rejectWithValue }) => {
    try {
        const res = await instance.put(`/admin/users/${userId}`, { role: newRole })
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const deleteUser = createAsyncThunk("admin/deleteUser", async (userId, { rejectWithValue }) => {
    try {
        await instance.delete(`/admin/users/${userId}`)
        return { _id: userId }
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const adminUserSlice = createSlice({
    name: "adminUser",
    initialState: {
        users: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(getListUsers.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(getListUsers.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload
        })
        builder.addCase(getListUsers.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })

        builder.addCase(createUser.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.loading = false
            state.users.push(action.payload.user)
        })
        builder.addCase(createUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })

        builder.addCase(changeRoleUser.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(changeRoleUser.fulfilled, (state, action) => {
            state.loading = false
            state.users = state.users.map((user) =>
                user._id === action.payload._id ? { ...user, role: action.payload.role } : user
            )
        })

        builder.addCase(deleteUser.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.loading = false
            state.users = state.users.filter(user => user._id !== action.payload._id)
        })
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default adminUserSlice.reducer