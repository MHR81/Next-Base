import { clientApi } from '@/lib/api/client-api';

export const clientAuthService = {
    login: (data) => clientApi.post('/auth/login', data),
    
    // register: (data) => clientApi.post('/auth/register', data),
    // verifyOTP: (data) => clientApi.post('/auth/verify-otp', data),
    // forgotPassword: (data) => clientApi.post('/auth/forgot-password', data),
    // resetPassword: (data) => clientApi.post('/auth/reset-password', data),
    // logout: () => clientApi.post('/auth/logout'),
    // refreshToken: () => clientApi.post('/auth/refresh'),
};