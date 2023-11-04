'use client';
import useGrammar from '~/hooks/useGrammar';

export const LL1 = () => {
    const { ll1, Vt, Vn } = useGrammar();

    Vn.map((v) => {
        Vt.concat('$').map((t) => {
            if (ll1[v]) console.log(v, ',', t, ll1[v][t]);
        });
    });

    return (
        <>
            {Object.keys(ll1).length > 0 && (
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
                                            className="px-3 py-2 border"
                                            key={t}
                                        >
                                            {ll1[v] &&
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
            )}
        </>
    );
};
