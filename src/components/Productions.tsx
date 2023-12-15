'use client';
import { Prod, ProdType } from './Prod';
import useGrammar from '~/hooks/useGrammar';

export const Productions = () => {
    const { prods, addProd, removeProd, updateProd } = useGrammar();

    return (
        <div className="border rounded-lg flex flex-col w-[400px] p-4 text-xl gap-5">
            {prods.length > 0 && (
                <div className="flex flex-col gap-2">
                    {prods.map((p, index) => {
                        return (
                            <Prod
                                key={index}
                                updateProd={(prod: ProdType) =>
                                    updateProd(index, prod)
                                }
                                deleteProd={() => removeProd(index)}
                                prod={p}
                            />
                        );
                    })}
                </div>
            )}
            <div className="flex items-stretch gap-2">
                <button
                    className="text-center text-2xl w-full flex justify-center"
                    onClick={() => addProd({ head: '', body: [] })}
                >
                    <img src="/assets/add.svg" alt="" className="h-8" />
                </button>
                <button
                    className="flex items-center justify-center gap-2 px-4"
                    onClick={() => {
                        navigator.clipboard.writeText('λ');
                    }}
                >
                    <img src="/assets/copy.svg" alt="" className="h-5" />λ
                </button>
            </div>
        </div>
    );
};
