import React from 'react';
import { motion } from 'framer-motion';

const notificationsData = [
    {
        id: 1,
        title: "New feature on the Thaghche",
        description: "You can now edit your phone number in the profile section.",
        date: "2025/10/10"
    },
    {
        id: 2,
        title: "New feature on the Thaghche",
        description: "You can now edit your phone number in the profile section.",
        date: "2025/10/10"
    },
    {
        id: 3,
        title: "New feature on the Thaghche",
        description: "You can now edit your phone number in the profile section.",
        date: "2025/10/10"
    },
    {
        id: 4,
        title: "New feature on the Thaghche",
        description: "You can now edit your phone number in the profile section.",
        date: "2025/10/10"
    },
    {
        id: 5,
        title: "New feature on the Thaghche",
        description: "You can now edit your phone number in the profile section.",
        date: "2025/10/10"
    }
];

const NotificationCard = ({ notification, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08, duration: 0.4 }}
        className="flex items-center gap-5 bg-white rounded-lg p-5 border border-accent/90 shadow-sm hover:shadow-md transition-shadow"
    >
        <div className="shrink-0">
            <span className="text-2xl font-serif italic text-gray-800 tracking-tight">
                Thaghche
            </span>
        </div>

        <div className="flex-1 min-w-0">
            <h3 className="text-gray-900 font-semibold text-base mb-1">
                {notification.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                {notification.description}
            </p>
            <p className="text-teal-500 text-sm mt-2 font-medium">
                {notification.date}
            </p>
        </div>
    </motion.div>
);

export default function NotificationsList() {
    return (
        <div className="min-h-screen bg-white p-6 md:p-10">
            <div className="max-w-2xl mx-auto space-y-4">
                {notificationsData.map((notification, index) => (
                    <NotificationCard
                        key={notification.id}
                        notification={notification}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
}