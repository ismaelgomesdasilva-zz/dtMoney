import Modal from "react-modal";
import { Container } from "./styles";
type NewTransactionModalProps = {
	isOpen: boolean;
	onRequestClose: () => void;
};
export function NewTransactionModal({
	isOpen,
	onRequestClose,
}: NewTransactionModalProps) {
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			overlayClassName="react-modal-overlay"
			className="react-modal-content"
		>
			<Container>
				<h2>Cadastrar Transação</h2>
				<input placeholder="Titulo" />
				<input placeholder="valor" type="number" />
				<input placeholder="categoria" />
				<button type="submit">cadastrar</button>
			</Container>
		</Modal>
	);
}
