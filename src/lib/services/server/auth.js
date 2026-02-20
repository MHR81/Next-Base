import { serverApi } from '@/lib/api/server-api';

export const serverAuthService = {
    getMe: () => serverApi.get('/users/me'),
    // verifyToken: () => serverApi.get('/auth/verify'),
};