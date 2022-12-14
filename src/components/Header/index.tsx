import logo from "../../assets/logo.svg";
import { Container, Content } from "./styles";

type HeaderProps = {
	onOpenNewTransactionModal: () => void;
};
export function Header({ onOpenNewTransactionModal }: HeaderProps) {
	return (
		<Container>
			<Content>
				<img src={logo} alt="dtMoney" />
				<button onClick={onOpenNewTransactionModal}>Nova transação</button>
			</Content>
		</Container>
	);
}
