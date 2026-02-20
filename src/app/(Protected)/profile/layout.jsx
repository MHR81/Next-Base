export const metadata = {
    title: 'پروفایل من',
    description: 'صفحه پروفایل کاربران',
    openGraph: {
        title: 'پروفایل من',
        description: 'صفحه پروفایل کاربران',
        type: 'website',
    },
};

export default function ProfileLayout({ children }) {
    return (
        <div className="h-full w-full flex flex-col">
            {children}
        </div>
    );
}