export const metadata = {
    title: 'My Profile',
    description: 'User profile and account settings.',
    openGraph: {
        title: 'My Profile',
        description: 'User profile and account settings.',
        type: 'website'
    },
    robots: 'noindex, nofollow'
};

export default function ProfileLayout({ children }) {
    return (
        <div className="h-screen w-full flex flex-col py-10 lg:px-10">
            {children}
        </div>
    );
}