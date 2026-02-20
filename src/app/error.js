'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button/index';

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="text-center max-w-md">
                <div className="mb-6">
                    <div className="text-6xl mb-4">⚠️</div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">خطایی رخ داد</h2>
                    <p className="text-gray-600">
                        متأسفانه مشکلی پیش آمده است. لطفاً دوباره تلاش کنید.
                    </p>
                </div>
                <Button onClick={reset} size="md">
                    تلاش مجدد
                </Button>
            </div>
        </div>
    );
}