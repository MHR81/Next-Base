'use client';

import StoreProvider from '@/redux/store-provider';
import LocaleProvider from '@/langueges/LocaleProvider';
import Toast from '@/_components/Toast';
import GlobalAudioPlayer from '@/_components/GlobalAudioPlayer';

export default function Providers({ children, lang }) {
    return (
        <StoreProvider initialLocale={lang}>
            <Toast />
            <LocaleProvider>
                {children}
                <GlobalAudioPlayer />
            </LocaleProvider>
        </StoreProvider>
    );
}