export const extractMessage = (obj) =>
    obj?.response?.data?.data?.message ||
    obj?.response?.data?.message ||
    obj?.data?.data?.message ||
    obj?.data?.message ||
    obj?.message ||
    'error in server request';

export const getErrorMessageByStatus = (status, data) => {
    const messages = {
        400: data?.message || 'bad request',
        401: data?.message || 'unauthorized',
        403: data?.message || 'forbidden',
        404: data?.message || 'not found',
        422: data?.message || 'unprocessable entity',
        429: data?.message || 'too many requests',
        500: data?.message || 'internal server error',
        502: data?.message || 'bad gateway',
        503: data?.message || 'service unavailable',
        504: data?.message || 'gateway timeout',
    };

    return messages[status] || data?.message || `unexpected error (${status})`;
};