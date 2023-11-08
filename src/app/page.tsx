'use client';

import { Productions } from './Productions';
import { GrammarProvider } from '~/contexts/GrammarContext';
import { Languages } from './Languages';
import { PS } from './PS';
import useGrammar, { ActionType, ItemType, showItem } from '~/hooks/useGrammar';
import { SD } from './SD';
import { LL1 } from './LL1';
import { Afd } from './Afd';
import { ProdType } from '~/components/Prod';
import { twMerge } from 'tailwind-merge';

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

const showAction = (action: ActionType) => {
    if (action.accion === 'shift') return `s(${action.payload})`;
    if (action.accion === 'reduce')
        return `r(${action.payload.head} --> ${action.payload.body.join(' ')})`;
    if (action.accion === 'accept') return `accept`;
};

const LR0 = () => {
    const { LR0, calcularTablaLR0, Vt, Vn } = useGrammar();

    return (
        <>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit"
                onClick={calcularTablaLR0}
            >
                Calcular LR0
            </button>
            {LR0 && (
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border bg-blue-500 text-white">
                                Estado
                            </th>
                            {Vt.concat(["$"]).map((v, i) => (
                                <th
                                    className="px-4 py-2 border bg-blue-500 text-white"
                                    key={i}
                                >
                                    {v}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(LR0).map((_, i) => (
                            <tr key={i}>
                                <td className="border px-4 py-2 text-center">
                                    {i}
                                </td>
                                {Vt.concat(["$"]).map((v, j) => (
                                    <td className="border px-4 py-2" key={j}>
                                        <div
                                            className={twMerge(
                                                'flex flex-col justify-center items-center',
                                                LR0[i][v].length > 1 && "bg-red-300",
                                            )}
                                        >
                                            {LR0[i] &&
                                                LR0[i][v].length > 0 &&
                                                LR0[i][v].map((e) =>
                                                    showAction(e),
                                                )}
                                        </div>
                                    </td>
                                ))}
                                {/* {Vn.map((v, j) => (
                                    <td className="border px-4 py-2" key={j}>
                                        {accion[i][v]}
                                    </td>
                                ))} */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
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
