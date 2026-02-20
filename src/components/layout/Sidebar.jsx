'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';

const navigationItems = [
    { href: '/dashboard', label: 'داشبورد', icon: '🏠' },
    { href: '/profile', label: 'پروفایل', icon: '👤' },
];

export default function Sidebar() {
    const pathname = usePathname();
    const user = useSelector((state) => state.user.data);

    if (!user) return null;

    return (
        <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 bg-gray-50 border-l border-gray-200 overflow-y-auto">
            <nav className="p-4 space-y-2">
                {navigationItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`
                                flex items-center gap-3 px-4 py-2 rounded-lg transition-colors
                                ${
                                    isActive
                                        ? 'bg-primary text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }
                            `}
                        >
                            <span className="text-lg">{item.icon}</span>
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
