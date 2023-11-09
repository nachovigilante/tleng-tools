import { useState } from 'react';
import { AFD, ActionTableType, calcularTablaAccion } from '~/utils/LR';
import useGrammar from './useGrammar';

const useLR0 = () => {
    const { prods, Vt, Vn, siguientes } = useGrammar();

    const [LR0, setLR0] = useState<ActionTableType>({} as ActionTableType);

    const calcularLR0 = () => {
        const [afd, trans] = AFD(prods, Vt, Vn);
        setLR0(calcularTablaAccion(prods, Vt, Vn, afd, trans, siguientes));
    };

    return {
        LR0,
        calcularLR0,
    };
};

export default useLR0;
