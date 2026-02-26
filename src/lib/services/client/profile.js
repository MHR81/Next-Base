import { clientApi } from '@/lib/api/client-api';

export const clientProfileService = {
    updateProfile: (data) => clientApi.put('/user/v1/edit-my-profile', data),
    // updateAvatar: (formData) => clientApi.postFormData('/profile/avatar', formData),
    // changePassword: (data) => clientApi.post('/profile/change-password', data),
};