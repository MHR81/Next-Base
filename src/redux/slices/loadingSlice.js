import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
    name: 'loading',
    initialState: {
        isLoading: false,
        activeRequests: 0,
    },
    reducers: {
        showLoading: (state) => {
            state.activeRequests += 1;
            state.isLoading = true;
        },
        hideLoading: (state) => {
            state.activeRequests = Math.max(0, state.activeRequests - 1);
            state.isLoading = state.activeRequests > 0;
        },
        resetLoading: (state) => {
            state.activeRequests = 0;
            state.isLoading = false;
        },
    },
});

export const { showLoading, hideLoading, resetLoading } = loadingSlice.actions;
export default loadingSlice.reducer;