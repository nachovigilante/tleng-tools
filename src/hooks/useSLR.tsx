import { useState } from 'react';
import { AFD, ActionTableType, calcularTablaAccion } from '~/utils/LR';
import useGrammar from './useGrammar';

const useSLR = () => {
    const { prods, Vt, Vn, siguientes } = useGrammar();

    const [SLR, setSLR] = useState<ActionTableType>({} as ActionTableType);

    const calcularSLR = () => {
        const [afd, trans] = AFD(prods, Vt, Vn);
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
