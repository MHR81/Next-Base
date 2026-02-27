import requests from '@/lib/api/client-api';

export const clientProfileService = {
    updateProfile: (data) => requests.put('/user/v1/edit-my-profile', data),
    // updateAvatar: (formData) => requests.postFormData('/profile/avatar', formData),
    // changePassword: (data) => requests.post('/profile/change-password', data),
};