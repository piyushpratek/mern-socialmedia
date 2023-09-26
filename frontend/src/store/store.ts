import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slice/user/userSlice';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import postOfFollowingSlice from './slice/user/postOfFollowingSlice';
import allUsersSlice from './slice/user/allUsersSlice';
// import userProfileSlice from './slice/user/userProfileSlice';


export const store = configureStore({
    reducer: {
        user: userSlice,
        postOfFollowing: postOfFollowingSlice,
        allUsers: allUsersSlice,
        // userProfile: userProfileSlice
    },

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;