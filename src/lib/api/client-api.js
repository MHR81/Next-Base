// import axios, { AxiosHeaders } from "axios";
// import { removeToken } from "@app/features/tokenSession";
// import { toast } from "@mahmel/ui/toast/toast";
// import Cookies from "js-cookie";

// const BASE_URL = "https://api.mahmeltaxi.ir/api";
// const TIMEOUT = 600000;

// axios.defaults.baseURL = BASE_URL;
// axios.defaults.timeout = TIMEOUT;

// axios.interceptors.request.use((config) => {
//     const token = Cookies.get("accessToken_p");

//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
// });

// const isMutatingMethod = (method) => {
//     if (!method) return false;
//     const m = method.toLowerCase();
//     return m === "post" || m === "put" || m === "delete" || m === "patch";
// };

// const extractMessage = (obj) => {
//     return (
//         obj?.response?.data?.data?.message ||
//         obj?.data?.data?.message ||
//         obj?.data?.message ||
//         obj?.response?.data?.message ||
//         obj?.response?.message ||
//         obj?.data?.message ||
//         "خطایی رخ داده است!"
//     );
// };

// const responseBody = (response) => {
//     try {
//         if (isMutatingMethod(response?.config?.method)) {
//             const message = extractMessage(response) || "عملیات با موفقیت انجام شد";
//             // toast.success(message);
//         }
//     } catch (e) {
//         console.error("responseBody error:", e);
//     }
//     return response;
// };

// const errorBody = (error) => {
//     try {
//         const method =
//             error?.config?.method ||
//             error?.response?.config?.method ||
//             error?.request?.method;

//         if (isMutatingMethod(method)) {
//             const message = extractMessage(error) || "مشکلی در انجام عملیات رخ داد";
//             // toast.error(message);
//         }
//     } catch (e) {
//         console.error("errorBody error:", e);
//     }

//     if (error.response && [401, 403].includes(error.response.status)) {
//         removeToken();
//         window.location.href = "/auth";
//     }

//     throw error?.response || error;
// };

// axios.interceptors.request.use(
//     (config) => {
//         if (!config.headers) {
//             config.headers = AxiosHeaders.from({});
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

// axios.interceptors.response.use(
//     responseBody,
//     (error) => {
//         if (!error.response) {
//             if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
//                 toast.error("مهلت زمانی درخواست تمام شد، دوباره تلاش کنید");
//             } else if (error.message.includes("Network Error")) {
//                 toast.error("لطفا اتصال اینترنت خود را بررسی کنید");
//             } else {
//                 toast.error("خطا در برقراری ارتباط با سرور");
//             }
//             return Promise.reject(error);
//         }
//         const data = error.response.data as { message };
//         const status = error.response.status;
//         switch (status) {
//             case 404:
//                 toast.error("صفحه یا اطلاعات درخواستی یافت نشد");
//                 break;
//             case 422:
//                 toast.error(data?.message || "اطلاعات ارسالی نامعتبر است");
//                 break;
//             case 429:
//                 toast.error("تعداد درخواست‌ها زیاد است، کمی صبر کنید");
//                 break;
//             case 500:
//                 toast.error("خطای داخلی سرور، لطفا بعدا تلاش کنید");
//                 break;
//             default:
//                 toast.error(data?.message || `خطای غیرمنتظره (کد: ${status})`);
//         }
//         return Promise.reject(error);
//     }
// );

// const requests = {
//     get: (url) => axios.get(url).then(responseBody).catch(errorBody),
//     getByParams: (url, params) => axios.get(url, { params }).then(responseBody).catch(errorBody),
//     post: (url, body) => axios.post(url, body).then(responseBody).catch(errorBody),
//     put: (url, body) => axios.put(url, body).then(responseBody).catch(errorBody),
//     patch: (url, body) => axios.patch(url, body).then(responseBody).catch(errorBody),
//     delete: (url) => axios.delete(url).then(responseBody).catch(errorBody),
//     postFormData: (url, formData) =>
//         axios.post(url, formData, { headers: { "Content-type": "multipart/form-data" } }).then(responseBody),
//     putMedia: (url, body) =>
//         axios.put(url, body, { headers: { "Content-type": "application/x-www-form-urlencoded" } }).then(responseBody).catch(errorBody),
// };

// export default requests;




'use client';

import axios from 'axios';
import { API_CONFIG } from './config/config';

export const clientAxios = axios.create({
    baseURL: API_CONFIG.PROXY_BASE,
    timeout: API_CONFIG.TIMEOUT,
    withCredentials: true,
});

export const clientApi = {
    get: (url) => clientAxios.get(url),
    getByParams: (url, params) => clientAxios.get(url, { params }),
    post: (url, body) => clientAxios.post(url, body),
    put: (url, body) => clientAxios.put(url, body),
    patch: (url, body) => clientAxios.patch(url, body),
    delete: (url, body) => clientAxios.delete(url, { data: body }),
    postFormData: (url, formData) => clientAxios.post(url, formData),
    putMedia: (url, body) =>
        clientAxios.put(url, body, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }),
};

export default clientApi;