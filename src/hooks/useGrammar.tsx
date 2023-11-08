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

const calcularLL1 = (Vt: string[], Vn: string[], sd: TableType) => {
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

export type ItemType = {
    prod: ProdType;
    index: number;
};

export type TransType = {
    [key: string]: {
        [key: string]: number;
    };
};

const showItem = (item: ItemType) => {
    console.log(
        item.prod.head,
        '-->',
        item.prod.body.map((b, i) => (i == item.index ? `·${b}` : b)).join(' '),
        item.index == item.prod.body.length ? '·' : '',
    );
};

const calcularClausuraItem = (item: ItemType, prods: ProdType[]) => {
    const {
        prod: { head, body },
        index,
    } = item;
    const result = [item] as ItemType[];
    const next = body[index];
    if (index == body.length || next == 'λ') return result;

    let prev_result = JSON.parse(JSON.stringify(result)) as ItemType[];

    do {
        result.forEach((i) => {
            prods.forEach((p) => {
                if (p.head != i.prod.body[i.index]) return;
                const new_item = {
                    prod: p,
                    index: 0,
                } as ItemType;
                if (
                    !result.some(
                        (r) =>
                            r.prod.head === new_item.prod.head &&
                            r.prod.body.join(' ') ===
                                new_item.prod.body.join(' '),
                    )
                )
                    result.push(new_item);
            });
        });
    } while (
        prev_result.length != result.length &&
        (prev_result = JSON.parse(JSON.stringify(result)) as ItemType[])
    );
    return result;
};

const calcularClausuraConjItems = (items: ItemType[], prods: ProdType[]) => {
    const result = [] as ItemType[];
    items.forEach((item) => {
        const cl = calcularClausuraItem(item, prods);
        cl.forEach((i) => {
            if (
                !result.some(
                    (r) =>
                        r.prod.head === i.prod.head &&
                        r.prod.body.join(' ') === i.prod.body.join(' '),
                )
            )
                result.push(i);
        });
    });
    return result;
};

const calcularTransicion = (
    items: ItemType[],
    simbolo: string,
    prods: ProdType[],
) => {
    const result = [] as ItemType[];
    items.forEach((item) => {
        const { prod, index } = item;
        if (index == prod.body.length) return;
        if (prod.body[index] == simbolo)
            result.push({
                prod,
                index: index + 1,
            } as ItemType);
    });
    return calcularClausuraConjItems(result, prods);
};

const AFD = (
    prods: ProdType[],
    Vt: string[],
    Vn: string[],
): [
    ItemType[][],
    {
        [key: string]: {
            [key: string]: number;
        };
    },
] => {
    const estados = [] as ItemType[][];
    const goTo = {} as TransType;
    goTo[0] = {};

    const inicial = calcularClausuraItem(
        {
            prod: prods[0],
            index: 0,
        } as ItemType,
        prods,
    );

    estados.push(inicial);

    let prev_estados = JSON.parse(JSON.stringify(estados)) as ItemType[][];

    do {
        estados.forEach((estado) => {
            Vn.concat(Vt).forEach((simbolo) => {
                const transicion = calcularTransicion(estado, simbolo, prods);
                if (
                    !estados.some((e) =>
                        e.every(
                            (i) =>
                                transicion.some(
                                    (t) =>
                                        t.prod.head === i.prod.head &&
                                        t.prod.body.join(' ') ===
                                            i.prod.body.join(' ') &&
                                        t.index == i.index,
                                ) && transicion.length == e.length,
                        ),
                    ) &&
                    transicion.length > 0
                ) {
                    estados.push(transicion);
                    goTo[estados.length - 1] = {};
                    goTo[estados.indexOf(estado)][simbolo] = estados.length - 1;
                }
            });
        });
    } while (
        prev_estados.length != estados.length &&
        (prev_estados = JSON.parse(JSON.stringify(estados)) as ItemType[][])
    );

    return [estados, goTo];
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
    const [afd, setAfd] = useState<ItemType[][]>([] as ItemType[][]);
    const [trans, setTrans] = useState<TransType>({} as TransType);

    useEffect(() => {
        resetVn();
        resetVt();

        const newVn = [] as string[];
        const newVt = [] as string[];
        prods.forEach((p) => {
            if (!newVn.includes(p.head)) newVn.push(p.head);
        });
        prods.forEach((p) => {
            p.body.forEach((v) => {
                if (!newVn.includes(v) && !newVt.includes(v)) newVt.push(v);
            });
        });

        newVn.sort();
        newVt.sort();

        newVn.forEach((v) => addVn(v));
        newVt.forEach((v) => addVt(v));

        if (prods.some((p) => !Vn.includes(p.head)) || prods.length === 0)
            return;
    }, [prods]);

    useEffect(() => {
        if (Vn.length == 0 || Vt.length == 0) return;
        if (prods.some((p) => !Vn.includes(p.head))) return;
        setPrimeros(calcularPrimeros(prods, Vt, Vn));
    }, [prods, Vt, Vn]);

    useEffect(() => {
        if (Vn.length == 0 || Vt.length == 0) return;
        if (prods.some((p) => !Vn.includes(p.head))) return;
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
        setLl1(calcularLL1(Vt, Vn, sd));
    }, [sd]);

    const calcularAFD = () => {
        const [afd, goTo] = AFD(prods, Vt, Vn);

        setAfd(afd);
        setTrans(goTo);
    };

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
        afd,
        calcularAFD,
        trans,
    };
};

export default useGrammar;
