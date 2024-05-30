import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { loginUser, logout } from './authAPI'

const initialState = {
    loggedInUserToken: null,
    status: 'idle',
    error: null,
}

export const loginUserAsync = createAsyncThunk(
    'auth/login',
    async (loginInfo, rejetWithValue) => {
        try {
            const response = await loginUser(loginInfo);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejetWithValue(error);
        }
    }
)


export const logoutUserAsync = createAsyncThunk(
    'auth/logout',
    async () => {
        const response = await logout();
        return response.data;
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.loggedInUserToken = action.payload;
            })
            .addCase(loginUserAsync.rejected, (state, action) => {
                state.status = 'idle';
                state.error = action.payload;
            })
            .addCase(logoutUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(logoutUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.loggedInUserToken = null;
            })
    }
})

export default authSlice.reducer;