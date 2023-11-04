'use client';
import useGrammar from '~/hooks/useGrammar';

export const PS = () => {
    const { primeros, siguientes } = useGrammar();

    return (
        <>
            {Object.keys(primeros).length > 0 && (
                <div>
                    <h2 className="text-3xl mb-2">Primeros y siguientes</h2>
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
        </>
    );
};
