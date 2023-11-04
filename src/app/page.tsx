'use client';

import { useEffect, useState } from 'react';
import { Prod, ProdType } from '../components/Prod';

const Home = () => {
    const [prods, setProds] = useState([
        {
            head: '',
            body: [],
        },
    ] as ProdType[]);

    const [Vn, setVn] = useState([] as string[]);
    const [Vt, setVt] = useState([] as string[]);

    return (
        <main className="p-10">
            <h2 className="text-2xl">Gramática</h2>
            <div className="border rounded-lg flex flex-col w-[300px] p-4 text-xl mt-5">
                <button>
                    {prods.map((_, index) => {
                        return (
                            <Prod
                                key={index}
                                updateProd={(prod: ProdType) => {
                                    const newProds = [...prods];
                                    newProds[index] = prod;
                                    setProds(newProds);
                                }}
                            />
                        );
                    })}
                    <p
                        className="text-center bg-gray-200 border border-gray-300 rounded-md mt-5"
                        onClick={() => {
                            setProds([...prods, { head: '', body: [] }]);
                        }}
                    >
                        +
                    </p>
                </button>
            </div>
        </main>
    );
};

export default Home;
