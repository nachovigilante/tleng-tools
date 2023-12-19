'use client';
import useGrammar from '~/hooks/useGrammar';
import { twMerge } from 'tailwind-merge';
import { useMemo, useState } from 'react';
import { showAction } from '~/utils/LR';
import useLR from '~/hooks/useLR';
import { ErrorMsg } from './layout/ErrorMsg';

export const LR = () => {
    const { Vt } = useGrammar();
    const { LR0, SLR } = useLR();

    const [isSLR, setIsSLR] = useState(false);

    const tabla = useMemo(() => {
        if (!isSLR) return LR0;
        else return SLR;
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
                                <th>Estado</th>
                                {Array.from(Vt)
                                    .concat(['$'])
                                    .map((v, i) => (
                                        <th key={i}>{v}</th>
                                    ))}
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(tabla).map((_, i) => (
                                <tr key={i}>
                                    <td className="text-center">{i}</td>
                                    {Array.from(Vt)
                                        .concat(['$'])
                                        .map((v, j) => (
                                            <td
                                                className={twMerge(
                                                    tabla[i][v].length > 1 &&
                                                        'bg-red-300 border-red-400 border-2',
                                                )}
                                                key={j}
                                            >
                                                <div className="flex flex-col justify-center items-center">
                                                    {tabla[i] &&
                                                        tabla[i][v].length >
                                                            0 &&
                                                        tabla[i][v].map(
                                                            (e, k) => (
                                                                <p key={k}>
                                                                    {showAction(
                                                                        e,
                                                                    )}
                                                                </p>
                                                            ),
                                                        )}
                                                </div>
                                            </td>
                                        ))}
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
