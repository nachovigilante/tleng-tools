'use client';

import { Productions } from './Productions';
import { GrammarProvider } from '~/contexts/GrammarContext';
import { Languages } from './Languages';
import { Tablas } from './Tablas';
import useGrammar from '~/hooks/useGrammar';

const Export = () => {
    const { exportGrammar } = useGrammar();

    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={exportGrammar}
        >
            Exportar gramática
        </button>
    );
};

const Import = () => {
    const { importGrammar } = useGrammar();

    return (
        <input
            type="file"
            accept="application/json"
            onChange={(e) => {
                if (e.target.files) importGrammar(e.target.files[0]);
            }}
        />
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
                    <Tablas />
                    <Export />
                    <Import />
                </div>
            </main>
        </GrammarProvider>
    );
};

export default Home;
