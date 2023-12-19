'use client';
import useGrammar from '~/hooks/useGrammar';

export const PS = () => {
    const { primeros, siguientes } = useGrammar();

    return (
        <>
            {Array.from(primeros.keys()).length > 0 && (
                <div>
                    <h2 className="text-3xl mb-2">Primeros y siguientes</h2>
                    <table className="table-auto text-lg border-collapse">
                        <thead>
                            <tr className="bg-blue-500 text-white">
                                <th>Símbolo</th>
                                <th>Primeros</th>
                                <th>Siguientes</th>
                            </tr>
                            {Array.from(siguientes.keys()).map((v) => (
                                <tr key={v}>
                                    <td>{v}</td>
                                    <td>
                                        <div className="flex items-center">
                                            <p className="text-3xl">{`{`}</p>
                                            {primeros.get(v) &&
                                                Array.from(
                                                    primeros.get(v)!,
                                                ).join(', ')}
                                            <p className="text-3xl">{`}`}</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center">
                                            <p className="text-3xl">{`{`}</p>
                                            {Array.from(
                                                siguientes.get(v)!,
                                            ).join(', ')}
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
