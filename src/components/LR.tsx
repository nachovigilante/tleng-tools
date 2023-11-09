'use client';
import useGrammar from '~/hooks/useGrammar';
import { twMerge } from 'tailwind-merge';
import { useEffect, useState } from 'react';
import { ActionTableType, ActionType } from '~/utils/LR';
import useLR0 from '~/hooks/useLR0';
import useSLR from '~/hooks/useSLR';

export const showAction = (action: ActionType) => {
    if (action.accion === 'shift') return `s(${action.payload})`;
    if (action.accion === 'reduce')
        return `r(${action.payload.head} --> ${action.payload.body.join(' ')})`;
    if (action.accion === 'accept') return `accept`;
};

export const LR = () => {
    const { Vt } = useGrammar();
    const { calcularLR0, LR0 } = useLR0();
    const { calcularSLR, SLR } = useSLR();

    const [tabla, setTabla] = useState({} as ActionTableType);
    const [estado, setEstado] = useState(0);

    useEffect(() => {
        if (estado === 0) setTabla(LR0);
        else setTabla(SLR);
    }, [estado, LR0, SLR]);

    return (
        <>
            {tabla && Object.values(tabla).length > 0 && (
                <>
                    <h2 className="text-2xl font-semibold">
                        {estado ? 'Tabla de acción SLR' : 'Tabla de acción LR0'}
                    </h2>
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
                </>
            )}
            <div className="flex items-center gap-3">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit"
                    onClick={() => {
                        calcularLR0();
                        setEstado(0);
                    }}
                >
                    Calcular LR0
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit"
                    onClick={() => {
                        calcularSLR();
                        setEstado(1);
                    }}
                >
                    Calcular SLR
                </button>
            </div>
        </>
    );
};
