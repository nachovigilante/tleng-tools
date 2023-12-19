'use client';

import useGrammar from '~/hooks/useGrammar';

const Alphabet = ({ symbols, id }: { symbols: string[]; id: string }) => {
    return (
        <div className="flex items-center gap-3">
            <div className="flex items-center">
                <p>V</p>
                <p className="text-xs self-end">{id}</p>
                <p className="ml-2">{`= {`}</p>
                {symbols.map((v, index) => {
                    return (
                        <div
                            key={index}
                            className="flex items-center font-mono text-gray-400"
                        >
                            <p>{v}</p>
                            {symbols.length - 1 !== index && (
                                <p className="mr-1 font-sans text-black font-semibold">
                                    ,
                                </p>
                            )}
                        </div>
                    );
                })}
                <p>{`}`}</p>
            </div>
        </div>
    );
};

export const Alphabets = () => {
    const { Vn, Vt } = useGrammar();

    return (
        <div className="flex flex-col text-2xl gap-3">
            <h2 className="text-3xl mb-2">Símbolos</h2>
            <Alphabet symbols={Array.from(Vn)} id="N" />
            <Alphabet symbols={Array.from(Vt)} id="T" />
        </div>
    );
};
