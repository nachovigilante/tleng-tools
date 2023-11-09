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
    const [body, setBody] = useState(prod.body.join(' ') || '');

    const [editingBody, setEditingBody] = useState(false);
    const bodyRef = useRef<HTMLInputElement>(null);

    return (
        <div className="flex items-center h-10 gap-2">
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
                            updateProd({
                                head,
                                body: body
                                    .split(' ')
                                    .filter((item) => item !== ''),
                            });
                        }
                    }}
                />
            )}
            <p className="w-[28px]">{`-->`}</p>
            <div className="flex gap-1">
                {!editingBody &&
                    prod.body.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className="flex items-center cursor-pointer"
                                onClick={() => {
                                    setEditingBody(true);
                                }}
                            >
                                <p>{item}</p>
                            </div>
                        );
                    })}
                <input
                    ref={bodyRef}
                    className={twMerge(
                        'border rounded-md p-1 px-2 flex-grow',
                        editingBody ? 'block' : 'hidden',
                    )}
                    type="text"
                    onChange={(e) => {
                        setBody(e.currentTarget.value);
                    }}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            setEditingBody(false);
                            updateProd({
                                head,
                                body: body
                                    .split(' ')
                                    .filter((item) => item !== ''),
                            });
                        }
                    }}
                    value={body}
                />
                {!editingBody && (
                    <button
                        className="ml-2 p-2 flex items-center justify-center bg-transparent hover:bg-gray-200 border"
                        onClick={() => {
                            bodyRef.current?.select();
                            setEditingBody(true);
                        }}
                    >
                        <img src="/assets/edit.svg" alt="" className="h-4"/>
                    </button>
                )}
            </div>
        </div>
    );
};
