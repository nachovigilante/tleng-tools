'use client';

import { Productions } from '../components/Productions';
import { Alphabets } from '../components/Alphabets';
import { PS } from '../components/PS';
import useGrammar from '~/hooks/useGrammar';

const Export = () => {
    const { exportGrammar } = useGrammar();

    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
            onClick={exportGrammar}
        >
            <img src="/assets/export.svg" alt="" className="h-4" />
            Exportar
        </button>
    );
};

const Import = () => {
    const { importGrammar } = useGrammar();

    return (
        <>
            <input
                type="file"
                accept="application/json"
                onChange={(e) => {
                    if (e.target.files) importGrammar(e.target.files[0]);
                }}
                hidden
            />
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
                onClick={() => {
                    const input = document.querySelector(
                        'input[type=file]',
                    ) as HTMLInputElement;
                    if (input) input.click();
                }}
            >
                <img src="/assets/import.svg" alt="" className="h-4" />
                Importar
            </button>
        </>
    );
};

const Home = () => {
    return (
        <main className="p-10">
            <h1 className="text-4xl">Gramática</h1>
            <div className="flex flex-wrap gap-10 mt-5">
                <div className="flex flex-col gap-5">
                    <Productions />
                    <div className="flex items-center gap-5 justify-center">
                        <Export />
                        <Import />
                    </div>
                </div>
                <div className="flex flex-col gap-10">
                    <Alphabets />
                    <PS />
                </div>
            </div>
        </main>
    );
};

export default Home;
