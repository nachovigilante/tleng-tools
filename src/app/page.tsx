'use client';

import { Productions } from './Productions';
import { GrammarProvider } from '~/contexts/GrammarContext';
import { Languages } from './Languages';
import useGrammar, { TableType } from '~/hooks/useGrammar';
import { useState } from 'react';

const Tablas = () => {
    const { primeros: calcularPrimeros, siguientes: calcularSiguientes } =
        useGrammar();
    const [primeros, setPrimeros] = useState<TableType>({} as TableType);
    const [siguientes, setSiguientes] = useState<TableType>({} as TableType);

    return (
        <div className="flex flex-col gap-5">
            {primeros && siguientes && (
                <div>
                    <table className="table-auto text-lg border-collapse">
                        <thead>
                            <tr className="bg-blue-500 text-white">
                                <th className="px-3 py-2 border">Símbolo</th>
                                <th className="px-3 py-2 border">Primeros</th>
                                <th className="px-3 py-2 border">Siguientes</th>
                            </tr>
                            {Object.keys(siguientes).map((v) => (
                                <tr key={v}>
                                    <td className="px-3 py-2 border">{v}</td>
                                    <td className="px-3 py-2 border">
                                        <div className="flex items-center">
                                            <p className="text-3xl">{`{`}</p>
                                            {primeros[v].join(', ')}
                                            <p className="text-3xl">{`}`}</p>
                                        </div>
                                    </td>
                                    <td className="px-3 py-2 border">
                                        <div className="flex items-center">
                                            <p className="text-3xl">{`{`}</p>
                                            {siguientes[v].join(', ')}
                                            <p className="text-3xl">{`}`}</p>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </thead>
                    </table>
                </div>
            )}
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                    setPrimeros(calcularPrimeros());
                    setSiguientes(calcularSiguientes());
                }}
            >
                Calcular tabla
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
                    <Tablas />
                </div>
            </main>
        </GrammarProvider>
    );
};

export default Home;
