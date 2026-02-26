'use client';

import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { clientAuthService } from "@/lib/services/client/auth";
import { useLanguages } from "@/langueges/useLanguages";
import { FormInput } from "@/_components/ui/Input";
import google from "@/_assets/SVGs/gooogle.svg";
import { HiOutlineUserPlus } from "react-icons/hi2";
import Image from "next/image";
import RulesModal from "./RulesModal";


export default function RegisterForm() {
    const { t } = useLanguages();
    const navigate = useRouter();
    const fileInputRef = useRef(null);
    const [showRules, setShowRules] = useState(false);
    const [dial, setDial] = useState("+98");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: ""
    });


    const [error, seterror] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        const { name, value, dial } = e.target;
        const updatedFormData = {
            ...formData,
            [name]: value
        };
        if (name === "mobile") {
            setDial(dial);
        }
        setFormData(updatedFormData);
        validateForm(updatedFormData);
    };

    const validateForm = (formData) => {
        const { firstName, lastName, email, password, confirmPassword } = formData;

        const errors = {
            firstName: "",
            lastName: "",
            email: "",
            mobile: "",
            password: "",
            confirmPassword: ""
        };

        let isValid = true;

        if (firstName.trim() === "") {
            errors.firstName = t("common.firstName") + " " + t("common.cannot be empty");
            isValid = false;
        }
        if (lastName.trim() === "") {
            errors.lastName = t("common.lastName") + " " + t("common.cannot be empty");
            isValid = false;
        }

        if (email.trim() === "") {
            errors.email = t("common.email") + " " + t("common.cannot be empty");
            isValid = false;
        }

        if (password.length < 6) {
            errors.password = t("common.password") + " " + t("common.must be at least 6 characters");

            isValid = false;
        }

        if (password !== confirmPassword) {
            errors.confirmPassword = t("common.passwords do not match");
            isValid = false;
        }

        seterror(errors);
        return isValid;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm(formData)) {
            handleRegister();
        }
    };

    const handleRegister = async () => {
        const body = {
            ...formData,
            mobile: dial + formData.mobile
        }
        try {
            const res = await clientAuthService.register(body);
            console.log("Register response:", res);
        } catch (error) {
            console.error("Register error:", error);
        }
    }

    return (
        <>

            <section>
                <form onSubmit={handleSubmit} className="mt-6 gap-1 flex flex-col items-center" >
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center justify-center w-20 h-20 rounded-full border border-border/80 cursor-pointer mb-6">
                        <HiOutlineUserPlus size={40} className="text-border/80 ms-2 hover:scale-110" />
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                        // onChange={handleImageChange}
                        />
                    </div>
                    <div className="flex gap-5 w-full">
                        <FormInput
                            label={t("common.firstName")}
                            type="text"
                            name="firstName"
                            placeholder={t("common.firstName")}
                            value={formData.firstName}
                            onChange={handleChange}
                            error={error.firstName}
                        />
                        <FormInput
                            label={t("common.lastName")}
                            type="text"
                            name="lastName"
                            placeholder={t("common.lastName")}
                            value={formData.lastName}
                            onChange={handleChange}
                            error={error.lastName}
                        />
                    </div>
                    <FormInput
                        label={t("common.email")}
                        type="email"
                        name="email"
                        placeholder={t("common.email_address")}
                        value={formData.email}
                        onChange={handleChange}
                        error={error.email}
                    />

                    <FormInput
                        label={t("common.mobile")}
                        type="phone"
                        name="mobile"
                        placeholder={t("common.mobile_number")}
                        value={formData.mobile}
                        onChange={handleChange}
                        error={error.mobile}
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
                    />
                    <FormInput
                        label={t("common.confirmPassword")}
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder={t("common.confirmPassword")}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={error.confirmPassword}
                    />


                    <div className="flex flex-col w-full items-center justify-center gap-3">
                        <button
                            type="submit"
                            className="w-full bg-accent text-white py-1 px-4 rounded-xl hover:bg-accent-hover transition-colors"
                        >
                            {t("common.register")}
                        </button>

                        <button
                            className="w-full border border-border py-1 px-4 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                            <Image width={20} height={20} src={google} alt="Google" className="inline-block me-2" /> {t("common.Continue with Google")}
                        </button>
                    </div>
                    <span className="text-xs mt-2 text-text-muted">
                        {t("common.Note By entering the niche you agree to all the")}<span className="text-accent cursor-pointer" onClick={() => setShowRules(true)}>{t("common.rules")}</span>
                    </span>
                </form >
            </section>
            <RulesModal
                isOpen={showRules}
                onClose={() => setShowRules(false)}
            />
        </>
    );
}