import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import RegisterForm from './components/RegisterForm';

export const metadata = {
    title: 'ثبت‌نام',
};

export default async function RegisterPage() {
    const token = (await cookies()).get('accessToken')?.value;

    if (token) {
        redirect('/dashboard');
    }

    return (
        <>
            <h1 className="text-2xl font-bold text-center mb-6">ایجاد حساب جدید</h1>
            <RegisterForm />
        </>
    );
}