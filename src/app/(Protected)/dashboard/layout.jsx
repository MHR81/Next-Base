export const metadata = {
    title: 'داشبورد',
    description: 'صفحه داشبورد کاربران',
    openGraph: {
        title: 'داشبورد',
        description: 'صفحه داشبورد کاربران',
        type: 'website',
    },
};

export default function DashboardLayout({ children }) {
    return (
        <div className="h-full w-full flex flex-col">
            {children}
        </div>
    );
}