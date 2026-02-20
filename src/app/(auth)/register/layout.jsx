export const metadata = {
    title: 'ثبت نام',
    description: 'صفحه ثبت نام کاربران',
    openGraph: {
        title: 'ثبت نام',
        description: 'صفحه ثبت نام کاربران',
        type: 'website',
    },
};

export default function RegisterLayout({ children }) {
    return (
        <div className="h-full w-full flex flex-col">
            {children}
        </div>
    );
}