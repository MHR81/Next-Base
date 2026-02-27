import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { serverProfileService } from '@/lib/services/server/profile';
import StoreProvider from '@/redux/store-provider';
import { notFound } from 'next/navigation';

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
    const savedLang = cookieStore.get('local')?.value || 'en';
    if (!token) redirect('/login');


    let userProfile = null;
    // try {
    //     const res = await serverProfileService.getMe();
    //     userProfile = res?.data;
    //     if (!userProfile) throw new Error("No user profile found");
    // } catch (err) {
    //     console.error("Error fetching user profile in layout:", err);
    //     // throw err;
    // }



    try {
        const res = await serverProfileService.getMe();
        console.log("Profile response:", res);
        const profile = res?.data ?? res;
        if (!profile || (res && res.success === false)) return notFound();

    } catch (err) {
        if (String(err.message).includes('404')) return notFound();
        console.log("Error fetching profile:", err);
        throw err;
    }

    const preloadedState = {
        user: { data: userProfile, isAuthenticated: !!userProfile, isLoaded: true },
    };

    return (
        <StoreProvider
            preloadedState={preloadedState}
            initialLocale={savedLang}>
            <div className="min-h-screen w-full flex flex-col">
                <main>{children}</main>
            </div>
        </StoreProvider>
    );
}