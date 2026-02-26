'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function LocaleProvider({ children }) {
    const { lang, dir } = useSelector((state) => state.locale);

    useEffect(() => {
        document.documentElement.lang = lang;
        document.documentElement.dir = dir;
    }, [lang, dir]);

    return children;
}