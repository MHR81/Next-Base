import { serverApi } from '@/lib/api/server-api';

export const serverAuthorsService = {
    getAuthors: () => serverApi.get(`/authors/v1/get-all-author`),

};