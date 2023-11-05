import { useContext, useEffect, useState } from 'react';
import { ProdType } from '~/components/Prod';
import GrammarContext from '~/contexts/GrammarContext';

export type TableType = {
    [key: string]: string[];
};

export type Table2DType = {
    [key: string]: {
        [key: string]: string[];
    };
};

const calcularPrimeros = (P: ProdType[], Vt: string[], Vn: string[]) => {
    const primeros = {} as TableType;
    Vn.forEach((v) => {
        primeros[v] = [];
    });
    Vt.forEach((v) => {
        primeros[v] = [v];
    });
    primeros['λ'] = ['λ'];

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
                if (!primeros[v]) return;
                console.log('----------------------------');
                console.log(`'${v}'`);
                console.log(v, primeros[v]);
                console.log('----------------------------');
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
        if (v == 'λ') return result.push('λ');
        if (!primeros[v]) return;
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

const calcularSD = (
    P: ProdType[],
    primeros: TableType,
    siguientes: TableType,
) => {
    const sd = {} as TableType;

    P.forEach(({ head, body }) => {
        const key = `${head} --> ${body.join(' ')}`;
        const prim = primeros_de(body, primeros);
        if (prim.includes('λ')) prim.push(...siguientes[head]);
        sd[key] = prim.filter((i) => i != 'λ');
    });

    return sd;
};

const calcularLL1 = (
    P: ProdType[],
    Vt: string[],
    Vn: string[],
    sd: TableType,
) => {
    const ll1 = {} as Table2DType;

    Vn.forEach((v) => {
        ll1[v] = {} as TableType;
        Vt.concat(['$']).forEach((t) => {
            ll1[v][t] = Object.keys(sd).filter(
                (key) => sd[key].includes(t) && key.startsWith(`${v} --> `),
            );
        });
    });

    return ll1;
};

const useGrammar = () => {
    const {
        prods,
        addProd,
        removeProd,
        updateProd,
        resetProd,
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
    const [sd, setSd] = useState<TableType>({} as TableType);
    const [ll1, setLl1] = useState<Table2DType>({} as Table2DType);

    useEffect(() => {
        prods.forEach((p) => {});
    }, [prods]);

    useEffect(() => {
        if (Vn.length == 0 || Vt.length == 0) return;
        if (prods.some((p) => !Vn.includes(p.head))) return;
        setPrimeros(calcularPrimeros(prods, Vt, Vn));
    }, [prods, Vt, Vn]);

    useEffect(() => {
        if (Vn.length == 0 || Vt.length == 0) return;
        if (prods.some((p) => !Vn.includes(p.head))) return;
        // console.log(primeros);
        setSiguientes(calcularSiguientes(prods, Vt, Vn, primeros));
    }, [primeros]);

    useEffect(() => {
        if (Vn.length == 0 || Vt.length == 0) return;
        if (prods.some((p) => !Vn.includes(p.head))) return;
        setSd(calcularSD(prods, primeros, siguientes));
    }, [siguientes]);

    useEffect(() => {
        if (Vn.length == 0 || Vt.length == 0) return;
        if (prods.some((p) => !Vn.includes(p.head))) return;
        setLl1(calcularLL1(prods, Vt, Vn, sd));
    }, [sd]);

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
            resetProd();
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
        resetProd,
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
        sd,
        ll1,
    };
};

export default useGrammar;
