import { serverFetch } from "@/lib/api/server-api";

export const serverAuthorsService = {
    getAuthors: () => serverFetch(`/authors/v1/get-all-author`),
    getAuthorById: (id) => serverFetch(`/authors/v1/get-one-author/${id}`),
};