import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LoginForm from './components/LoginForm';

export const metadata = {
    title: 'ورود',
};

export default async function LoginPage() {

    return (
        <>
            <h1 className="text-2xl font-bold text-center mb-6">ورود به حساب</h1>
            <LoginForm />
        </>
    );
}