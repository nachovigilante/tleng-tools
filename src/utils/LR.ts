import { ProdType } from "~/components/Prod";
import { TableType } from "./ps";

export type ItemType = {
    prod: ProdType;
    index: number;
};

export type TransType = {
    [key: string]: {
        [key: string]: number;
    };
};

export const showItem = (item: ItemType) => {
    console.log(
        item.prod.head,
        '-->',
        item.prod.body.map((b, i) => (i == item.index ? `·${b}` : b)).join(' '),
        item.index == item.prod.body.length ? '·' : '',
    );
};

export const calcularClausuraItem = (item: ItemType, prods: ProdType[]) => {
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
                                new_item.prod.body.join(' ') &&
                            r.index == new_item.index,
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

export const calcularClausuraConjItems = (
    items: ItemType[],
    prods: ProdType[],
) => {
    const result = [] as ItemType[];
    items.forEach((item) => {
        const cl = calcularClausuraItem(item, prods);
        cl.forEach((i) => {
            if (
                !result.some(
                    (r) =>
                        r.prod.head === i.prod.head &&
                        r.prod.body.join(' ') === i.prod.body.join(' ') &&
                        r.index === i.index,
                )
            ) {
                result.push(i);
            } else {
                console.log('No se agrego a');
                showItem(i);
                console.log('porque ya estaba en');
                result.forEach((r) => showItem(r));
            }
        });
    });
    return result;
};

export const calcularTransicion = (
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

export const AFD = (
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
                const sigEstado = estados.findIndex((e) =>
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
                );
                if (transicion.length == 0) return;
                if (sigEstado === -1) {
                    estados.push(transicion);
                    goTo[estados.length - 1] = {};
                    goTo[estados.indexOf(estado)][simbolo] = estados.length - 1;
                } else {
                    goTo[estados.indexOf(estado)][simbolo] = sigEstado;
                }
            });
        });
    } while (
        prev_estados.length != estados.length &&
        (prev_estados = JSON.parse(JSON.stringify(estados)) as ItemType[][])
    );

    return [estados, goTo];
};

export type ActionType =
    | {
          accion: 'shift' | 'goto';
          payload: number;
      }
    | {
          accion: 'reduce';
          payload: ProdType;
      }
    | {
          accion: 'accept';
      };

export type ActionTableType = {
    [key: number]: {
        [key: string]: ActionType[];
    };
};

export const calcularTablaAccion = (
    prods: ProdType[],
    Vt: string[],
    Vn: string[],
    estados: ItemType[][],
    goTo: TransType,
    siguientes: TableType = {} as TableType,
    SLR: boolean = false,
) => {
    const table = {} as ActionTableType;

    estados.forEach((estado, i) => {
        table[i] = {};
        Vt.concat(['$'])
            .concat(Vn)
            .forEach((v) => {
                table[i][v] = [];
            });

        estado.forEach((item) => {
            if (item.index === item.prod.body.length) {
                if (item.prod.head === prods[0].head) {
                    const accion = {
                        accion: 'accept',
                    } as ActionType;

                    if (table[i]['$'].some((a) => a.accion === 'accept'))
                        return;

                    table[i]['$'].push(accion);
                } else {
                    const reduceSymbols = SLR
                        ? siguientes[item.prod.head]
                        : Vt.concat(['$']);

                    const accion = {
                        accion: 'reduce',
                        payload: item.prod,
                    } as ActionType;

                    reduceSymbols.forEach((v) => {
                        if (
                            table[i][v].some(
                                (a) =>
                                    a.accion === 'reduce' &&
                                    a.payload.head === item.prod.head &&
                                    a.payload.body.join(' ') ===
                                        item.prod.body.join(' '),
                            )
                        )
                            return;

                        table[i][v].push(accion);
                    });
                }
            }
            const next = item.prod.body[item.index];
            if (next === 'λ') {
                if (item.prod.head === prods[0].head) {
                    const accion = {
                        accion: 'accept',
                    } as ActionType;

                    if (table[i]['$'].some((a) => a.accion === 'accept'))
                        return;

                    table[i]['$'].push(accion);
                } else {
                    const reduceSymbols = SLR
                        ? siguientes[item.prod.head]
                        : Vt.concat(['$']);

                    const accion = {
                        accion: 'reduce',
                        payload: item.prod,
                    } as ActionType;

                    reduceSymbols.forEach((v) => {
                        if (
                            table[i][v].some(
                                (a) =>
                                    a.accion === 'reduce' &&
                                    a.payload.head === item.prod.head &&
                                    a.payload.body.join(' ') ===
                                        item.prod.body.join(' '),
                            )
                        )
                            return;

                        table[i][v].push(accion);
                    });
                }
            }
            if (Vt.includes(next)) {
                const accion = {
                    accion: 'shift',
                    payload: goTo[i][next],
                } as ActionType;

                if (
                    table[i][next].some(
                        (a) =>
                            a.accion === 'shift' && a.payload === goTo[i][next],
                    )
                )
                    return;

                table[i][next].push(accion);
            }
            if (Vn.includes(next)) {
                const accion = {
                    accion: 'goto',
                    payload: goTo[i][next],
                } as ActionType;

                if (
                    table[i][next].some(
                        (a) =>
                            a.accion === 'goto' && a.payload === goTo[i][next],
                    )
                )
                    return;

                table[i][next].push(accion);
            }
        });
    });

    return table;
};
