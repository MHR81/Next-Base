import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata = {
    title: {
        template: '%s | احراز هویت',
        default: 'ورود',
    },
    description: 'ورود و ثبت‌نام در Next Base',
    robots: 'noindex, nofollow',
};

export default async function AuthLayout({ children }) {
    
    const token = (await cookies()).get('accessToken')?.value;
    if (token) redirect('/dashboard');

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-center mb-8">
                        <Link href="/" className="text-2xl font-bold text-primary">
                            Next Base
                        </Link>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}