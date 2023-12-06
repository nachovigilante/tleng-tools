import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useMemo,
    useReducer,
    useState,
} from 'react';
import { ProdType } from '~/components/Prod';
import { ActionTableType, ItemType, ParsingType, TransType } from '~/utils/LR';
import { TableType, calcularPrimeros, calcularSiguientes } from '~/utils/ps';

export type Grammar = {
    prods: ProdType[];
    addProd: (prod: ProdType) => void;
    removeProd: (index: number) => void;
    updateProd: (index: number, prod: ProdType) => void;
    resetProd: () => void;
    afd: ItemType[][];
    trans: TransType;
    LR0: ActionTableType;
    SLR: ActionTableType;
    setAfd: Dispatch<SetStateAction<ItemType[][]>>;
    setTrans: Dispatch<SetStateAction<TransType>>;
    setLR0: Dispatch<SetStateAction<ActionTableType>>;
    setSLR: Dispatch<SetStateAction<ActionTableType>>;
    LRParsing: ParsingType;
    setLRParsing: Dispatch<SetStateAction<ParsingType>>;
};

const GrammarContext = createContext({
    prods: [],
    addProd: () => {},
    removeProd: () => {},
    updateProd: () => {},
    resetProd: () => {},
    afd: [] as ItemType[][],
    trans: {} as TransType,
    LR0: {} as ActionTableType,
    SLR: {} as ActionTableType,
    setAfd: () => {},
    setTrans: () => {},
    setLR0: () => {},
    setSLR: () => {},
    LRParsing: {} as ParsingType,
    setLRParsing: () => {},
} as Grammar);

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
        [
            {
                head: '',
                body: [],
            },
        ] as ProdType[],
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

    const [afd, setAfd] = useState<ItemType[][]>([] as ItemType[][]);
    const [trans, setTrans] = useState<TransType>({} as TransType);
    const [LR0, setLR0] = useState<ActionTableType>({} as ActionTableType);
    const [SLR, setSLR] = useState<ActionTableType>({} as ActionTableType);
    const [LRParsing, setLRParsing] = useState<ParsingType>({} as ParsingType);

    return (
        <GrammarContext.Provider
            value={{
                prods,
                addProd,
                removeProd,
                updateProd,
                resetProd,
                afd,
                trans,
                LR0,
                SLR,
                setAfd,
                setTrans,
                setLR0,
                setSLR,
                LRParsing,
                setLRParsing,
            }}
        >
            {children}
        </GrammarContext.Provider>
    );
};

export default GrammarContext;
