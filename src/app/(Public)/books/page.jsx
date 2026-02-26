import BookList from "./_components/Books";
import { serverBooksService } from "@/lib/services/server/book";

let booksData = null;
try {
    const res = await serverBooksService.getAllBooks();
    // console.log("books res in page", res);
    booksData = res?.data;
} catch (error) {
    console.error("Error fetching books in page:", error);
}


export default function BooksPage() {
    return <BookList data={booksData} />;
}