import { serverApi } from '@/lib/api/server-api';

export const serverProfileService = {
    getMe: () => serverApi.get('/user/v1/get-my-profile'),
};