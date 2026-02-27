export const metadata = {
    title: 'Books',
    description: 'Browse books and collections.',
    // metadataBase: new URL(process.env.API_BASE_URL),
    openGraph: {
        title: 'Books',
        description: 'Browse books and collections.',
        type: 'website'
    },
};

export default function BooksLayout({ children }) {
    return (
        <div className="h-full w-full flex flex-col">
            {children}
        </div>
    );
}