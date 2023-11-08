'use client';
import useGrammar, { ActionTableType, ActionType } from '~/hooks/useGrammar';
import { twMerge } from 'tailwind-merge';
import { useEffect, useState } from 'react';

export const showAction = (action: ActionType) => {
    if (action.accion === 'shift') return `s(${action.payload})`;
    if (action.accion === 'reduce')
        return `r(${action.payload.head} --> ${action.payload.body.join(' ')})`;
    if (action.accion === 'accept') return `accept`;
};

export const LR0 = () => {
    const { LR0, calcularTablaLR0, Vt, Vn, SLR, calcularTablaSLR } =
        useGrammar();

    const [tabla, setTabla] = useState({} as ActionTableType);
    const [estado, setEstado] = useState(0);

    useEffect(() => {
        if (estado === 0) setTabla(LR0);
        else setTabla(SLR);
    }, [estado, LR0, SLR]);

    return (
        <>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit"
                onClick={() => {
                    calcularTablaLR0();
                    setEstado(0);
                }}
            >
                Calcular LR0
            </button>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit"
                onClick={() => {
                    calcularTablaSLR();
                    setEstado(1);
                }}
            >
                Calcular SLR
            </button>
            {tabla && (
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border bg-blue-500 text-white">
                                Estado
                            </th>
                            {Vt.concat(['$']).map((v, i) => (
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
                        {Object.keys(tabla).map((_, i) => (
                            <tr key={i}>
                                <td className="border px-4 py-2 text-center">
                                    {i}
                                </td>
                                {Vt.concat(['$']).map((v, j) => (
                                    <td className="border px-4 py-2" key={j}>
                                        <div
                                            className={twMerge(
                                                'flex flex-col justify-center items-center',
                                                tabla[i][v].length > 1 &&
                                                    'bg-red-300',
                                            )}
                                        >
                                            {tabla[i] &&
                                                tabla[i][v].length > 0 &&
                                                tabla[i][v].map((e, k) => (
                                                    <p key={k}>
                                                        {showAction(e)}
                                                    </p>
                                                ))}
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
