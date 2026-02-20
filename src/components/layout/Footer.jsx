export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="text-lg font-bold text-primary mb-4">Next Base</h3>
                        <p className="text-gray-600 text-sm">
                            یک پروژه بیس حرفه‌ای برای شروع سریع پروژه‌های جدید با Next.js
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">دسترسی سریع</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="/dashboard" className="hover:text-primary transition-colors">داشبورد</a></li>
                            <li><a href="/profile" className="hover:text-primary transition-colors">پروفایل</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">درباره</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="#" className="hover:text-primary transition-colors">دستاورد شامل</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">راهنمای استفاده</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-8">
                    <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
                        <p>© {currentYear} Next Base. تمام حقوق محفوظ است.</p>
                        <div className="flex gap-6 mt-6 md:mt-0">
                            <a href="#" className="hover:text-primary transition-colors">حریم خصوصی</a>
                            <a href="#" className="hover:text-primary transition-colors">شرایط استفاده</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
