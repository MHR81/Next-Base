'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import { clientAuthService } from "@/lib/services/client/auth";
import { useDispatch } from "react-redux";
import { FormInput } from "@/_components/ui/Input";
import { Button } from '@/_components/ui/button/index';
import { useLanguages } from "@/langueges/useLanguages";
import { setUser } from "@/redux/slices/userSlice";
import Link from "next/link";
import google from "@/_assets/SVGs/gooogle.svg";
import Image from "next/image";
import { setToken } from "@/redux/slices/authSlice";

export default function Login() {
    const { t } = useLanguages();
    const navigate = useRouter();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        userName: "",
        password: ""
    });

    const [error, setError] = useState({
        userName: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedFormData = {
            ...formData,
            [name]: value
        };
        setFormData(updatedFormData);
        validateForm(updatedFormData);
    };

    const validateForm = (formData) => {
        const { userName, password } = formData;

        const errors = {
            userName: "",
            password: ""
        };

        let isValid = true;
        if (userName.trim() === "") {
            errors.userName = t("common.email") + " " + t("common.cannot be empty");
            isValid = false;
        }

        if (password.length < 6) {
            errors.password = t("common.password") + " " + t("common.must be at least 6 characters");
            isValid = false;
        }

        setError(errors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm(formData)) {
            handleLogin();
        }
    };

    const handleLogin = async () => {
        try {
            const loginData = {
                userName: formData.userName,
                password: formData.password
            };
            const res = await clientAuthService.login(loginData);
            if (res?.data?.success) {
                const token = res?.data?.data?.tokens?.accessToken || null;
                dispatch(setToken(token));
                navigate.push('/profile');
            }
            console.log("Login response:", res);
        } catch (error) {
            console.error("Login error:", error);
        }
    }

    return (
        <section>
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-2 items-center" >

                <FormInput
                    label={t("common.email")}
                    type="text"
                    name="userName"
                    placeholder={t("common.email_address")}
                    value={formData.userName}
                    onChange={handleChange}
                    error={error.userName}
                // required
                />

                <FormInput
                    label={t("common.password")}
                    type="password"
                    name="password"
                    id="password"
                    placeholder={t("common.password")}
                    value={formData.password}
                    onChange={handleChange}
                    error={error.password}
                // required
                />

                <div className="flex justify-between mb-4 w-full">
                    <Link
                        href="/register"
                        className="text-text-muted text-xs cursor-pointer"
                    >
                        {t("common.Create an account")}<span className="text-accent hover:font-bold">{t("common.sign up")}</span>

                    </Link>
                    <span
                        className="text-[#46AC9A] hover:underline text-xs cursor-pointer"
                        onClick={() => navigate.push("/forgot-password")}
                    >
                        {t("common.forgot password?")}

                    </span>
                </div>

                <div className="flex flex-col w-full items-center justify-center gap-3 mt-4">
                    <Button
                        type="submit"
                        className="w-full bg-accent text-white py-1 px-4 rounded-xl hover:bg-accent-hover transition-colors"
                    >
                        {t("common.login")}
                    </Button>

                    <button
                        className="w-full border border-border py-1 px-4 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                        <Image width={20} height={20} src={google} alt="Google" className="inline-block me-2" /> {t("common.Continue with Google")}
                    </button>
                </div>
                <span className="text-xs mt-2 text-text-muted">
                    {t("common.Note By entering the niche you agree to all the")}<span className="text-accent">{t("common.rules")}</span>
                </span>
            </form >
        </section>
    );
}