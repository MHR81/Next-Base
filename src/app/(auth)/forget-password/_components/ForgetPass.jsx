'use client';

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { clientAuthService } from "@/lib/services/client/auth";
import { FormInput } from "@/_components/ui/Input";
import { useLanguages } from "@/langueges/useLanguages";

export default function ForgetPassword() {
    const { t } = useLanguages();
    const navigate = useRouter();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [timeLeft, setTimeLeft] = useState(120);
    const timerRef = useRef(null);
    const [formData, setFormData] = useState({
        code: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [error, setError] = useState({
        code: "",
        newPassword: "",
        confirmPassword: ""
    });

    useEffect(() => {
        if (step !== 2) return;

        if (timeLeft <= 0) {
            if (timerRef.current) clearInterval(timerRef.current);
            return;
        }

        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    if (timerRef.current) clearInterval(timerRef.current);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [step, timeLeft]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'email') {
            setEmail(value);
        }

        const updatedFormData = {
            ...formData,
            [name]: value
        };
        setFormData(updatedFormData);

        if (name === 'code') {
            if (String(value).length === 4) validateForm(updatedFormData, 2);
        } else if (name === 'email') {
            validateForm(updatedFormData, 1);
        } else {
            validateForm(updatedFormData, 3);
        }
    };

    const validateForm = (data = formData, stage = step) => {
        const { code, newPassword, confirmPassword, email } = data;

        const errors = {
            email: "",
            code: "",
            newPassword: "",
            confirmPassword: ""
        };

        let isValid = true;

        if (stage === 1) {
            if (!email || email.trim() === "") {
                errors.email = t("common.email") + " " + t("common.cannot be empty");
                isValid = false;
            }
        }

        if (stage === 2) {
            if (!code || String(code).length !== 4) {
                errors.code = t("common.code") + " " + t("common.must be 4 digits");
                isValid = false;
            }
        }

        if (stage === 3) {
            if (!newPassword || newPassword.length < 6) {
                errors.newPassword = t("common.password") + " " + t("common.must be at least 6 characters");
                isValid = false;
            }
            if (newPassword !== confirmPassword) {
                errors.confirmPassword = t("common.passwords do not match");
                isValid = false;
            }
            if (!code || String(code).length !== 4) {
                errors.code = t("common.code") + " " + t("common.must be 4 digits");
                isValid = false;
            }
        }

        setError(errors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (step === 1) {
            if (validateForm(formData, 1)) {
                handleSendCode();
            }
            return;
        }
        if (step === 2) {
            if (validateForm(formData, 2)) {
                setStep(3);
            }
            return;
        }
        if (step === 3) {
            if (validateForm(formData, 3)) {
                handleResetPass();
            }
        }
    };

    const handleSendCode = async () => {
        try {
            const res = await clientAuthService.forgotPassword({ email });
            console.log("Send Reset Code response:", res);
            if (res?.data?.success) {
                setTimeLeft(120);
                setStep(2);
            }
        } catch (error) {
            console.error("Send Reset Code error:", error);
        }
    };

    const handleResetPass = async () => {
        const body = {
            email: email,
            code: formData.code,
            newPassword: formData.newPassword
        };
        try {
            const res = await clientAuthService.resetPassword(body);
            if (res?.data?.success) {
                navigate.push("/login");
            }
            console.log("Reset Password response:", res);
        } catch (error) {
            console.error("Reset Password error:", error);
        }
    }

    return (
        <section>
            <form onSubmit={handleSubmit} className="mt-6 gap-3 px-5 flex flex-col items-center" >
                <div className="w-full">
                    {step === 1 && (
                        <FormInput
                            label={t("common.email")}
                            type="email"
                            name="email"
                            placeholder={t("common.email_address")}
                            value={formData.email}
                            onChange={handleChange}
                            error={error.email}
                        />
                    )}


                    {step === 2 && (
                        <>
                            <div className="flex flex-col w-full justify-center items-center gap-2 mb-4">

                                {timeLeft > 0 ? (
                                    <>
                                        <span className="text-sm text-gray-500">{t("common.code expire in")}</span>
                                        <span className="text-5xl font-bold text-text-secondary">
                                            {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:{String(timeLeft % 60).padStart(2, '0')}
                                        </span>
                                    </>

                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleSendCode}
                                        className="text-sm text-accent font-semibold hover:text-accent-hover transition-colors"
                                    >
                                        {t("common.resend code")}
                                    </button>
                                )}
                            </div>
                            <FormInput
                                type="otp"
                                name="code"
                                length={4}
                                value={formData.code}
                                size="xl"
                                className=""
                                onChange={handleChange}
                                error={error.code}
                            />
                        </>
                    )}
                    {step === 3 && (
                        <>
                            <div className="w-full flex flex-col gap-3">
                                <FormInput
                                    label={t('common.new password')}
                                    type="password"
                                    name="newPassword"
                                    placeholder="******"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    error={error.newPassword}
                                />
                                <FormInput
                                    label={t('common.confirm password')}
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="******"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    error={error.confirmPassword}
                                />
                            </div>
                        </>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full bg-accent text-lg text-white py-1 px-4 rounded-xl hover:bg-accent-hover transition-colors"
                >
                    {step === 1 ? t("common.send code") : step === 2 ? t("common.verify code") : t("common.update password")}
                </button>

            </form >
        </section>
    );
}
