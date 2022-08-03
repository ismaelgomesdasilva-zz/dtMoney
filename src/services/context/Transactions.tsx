import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../api";

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
	createTransactions: (transactions: TransactionInput) => void;
}
type TransactionInput = Omit<Transactions, "id" | "createdAt">;

export const TransactionsContext = createContext<TransactionsContextData>(
	{} as TransactionsContextData
);

export function TransactionsProvider(props: TransactionsProviderProps) {
	const [transactions, setTransactions] = useState<Transactions[]>([]);
	useEffect(() => {
		api
			.get("transactions")
			.then((response) => setTransactions(response.data.transactions));
	}, []);
	function createTransactions(transactions: TransactionInput) {
		api.post("/transactions", transactions);
	}
	return (
		<TransactionsContext.Provider value={{ transactions, createTransactions }}>
			{props.children}
		</TransactionsContext.Provider>
	);
}
