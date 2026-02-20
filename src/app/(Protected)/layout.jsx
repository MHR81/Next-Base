import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { serverAuthService } from '@/lib/services/server/auth';
import StoreProvider from '@/redux/store-provider';

export const metadata = {
    title: {
        template: '%s | Next Base',
        default: 'داشبورد',
    },
    description: 'داشبورد کاربری Next Base',
};

export default async function ProtectedLayout({ children }) {

    const token = (await cookies()).get('accessToken')?.value;
    if (!token) redirect('/login');

    let userProfile = null;
    try {
        const res = await serverAuthService.getMe();
        // console.log("res in layout", res);
        userProfile = res?.data;
    } catch (error) {
        console.error("Error fetching user in layout:", error);
        redirect('/login');
    }

    const preloadedState = {
        user: { data: userProfile, isAuthenticated: !!userProfile, isLoaded: true },
    }

    return (
        <StoreProvider preloadedState={preloadedState}>
            <div className="min-h-screen w-full flex flex-col">
                <main>{children}</main>
            </div>
        </StoreProvider>
    );
}