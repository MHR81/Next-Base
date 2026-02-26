'use client';

import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { motion } from 'framer-motion';
import { useLanguages } from "@/langueges/useLanguages";
import { FormInput } from "@/_components/ui/Input";
// import userService from "../../../services/api/profile";
// import fileService from "../../../services/api/file";
import Image from "next/image";
import defaultUser from "@/_assets/images/defaultUser.jpg";
import { clientProfileService } from "@/lib/services/client/profile";
import { clientFileService } from "@/lib/services/client/file";
import { showToast } from "@/redux/slices/toastSlice";
import { useDispatch } from "react-redux";

export default function EditProfile() {
    const { t } = useLanguages();
    const fileInputRef = useRef(null);
    const profile = useSelector((state) => state.user.data);
    const dispatch = useDispatch();
    // console.log("user in dashboard client", profile);

    const [dial, setDial] = useState("98");
    const [formData, setFormData] = useState({
        firstName:  "",
        lastName:  "",
        email: "",
        mobile:  "",
        password: "",
        confirmPassword: "",
        image: {
            _id:  "",
            path: ""
        },
    });

    console.log("formData", formData);

    // console.log("formData", formData);

    useEffect(() => {
        if (profile) {
            setFormData(prev => ({
                ...prev,
                firstName: profile.firstName || "",
                lastName: profile.lastName || "",
                email: profile.email || "",
                mobile: profile.mobile || "",
                image: {
                    _id: profile.image?._id || "",
                    path: profile.image?.path || ""
                }
            }));
        }
    }, [profile]);


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
        if (name === "mobile") {
            setDial(dial);
        }
        const updatedFormData = {
            ...formData,
            [name]: value
        };
        setFormData(updatedFormData);
        validateForm(updatedFormData);
    };

    const validateForm = (formData) => {
        const { firstName, lastName, email, password, confirmPassword } = formData;

        const errors = {
            firstName: "",
            lastName: "",
            email: "",
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

        const hasPassword = password.trim() !== "";
        const hasConfirm = confirmPassword.trim() !== "";

        if (hasPassword || hasConfirm) {
            if (password.length < 6) {
                errors.password = t("common.password") + " " + t("common.must be at least 6 characters");
                isValid = false;
            }

            if (password !== confirmPassword) {
                errors.password = t("common.passwords do not match");
                isValid = false;
            }
        }

        seterror(errors);
        return isValid;
    }

        const handleUpdateProfile = async () => {

        const body = {
            firstName: formData.firstName,
            lastName: formData.lastName,
        }

        if (formData.image?._id.trim() !== profile?.image?._id) {
            body.image = formData.image?._id;
        }

        if (formData.mobile.trim() !== profile?.mobile) {
            body.mobile = `${dial}${formData.mobile}`;
        }

        if (formData.email.trim() !== profile?.email) {
            body.email = formData.email;
        }

        if (formData.password.trim() !== "") {
            body.password = formData.password;
        }

        console.log("Profile update body:", body);

        try {
            const res = await clientProfileService.updateProfile(body);
            console.log("Profile updated successfully:", res);
            setFormData(prev => ({ ...prev, password: "", confirmPassword: "" }));
            dispatch(showToast({ message: 'Profile updated successfully!', type: 'success' }));
        } catch (err) {
            console.error("Error updating profile:", err);
        }
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
        if (validateForm(formData)) {
           await handleUpdateProfile();
        }
    };

    const handleImageChange = async (file) => {
        if (file) {
            const uploadFormData = new FormData();
            uploadFormData.append('file', file);
            try {
                const res = await clientFileService.uploadFile(uploadFormData);
                const imagePath = res?.data?.message?.path;
                const imageId = res?.data?.message?._id;

                setFormData(prev => ({
                    ...prev,
                    image: { _id: imageId, path: imagePath }
                }));
                console.log("File uploaded successfully:", res);
            } catch (err) {
                console.error("Error uploading file:", err);
            }
        } else {
            setFormData(prev => ({ ...prev, image: { _id: "", path: "" } }));
        }
    }



    return (
        <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center lg:justify-start w-full h-full px-10 lg:px-20"
        >
            <motion.form onSubmit={handleSubmit} className="flex flex-col items-center w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12, duration: 0.5 }}>
                <motion.div
                    onClick={() => fileInputRef.current?.click()}
                    whileHover={{ scale: 1.03 }}
                    className="flex flex-col items-center justify-center  mb-4"
                >
                    <Image
                        src={formData?.image?.path || defaultUser}
                        alt="Profile Avatar"
                        width={100}
                        height={100}
                        className="object-cover w-28 h-28 rounded-full border border-border/80 cursor-pointer"
                    />
                    <motion.span className="text-xs text-gray-800 mt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>{t('common.edit_photo') || 'Edit Photo'}</motion.span>
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e.target.files[0])}
                    />
                </motion.div>
                <motion.div className="flex flex-col md:flex-row md:gap-10 w-full items-center pt-3 pb-5 rounded-2xl" initial={{ scale: 0.99, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.16, duration: 0.5 }}>

                    <div className="flex flex-col gap-2 md:w-1/2 w-full">
                        <FormInput
                            label={t("common.firstName")}
                            type="text"
                            name="firstName"
                            placeholder={t("common.firstName")}
                            value={formData.firstName}
                            onChange={handleChange}
                            error={error.firstName}
                            variant="custom2"
                            size="md"
                        />

                        <FormInput
                            label={t("common.phone")}
                            type="phone"
                            name="mobile"
                            placeholder={t("common.phone_number")}
                            value={formData.mobile}
                            onChange={handleChange}
                            error={error.mobile}
                            variant="custom2"
                            countriesVariant="custom2"
                        />

                        <FormInput
                            label={t("common.password")}
                            type="password"
                            name="password"
                            id="password"
                            placeholder={t("common.password")}
                            value={formData.password}
                            onChange={handleChange}
                            variant="custom2"
                        />
                    </div>
                    <div className="flex flex-col gap-2 md:w-1/2 w-full">
                        <FormInput
                            label={t("common.lastName")}
                            type="text"
                            name="lastName"
                            placeholder={t("common.lastName")}
                            value={formData.lastName}
                            onChange={handleChange}
                            error={error.lastName}
                            variant="custom2"
                        />
                        <FormInput
                            label={t("common.email")}
                            type="email"
                            name="email"
                            placeholder={t("common.email_address")}
                            value={formData.email}
                            onChange={handleChange}
                            error={error.email}
                            variant="custom2"
                        />

                        <FormInput
                            label={t("common.confirmPassword")}
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder={t("common.confirmPassword")}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            error={error.password}
                            variant="custom2"
                        />
                    </div>
                </motion.div>


                <motion.div className="flex flex-row-reverse w-full items-center justify-center gap-5 md:gap-10 mt-5 px-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22 }}>
                    <button
                        type="submit"
                        className="w-1/2 md:w-50 bg-accent text-white py-1.5 px-4 rounded-xl hover:bg-accent-hover transition-colors"
                    >
                        {t("common.confirm")}
                    </button>

                    <button
                        type="button"
                        className="w-1/2 md:w-50 border border-gray-400 text-gray-700 dark:text-gray-300 py-1.5 px-4 rounded-xl hover:bg-gray-200 transition-colors"
                    >
                        {t("common.cancel")}
                    </button>
                </motion.div>
            </motion.form >
        </motion.section>
    );
}