export const metadata = {
    title: 'Books',
    description: 'Browse books and collections.',
    openGraph: {
        title: 'Books',
        description: 'Browse books and collections.',
        type: 'website'
    },
};

export default function BooksPage({ children }) {
    return (
        <div className="h-full w-full flex flex-col">
            {children}
        </div>
    );
}