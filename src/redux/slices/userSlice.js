import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: null,
        isAuthenticated: false,
        isLoaded: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.data = action.payload;
            state.isAuthenticated = !!action.payload;
            state.isLoaded = true;
        },
        updateUser: (state, action) => {
            state.data = { ...state.data, ...action.payload };
        },
        clearUser: (state) => {
            state.data = null;
            state.isAuthenticated = false;
            state.isLoaded = true;
        },
    },
});

export const { setUser, updateUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
