import { clientApi } from '@/lib/api/client-api';

export const clientAuthService = {
    login: (data) => clientApi.post('/user/v1/login', data), //
    register: (data) => clientApi.post('/user/v1/register-user', data),
};