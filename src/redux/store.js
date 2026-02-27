import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';
import loadingReducer from './slices/loadingSlice';
import toastReducer from './slices/toastSlice';
import userReducer from './slices/userSlice';
import localeReducer from './slices/localeSlice';
import audioReducer from './slices/audioSlice';
import authReducer from './slices/authSlice';

export const makeStore = (preloadedState) => {
    return configureStore({
        reducer: {
            user: userReducer,
            loading: loadingReducer,
            toast: toastReducer,
            locale: localeReducer,
            audio: audioReducer,
            auth: authReducer,
        },
        preloadedState,
        devTools: process.env.NODE_ENV !== 'production',
    });
};
export const store = makeStore();
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
export const useAppStore = () => useStore();