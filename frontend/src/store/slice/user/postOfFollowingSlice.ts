import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../../types/types';

interface PostOfFollowingState {
    loading: boolean
    error: string | null;
    posts: Post[]
}
const initialState: PostOfFollowingState = {
    loading: false,
    posts: [],
    error: null,
};

const postOfFollowingSlice = createSlice({
    name: 'postOfFollowing',
    initialState,
    reducers: {
        postOfFollowingRequest: (state) => {
            state.loading = true;
        },
        postOfFollowingSuccess: (state, action) => {
            state.loading = false;
            state.posts = action.payload;
        },
        postOfFollowingFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    postOfFollowingRequest,
    postOfFollowingSuccess,
    postOfFollowingFailure,
    clearErrors,
} = postOfFollowingSlice.actions;

export default postOfFollowingSlice.reducer;

