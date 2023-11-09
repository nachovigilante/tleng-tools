import { useCallback, useEffect, useState } from 'react';
import {
    AFD,
    ActionTableType,
    ItemType,
    TransType,
    calcularTablaAccion,
    parseDesc,
} from '~/utils/LR';
import useGrammar from './useGrammar';

const useLR = () => {
    const {
        prods,
        Vt,
        Vn,
        siguientes,
        setAfd,
        setTrans,
        setLR0,
        setSLR,
        afd,
        trans,
        LR0,
        SLR,
        LRParsing,
        setLRParsing,
    } = useGrammar();

    useEffect(() => {
        if (prods.length === 0 || Vt.length === 0 || Vn.length === 0) {
            setAfd([] as ItemType[][]);
            setTrans({} as TransType);
            return;
        }
        const [afd, goTo] = AFD(prods, Vt, Vn);

        setAfd(afd);
        setTrans(goTo);
    }, [prods, Vt, Vn]);

    useEffect(() => {
        if (prods.length === 0 || afd.length === 0) {
            setLR0({} as ActionTableType);
            setSLR({} as ActionTableType);
            return;
        }
        setLR0(calcularTablaAccion(prods, Vt, Vn, afd, trans, siguientes));
        setSLR(
            calcularTablaAccion(prods, Vt, Vn, afd, trans, siguientes, true),
        );
    }, [afd, trans]);

    const parse = (cadena: string) => {
        const [afd, trans] = AFD(prods, Vt, Vn);
        console.log(afd);
        const tabla = calcularTablaAccion(
            prods,
            Vt,
            Vn,
            afd,
            trans,
            siguientes,
            true,
        );

        setLRParsing(parseDesc(cadena, tabla));
    };

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
