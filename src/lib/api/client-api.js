'use client';

import axios from 'axios';
import { store } from '@/redux/store';
import { showLoading, hideLoading } from '@/redux/slices/loadingSlice';
import { showToast } from '@/redux/slices/toastSlice';
import { clearUser } from '@/redux/slices/userSlice';
import { API_CONFIG } from './config/config';
import { extractMessage, getErrorMessageByStatus } from './utils/utils';

const clientAxios = axios.create({
    baseURL: API_CONFIG.PROXY_BASE,
    timeout: API_CONFIG.TIMEOUT,
    withCredentials: true,
});

clientAxios.interceptors.request.use(
    (config) => {
        store.dispatch(showLoading());
        return config;
    },
    (error) => {
        store.dispatch(hideLoading());
        return Promise.reject(error);
    }
);

clientAxios.interceptors.response.use(
    (response) => {
        const method = response.config.method;
        const isMutating = ['post', 'put', 'delete', 'patch'].includes(method);

        if (isMutating) {
            const message = extractMessage(response) || 'عملیات با موفقیت انجام شد';
            store.dispatch(showToast({ type: 'success', message }));
        }

        store.dispatch(hideLoading());
        return response;
    },
    (error) => {
        store.dispatch(hideLoading());

        if (!error.response) {
            store.dispatch(showToast({ type: 'error', message: 'خطا در ارتباط با سرور' }));
            return Promise.reject(error);
        }

        const { status, data } = error.response;
        const message = getErrorMessageByStatus(status, data);

        store.dispatch(showToast({ type: 'error', message }));

        if ([401, 403].includes(status)) {
            store.dispatch(clearUser());
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export const clientApi = {
    get: (url) => clientAxios.get(url),
    getByParams: (url, params) => clientAxios.get(url, { params }),
    post: (url, body) => clientAxios.post(url, body),
    put: (url, body) => clientAxios.put(url, body),
    patch: (url, body) => clientAxios.patch(url, body),
    delete: (url, body) => clientAxios.delete(url, { data: body }),
    postFormData: (url, formData) => clientAxios.post(url, formData),
    putMedia: (url, body) => clientAxios.put(url, body, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }),
};

export default clientApi;