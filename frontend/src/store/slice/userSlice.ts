import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/userTypes';

interface UserState {
    loading: boolean;
    user: User | null;
    error: string | null;
    isAuthenticated: boolean;
    message: string | null;
}

const initialState: UserState = {
    loading: false,
    user: null,
    error: null,
    isAuthenticated: false,
    message: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginRequest: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        },
        registerRequest: (state) => {
            state.loading = true;
        },
        registerSuccess: (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        registerFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        },
        loadUserRequest: (state) => {
            state.loading = true;
        },
        loadUserSuccess: (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        loadUserFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        },
        logoutUserRequest: (state) => {
            state.loading = true;
        },
        logoutUserSuccess: (state) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
        },
        logoutUserFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = true;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    loginRequest,
    loginSuccess,
    loginFailure,
    registerRequest,
    registerSuccess,
    registerFailure,
    loadUserRequest,
    loadUserSuccess,
    loadUserFailure,
    logoutUserRequest,
    logoutUserSuccess,
    logoutUserFailure,
    clearErrors,
} = userSlice.actions;

export default userSlice.reducer;
