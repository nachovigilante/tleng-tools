import { useState } from 'react';
import { AFD, ActionTableType, calcularTablaAccion } from '~/utils/LR';
import useGrammar from './useGrammar';
import useLR from './useLR';

const useLR0 = () => {
    const { prods, Vt, Vn, siguientes } = useGrammar();
    const { afd, trans } = useLR();

    const [LR0, setLR0] = useState<ActionTableType>({} as ActionTableType);

    const calcularLR0 = () => {
        // if (prods.length === 0) {
        //     setLR0({} as ActionTableType);
        //     return;
        // }
        // if (afd.length === 0) {
        //     setLR0({} as ActionTableType);
        //     return;
        // }
        setLR0(calcularTablaAccion(prods, Vt, Vn, afd, trans, siguientes));
    };

    return {
        LR0,
        calcularLR0,
    };
};

export default useLR0;
