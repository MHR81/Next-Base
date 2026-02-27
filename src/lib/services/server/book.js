import { serverFetch } from "@/lib/api/server-api";

export const serverBooksService = {
    getAllBooks: () => serverFetch("/book/v1/get-all-book-user"),
    getBookById: (id) => serverFetch(`/book/v1/get-one-book-user/${id}`),
};