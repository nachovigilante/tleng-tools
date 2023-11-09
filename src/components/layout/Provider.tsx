'use client';

import { ReactNode } from 'react';
import { GrammarProvider } from '~/contexts/GrammarContext';

const Provider = ({ children }: { children: ReactNode }) => {
    return <GrammarProvider>{children}</GrammarProvider>;
};

export default Provider;
