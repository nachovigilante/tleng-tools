import { ProdType } from '~/components/Prod';
import { TableType, primeros_de } from './ps';

export type Table2DType = {
    [key: string]: {
        [key: string]: string[];
    };
};

export const calcularSD = (
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

export const calcularLL1 = (Vt: string[], Vn: string[], sd: TableType) => {
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
