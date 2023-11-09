import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useReducer,
    useState,
} from 'react';
import { ProdType } from '~/components/Prod';
import { ActionTableType, ItemType, ParsingType, TransType } from '~/utils/LR';
import { TableType } from '~/utils/ps';

export type Grammar = {
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
    primeros: TableType;
    siguientes: TableType;
    setPrimeros: Dispatch<SetStateAction<TableType>>;
    setSiguientes: Dispatch<SetStateAction<TableType>>;
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
    Vn: [],
    addVn: () => {},
    removeVn: () => {},
    resetVn: () => {},
    Vt: [],
    addVt: () => {},
    removeVt: () => {},
    resetVt: () => {},
    primeros: {} as TableType,
    siguientes: {} as TableType,
    setPrimeros: () => {},
    setSiguientes: () => {},
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

    const [primeros, setPrimeros] = useState<TableType>({} as TableType);
    const [siguientes, setSiguientes] = useState<TableType>({} as TableType);
    const [afd, setAfd] = useState<ItemType[][]>([] as ItemType[][]);
    const [trans, setTrans] = useState<TransType>({} as TransType);
    const [LR0, setLR0] = useState<ActionTableType>({} as ActionTableType);
    const [SLR, setSLR] = useState<ActionTableType>({} as ActionTableType);
    const [LRParsing, setLRParsing] = useState<ParsingType>(
        {} as ParsingType,
    );

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
                primeros,
                siguientes,
                setPrimeros,
                setSiguientes,
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
