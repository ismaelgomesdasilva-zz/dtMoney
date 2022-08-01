import { useEffect } from "react";
import { api } from "../services/api";
import { Container } from "./styles";

export function TransactionsTable() {
	useEffect(() => {
		api.get("transactions").then((response) => console.log(response.data));
	}, []);

	return (
		<Container>
			<table>
				<thead>
					<tr>
						<th>Titulo</th>
						<th>Valor</th>
						<th>Categoria</th>
						<th>Data</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="title">desenvolvimento de website</td>
						<td className="deposit">R$12.0000</td>
						<td>Desenvolvimento</td>
						<td>20/02/2023</td>
					</tr>
				</tbody>
				<tbody>
					<tr>
						<td className="title">Aluguel</td>
						<td className="withdram">-R$1.000,00</td>
						<td>Moradia</td>
						<td>30/02/2023</td>
					</tr>
				</tbody>
			</table>
		</Container>
	);
}
