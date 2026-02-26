// import axios from "axios";
// import { cookies } from "next/headers";

// const BASE_URL = "http://api.mahmeltaxi.ir/api";

// const axiosServer = axios.create({
//     baseURL: BASE_URL,
//     timeout: 600000,
// });

// axiosServer.interceptors.request.use(async (config) => {
//     const cookieStore = await cookies();
//     const token = cookieStore.get("accessToken_p")?.value;

//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
// });

// axiosServer.interceptors.response.use(
//     (res) => res.data,
//     (err) => {
//         console.error("Server Axios Error:", err);
//         throw err;
//     }
// );

// export default axiosServer;




import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { API_CONFIG } from './config/config';
import { extractMessage } from './utils/utils';

class ServerAPIError extends Error {
    constructor(message, status, data) {
        super(message);
        this.status = status;
        this.data = data;
    }
}

async function getToken() {
    try {
        const cookieStore = await cookies();
        return cookieStore.get('accessToken')?.value || null;
    } catch {
        return null;
    }
}

export async function serverRequest(endpoint, options = {}) {
    const token = await getToken();
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;

    const config = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        },
        cache: options.cache ?? 'no-store',
    };

    if (options.body && typeof options.body === 'object') {
        config.body = JSON.stringify(options.body);
    }

    try {
        const response = await fetch(url, config);
        // console.log(`Request: ${config.method || 'GET'} ${url}`, config);
        // console.log('Response:', response);

        if (response.status === 401 || response.status === 403) {
            redirect('/login');
        }

        const data = await response.json().catch(() => null);

        if (!response.ok) {
            throw new ServerAPIError(
                extractMessage({ response: { data }, data }),
                response.status,
                data
            );
        }

        return data;
    } catch (error) {
        if (error instanceof ServerAPIError) throw error;
        if (error.message?.includes('NEXT_REDIRECT')) throw error;
        throw new ServerAPIError(
            error.message || 'error in server request',
            0,
            null
        );
    }
}

export const serverApi = {
    get: (endpoint) => serverRequest(endpoint, { method: 'GET' }),
    getByParams: (endpoint, params) => {
        const query = params ? `?${new URLSearchParams(params)}` : '';
        return serverRequest(`${endpoint}${query}`, { method: 'GET' });
    },

    post: (endpoint, body) =>
        serverRequest(endpoint, { method: 'POST', body }),

    put: (endpoint, body) =>
        serverRequest(endpoint, { method: 'PUT', body }),

    patch: (endpoint, body) =>
        serverRequest(endpoint, { method: 'PATCH', body }),

    delete: (endpoint, body) =>
        serverRequest(endpoint, { method: 'DELETE', body }),
};