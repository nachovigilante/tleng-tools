import { useMemo } from 'react';
import useGrammar from './useGrammar';
import { calcularLL1, calcularSD } from '~/utils/LL1';
import { TableType } from '~/utils/ps';

const tableFromMap = (map: Map<string, Set<string>>) => {
    const table: TableType = {};
    map.forEach((value, key) => {
        table[key] = [...value];
    });
    return table;
};

const useLL1 = () => {
    const { Vt, Vn, prods, primeros, siguientes } = useGrammar();

    const sd = useMemo(() => {
        console.log(Vn, Vt)
        if (Vn.size == 0 || Vt.size == 0) return {};
        if (prods.some((p) => !Vn.has(p.head))) return {};
        return calcularSD(
            prods,
            tableFromMap(primeros),
            tableFromMap(siguientes),
        );
    }, [prods, primeros, siguientes, Vn, Vt]);

    const ll1 = useMemo(() => {
        if (Vn.size == 0 || Vt.size == 0) return {};
        if (prods.some((p) => !Vn.has(p.head))) return {};
        return calcularLL1(Array.from(Vt), Array.from(Vn), sd);
    }, [Vn, Vt, sd, prods]);

    return { sd, ll1 };
};

export default useLL1;
