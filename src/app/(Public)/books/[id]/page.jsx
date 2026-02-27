import BookDetail from "./_components/BookDetail";
import { serverBooksService } from '@/lib/services/server/book';
import { notFound } from 'next/navigation';


export const metadata = {
    title: 'Book Details',
    description: 'Detailed information and metadata for the selected book.',
    // metadataBase: new URL(process.env.API_BASE_URL || 'http://localhost:3000'),
    openGraph: {
        title: 'Book Details',
        description: 'Detailed information and metadata for the selected book.',
        type: 'website'
    },
};

export default async function BookDetailsPage({ params }) {
    // const id = params?.id;
    // try {
    //     const res = await serverBooksService.getBookById(id);
    //     console.log("Book details response:", res);
    //     const book = res?.data ?? res;
    //     if (!book || (res && res.success === false)) return notFound();
    //     return <BookDetail data={book} />;
    // } catch (err) {
    //     if (String(err.message).includes('404')) return notFound();
    //     console.error("Error fetching book details:", err);
    //     throw err;
    // }

    return <BookDetail />
}