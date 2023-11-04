'use client';
import useGrammar from '~/hooks/useGrammar';

export const SD = () => {
    const { sd } = useGrammar();

    return (
        <div className="flex flex-col gap-5">
            {sd && (
                <div>
                    <table className="table-auto text-lg border-collapse">
                        <thead>
                            <tr className="bg-blue-500 text-white">
                                <th className="px-3 py-2 border">Producciones</th>
                                <th className="px-3 py-2 border">SD</th>
                            </tr>
                            {Object.keys(sd).map((v) => (
                                <tr key={v}>
                                    <td className="px-3 py-2 border">{v}</td>
                                    <td className="px-3 py-2 border">
                                        <div className="flex items-center">
                                            <p className="text-3xl">{`{`}</p>
                                            {sd[v].join(', ')}
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
