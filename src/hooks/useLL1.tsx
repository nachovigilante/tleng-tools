import { useEffect, useState } from 'react';
import { Grammar } from '~/contexts/GrammarContext';
import { TableType } from '~/utils/ps';
import useGrammar from './useGrammar';
import { Table2DType, calcularLL1, calcularSD } from '~/utils/LL1';

const useLL1 = () => {
    const { Vt, Vn, prods, primeros, siguientes } = useGrammar();

    const [sd, setSd] = useState<TableType>({} as TableType);
    const [ll1, setLl1] = useState<Table2DType>({} as Table2DType);

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

    return { sd, ll1 };
};

export default useLL1;
