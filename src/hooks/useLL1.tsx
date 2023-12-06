import { useMemo } from 'react';
import useGrammar from './useGrammar';
import { calcularLL1, calcularSD } from '~/utils/LL1';

const useLL1 = () => {
    const { Vt, Vn, prods, primeros, siguientes } = useGrammar();

    const sd = useMemo(() => {
        if (Vn.length == 0 || Vt.length == 0) return {};
        if (prods.some((p) => !Vn.includes(p.head))) return {};
        return calcularSD(prods, primeros, siguientes);
    }, [prods, primeros, siguientes, Vn, Vt]);

    const ll1 = useMemo(() => {
        if (Vn.length == 0 || Vt.length == 0) return {};
        if (prods.some((p) => !Vn.includes(p.head))) return {};
        return calcularLL1(Vt, Vn, sd);
    }, [Vn, Vt, sd, prods]);

    return { sd, ll1 };
};

export default useLL1;
