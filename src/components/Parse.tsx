'use client';
import { useState } from 'react';
import useLR from '~/hooks/useLR';
import { showAction } from '~/utils/LR';

export const Parse = () => {
    const { parse, LRParsing, afd } = useLR();
    const [cadena, setCadena] = useState('' as string);

    return (
        <>
            {afd.length > 0 && (
                <div className="flex flex-col gap-5 pb-20">
                    <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-semibold">Parsing</h2>
                        <p className="text-gray-500">
                            (si hay conflictos elige la primera rama)
                        </p>
                    </div>
                    <div className=" flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <h3 className="text-xl font-semibold">
                                Cadena a parsear
                            </h3>
                            <p className="text-gray-500">
                                (separar por espacios)
                            </p>
                        </div>
                        <div className="flex items-center gap-5">
                            <input
                                type="text"
                                className="border rounded-lg text-lg px-2 py-1 max-w-[400px]"
                                value={cadena}
                                onChange={(e) => setCadena(e.target.value)}
                            />
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => parse(cadena)}
                            >
                                Parsear con LR0
                            </button>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => parse(cadena)}
                            >
                                Parsear con SLR
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        {LRParsing.output &&
                            LRParsing.output
                                .slice()
                                .reverse()
                                .map((item, i) =>
                                    i === LRParsing.output.length - 1 ? (
                                        <p key={i}>{item}</p>
                                    ) : (
                                        <>
                                            <p key={i}>{item}</p>
                                            <p
                                                key={`a${i + 1}`}
                                                className="font-bold text-xl"
                                            >{`==>`}</p>
                                        </>
                                    ),
                                )}
                    </div>
                    {LRParsing.trace && LRParsing.trace.length && (
                        <table className="table-auto">
                            <thead>
                                <tr>
                                    <th>Stack</th>
                                    <th>Input</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {LRParsing.trace.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border px-4 py-2 text-center">
                                            {item.stack}
                                        </td>
                                        <td className="border px-4 py-2 text-center">
                                            {item.input}
                                        </td>
                                        <td className="border px-4 py-2 text-center">
                                            {showAction(item.action)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </>
    );
};
