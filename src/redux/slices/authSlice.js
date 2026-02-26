import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";


const initialState = {
    token: (typeof window !== 'undefined') ? Cookies.get("accessToken") || null : null,
};

const loginSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
            if (typeof window !== 'undefined' && action.payload) {
                Cookies.set("accessToken", action.payload, {
                    expires: 365,
                    path: "/",
                    sameSite: "lax",
                });
            }
        },

        removeToken(state) {
            state.token = null;
            if (typeof window !== 'undefined') {
                Cookies.remove("accessToken", { path: "/" });
            }
        },
    },
});

export const { setToken, removeToken } = loginSlice.actions;
export default loginSlice.reducer;