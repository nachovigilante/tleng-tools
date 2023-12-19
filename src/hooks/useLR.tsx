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
import { TableType } from '~/utils/ps';

const tableFromMap = (map: Map<string, Set<string>>) => {
    const table: TableType = {};
    map.forEach((value, key) => {
        table[key] = [...value];
    });
    return table;
};

const useLR = () => {
    const { prods, Vt, Vn, siguientes } = useGrammar();

    const VnArray = useMemo(() => Array.from(Vn), [Vn]);
    const VtArray = useMemo(() => Array.from(Vt), [Vt]);

    const [afd, trans] = useMemo(() => {
        if (
            prods.length === 0 ||
            VtArray.length === 0 ||
            VnArray.length === 0
        ) {
            return [[], {}] as [ItemType[][], TransType];
        }

        return AFD(prods, VtArray, VnArray);
    }, [prods, VtArray, VnArray]);

    const [LR0, SLR] = useMemo(() => {
        if (prods.length === 0 || afd.length === 0) {
            return [{} as ActionTableType, {} as ActionTableType];
        }

        return [
            calcularTablaAccion(
                prods,
                VtArray,
                VnArray,
                afd,
                trans,
                tableFromMap(siguientes),
            ),
            calcularTablaAccion(
                prods,
                VtArray,
                VnArray,
                afd,
                trans,
                tableFromMap(siguientes),
                true,
            ),
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
