export const metadata = {
    title: 'Register',
    description: 'Create a new account to access Taghche services.',
    openGraph: {
        title: 'Register',
        description: 'Create a new account to access Taghche services.',
        type: 'website'
    },
};

export default function RegisterLayout({ children }) {
    return (
        <div className="h-full w-full flex flex-col">
            {children}
        </div>
    );
}