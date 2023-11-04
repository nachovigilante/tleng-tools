'use client';
import { useEffect, useReducer, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export type ProdType = {
    head: string;
    body: string[];
};

export const Prod = ({
    prod,
    updateProd,
}: {
    prod: ProdType;
    updateProd: (prod: ProdType) => void;
}) => {
    const [head, setHead] = useState(prod.head);
    const [editingHead, setEditingHead] = useState(prod.head === '');
    const headRef = useRef<HTMLInputElement>(null);
    const [body, dispatch] = useReducer(
        (
            state: string[],
            action: { type: 'add' | 'edit'; value: string; index: number },
        ) => {
            switch (action.type) {
                case 'add':
                    return [...state, action.value];
                case 'edit':
                    return state.map((item, index) => {
                        if (index === action.index) {
                            return action.value;
                        }
                        return item;
                    });
                default:
                    return state;
            }
        },
        prod.body,
    );

    const addBody = (value: string) => {
        dispatch({
            type: 'add',
            value,
            index: 0,
        });
    };

    const editBody = (index: number, value: string) => {
        dispatch({
            type: 'edit',
            value,
            index,
        });
    };

    const [editingBody, setEditingBody] = useState(false);
    const [editingBodyIndex, setEditingBodyIndex] = useState(0);
    const [editingBodyValue, setEditingBodyValue] = useState('');
    const bodyRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        updateProd({
            head,
            body,
        });
    }, [head, body]);

    return (
        <div className="flex items-center h-10">
            {!editingHead ? (
                <p
                    className="cursor-pointer"
                    onClick={() => {
                        setEditingHead(true);
                    }}
                >
                    {prod.head}
                </p>
            ) : (
                <input
                    ref={headRef}
                    className="border rounded-md p-1 px-2 w-8"
                    type="text"
                    onKeyUp={(e) => {
                        setHead(e.currentTarget.value);
                        if (e.key === 'Enter') {
                            setEditingHead(false);
                        }
                    }}
                />
            )}
            <p className="ml-2">{`-->`}</p>
            <div className="flex ml-2 gap-1">
                {prod.body.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="flex items-center cursor-pointer"
                            onClick={() => {
                                setEditingBody(true);
                                setEditingBodyIndex(index);
                                setEditingBodyValue(item);
                            }}
                        >
                            <p>{item}</p>
                        </div>
                    );
                })}
                <input
                    ref={bodyRef}
                    className={twMerge(
                        'border rounded-md p-1 px-2 w-8 ml-2',
                        editingBody ? 'block' : 'hidden',
                    )}
                    type="text"
                    onChange={(e) => {
                        setEditingBodyValue(e.currentTarget.value);
                    }}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            setEditingBody(false);
                            if (editingBodyIndex === -1) {
                                addBody(e.currentTarget.value);
                            } else {
                                editBody(
                                    editingBodyIndex,
                                    e.currentTarget.value,
                                );
                            }
                            setEditingBodyIndex(0);
                            setEditingBodyValue('');
                        }
                    }}
                    value={editingBodyValue}
                />
                {!editingBody && (
                    <button
                        className="ml-2 text-xl p-1 border border-gray-400 rounded-md bg-gray-200 w-8 h-8 flex items-center justify-center"
                        onClick={() => {
                            setEditingBodyIndex(-1);
                            bodyRef.current?.select();
                            setEditingBody(true);
                        }}
                    >
                        +
                    </button>
                )}
            </div>
        </div>
    );
};
