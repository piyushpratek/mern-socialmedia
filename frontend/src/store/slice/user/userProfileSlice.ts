import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    user: null,
    error: null,
};

const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
        userProfileRequest: (state) => {
            state.loading = true;
        },
        userProfileSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
        },
        userProfileFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    userProfileRequest,
    userProfileSuccess,
    userProfileFailure,
    clearErrors,
} = userProfileSlice.actions;

export default userProfileSlice.reducer;
