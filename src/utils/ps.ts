import { ProdType } from "~/components/Prod";

export type TableType = {
    [key: string]: string[];
};

export const calcularPrimeros = (P: ProdType[], Vt: string[], Vn: string[]) => {
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

export const primeros_de = (cadena: string[], primeros: TableType) => {
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

export const calcularSiguientes = (
    P: ProdType[],
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
