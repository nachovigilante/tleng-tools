import { useCallback, useMemo, useState } from 'react';
import {
    AFD,
    ActionTableType,
    ItemType,
    ParsingType,
    TransType,
    calcularTablaAccion,
    parseDesc,
} from '~/utils/LR';
import useGrammar from './useGrammar';

const useLR = () => {
    const { prods, Vt, Vn, siguientes } = useGrammar();

    const [afd, trans] = useMemo(() => {
        if (prods.length === 0 || Vt.length === 0 || Vn.length === 0) {
            return [[], {}] as [ItemType[][], TransType];
        }

        return AFD(prods, Vt, Vn);
    }, [prods, Vt, Vn]);

    const [LR0, SLR] = useMemo(() => {
        if (prods.length === 0 || afd.length === 0) {
            return [{} as ActionTableType, {} as ActionTableType];
        }

        return [
            calcularTablaAccion(prods, Vt, Vn, afd, trans, siguientes),
            calcularTablaAccion(prods, Vt, Vn, afd, trans, siguientes, true),
        ];
    }, [prods, Vt, Vn, afd, trans, siguientes]);

    const [LRParsing, setLRParsing] = useState({} as ParsingType);

    const parse = useCallback(
        (cadena: string) => {
            setLRParsing(parseDesc(cadena, SLR));
        },
        [SLR],
    );

    return {
        afd,
        trans,
        LR0,
        SLR,
        parse,
        LRParsing,
    };
};

export default useLR;
