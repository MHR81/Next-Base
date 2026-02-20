import { clientApi } from '@/lib/api/client-api';

export const clientProfileService = {
    getMe: () => clientApi.get('/users/me'),
    update: (data) => clientApi.put('/users/me', data),
    updateAvatar: (formData) => clientApi.postFormData('/profile/avatar', formData),
    changePassword: (data) => clientApi.post('/profile/change-password', data),
};