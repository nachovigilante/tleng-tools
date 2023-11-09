import { useState } from 'react';
import { AFD, ItemType, TransType } from '~/utils/LR';
import useGrammar from './useGrammar';

const useLR = () => {
    const { prods, Vt, Vn } = useGrammar();

    const [afd, setAfd] = useState<ItemType[][]>([] as ItemType[][]);
    const [trans, setTrans] = useState<TransType>({} as TransType);

    const calcularAFD = () => {
        const [afd, goTo] = AFD(prods, Vt, Vn);

        setAfd(afd);
        setTrans(goTo);
    };

    return {
        afd,
        calcularAFD,
        trans,
    };
};

export default useLR;
