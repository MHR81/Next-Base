import requests from '@/lib/api/client-api';

export const clientFileService = {
    uploadFile: (data) => requests.postFormData('/file/v1/upload', data), //
};