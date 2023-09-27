import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../../types/types';

interface UserPostsState {
    loading: boolean;
    posts: Post[]; // Define the type of your posts here
    error: string | null;
}

const initialState: UserPostsState = {
    loading: false,
    posts: [],
    error: null,
};

const userPostsSlice = createSlice({
    name: 'userPosts',
    initialState,
    reducers: {
        userPostsRequest: (state) => {
            state.loading = true;
        },
        userPostsSuccess: (state, action) => {
            state.loading = false;
            state.posts = action.payload;
        },
        userPostsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    userPostsRequest,
    userPostsSuccess,
    userPostsFailure,
    clearErrors,
} = userPostsSlice.actions;

export default userPostsSlice.reducer;
