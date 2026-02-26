import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { serverProfileService } from '@/lib/services/server/profile';
import StoreProvider from '@/redux/store-provider';

export const metadata = {
    title: {
        template: '%s | Next Base',
        default: 'Dashboard',
    },
    description: 'User dashboard and protected pages for authenticated users.',
    robots: 'noindex, nofollow',
};

export default async function ProtectedLayout({ children }) {

    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;
    const savedLang = cookieStore.get('lang')?.value || 'en';
    if (!token) redirect('/login');

    let userProfile = null;
    try {
        const res = await serverProfileService.getMe();
        console.log("res in layout", res);
        userProfile = res?.data;
    } catch (error) {
        console.error("Error fetching user in layout:", error);
        redirect('/login');
    }

    const preloadedState = {
        user: { data: userProfile, isAuthenticated: !!userProfile, isLoaded: true },
    }

    return (
        <StoreProvider preloadedState={preloadedState} initialLocale={savedLang}>
            <div className="min-h-screen w-full flex flex-col">
                <main>{children}</main>
            </div>
        </StoreProvider>
    );
}