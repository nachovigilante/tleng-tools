'use client';
import useGrammar from '~/hooks/useGrammar';

export const Parse = () => {
    const { parse } = useGrammar();

    return (
        <>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => parse('( a a | a )')}
            >
                Parsear con LR0
            </button>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => parse('( a a | a )')}
            >
                Parsear con SLR
            </button>
        </>
    );
};
