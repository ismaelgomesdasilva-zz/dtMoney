import { FormEvent, useState } from "react";
import Modal from "react-modal";
import closeImage from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcome from "../../assets/outcome.svg";
import { api } from "../services/api";
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
	const [value, setValue] = useState(0);
	const [typeTransaction, setTypeTransaction] = useState("deposit");

	function handleCreateNewTransaction(event: FormEvent) {
		event.preventDefault();
		const data = {
			title,
			category,
			value,
			typeTransaction,
		};
		api.post("/transactions", data);
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
					value={value}
					onChange={(e) => setValue(Number(e.target.value))}
				/>
				<TransactionTypeContainer>
					<RadioBox
						type="button"
						isActive={typeTransaction === "deposit"}
						activeColor="green"
						onClick={() => {
							setTypeTransaction("deposit");
						}}
					>
						<img src={incomeImg} alt="Entrada" />
						<span>Entrada</span>
					</RadioBox>
					<RadioBox
						type="button"
						isActive={typeTransaction === "withdraw"}
						activeColor="red"
						onClick={() => {
							setTypeTransaction("withdraw");
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
