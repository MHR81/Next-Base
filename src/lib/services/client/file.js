import { clientApi } from '@/lib/api/client-api';

export const clientFileService = {
    uploadFile: (data) => clientApi.postFormData('/file/v1/upload', data), //
};