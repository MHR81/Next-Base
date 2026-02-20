import Link from 'next/link';
import { Button } from '@/components/ui/button/index';

export default function PublicHomePage() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero Section */}
            <section className="flex-1 flex items-center justify-center px-4 py-20">
                <div className="max-w-2xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        خوش‌آمدید به <span className="text-primary">Next Base</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                        یک پروژه بیس حرفه‌ای و مدرن برای شروع سریع پروژه‌های جدید با Next.js
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/login">
                            <Button size="lg">
                                ورود
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button variant="outline" size="lg">
                                ثبت‌نام
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-gray-50 px-4 py-20">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
                        ویژگی‌های اصلی
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon="⚡"
                            title="بسیار سریع"
                            description="عملکرد بهینه‌شده برای بهترین تجربه کاربری"
                        />
                        <FeatureCard
                            icon="🔒"
                            title="امن"
                            description="احراز هویت و مدیریت کاربران یکپارچه"
                        />
                        <FeatureCard
                            icon="🎨"
                            title="قابل سفارشی‌سازی"
                            description="کامپوننت‌های قابل توسعه و کاملا قابل شخصی‌سازی"
                        />
                        <FeatureCard
                            icon="📱"
                            title="واکنش‌گرا"
                            description="طراحی واکنش‌گرا برای تمام نمایشگرها"
                        />
                        <FeatureCard
                            icon="🔧"
                            title="آسان برای توسعه"
                            description="ساختار منطقی و کد تمیز برای توسعه سریع"
                        />
                        <FeatureCard
                            icon="📊"
                            title="تحلیل جامع"
                            description="ابزارهای تحلیل داخلی برای ردیابی عملیات"
                        />
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="px-4 py-20">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <StatBlock number="100+" label="پروژه استفاده شده" />
                        <StatBlock number="50K+" label="خط کد تمیز" />
                        <StatBlock number="99.9%" label="پایایی" />
                    </div>
                </div>
            </section>
        </div>
    );
}

function FeatureCard({ icon, title, description }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}

function StatBlock({ number, label }) {
    return (
        <div>
            <p className="text-4xl font-bold text-primary mb-2">{number}</p>
            <p className="text-gray-600">{label}</p>
        </div>
    );
}