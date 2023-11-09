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
                            <div key={index} className="flex items-center">
                                <p>{v}</p>
                                {language.length - 1 !== index && <p className="mr-1">,</p>}
                            </div>
                        );
                    })}
                    <p>{`}`}</p>
                </div>
            )}
            <button
                className="text-base bg-gray-200 py-1 px-2 rounded-md"
                onClick={() => {
                    if (editting) {
                        reset();
                        edittingValue.split(',').forEach((v) => {
                            add(v);
                        });
                    } else {
                        setEdittingValue(language.join(','));
                    }
                    setEditting((s) => !s);
                }}
            >
                {editting ? 'Guardar' : 'Editar'}
            </button>
        </div>
    );
};

export const Languages = () => {
    const { Vn, Vt, addVn, addVt, resetVn, resetVt } = useGrammar();

    return (
        <div className="flex flex-col text-xl gap-3">
            <Language language={Vn} add={addVn} reset={resetVn} id="N" />
            <Language language={Vt} add={addVt} reset={resetVt} id="T" />
        </div>
    );
};
