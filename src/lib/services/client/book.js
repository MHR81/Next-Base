import { clientApi } from '@/lib/api/client-api';

export const clientBookService = {
    getBookById: (id) => clientApi.get(`/book/v1/get-one-book-user/${id}`),
    
};