import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AllUsersData, User } from '../../../types/types';

interface AllUsersState {
    loading: boolean
    error: string | null;
    users: User[]
}

const initialState: AllUsersState = {
    loading: false,
    users: [],
    error: null,
};

const allUsersSlice = createSlice({
    name: 'allUsers',
    initialState,
    reducers: {
        allUsersRequest: (state) => {
            state.loading = true;
        },
        allUsersSuccess: (state, action: PayloadAction<AllUsersData>) => {
            state.loading = false;
            state.users = action.payload;
        },
        allUsersFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    allUsersRequest,
    allUsersSuccess,
    allUsersFailure,
    clearErrors,
} = allUsersSlice.actions;

export default allUsersSlice.reducer;
