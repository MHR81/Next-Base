export const metadata = {
    title: 'Book Details',
    description: 'Detailed information and metadata for the selected book.',
    openGraph: {
        title: 'Book Details',
        description: 'Detailed information and metadata for the selected book.',
        type: 'website'
    },
};

export default function BookDetailsPage({ children }) {
    return (
        <div className="h-full w-full flex flex-col">
            {children}
        </div>
    );
}