import BookList from "./_components/Books";
import { serverBooksService } from "@/lib/services/server/book";
import { notFound } from 'next/navigation';



export default async function BooksPage() {
    try {
        const res = await serverBooksService.getAllBooks();
        console.log("Books response:", res);
        const books = res?.data ?? res;
        if (!books || (res && res.success === false)) return notFound();
        return <BookList data={books} />;
    } catch (err) {
        if (String(err.message).includes('404')) return notFound();
        console.error("Error fetching books:", err);
        throw err;
    }

    // <BookList />
}