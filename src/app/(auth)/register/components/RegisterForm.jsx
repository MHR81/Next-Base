'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button/index';
import { FormInput, OtpInput } from '@/components/ui/Input/index';
import { clientAuthService } from '@/lib/services/client/auth';

export default function RegisterForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        otp: '',
    });

    // const handleChange = (e) => {
    //     setFormData((prev) => ({
    //         ...prev,
    //         [e.target.name]: e.target.value,
    //     }));
    // };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await clientAuthService.register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });
            setStep(2);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await clientAuthService.verifyOTP({
                email: formData.email,
                otp: formData.otp,
            });
            router.push('/login');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (step === 2) {
        return (
            <form onSubmit={handleVerify} className="space-y-6">
                <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-2">تایید کد</h2>
                    <p className="text-gray-600 text-sm">کد تایید ارسال شده به {formData.email} را وارد کنید</p>
                </div>
                <FormInput
                    type="otp"
                    length={6}
                    value={formData.otp}
                    onChange={(val) => setFormData({ ...formData, otp: val })}
                    label="کد تایید"
                    autoFocus
                />
                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full"
                    size="md"
                >
                    {loading ? 'در حال تایید...' : 'تایید کد'}
                </Button>
            </form>
        );
    }

    return (
        <form onSubmit={handleRegister} className="space-y-6">
            <FormInput
                type="text"
                label="نام کامل"
                name="name"
                placeholder="نام و نام خانوادگی"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                size="md"
            />
            <FormInput
                type="email"
                label="ایمیل"
                name="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                size="md"
            />
            <FormInput
                type="password"
                label="رمز عبور"
                name="password"
                placeholder="رمز عبور قوی انتخاب کنید"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                size="md"
                showToggle
                showStrength
            />
            <Button
                type="submit"
                disabled={loading}
                className="w-full"
                size="md"
            >
                {loading ? 'در حال ثبت‌نام...' : 'ثبت‌نام'}
            </Button>
            <p className="text-center text-sm text-gray-600">
                قبلاً ثبت‌نام کردید؟{' '}
                <Link href="/login" className="text-primary hover:underline font-semibold">
                    وارد شوید
                </Link>
            </p>
        </form>
    );
}