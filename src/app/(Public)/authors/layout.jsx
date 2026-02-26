export const metadata = {
    title: 'Author',
    description: 'Author and recognitions.',
    openGraph: {
        title: 'Author',
        description: 'Author and recognitions.',
        type: 'website'
    },
};


export default function AuthorsLayout({ children }) {
    return (
        <div className="h-full w-full flex flex-col">
            {children}
        </div>
    );
}