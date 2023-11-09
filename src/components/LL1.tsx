'use client';
import { twMerge } from 'tailwind-merge';
import useGrammar from '~/hooks/useGrammar';
import useLL1 from '~/hooks/useLL1';
import { ErrorMsg } from './layout/ErrorMsg';

export const LL1 = () => {
    const { Vt, Vn } = useGrammar();
    const { ll1 } = useLL1();

    return (
        <>
            {Object.keys(ll1).length > 0 ? (
                <div>
                    <h2 className="text-3xl mb-2">LL1</h2>
                    <table className="table-auto text-lg border-collapse">
                        <thead>
                            <tr className="bg-blue-500 text-white">
                                <th className="px-3 py-2 border">Símbolo</th>
                                {Vt.concat('$').map((v) => (
                                    <th className="px-3 py-2 border" key={v}>
                                        {v}
                                    </th>
                                ))}
                            </tr>
                            {Vn.map((v) => (
                                <tr key={v}>
                                    <td className="px-3 py-2 border">{v}</td>
                                    {Vt.concat('$').map((t) => (
                                        <td
                                            className={twMerge(
                                                'px-3 py-2 border',
                                                ll1[v] &&
                                                    ll1[v][t] &&
                                                    ll1[v][t].length > 1 &&
                                                    'bg-red-300',
                                            )}
                                            key={t}
                                        >
                                            {ll1[v] &&
                                                ll1[v][t] &&
                                                ll1[v][t].map((p) => (
                                                    <p key={p}>{p}</p>
                                                ))}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                    </table>
                </div>
            ) : (
                <ErrorMsg title="No se puede calcular las tablas para LL(1) :(" />
            )}
        </>
    );
};
