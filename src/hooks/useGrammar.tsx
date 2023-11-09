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

        const newVn = [] as string[];
        const newVt = [] as string[];
        prods.forEach((p) => {
            if (!newVn.includes(p.head)) newVn.push(p.head);
        });
        prods.forEach((p) => {
            p.body.forEach((v) => {
                if (!newVn.includes(v) && !newVt.includes(v)) newVt.push(v);
            });
        });

        newVn.forEach((v) => addVn(v));
        newVt.forEach((v) => addVt(v));

        if (prods.some((p) => !Vn.includes(p.head)) || prods.length === 0)
            return;
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
