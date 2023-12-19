'use client';
import { twMerge } from 'tailwind-merge';
import useGrammar from '~/hooks/useGrammar';
import useLL1 from '~/hooks/useLL1';
import { ErrorMsg } from './layout/ErrorMsg';

export const LL1 = () => {
    const { Vt, Vn } = useGrammar();
    const { ll1 } = useLL1();

    const VnArray = Array.from(Vn);
    const VtArray = Array.from(Vt);

    return (
        <>
            {Object.keys(ll1).length > 0 ? (
                <div>
                    <h2 className="text-3xl mb-2">LL1</h2>
                    <table className="table-auto text-lg border-collapse">
                        <thead>
                            <tr>
                                <th>Símbolo</th>
                                {VtArray.concat('$').map((v) => (
                                    <th key={v}>{v}</th>
                                ))}
                            </tr>
                            {VnArray.map((v) => (
                                <tr key={v}>
                                    <td>{v}</td>
                                    {VtArray.concat('$').map((t) => (
                                        <td
                                            className={twMerge(
                                                ll1[v] &&
                                                    ll1[v][t] &&
                                                    ll1[v][t].length > 1 &&
                                                    'bg-red-300 border-2 border-red-400',
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
