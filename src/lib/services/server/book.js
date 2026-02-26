import { serverApi } from '@/lib/api/server-api';

export const serverBooksService = {
    getAllBooks: () => serverApi.get(`/book/v1/get-all-book-user`),

};