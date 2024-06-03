import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { checkAuth, loginUser, logout } from './authAPI'

const initialState = {
    loggedInUserToken: null,
    status: 'idle',
    error: null,
    userChecked: false,
}

export const loginUserAsync = createAsyncThunk(
    'auth/login',
    async (loginInfo, { rejetWithValue }) => {
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

export const checkAuthAsync = createAsyncThunk(
    'auth/checkAuth',
    async () => {
        try {
            const response = await checkAuth();
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

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
            .addCase(checkAuthAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.loggedInUserToken = action.payload;
                state.userChecked = true;
            })
            .addCase(checkAuthAsync.rejected, (state, action) => {
                state.status = 'idle';
                state.userChecked = false;
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

export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;
export const selectUserChecked = (state) => state.auth.userChecked;

export default authSlice.reducer;