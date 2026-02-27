'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    Bookmark,
    Upload,
    LogOut,
    Bell,
    ChevronDown,
    Menu,
    X
} from 'lucide-react';
import { useLanguages } from '@/langueges/useLanguages';
import Image from 'next/image';
import defaultUser from '@/_assets/images/defaultUser.jpg';
import { useSelector } from 'react-redux';

const DesktopNavItem = ({ icon: Icon, label, active, onClick }) => (
    <motion.button
        whileHover={{ x: 4 }}
        onClick={onClick}
        className={`flex items-center gap-4 w-full px-5 py-4 rounded-2xl text-left transition-all duration-200 ${active
            ? 'bg-white/80 shadow-sm text-accent'
            : 'text-gray-500 hover:bg-white/40 hover:text-gray-700'
            }`}
    >
        <Icon size={22} strokeWidth={1.5} />
        <span className="font-medium text-[15px]">{label}</span>
    </motion.button>
);


const MobileNavItem = ({ icon: Icon, label, active, onClick }) => (
    <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all duration-200 ${active
            ? 'text-[#F4A261]'
            : 'text-gray-400 hover:text-gray-600'
            }`}
    >
        <Icon size={22} strokeWidth={active ? 2 : 1.5} />
        <span className="text-[10px] font-medium">{label}</span>
        {active && (
            <motion.div
                layoutId="activeTab"
                className="absolute -bottom-1 w-1 h-1 bg-[#F4A261] rounded-full"
            />
        )}
    </motion.button>
);

// ============================================
// Mobile Profile Dropdown
// ============================================
// const MobileProfileDropdown = ({ isOpen, onClose, navItems, activeTab, setActiveTab, logOut }) => {
//     if (!isOpen) return null;

//     return (
//         <AnimatePresence>
//             <motion.div
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 className="absolute top-full left-0 right-0 mt-2 mx-4 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50"
//             >
//                 <div className="p-4">
//                     {navItems.slice(0, -1).map((item) => (
//                         <button
//                             key={item.id}
//                             onClick={() => {
//                                 setActiveTab(item.id);
//                                 onClose();
//                             }}
//                             className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-colors ${activeTab === item.id
//                                 ? 'bg-[#F4A261]/10 text-[#F4A261]'
//                                 : 'text-gray-600 hover:bg-gray-50'
//                                 }`}
//                         >
//                             <item.icon size={20} strokeWidth={activeTab === item.id ? 2 : 1.5} />
//                             <span className="font-medium">{item.label}</span>
//                             {activeTab === item.id && (
//                                 <div className="ml-auto w-2 h-2 bg-[#F4A261] rounded-full" />
//                             )}
//                         </button>
//                     ))}
//                 </div>

//                 <div className="border-t border-gray-100 p-4">

//                 </div>
//             </motion.div>
//         </AnimatePresence>
//     );
// };


export default function ProfileSidebar({ activeTab, setActiveTab }) {
    const { t } = useLanguages();
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const profile = useSelector((state) => state.user.data);

    const navItems = [
        { id: 'Account', icon: User, label: t('profile.account') || 'Account' },
        { id: 'Saved', icon: Bookmark, label: t('profile.saved') || 'Saved' },
        { id: 'Upload', icon: Upload, label: t('profile.upload') || 'Upload' },
        { id: 'Notification', icon: Bell, label: t('profile.notification') || 'Notification' },
        { id: 'logout', icon: LogOut, label: t('profile.exit') || 'Exit' },
    ];

    const logOut = async () => {
        // dispatch(clearToken());
    };

    const activeItem = navItems.find(item => item.id === activeTab);

    return (
        <>
            <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="hidden lg:flex w-full lg:px-10 xl:px-20 flex-col gap-10"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/70 backdrop-blur-sm rounded-3xl py-10 text-center border border-accent"
                >
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-white shadow-md">
                        <Image
                            width={100}
                            height={100}
                            src={profile?.image?.path || defaultUser}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <p className="text-gray-500 text-sm mb-1">
                        {t('profile.welcome') || 'Welcome'}
                    </p>
                    <p className="text-gray-800 font-semibold text-lg">
                        {profile?.firstName + " " + profile?.lastName || t('profile.default_name')}
                    </p>
                </motion.div>

                <nav className="flex flex-col gap-2">
                    {navItems.map((item) => (
                        <DesktopNavItem
                            key={item.id}
                            icon={item.icon}
                            label={item.label}
                            active={activeTab === item.id}
                            onClick={() => {
                                if (item.id === 'logout') logOut();
                                else setActiveTab(item.id);
                            }}
                        />
                    ))}
                </nav>
            </motion.div>


            <div className="lg:hidden fixed top-0 left-0 right-0 z-40">
                <div className="bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                                <Image
                                    width={100}
                                    height={100}
                                    src={profile?.image?.path || defaultUser}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">{t('profile.welcome') || 'Welcome'}</p>
                                <p className="text-sm font-semibold text-gray-800">
                                    {profile?.firstName + " " + profile?.lastName || t('profile.default_name')}
                                </p>
                            </div>
                        </div>

                        {/* <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              {showMobileMenu ? (
                <X size={20} className="text-gray-600" />
              ) : (
                <Menu size={20} className="text-gray-600" />
              )}
            </button> */}
                        <button
                            onClick={() => {
                                logOut();
                                onClose();
                            }}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                        >
                            <LogOut size={20} />
                            <span className="font-medium">{navItems.find(i => i.id === 'logout')?.label}</span>
                        </button>
                    </div>

                    {/* <MobileProfileDropdown
                        isOpen={showMobileMenu}
                        onClose={() => setShowMobileMenu(false)}
                        navItems={navItems}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        logOut={logOut}
                    /> */}
                </div>
            </div>

            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 py-2 z-40">
                <div className="flex items-center justify-around">
                    {navItems.slice(0, 4).map((item) => (
                        <MobileNavItem
                            key={item.id}
                            icon={item.icon}
                            label={item.label}
                            active={activeTab === item.id}
                            onClick={() => setActiveTab(item.id)}
                        />
                    ))}
                </div>
            </div>

            <div className="lg:hidden h-16" />
            <div className="lg:hidden h-16" />
        </>
    );
}