'use client';
import { Prod, ProdType } from './Prod';
import useGrammar from '~/hooks/useGrammar';

export const Productions = () => {
    const { prods, addProd, removeProd, updateProd } = useGrammar();

    return (
        <div className="border rounded-lg flex flex-col w-[400px] p-4 text-xl gap-5">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-fit self-end absolute"
                onClick={() => {
                    navigator.clipboard.writeText('λ');
                }}
            >
                λ
            </button>
            {prods.length > 0 && (
                <div className="flex flex-col gap-2">
                    {prods.map((p, index) => {
                        return (
                            <Prod
                                key={index}
                                updateProd={(prod: ProdType) =>
                                    updateProd(index, prod)
                                }
                                prod={p}
                            />
                        );
                    })}
                </div>
            )}
            <button
                className="text-center bg-blue-500 hover:bg-blue-700 rounded-md text-white font-semibold text-2xl"
                onClick={() => addProd({ head: '', body: [] })}
            >
                +
            </button>
        </div>
    );
};
