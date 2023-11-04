'use client';
import { Prod, ProdType } from '../components/Prod';
import useGrammar from '~/hooks/useGrammar';

export const Productions = () => {
    const { prods, addProd, removeProd, updateProd } = useGrammar();

    return (
        <div className="border rounded-lg flex flex-col w-[300px] p-4 text-xl gap-5">
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
                className="text-center bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 active:bg-gray-400"
                onClick={() => addProd({ head: '', body: [] })}
            >
                +
            </button>
        </div>
    );
};
