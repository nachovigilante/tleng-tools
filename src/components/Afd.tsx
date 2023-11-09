'use client';

import useLR from '~/hooks/useLR';

export const Afd = () => {
    const { calcularAFD, afd, trans } = useLR();

    return (
        <div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={calcularAFD}
            >
                Calcular AFD
            </button>
            {afd && (
                <>
                    <h2 className="text-xl font-semibold mt-5">Estados</h2>

                    <div className="mt-5 flex flex-wrap gap-5 items-start">
                        {afd.map((items, index) => (
                            <div
                                key={index}
                                className="border rounded-lg px-3 py-2 text-lg w-fit"
                            >
                                <h2 className="text-xl font-semibold mb-2">
                                    Estado {index}
                                </h2>
                                <ul>
                                    {items.map((item, index) => (
                                        <li key={index}>
                                            {item.prod.head} {`-->`}{' '}
                                            {item.prod.body
                                                .map((body, index) =>
                                                    index === item.index
                                                        ? '•' + body
                                                        : body,
                                                )
                                                .join(' ')}
                                            {item.prod.body.length ===
                                                item.index && '•'}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <h2 className="text-xl font-semibold mt-5">Transiciones</h2>
                    <div className="flex flex-wrap gap-5 mt-5 items-start">
                        {Object.values(trans).map((item, index) => (
                            <div
                                key={index}
                                className="border rounded-lg p-3 text-lg w-fit"
                            >
                                <h2 className="text-xl font-semibold">
                                    Estado {index}
                                </h2>
                                {Object.values(item).length > 0 ? (
                                    <table className="table-auto mt-2">
                                        <thead>
                                            <tr>
                                                <th className="px-4 py-2 border">
                                                    Simbolo
                                                </th>
                                                <th className="px-4 py-2 border">
                                                    Estado
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.entries(item).map(
                                                ([key, value]) => (
                                                    <tr key={key}>
                                                        <td className="border px-4 py-2">
                                                            {key}
                                                        </td>
                                                        <td className="border px-4 py-2">
                                                            {value}
                                                        </td>
                                                    </tr>
                                                ),
                                            )}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="text-lg mt-2">
                                        No tiene transiciones
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};
