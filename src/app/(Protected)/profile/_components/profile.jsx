'use client';

import { useState } from "react";
import ProfileSidebar from "./ProfileSidebar";
import AnimatedSearchBox from "@/_components/layout/AnimatedSearchBox";
import { cn } from "@/utils/helpers";

import EditProfile from "./sessions/editProfile";
import SavedBooks from "./sessions/savedBooks";
import Uploads from "./sessions/uploads/uploads";
import NotificationsList from "./sessions/notifications";

export default function Profile() {
    const [activeTab, setActiveTab] = useState('Account');
    return (
        <div className="h-full w-full flex flex-col lg:flex-row gap-0 min-h-screen">
            <aside className='shrink-0 w-full lg:w-[30%] lg:flex lg:justify-center lg:items-start lg:pt-10'>
                <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            </aside>

            <section className='relative flex-1 lg:px-10 lg:pt-20 pb-20 lg:pb-0'>
                <div className=" absolute -top-18 lg:top-0 right-10">
                    <AnimatedSearchBox variant="always" scrollY={0} />
                </div>

                <div>
                    {activeTab === 'Account' && <EditProfile />}
                    {activeTab === 'Saved' && <SavedBooks />}
                    {activeTab === 'Upload' && <Uploads />}
                    {activeTab === 'Notification' && <NotificationsList />}
                </div>

                {activeTab === 'logout' && (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 text-lg">
                        See you later!
                    </div>
                )}
            </section>
        </div>
    )
};
