import { ReactNode, createContext, useEffect, useReducer } from 'react';
import { ProdType } from '~/components/Prod';

type GrammarContextType = {
    prods: ProdType[];
    addProd: (prod: ProdType) => void;
    removeProd: (index: number) => void;
    updateProd: (index: number, prod: ProdType) => void;
    resetProd: () => void;
    Vn: string[];
    addVn: (symbol: string) => void;
    removeVn: (symbol: string) => void;
    resetVn: () => void;
    Vt: string[];
    addVt: (symbol: string) => void;
    removeVt: (symbol: string) => void;
    resetVt: () => void;
};

const GrammarContext = createContext({
    prods: [],
    addProd: () => {},
    removeProd: () => {},
    updateProd: () => {},
    resetProd: () => {},
    Vn: [],
    addVn: () => {},
    removeVn: () => {},
    resetVn: () => {},
    Vt: [],
    addVt: () => {},
    removeVt: () => {},
    resetVt: () => {},
} as GrammarContextType);

export const GrammarProvider = ({ children }: { children: ReactNode }) => {
    const [prods, dispatch] = useReducer(
        (
            state: ProdType[],
            action: {
                type: 'add' | 'remove' | 'update' | 'reset';
                payload: { index: number; prod?: ProdType };
            },
        ) => {
            switch (action.type) {
                case 'add':
                    return [...state, action.payload.prod!];
                case 'remove':
                    return state.filter(
                        (_, index) => index !== action.payload.index,
                    );
                case 'update':
                    const newState = [...state];
                    newState[action.payload.index] = action.payload.prod!;
                    return newState;
                case 'reset':
                    return [];
                default:
                    return state;
            }
        },
        [] as ProdType[],
    );

    const addProd = (prod: ProdType) => {
        dispatch({ type: 'add', payload: { prod, index: -1 } });
    };

    const removeProd = (index: number) => {
        dispatch({ type: 'remove', payload: { index } });
    };

    const updateProd = (index: number, prod: ProdType) => {
        dispatch({ type: 'update', payload: { index, prod } });
    };

    const resetProd = () => {
        dispatch({ type: 'reset', payload: { index: -1 } });
    };

    const [Vn, dispatchVn] = useReducer(
        (
            state: string[],
            action: {
                type: 'add' | 'remove' | 'reset';
                payload: { symbol: string };
            },
        ) => {
            switch (action.type) {
                case 'add':
                    return [...state, action.payload.symbol];
                case 'remove':
                    return state.filter(
                        (symbol) => symbol !== action.payload.symbol,
                    );
                case 'reset':
                    return [];
                default:
                    return state;
            }
        },
        [] as string[],
    );

    const addVn = (symbol: string) => {
        dispatchVn({ type: 'add', payload: { symbol } });
    };

    const removeVn = (symbol: string) => {
        dispatchVn({ type: 'remove', payload: { symbol } });
    };

    const resetVn = () => {
        dispatchVn({ type: 'reset', payload: { symbol: '' } });
    };

    const [Vt, dispatchVt] = useReducer(
        (
            state: string[],
            action: {
                type: 'add' | 'remove' | 'reset';
                payload: { symbol: string };
            },
        ) => {
            switch (action.type) {
                case 'add':
                    return [...state, action.payload.symbol];
                case 'remove':
                    return state.filter(
                        (symbol) => symbol !== action.payload.symbol,
                    );
                case 'reset':
                    return [];
                default:
                    return state;
            }
        },
        [] as string[],
    );

    const addVt = (symbol: string) => {
        dispatchVt({ type: 'add', payload: { symbol } });
    };

    const removeVt = (symbol: string) => {
        dispatchVt({ type: 'remove', payload: { symbol } });
    };

    const resetVt = () => {
        dispatchVt({ type: 'reset', payload: { symbol: '' } });
    };

    return (
        <GrammarContext.Provider
            value={{
                prods,
                addProd,
                removeProd,
                updateProd,
                Vn,
                addVn,
                removeVn,
                resetVn,
                Vt,
                addVt,
                removeVt,
                resetVt,
                resetProd,
            }}
        >
            {children}
        </GrammarContext.Provider>
    );
};

export default GrammarContext;
