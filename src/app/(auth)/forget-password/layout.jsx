export const metadata = {
    title: 'Forgot Password',
    description: 'Reset your account password.',
    openGraph: {
        title: 'Forgot Password',
        description: 'Reset your account password.',
        type: 'website'
    },
};

export default function ForgetPasswordLayout({ children }) {
    return (
        <div className="h-full w-full flex flex-col">
            {children}
        </div>
    );
}