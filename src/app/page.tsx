'use client';

import { Productions } from '../components/Productions';
import { GrammarProvider } from '~/contexts/GrammarContext';
import { Languages } from '../components/Languages';
import { PS } from '../components/PS';
import useGrammar from '~/hooks/useGrammar';
import { SD } from '../components/SD';
import { LL1 } from '../components/LL1';
import { Afd } from '../components/Afd';
import { LR0 } from '../components/ActionTable';

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

const Parse = () => {
    const { parse } = useGrammar();

    return (
        <>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => parse('( a a | a )')}
            >
                Parsear con LR0
            </button>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => parse('( a a | a )')}
            >
                Parsear con SLR
            </button>
        </>
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
                    <LR0 />
                    <Parse />
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
