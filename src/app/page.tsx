'use client';

import { Productions } from './Productions';
import { GrammarProvider } from '~/contexts/GrammarContext';
import { Languages } from './Languages';
import { PS } from './PS';
import useGrammar from '~/hooks/useGrammar';
import { SD } from './SD';
import { LL1 } from './LL1';
import { Afd } from './Afd';

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
                <div className="flex flex-col gap-5 mt-5">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit"
                        onClick={() => {
                            navigator.clipboard.writeText('λ');
                        }}
                    >
                        Copiar λ
                    </button>
                    <Productions />
                    <Languages />
                    <Afd />
                    <PS />
                    <SD />
                    <LL1 />
                    <Export />
                    <Import />
                </div>
            </main>
        </GrammarProvider>
    );
};

export default Home;
