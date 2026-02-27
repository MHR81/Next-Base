
import LoginForm from './_components/LoginForm';

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

export default async function LoginPage() {

    return (
        <>
            <LoginForm />
        </>
    );
}