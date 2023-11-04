'use client';

import { Productions } from './Productions';
import { GrammarProvider } from '~/contexts/GrammarContext';
import { Languages } from './Languages';
import useGrammar, { PrimerosType } from '~/hooks/useGrammar';
import { useState } from 'react';

const Primeros = () => {
    const { primeros: calcularPrimeros } = useGrammar();
    const [primeros, setPrimeros] = useState<PrimerosType>({} as PrimerosType);

    return (
        <div className="flex flex-col gap-5">
            <h2 className="text-2xl">Primeros</h2>
            {primeros &&
                Object.keys(primeros).map((v) => (
                    <div key={v}>
                        <span className="font-bold">{v}:</span>
                        <span>{primeros[v].join(', ')}</span>
                    </div>
                ))}
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setPrimeros(calcularPrimeros())}
            >
                Calcular primeros
            </button>
        </div>
    );
};

const Home = () => {
    return (
        <GrammarProvider>
            <main className="p-10">
                <h1 className="text-4xl">Gramática</h1>
                <div className="flex flex-col gap-5">
                    <Productions />
                    <Languages />
                    <Primeros />
                </div>
            </main>
        </GrammarProvider>
    );
};

export default Home;
