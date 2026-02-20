import Link from 'next/link';
import { Button } from '@/components/ui/button/index';

export const metadata = {
    title: 'صفحه یافت نشد | 404',
};

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="text-center max-w-md">
                <div className="mb-6">
                    <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">صفحه یافت نشد</h2>
                    <p className="text-gray-600">
                        متأسفانه صفحه مورد نظر شما وجود ندارد.
                    </p>
                </div>
                <Link href="/">
                    <Button size="md">
                        بازگشت به صفحه اصلی
                    </Button>
                </Link>
            </div>
        </div>
    );
}