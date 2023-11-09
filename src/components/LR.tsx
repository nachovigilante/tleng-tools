'use client';
import useGrammar from '~/hooks/useGrammar';
import { twMerge } from 'tailwind-merge';
import { useEffect, useState } from 'react';
import { ActionTableType, ActionType } from '~/utils/LR';
import useLR0 from '~/hooks/useLR0';
import useSLR from '~/hooks/useSLR';
import useLR from '~/hooks/useLR';
import { ErrorMsg } from './layout/ErrorMsg';

export const showAction = (action: ActionType) => {
    if (action.accion === 'shift') return `s(${action.payload})`;
    if (action.accion === 'reduce')
        return `r(${action.payload.head} --> ${action.payload.body.join(' ')})`;
    if (action.accion === 'accept') return `accept`;
};

export const LR = () => {
    const { Vt } = useGrammar();
    const { LR0, SLR } = useLR();

    const [tabla, setTabla] = useState({} as ActionTableType);
    const [isSLR, setIsSLR] = useState(false);

    useEffect(() => {
        if (!isSLR) setTabla(LR0);
        else setTabla(SLR);
    }, [isSLR, LR0, SLR]);

    return (
        <>
            {tabla && Object.values(tabla).length > 0 ? (
                <div className="flex flex-col gap-10">
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-semibold">
                            {isSLR
                                ? 'Tabla de acción SLR(1)'
                                : 'Tabla de acción LR(0)'}
                        </h2>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit"
                            onClick={() => {
                                setIsSLR((s) => !s);
                            }}
                        >
                            {isSLR ? 'LR(0)' : 'SLR(1)'}
                        </button>
                    </div>

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
                                        <td
                                            className="border px-4 py-2"
                                            key={j}
                                        >
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
                </div>
            ) : (
                <ErrorMsg title="No se puede calcular las tablas para LR :(" />
            )}
        </>
    );
};
