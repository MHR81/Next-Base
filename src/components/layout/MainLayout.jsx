'use client';

import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';

export default function MainLayout({ children }) {
    const user = useSelector((state) => state.user.data);
    const pathname = usePathname();
    
    // Don't show sidebar/footer on auth pages
    const isAuthPage = pathname?.startsWith('/login') || pathname?.startsWith('/register');

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1">
                {user && !isAuthPage && <Sidebar />}
                <main
                    className={`flex-1 transition-all ${
                        user && !isAuthPage ? 'mr-64' : ''
                    } flex flex-col bg-gray-50`}
                >
                    <div className="flex-1 px-4 md:px-6 py-6 md:py-8">
                        {children}
                    </div>
                    {!isAuthPage && <Footer />}
                </main>
            </div>
        </div>
    );
}
