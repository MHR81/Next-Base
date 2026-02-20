'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { clearUser } from '@/redux/slices/userSlice';
import { cn } from '@/utils/helpers';

export default function Navbar({ user, className }) {
    const router = useRouter();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        localStorage.removeItem('token');
        dispatch(clearUser());
        router.push('/login');
        router.refresh();
    };

    return (
        <nav className={cn(
            "bg-white shadow-sm",
            className
        )}>
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/dashboard" className="text-xl font-bold text-primary">
                    Next Base
                </Link>

                <div className="flex items-center gap-6">
                    <Link href="/dashboard" className="text-gray-600 hover:text-primary">
                        داشبورد
                    </Link>
                    <Link href="/profile" className="text-gray-600 hover:text-primary">
                        پروفایل
                    </Link>

                    <div className="flex items-center gap-4">
                        {/* <span className="text-sm text-gray-600">{user.name}</span> */}
                        <button
                            onClick={handleLogout}
                            className="text-sm text-error hover:underline"
                        >
                            خروج
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}