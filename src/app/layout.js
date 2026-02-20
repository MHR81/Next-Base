import './globals.css';
import StoreProvider from '@/redux/store-provider';
import MainLayout from '@/components/layout/MainLayout';
import Toast from '@/components/Toast';

export const metadata = {
  title: {
    default: 'Next Base',
    template: '%s | Next Base',
  },
  description: 'پروژه بیس Next.js حرفه‌ای برای شروع سریع پروژه‌های جدید',
  keywords: 'nextjs, react, base, template, boilerplate',
  author: 'Next Base',
  version: '1.0.0',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="antialiased bg-white text-gray-900">
        <StoreProvider>
          <MainLayout>
            {children}
            <Toast />
          </MainLayout>
        </StoreProvider>
      </body>
    </html>
  );
}