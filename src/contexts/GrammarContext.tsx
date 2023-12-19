import { Production } from 'formal-language-tools';
import { ReactNode, createContext, useReducer } from 'react';

export type Grammar = {
    prods: Production[];
    addProd: (prod: Production) => void;
    removeProd: (index: number) => void;
    updateProd: (index: number, prod: Production) => void;
    resetProd: () => void;
};

const GrammarContext = createContext({
    prods: [],
    addProd: () => {},
    removeProd: () => {},
    updateProd: () => {},
    resetProd: () => {},
} as Grammar);

export const GrammarProvider = ({ children }: { children: ReactNode }) => {
    const [prods, dispatch] = useReducer(
        (
            state: Production[],
            action: {
                type: 'add' | 'remove' | 'update' | 'reset';
                payload: { index: number; prod?: Production };
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
        [
            {
                head: '',
                body: [],
            },
        ] as Production[],
    );

    const addProd = (prod: Production) => {
        dispatch({ type: 'add', payload: { prod, index: -1 } });
    };

    const removeProd = (index: number) => {
        dispatch({ type: 'remove', payload: { index } });
    };

    const updateProd = (index: number, prod: Production) => {
        dispatch({ type: 'update', payload: { index, prod } });
    };

    const resetProd = () => {
        dispatch({ type: 'reset', payload: { index: -1 } });
    };

    return (
        <GrammarContext.Provider
            value={{
                prods,
                addProd,
                removeProd,
                updateProd,
                resetProd,
            }}
        >
            {children}
        </GrammarContext.Provider>
    );
};

export default GrammarContext;
