import { Production } from 'formal-language-tools';
import { useCallback, useContext, useMemo } from 'react';
import GrammarContext from '~/contexts/GrammarContext';
import { CFG } from 'formal-language-tools';

const useGrammar = () => {
    const grammarCtx = useContext(GrammarContext);
    const { prods, addProd, resetProd } = grammarCtx;

    // Símbolos terminales y no terminales
    const [Vn, Vt] = useMemo(() => {
        const vnSet = new Set(prods.map((p) => p.head));
        const bodySymbols = new Set(prods.map((p) => p.body).flat());
        const vtSet = new Set([...bodySymbols].filter((x) => !vnSet.has(x)));

        return [vnSet, vtSet];
    }, [prods]);

    const cfg = useMemo(() => {
        return new CFG(Vn, Vt, prods, Vn.values().next().value);
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
                grammar.prods.forEach((p: Production) => addProd(p));
            };
            reader.readAsText(file);
        },
        [addProd, resetProd],
    );

    return {
        Vn,
        Vt,
        primeros: cfg.firstMap,
        siguientes: cfg.followMap,
        exportGrammar,
        importGrammar,
        ...grammarCtx,
    };
};

export default useGrammar;
