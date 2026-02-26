export const metadata = {
    title: 'Award Details',
    description: 'Details and information about the selected award.',
    openGraph: {
        title: 'Award Details',
        description: 'Details and information about the selected award.',
        type: 'website'
    },
};

export default function AwardDetailsPage({ children }) {
    return (
        <div className="h-full w-full flex flex-col">
            {children}
        </div>
    );
}