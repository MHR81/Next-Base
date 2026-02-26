import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
    name: "toast",
    initialState: {
        message: "",
        type: "success",
        visible: false,
    },
    reducers: {
        showToast(state, action) {
            console.log("showToast action payload:", action.payload);
            const { message, type } = action.payload;
            state.message = message;
            state.type = type || "success";
            state.visible = true;
            console.log("Updated toast state:", state.message, state.type, state.visible);
        },
        hideToast(state) {
            state.visible = false;
            state.message = "";
            state.type = "success";
        },
    },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;