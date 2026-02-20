export const metadata = {
    title: 'ورود',
    description: 'صفحه ورود به حساب کاربری',
    openGraph: {
        title: 'ورود',
        description: 'صفحه ورود به حساب کاربری',
        type: 'website',
    },
};

export default function LoginLayout({ children }) {
    return (
        <div className="h-full w-full flex flex-col">
            {children}
        </div>
    );
}