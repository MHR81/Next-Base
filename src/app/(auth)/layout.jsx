import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import StoreProvider from '@/redux/store-provider';
import LocaleProvider from '@/langueges/LocaleProvider';
import HeaderWrapper from "@/_components/layout/HeaderWrapper";


export const metadata = {
    title: {
        template: '%s | Authentication',
        default: 'Login',
    },
    description: 'Authentication pages (login, register, password reset).',
    robots: 'noindex, nofollow',
};

export default async function AuthLayout({ children }) {

    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;
    const savedLang = cookieStore.get('lang')?.value || 'en';

    if (token) redirect('/profile');

    return (
        <StoreProvider initialLocale={savedLang} >
            <LocaleProvider>
                <div className="min-h-screen flex flex-col justify-center items-center">
                    <HeaderWrapper />
                    <main className="flex justify-center items-center w-full h-full my-auto p-6">
                        <div className="rounded-lg p-4 w-full max-w-md">
                            {children}
                        </div>
                    </main>
                </div>
            </LocaleProvider>
        </StoreProvider >
    );
}