'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '@/redux/slices/userSlice';
import { Button } from '@/components/ui/button/index';

export default function Header() {
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.data);

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            localStorage.removeItem('token');
            dispatch(clearUser());
            router.push('/login');
        }
    };

    return (
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
            <div className="h-16 px-6 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold text-primary">
                    Next Base
                </Link>

                <div className="flex items-center gap-6">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-900">
                                    {user.name || user.email}
                                </p>
                                <p className="text-xs text-gray-500">{user.role || 'کاربر'}</p>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleLogout}
                            >
                                خروج
                            </Button>
                        </div>
                    ) : (
                        <Link href="/login">
                            <Button size="sm">ورود</Button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
