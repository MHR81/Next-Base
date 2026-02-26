'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from './store';
import { setupAxiosInterceptors } from '@/lib/api/utils/axios-setup';
import { clientAxios } from '@/lib/api/client-api';

export default function StoreProvider({ children, initialLocale = 'fa', preloadedState = {} }) {

    const storeRef = useRef(null);

    if (!storeRef.current) {

        const initial = {
            ...preloadedState,
            locale: {
                lang: initialLocale,
                dir: initialLocale === 'fa' ? 'rtl' : 'ltr',
                ...(preloadedState.locale || {}),
            },
        };

        const store = makeStore(initial);

        setupAxiosInterceptors(clientAxios, store);

        storeRef.current = store;
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
}