import { showLoading, hideLoading } from "@/redux/slices/loadingSlice";
import { showToast } from "@/redux/slices/toastSlice";
import { clearUser } from "@/redux/slices/userSlice";
import { extractMessage, getErrorMessageByStatus } from "./utils";


export const setupAxiosInterceptors = (clientAxios, store) => {

    clientAxios.interceptors.request.use(
        (config) => {

            const getToken = () => {
                try {
                    if (typeof document !== 'undefined' && document.cookie) {
                        const match = document.cookie.match(new RegExp('(^|; )' + 'accessToken' + '=([^;]*)'));
                        if (match) return decodeURIComponent(match[2]);
                    }
                } catch (e) {}

                try {
                    if (typeof window !== 'undefined' && window.localStorage) {
                        return window.localStorage.getItem('accessToken');
                    }
                } catch (e) {}

                return null;
            };

            const token = getToken();

            if (token) {
                config.headers = config.headers || {};
                config.headers.Authorization = `Bearer ${token}`;
            }

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
                const message = extractMessage(response) || 'The operation was successful';
                store.dispatch(showToast({ type: 'success', message }));
            }

            store.dispatch(hideLoading());
            return response;
        },
        (error) => {

            store.dispatch(hideLoading());

            if (!error.response) {
                store.dispatch(showToast({ type: 'error', message: 'error in server connection' }));
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
};