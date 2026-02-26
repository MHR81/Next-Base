'use client';

import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLocale } from '@/redux/slices/localeSlice';
import Cookies from 'js-cookie';
import fa from '@/langueges/locales/fa.json';
import en from '@/langueges/locales/en.json';

const messages = { fa, en };

export function useLanguages() {
    const dispatch = useDispatch();
    const { lang, dir } = useSelector((state) => state.locale);

    const t = useCallback((key) => {
        const keys = key.split('.');
        let value = messages[lang];
        for (const k of keys) {
            value = value?.[k];
        }
        return value || key;
    }, [lang]);

    const changeLanguage = useCallback((newLang) => {
        dispatch(setLocale(newLang));
        Cookies.set('lang', newLang, { expires: 365 });
    }, [dispatch]);

    return {
        t,
        lang,
        dir,
        isRTL: dir === 'rtl',
        changeLanguage,
    };
}