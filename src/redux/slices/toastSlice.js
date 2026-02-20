import { createSlice } from '@reduxjs/toolkit';

const toastSlice = createSlice({
    name: 'toast',
    initialState: {
        toasts: [],
    },
    reducers: {
        showToast: (state, action) => {
            const id = Date.now();
            state.toasts.push({
                id,
                type: action.payload.type || 'info',
                message: action.payload.message,
            });
        },
        removeToast: (state, action) => {
            state.toasts = state.toasts.filter((t) => t.id !== action.payload);
        },
        clearToasts: (state) => {
            state.toasts = [];
        },
    },
});

export const { showToast, removeToast, clearToasts } = toastSlice.actions;
export default toastSlice.reducer;