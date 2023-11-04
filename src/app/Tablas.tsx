'use client';
import useGrammar from '~/hooks/useGrammar';

export const Tablas = () => {
    const { primeros, siguientes } = useGrammar();

    return (
        <div className="flex flex-col gap-5">
            {primeros && siguientes && (
                <div>
                    <table className="table-auto text-lg border-collapse">
                        <thead>
                            <tr className="bg-blue-500 text-white">
                                <th className="px-3 py-2 border">Símbolo</th>
                                <th className="px-3 py-2 border">Primeros</th>
                                <th className="px-3 py-2 border">Siguientes</th>
                            </tr>
                            {Object.keys(siguientes).map((v) => (
                                <tr key={v}>
                                    <td className="px-3 py-2 border">{v}</td>
                                    <td className="px-3 py-2 border">
                                        <div className="flex items-center">
                                            <p className="text-3xl">{`{`}</p>
                                            {primeros[v].join(', ')}
                                            <p className="text-3xl">{`}`}</p>
                                        </div>
                                    </td>
                                    <td className="px-3 py-2 border">
                                        <div className="flex items-center">
                                            <p className="text-3xl">{`{`}</p>
                                            {siguientes[v].join(', ')}
                                            <p className="text-3xl">{`}`}</p>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </thead>
                    </table>
                </div>
            )}
        </div>
    );
};
