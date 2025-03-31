import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../config/axiosConfig";

export const loginUser = createAsyncThunk("auth/loginUser", async (userData, { rejectWithValue }) => {
    try {
        const response = await instance.post('/users/login', userData)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const registerUser = createAsyncThunk("auth/registerUser", async (userData, { rejectWithValue }) => {
    try {
        const response = await instance.post("/users/register", userData)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const fetchUser = createAsyncThunk("auth/fetchUser", async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token")

        if (token) {
            const response = await instance.get("/users/profile")
            return response.data
        } else {
            return rejectWithValue("No token found")
        }

    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: localStorage.getItem("token") || null,
        role: null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null
            state.token = null
            state.role = null
            localStorage.removeItem("token")
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.user
                state.token = action.payload.token
                state.role = action.payload.user.role,
                    localStorage.setItem("token", action.payload.token)
                localStorage.setItem("user", JSON.stringify(action.payload.user))
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(registerUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.user
                state.token = action.payload.token
                state.role = action.payload.user.role
                localStorage.setItem("token", action.payload.token)
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.errors
            })

            .addCase(fetchUser.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
                state.role = action.payload.role
            })
            .addCase(fetchUser.rejected, (state) => {
                state.loading = false
                state.user = null
                state.role = null
                localStorage.removeItem("token")
                localStorage.removeItem("user")
            })
    }
})

export const { logout } = authSlice.actions
export default authSlice.reducer