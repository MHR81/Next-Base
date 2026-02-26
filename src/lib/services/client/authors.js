import { clientApi } from '@/lib/api/client-api';

export const clientAuthorsService = {
    getAuthorDetails: (id) => clientApi.get(`/authors/v1/get-detail-author/${id}`),

    // getAuthorBooks: (id) => clientApi.get(`/award/v1/get-award-books-user/${id}`),

};