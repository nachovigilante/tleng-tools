'use client';
import { useRef, useState } from 'react';
import { Production } from 'formal-language-tools';

// const GrabbingDots = () => {
//     return (
//         <div className="w-5 flex flex-col gap-1">
//             <div className="flex items-center gap-1">
//                 <div className="rounded-full bg-gray-300 w-1 h-1" />
//                 <div className="rounded-full bg-gray-300 w-1 h-1" />
//             </div>
//             <div className="flex items-center gap-1">
//                 <div className="rounded-full bg-gray-300 w-1 h-1" />
//                 <div className="rounded-full bg-gray-300 w-1 h-1" />
//             </div>
//             <div className="flex items-center gap-1">
//                 <div className="rounded-full bg-gray-300 w-1 h-1" />
//                 <div className="rounded-full bg-gray-300 w-1 h-1" />
//             </div>
//         </div>
//     );
// };

export const Prod = ({
    prod,
    updateProd,
    deleteProd,
}: {
    prod: Production;
    updateProd: (prod: Production) => void;
    deleteProd: () => void;
}) => {
    const [head, setHead] = useState(prod.head);
    const headRef = useRef<HTMLInputElement>(null);
    const [body, setBody] = useState(prod.body.join(' ') || '');

    const [editing, setEditing] = useState(false);
    const bodyRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setEditing(false);
        updateProd({
            head,
            body: body.split(' ').filter((item) => item !== ''),
        });
    };

    return (
        <form action="" onSubmit={handleChange}>
            <div className="flex items-center h-10 gap-2">
                {!editing && <p>{prod.head || '__'}</p>}
                <input
                    ref={headRef}
                    className="border rounded-md p-1 px-2 w-10"
                    type="text"
                    tabIndex={0}
                    onChange={(e) => {
                        setHead(e.currentTarget.value);
                    }}
                    value={head}
                    hidden={!editing}
                />
                <p className="min-w-[28px]">{`-->`}</p>
                <div className="flex gap-1">
                    {!editing &&
                        (prod.body.length > 0
                            ? prod.body.map((item, index) => {
                                  return (
                                      <div
                                          key={index}
                                          className="flex items-center"
                                      >
                                          <p>{item}</p>
                                      </div>
                                  );
                              })
                            : '__')}
                    <input
                        ref={bodyRef}
                        tabIndex={0}
                        className="border rounded-md p-1 px-2 w-full"
                        type="text"
                        onChange={(e) => {
                            setBody(e.currentTarget.value);
                        }}
                        value={body}
                        hidden={!editing}
                    />
                    {!editing ? (
                        <div className="ml-2 flex items-center gap-1">
                            <button
                                className="p-2 flex items-center justify-center bg-transparent hover:bg-gray-200 border"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setEditing(true);
                                }}
                            >
                                <img
                                    src="/assets/edit.svg"
                                    alt=""
                                    className="h-4"
                                />
                            </button>
                            <button
                                className="p-2 flex items-center justify-center bg-transparent hover:bg-red-500 border hover:border-red-400"
                                onClick={(e) => {
                                    e.preventDefault();
                                    deleteProd();
                                }}
                            >
                                <img
                                    src="/assets/delete.svg"
                                    alt=""
                                    className="h-4"
                                />
                            </button>
                            {/* <button
                                className="p-2 flex items-center justify-center bg-transparent hover:bg-gray-200 border"
                                onClick={(e) => {
                                    e.preventDefault();
                                }}
                            >
                                <img
                                    src="/assets/arrow.svg"
                                    alt=""
                                    className="h-4 rotate-90"
                                />
                            </button>
                            <button
                                className="p-2 flex items-center justify-center bg-transparent hover:bg-gray-200 border"
                                onClick={(e) => {
                                    e.preventDefault();
                                }}
                            >
                                <img
                                    src="/assets/arrow.svg"
                                    alt=""
                                    className="h-4 -rotate-90"
                                />
                            </button> */}
                        </div>
                    ) : (
                        <button
                            className="ml-2 p-2 flex items-center justify-center bg-green-500 hover:bg-green-600"
                            tabIndex={0}
                            type="submit"
                        >
                            <img
                                src="/assets/check.svg"
                                alt=""
                                className="h-5"
                            />
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
};
