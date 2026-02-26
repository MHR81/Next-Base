import { createSlice } from '@reduxjs/toolkit';

const localeSlice = createSlice({
    name: 'locale',
    initialState: {
        lang: 'fa',
        dir: 'rtl',
    },
    reducers: {
        setLocale: (state, action) => {
            state.lang = action.payload;
            state.dir = action.payload === 'fa' ? 'rtl' : 'ltr';
        },
    },
});

export const { setLocale } = localeSlice.actions;
export default localeSlice.reducer;