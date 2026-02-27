import requests from '@/lib/api/client-api';

export const clientAuthService = {
    login: (data) => requests.post('/user/v1/login', data), //
    register: (data) => requests.post('/user/v1/register-user', data),
};