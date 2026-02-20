'use client';

import { useState } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from './store';

export default function StoreProvider({ children, preloadedState }) {
    const [store] = useState(() => {
        return makeStore(preloadedState);
    });

    return <Provider store={store}>{children}</Provider>;
}