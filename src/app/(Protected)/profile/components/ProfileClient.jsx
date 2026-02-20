'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, updateUser } from '@/redux/slices/userSlice';
import { Button } from '@/components/ui/button/index';
import { FormInput } from '@/components/ui/Input/index';
import { clientProfileService } from '@/lib/services/client/profile';

export default function ProfileClient({ initialData, error }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.data);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });

    const displayData = user || initialData;

    useEffect(() => {
        if (displayData) {
            setFormData({
                name: displayData.name || '',
                email: displayData.email || '',
            });
            if (!user && initialData) {
                dispatch(setUser(initialData));
            }
        }
    }, [displayData, initialData, user, dispatch]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await clientProfileService.update(formData);
            dispatch(updateUser(res.data));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (error) {
        return (
            <div className="bg-error/10 text-error p-4 rounded-lg">
                خطا: {error}
            </div>
        );
    }

    if (!displayData) return <div>در حال بارگذاری...</div>;

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">ویرایش پروفایل</h1>
                    <p className="text-gray-600 mt-2">اطلاعات حساب خود را به‌روز کنید</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                        خطا: {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <FormInput
                        type="text"
                        label="نام"
                        name="name"
                        placeholder="نام خود را وارد کنید"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        size="md"
                    />
                    <FormInput
                        type="email"
                        label="ایمیل"
                        name="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled
                        size="md"
                        helperText="ایمیل قابل تغییر نیست"
                    />
                    <div className="flex gap-4 pt-4">
                        <Button
                            type="submit"
                            disabled={loading}
                            size="md"
                        >
                            {loading ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}