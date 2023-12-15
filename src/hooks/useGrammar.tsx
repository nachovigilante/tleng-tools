import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ProdType } from '~/components/Prod';
import GrammarContext from '~/contexts/GrammarContext';
import { TableType, calcularPrimeros, calcularSiguientes } from '~/utils/ps';

const useGrammar = () => {
    const grammar = useContext(GrammarContext);
    const { prods, addProd, resetProd } = grammar;

    // Símbolos terminales y no terminales
    const [Vn, Vt] = useMemo(() => {
        const vnSet = new Set(prods.map((p) => p.head));
        const bodySymbols = new Set(prods.map((p) => p.body).flat());
        // JS has no set difference ???
        const vtSet = new Set([...bodySymbols].filter((x) => !vnSet.has(x)));

        return [Array.from(vnSet), Array.from(vtSet)];
    }, [prods]);

    // Primeros/Siguientes
    const [primeros, siguientes] = useMemo(() => {
        if (prods.length === 0 || Vt.length === 0 || Vn.length === 0)
            return [{}, {}] as [TableType, TableType];

        const prim = calcularPrimeros(prods, Vt, Vn);
        const sig = calcularSiguientes(prods, Vn, prim);

        return [prim, sig];
    }, [prods, Vn, Vt]);

    const exportGrammar = useCallback(() => {
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
    }, [prods, Vn, Vt]);

    const importGrammar = useCallback(
        (file: File) => {
            const reader = new FileReader();
            reader.onload = () => {
                const grammar = JSON.parse(reader.result as string);
                resetProd();
                grammar.prods.forEach((p: ProdType) => addProd(p));
            };
            reader.readAsText(file);
        },
        [addProd, resetProd],
    );

    return {
        Vn,
        Vt,
        primeros,
        siguientes,
        exportGrammar,
        importGrammar,
        ...grammar,
    };
};

export default useGrammar;
