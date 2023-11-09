'use client';

import { twMerge } from 'tailwind-merge';
import useGrammar from '~/hooks/useGrammar';
import useLR from '~/hooks/useLR';

export const Afd = () => {
    const { afd, trans } = useLR();
    const { Vn, Vt } = useGrammar();

    return (
        <div>
            {afd.length > 0 && (
                <>
                    <h2 className="text-2xl font-semibold mb-4">AFD</h2>
                    <h3 className="text-xl font-semibold">Estados</h3>
                    <div className="mt-5 flex flex-wrap gap-5 items-start">
                        {afd.map((items, index) => (
                            <div
                                key={index}
                                className="border rounded-lg px-3 py-2 text-lg w-fit"
                            >
                                <h3 className="text-xl font-semibold mb-2">
                                    Estado {index}
                                </h3>
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
                        <table className="table-auto">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border bg-blue-500 text-white">
                                        Estado
                                    </th>
                                    {Vn.concat(Vt).map((v, i) => (
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
                                {Object.values(trans).map((item, index) => (
                                    <tr key={index}>
                                        <td className="border px-4 py-2 text-center">
                                            {index}
                                        </td>
                                        {Vn.concat(Vt).map((v, i) => (
                                            <td
                                                className={twMerge(
                                                    'border px-4 py-2 text-center',
                                                    !item[v] && 'bg-gray-100',
                                                )}
                                                key={i}
                                            >
                                                {item[v] ?? '-'}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* {Object.entries(trans).map((item, index) => (
                            <div
                                key={index}
                                className="border rounded-lg p-3 text-lg w-fit"
                            ></div>
                        ))} */}
                    </div>
                </>
            )}
        </div>
    );
};
