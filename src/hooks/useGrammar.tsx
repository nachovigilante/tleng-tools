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
        addVn,
        resetVn,
        Vt,
        addVt,
        resetVt,
        primeros,
        siguientes,
        setPrimeros,
        setSiguientes,
        ...rest
    } = useContext(GrammarContext);

    useEffect(() => {
        resetVn();
        resetVt();

        const vnSet = new Set(prods.map((p) => p.head));
        const allBodySymbols = new Set(prods.map((p) => p.body).flat());
        // JS has no set difference ???
        const vtSet = new Set([...allBodySymbols].filter((x) => !vnSet.has(x)));

        vnSet.forEach((v) => addVn(v));
        vtSet.forEach((v) => addVt(v));
    }, [prods]);

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
            resetVn();
            resetVt();
            resetProd();
            grammar.prods.forEach((p: ProdType) => addProd(p));
            grammar.Vn.forEach((v: string) => addVn(v));
            grammar.Vt.forEach((v: string) => addVt(v));
        };
        reader.readAsText(file);
    };

    return {
        prods,
        addProd,
        resetProd,
        Vn,
        addVn,
        resetVn,
        Vt,
        addVt,
        resetVt,
        primeros,
        siguientes,
        exportGrammar,
        importGrammar,
        ...rest,
    };
};

export default useGrammar;
