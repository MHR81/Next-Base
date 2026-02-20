export const extractMessage = (obj) =>
    obj?.response?.data?.data?.message ||
    obj?.response?.data?.message ||
    obj?.data?.data?.message ||
    obj?.data?.message ||
    obj?.message ||
    'خطایی رخ داده است';

export const getErrorMessageByStatus = (status, data) => {
    const messages = {
        400: data?.message || 'درخواست نامعتبر است',
        401: data?.message || 'نشست شما منقضی شده',
        403: data?.message || 'دسترسی محدود شده',
        404: data?.message || 'یافت نشد',
        422: data?.message || 'اطلاعات نامعتبر',
        429: data?.message || 'تعداد درخواست زیاد',
        500: data?.message || 'خطای سرور',
        502: data?.message || 'سرور در دسترس نیست',
        503: data?.message || 'سرویس غیرفعال',
        504: data?.message || 'زمان انتظار تمام شد',
    };

    return messages[status] || data?.message || `خطای غیرمنتظره (${status})`;
};