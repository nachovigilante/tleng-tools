import { useContext } from 'react';
import { ProdType } from '~/components/Prod';
import GrammarContext from '~/contexts/GrammarContext';

export type PrimerosType = {
    [key: string]: string[];
};

const calcularPrimeros = (P: ProdType[], Vt: string[], Vn: string[]) => {
    const primeros = {} as PrimerosType;
    Vn.forEach((v) => {
        primeros[v] = [];
    });
    Vt.forEach((v) => {
        primeros[v] = [v];
    });

    let primeros_prev = JSON.parse(JSON.stringify(primeros)) as PrimerosType;

    do {
        primeros_prev = JSON.parse(JSON.stringify(primeros));
        P.forEach((prod) => {
            const body = prod.body;
            let lambda = true;
            body.forEach((v) => {
                if (v == 'λ') {
                    if (!primeros[prod.head].includes('λ'))
                        primeros[prod.head].push('λ');
                    return;
                }
                if (lambda)
                    primeros[prod.head].push(
                        ...primeros[v].filter(
                            (i) => i != 'λ' && !primeros[prod.head].includes(i),
                        ),
                    );

                lambda &&= primeros[v].includes('λ');
            });
            if (lambda && !primeros[prod.head].includes('λ'))
                primeros[prod.head].push('λ');
        });
    } while (
        Object.keys(primeros).some(
            (v) => primeros[v].length != primeros_prev[v].length,
        )
    );

    return primeros;
};

const useGrammar = () => {
    const {
        prods,
        addProd,
        removeProd,
        updateProd,
        Vn,
        addVn,
        removeVn,
        resetVn,
        Vt,
        addVt,
        removeVt,
        resetVt,
    } = useContext(GrammarContext);

    const primeros = () => calcularPrimeros(prods, Vt, Vn);

    return {
        prods,
        addProd,
        removeProd,
        updateProd,
        Vn,
        addVn,
        removeVn,
        resetVn,
        Vt,
        addVt,
        removeVt,
        resetVt,
        primeros,
    };
};

export default useGrammar;
