import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguages } from '@/langueges/useLanguages';


export default function RulesModal({ isOpen, onClose }) {
    const { t } = useLanguages();
    if (!isOpen) return null;
    const rulesData = [
        {
            title: t('rulesModal.introduction.title'),
            content: t('rulesModal.introduction.content')
        },
        {
            title: t('rulesModal.userAccounts.title'),
            items: [
                t('rulesModal.userAccounts.item1'),
                t('rulesModal.userAccounts.item2'),
                t('rulesModal.userAccounts.item3')
            ]
        },
        {
            title: t('rulesModal.contentIP.title'),
            items: [
                t('rulesModal.contentIP.item1'),
                t('rulesModal.contentIP.item2'),
                t('rulesModal.contentIP.item3')
            ]
        },
        {
            title: t('rulesModal.payments.title'),
            items: [
                t('rulesModal.payments.item1'),
                t('rulesModal.payments.item2'),
                t('rulesModal.payments.item3')
            ]
        },
        {
            title: t('rulesModal.prohibited.title'),
            items: [
                t('rulesModal.prohibited.item1'),
                t('rulesModal.prohibited.item2'),
                t('rulesModal.prohibited.item3')
            ]
        }
    ];

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
                >
                    <div className="p-6 pb-4 max-h-[70vh] overflow-y-auto">
                        {rulesData.map((section, index) => (
                            <div key={index} className="mb-5 last:mb-0">
                                <h3 className="text-teal-500 text-sm font-medium mb-2">
                                    {section.title}
                                </h3>

                                {section.content ? (
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {section.content}
                                    </p>
                                ) : (
                                    <ul className="space-y-1.5">
                                        {section.items.map((item, i) => (
                                            <li key={i} className="text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                                                <span className="text-gray-400 mt-1.5">•</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                        <div className="w-6 h-6 bg-white rotate-45 shadow-lg" />
                    </div>

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="absolute bottom-20 text-gray-500 text-xs text-center"
                >
                    {t('rulesModal.note')}
                </motion.p>
            </div>
        </AnimatePresence>
    );
}