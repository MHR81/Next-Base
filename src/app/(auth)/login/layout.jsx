export const metadata = {
    title: 'Login',
    description: 'User login page.',
    openGraph: {
        title: 'Login',
        description: 'User login page.',
        type: 'website'
    },
    robots: 'noindex, nofollow'
};

export default function LoginLayout({ children }) {
    return (
        <div className="h-full w-full flex flex-col">
            {children}
        </div>
    );
}