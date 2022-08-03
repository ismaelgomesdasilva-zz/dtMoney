import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { api } from "../services/api";

interface Transactions {
	id: number;
	title: string;
	amount: number;
	type: string;
	category: string;
	createdAt: string;
}
interface TransactionsProviderProps {
	children: ReactNode;
}
interface TransactionsContextData {
	transactions: Transactions[];
	createTransactions: (transactions: TransactionInput) => Promise<void>;
}
type TransactionInput = Omit<Transactions, "id" | "createdAt">;

const TransactionsContext = createContext<TransactionsContextData>(
	{} as TransactionsContextData
);

export function TransactionsProvider(props: TransactionsProviderProps) {
	const [transactions, setTransactions] = useState<Transactions[]>([]);
	useEffect(() => {
		api
			.get("transactions")
			.then((response) => setTransactions(response.data.transactions));
	}, []);
	async function createTransactions(transactionsInput: TransactionInput) {
		const response = await api.post("/transactions", {
			...transactionsInput,
			createdAt: new Date(),
		});
		const { transaction } = response.data;
		setTransactions([...transactions, transaction]);
	}
	return (
		<TransactionsContext.Provider value={{ transactions, createTransactions }}>
			{props.children}
		</TransactionsContext.Provider>
	);
}
export function useTransactions() {
	const context = useContext(TransactionsContext);
	return context;
}
