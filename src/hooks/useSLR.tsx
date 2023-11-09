import { useState } from 'react';
import { ActionTableType, calcularTablaAccion } from '~/utils/LR';
import useGrammar from './useGrammar';
import useLR from './useLR';

const useSLR = () => {
    const { prods, Vt, Vn, siguientes } = useGrammar();
    const { afd, trans } = useLR();

    const [SLR, setSLR] = useState<ActionTableType>({} as ActionTableType);

    const calcularSLR = () => {
        if (prods.length === 0) {
            setSLR({} as ActionTableType);
            return;
        }
        if (afd.length === 0) {
            setSLR({} as ActionTableType);
            return;
        }
        setSLR(
            calcularTablaAccion(prods, Vt, Vn, afd, trans, siguientes, true),
        );
    };

    return {
        SLR,
        calcularSLR,
    };
};

export default useSLR;
