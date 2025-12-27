'use client';

import { createContext, useContext } from 'react';

// Context to signal when a block has become visible after animation
const BlockVisibleContext = createContext<boolean>(true);

export function BlockVisibleProvider({
    children,
    isVisible
}: {
    children: React.ReactNode;
    isVisible: boolean;
}) {
    return (
        <BlockVisibleContext.Provider value={isVisible}>
            {children}
        </BlockVisibleContext.Provider>
    );
}

export function useBlockVisible() {
    return useContext(BlockVisibleContext);
}
