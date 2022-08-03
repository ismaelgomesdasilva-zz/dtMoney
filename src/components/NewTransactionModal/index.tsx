import { FormEvent, useContext, useState } from "react";
import Modal from "react-modal";
import closeImage from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcome from "../../assets/outcome.svg";
import { api } from "../../services/api";
import { TransactionsContext } from "../../services/context/Transactions";
import { Container, TransactionTypeContainer, RadioBox } from "./styles";

type NewTransactionModalProps = {
	isOpen: boolean;
	onRequestClose: () => void;
};

export function NewTransactionModal({
	isOpen,
	onRequestClose,
}: NewTransactionModalProps) {
	const [title, setTitle] = useState("");
	const [category, setCategory] = useState("");
	const [amount, setAmount] = useState(0);
	const [type, setType] = useState("deposit");
	const { createTransactions } = useContext(TransactionsContext);

	function handleCreateNewTransaction(event: FormEvent) {
		event.preventDefault();
		createTransactions({
			title,
			amount,
			category,
			type,
		});
	}

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			overlayClassName="react-modal-overlay"
			className="react-modal-content"
		>
			<button
				type="button"
				onClick={onRequestClose}
				className="react-modal-close"
			>
				<img src={closeImage} alt="Fechar modal" />
			</button>
			<Container onSubmit={handleCreateNewTransaction}>
				<h2>Cadastrar Transação</h2>
				<input
					placeholder="Titulo"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<input
					placeholder="Valor"
					type="number"
					value={amount}
					onChange={(e) => setAmount(Number(e.target.value))}
				/>
				<TransactionTypeContainer>
					<RadioBox
						type="button"
						isActive={type === "deposit"}
						activeColor="green"
						onClick={() => {
							setType("deposit");
						}}
					>
						<img src={incomeImg} alt="Entrada" />
						<span>Entrada</span>
					</RadioBox>
					<RadioBox
						type="button"
						isActive={type === "withdraw"}
						activeColor="red"
						onClick={() => {
							setType("withdraw");
						}}
					>
						<img src={outcome} alt="Saida" />
						<span>Saida</span>
					</RadioBox>
				</TransactionTypeContainer>
				<input
					placeholder="Categoria"
					value={category}
					onChange={(e) => setCategory(e.target.value)}
				/>
				<button type="submit">Cadastrar</button>
			</Container>
		</Modal>
	);
}
