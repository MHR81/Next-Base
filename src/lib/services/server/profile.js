import { serverApi } from '@/lib/api/server-api';

export const serverProfileService = {
    getMe: () => serverApi.get('/users/me'),
    getById: (id) => serverApi.get(`/profile/${id}`),
    getList: (params) => serverApi.get('/profile', params),
};