import { useCallback, useContext, useEffect, useState } from 'react';
import { ProdType } from '~/components/Prod';
import GrammarContext from '~/contexts/GrammarContext';
import { calcularPrimeros, calcularSiguientes } from '~/utils/ps';

const useGrammar = () => {
    const {
        prods,
        addProd,
        resetProd,
        Vn,
        Vt,
        primeros,
        siguientes,
        setPrimeros,
        setSiguientes,
        ...rest
    } = useContext(GrammarContext);

    useEffect(() => {
        if (Vn.length == 0 || Vt.length == 0) return;
        if (prods.some((p) => !Vn.includes(p.head))) return;
        setPrimeros(calcularPrimeros(prods, Vt, Vn));
    }, [prods, Vt, Vn]);

    useEffect(() => {
        if (Vn.length == 0 || Vt.length == 0) return;
        if (prods.some((p) => !Vn.includes(p.head))) return;
        setSiguientes(calcularSiguientes(prods, Vn, primeros));
    }, [primeros]);

    const exportGrammar = () => {
        const grammar = {
            prods,
            Vn,
            Vt,
        };
        const a = document.createElement('a');
        a.href = URL.createObjectURL(
            new Blob([JSON.stringify(grammar)], {
                type: 'application/json',
            }),
        );
        a.download = 'grammar.json';
        a.click();
    };

    const importGrammar = (file: File) => {
        const reader = new FileReader();
        reader.onload = () => {
            const grammar = JSON.parse(reader.result as string);
            resetProd();
            grammar.prods.forEach((p: ProdType) => addProd(p));
        };
        reader.readAsText(file);
    };

    return {
        prods,
        addProd,
        resetProd,
        Vn,
        Vt,
        primeros,
        siguientes,
        exportGrammar,
        importGrammar,
        ...rest,
    };
};

export default useGrammar;
