'use client';
import { useState } from 'react';
import useGrammar from '~/hooks/useGrammar';

const Language = ({
    language,
    add,
    reset,
    id,
}: {
    language: string[];
    add: (value: string) => void;
    reset: () => void;
    id: string;
}) => {
    const [editting, setEditting] = useState(false);
    const [edittingValue, setEdittingValue] = useState('');

    return (
        <div className="flex items-center gap-3">
            {editting ? (
                <input
                    type="text"
                    value={edittingValue}
                    onChange={(e) => setEdittingValue(e.target.value)}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            reset();
                            edittingValue.split(',').forEach((v) => {
                                add(v);
                            });
                            setEditting((s) => !s);
                        }
                    }}
                />
            ) : (
                <div className="flex items-center">
                    <p>V</p>
                    <p className="text-xs self-end">{id}</p>
                    <p className="ml-2">{`= {`}</p>
                    {language.map((v, index) => {
                        return (
                            <div key={index} className="flex items-center font-mono text-gray-400">
                                <p>{v}</p>
                                {language.length - 1 !== index && (
                                    <p className="mr-1 font-sans text-black font-semibold">,</p>
                                )}
                            </div>
                        );
                    })}
                    <p>{`}`}</p>
                </div>
            )}
        </div>
    );
};

export const Languages = () => {
    const { Vn, Vt, addVn, addVt, resetVn, resetVt } = useGrammar();

    return (
        <div className="flex flex-col text-2xl gap-3">
            <h2 className="text-3xl mb-2">Símbolos</h2>
            <Language language={Vn} add={addVn} reset={resetVn} id="N" />
            <Language language={Vt} add={addVt} reset={resetVt} id="T" />
        </div>
    );
};
