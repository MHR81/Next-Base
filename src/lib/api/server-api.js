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
            error.message || 'خطا در ارتباط با سرور',
            0,
            null
        );
    }
}

export const serverApi = {
    get: (endpoint, params) => {
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