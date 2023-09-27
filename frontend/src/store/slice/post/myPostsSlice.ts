import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../../types/types';

interface MyPostsState {
    loading: boolean;
    posts: Post[]; // Define the type of your posts here
    error: string | null;
}

const initialState: MyPostsState = {
    loading: false,
    posts: [],
    error: null,
};

const myPostsSlice = createSlice({
    name: 'myPosts',
    initialState,
    reducers: {
        myPostsRequest: (state) => {
            state.loading = true;
        },
        myPostsSuccess: (state, action) => {
            state.loading = false;
            state.posts = action.payload;
        },
        myPostsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    myPostsRequest,
    myPostsSuccess,
    myPostsFailure,
    clearErrors,
} = myPostsSlice.actions;

export default myPostsSlice.reducer;
