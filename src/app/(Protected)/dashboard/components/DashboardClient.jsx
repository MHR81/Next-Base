'use client';

import { useSelector } from 'react-redux';

export default function DashboardClient({ initialData, error }) {
    const user = useSelector((state) => state.user.data);

    if (error) {
        return (
            <div className="bg-error/10 text-error p-4 rounded-lg">
                خطا در دریافت اطلاعات: {error}
            </div>
        );
    }

    const displayData = user || initialData;

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h1 className="text-2xl font-bold mb-4">
                    خوش آمدید، {displayData?.email || 'کاربر'}
                </h1>
                <p className="text-gray-600">{displayData?.email}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="پروژه‌ها" value="12" />
                <StatCard title="تسک‌های فعال" value="5" />
                <StatCard title="پیام‌های جدید" value="3" />
            </div>
        </div>
    );
}

function StatCard({ title, value }) {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-gray-600 text-sm mb-2">{title}</h3>
            <p className="text-3xl font-bold text-primary">{value}</p>
        </div>
    );
}