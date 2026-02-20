'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button/index';
import { FormInput } from '@/components/ui/Input/index';
import { setUser } from '@/redux/slices/userSlice';
import { clientAuthService } from '@/lib/services/client/auth';

export default function LoginForm() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        identifier: '',
        password: '',
    });

    // const handleChange = (e) => {
    //     setFormData((prev) => ({
    //         ...prev,
    //         [e.target.name]: e.target.value,
    //     }));
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await clientAuthService.login(formData);
            if (res?.data?.success) {
                const user = res?.data?.data?.user || null;
                dispatch(setUser(user));
                router.push('/dashboard');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
                type="email"
                label="ایمیل یا نام کاربری"
                placeholder="example@email.com"
                value={formData.identifier}
                onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                required
                size="md"
            />
            <FormInput
                type="password"
                label="رمز عبور"
                placeholder="رمز عبور خود را وارد کنید"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                size="md"
                showToggle
            />
            <Button
                type="submit"
                disabled={loading}
                className="w-full"
                size="md"
            >
                {loading ? 'در حال ورود...' : 'ورود'}
            </Button>
            <p className="text-center text-sm text-gray-600">
                حساب ندارید؟{' '}
                <Link href="/register" className="text-primary hover:underline font-semibold">
                    ثبت‌نام کنید
                </Link>
            </p>
        </form>
    );
}