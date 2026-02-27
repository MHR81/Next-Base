import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = { 
    locale: (typeof window !== 'undefined') ? Cookies.get("locale") || 'en' : 'en',
};

const localeSlice = createSlice({
    name: 'locale',
    initialState: {
        lang: initialState.locale,
        dir: initialState.locale === 'en' ? 'ltr' : 'rtl',
    },
    reducers: {
        setLocale: (state, action) => {
            state.lang = action.payload;
            state.dir = action.payload === 'fa' ? 'rtl' : 'ltr';
            Cookies.set('locale', action.payload, { expires: 365, path: '/' });
        },
    },
});

export const { setLocale } = localeSlice.actions;
export default localeSlice.reducer;