import { useCallback, useContext, useEffect, useState } from 'react';
import { ProdType } from '~/components/Prod';
import GrammarContext from '~/contexts/GrammarContext';
import { AFD, ActionTableType, ActionType, ItemType, TransType, calcularTablaAccion } from '~/utils/LR';
import { calcularPrimeros, calcularSiguientes } from '~/utils/ps';

const parseDesc = (cadena: string, table: ActionTableType) => {
    const stack = [] as number[];
    const input = cadena.split(' ');
    input.push('$');
    const output = [] as string[];
    let error = false;

    const trace = [] as {
        stack: number[];
        input: string[];
        action: ActionType;
    }[];

    stack.push(0);

    while (true) {
        const state = stack[stack.length - 1];
        const symbol = input[0];
        const action = table[state][symbol][0];

        trace.push({
            stack: JSON.parse(JSON.stringify(stack)),
            input: JSON.parse(JSON.stringify(input)),
            action,
        });

        if (!action) {
            error = true;
            break;
        }

        if (action.accion === 'shift') {
            stack.push(action.payload);
            input.shift();
        } else if (action.accion === 'goto') {
            stack.push(action.payload);
        } else if (action.accion === 'reduce') {
            const prod = action.payload;
            const body = prod.body;
            const head = prod.head;
            const len = body.length;

            for (let i = 0; i < len; i++) {
                stack.pop();
            }

            const newState = stack[stack.length - 1];
            const newAction = table[newState][head][0];

            if (!newAction || newAction.accion !== 'goto') {
                error = true;
                break;
            }

            stack.push(newAction.payload);
            output.push(`${head} --> ${body.join(' ')}`);
        } else if (action.accion === 'accept') {
            break;
        }
    }

    return {
        stack,
        input,
        output,
        error,
        trace,
    };
};

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

    const parse = (cadena: string) => {
        const [afd, trans] = AFD(prods, Vt, Vn);
        console.log(afd);
        const tabla = calcularTablaAccion(
            prods,
            Vt,
            Vn,
            afd,
            trans,
            siguientes,
            true,
        );

        const p = parseDesc(cadena, tabla);
        console.log(p);
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
        parse,
        ...rest,
    };
};

export default useGrammar;
