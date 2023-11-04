import { useContext, useEffect, useState } from 'react';
import { ProdType } from '~/components/Prod';
import GrammarContext from '~/contexts/GrammarContext';

export type TableType = {
    [key: string]: string[];
};

const calcularPrimeros = (P: ProdType[], Vt: string[], Vn: string[]) => {
    const primeros = {} as TableType;
    Vn.forEach((v) => {
        primeros[v] = [];
    });
    Vt.forEach((v) => {
        primeros[v] = [v];
    });

    let primeros_prev = JSON.parse(JSON.stringify(primeros)) as TableType;

    do {
        primeros_prev = JSON.parse(JSON.stringify(primeros));
        P.forEach((prod) => {
            let lambda = true;
            prod.body.forEach((v) => {
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

const primeros_de = (cadena: string[], primeros: TableType) => {
    let result = [] as string[];
    let lambda = true;
    cadena.forEach((v) => {
        if (lambda)
            result.push(
                ...primeros[v].filter((i) => i != 'λ' && !result.includes(i)),
            );
        lambda &&= primeros[v].includes('λ');
    });
    if (lambda) result.push('λ');
    return result;
};

const calcularSiguientes = (
    P: ProdType[],
    Vt: string[],
    Vn: string[],
    primeros: TableType,
) => {
    const siguientes = {} as TableType;
    Vn.forEach((v) => {
        siguientes[v] = [];
    });
    siguientes[Vn[0]].push('$');

    let siguientes_prev = JSON.parse(JSON.stringify(siguientes)) as TableType;

    do {
        siguientes_prev = JSON.parse(JSON.stringify(siguientes));
        P.forEach((prod) => {
            prod.body.forEach((v, i) => {
                if (!Vn.includes(v)) return;
                if (i == prod.body.length - 1) {
                    siguientes[v].push(
                        ...siguientes[prod.head].filter(
                            (i) => !siguientes[v].includes(i),
                        ),
                    );
                    return;
                }
                const rest = prod.body.slice(i + 1);
                const prim = primeros_de(rest, primeros);
                siguientes[v].push(
                    ...prim.filter(
                        (i) => i != 'λ' && !siguientes[v].includes(i),
                    ),
                );
                if (prim.includes('λ')) {
                    siguientes[v].push(
                        ...siguientes[prod.head].filter(
                            (i) => !siguientes[v].includes(i),
                        ),
                    );
                }
            });
        });
    } while (
        Object.keys(siguientes).some(
            (v) => siguientes[v].length != siguientes_prev[v].length,
        )
    );

    return siguientes;
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

    const [primeros, setPrimeros] = useState<TableType>({} as TableType);
    const [siguientes, setSiguientes] = useState<TableType>({} as TableType);

    useEffect(() => {
        if (Vn.length == 0 || Vt.length == 0) return;
        if (prods.some((p) => !Vn.includes(p.head))) return;
        setPrimeros(calcularPrimeros(prods, Vt, Vn));
    }, [prods, Vt, Vn]);

    useEffect(() => {
        if (Vn.length == 0 || Vt.length == 0) return;
        setSiguientes(calcularSiguientes(prods, Vt, Vn, primeros));
    }, [primeros]);

    const exportGrammar = () => {
        const grammar = {
            prods,
            Vn,
            Vt,
        };
        const a = document.createElement('a');
        a.href = URL.createObjectURL(
            new Blob([JSON.stringify(grammar)], {
                type: 'application/json',
            }),
        );
        a.download = 'grammar.json';
        a.click();
    };

    const importGrammar = (file: File) => {
        const reader = new FileReader();
        reader.onload = () => {
            const grammar = JSON.parse(reader.result as string);
            resetVn();
            resetVt();
            grammar.prods.forEach((p: ProdType) => addProd(p));
            grammar.Vn.forEach((v: string) => addVn(v));
            grammar.Vt.forEach((v: string) => addVt(v));
        };
        reader.readAsText(file);
    };

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
        siguientes,
        exportGrammar,
        importGrammar,
    };
};

export default useGrammar;
