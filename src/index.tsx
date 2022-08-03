import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { createServer, Model } from "miragejs";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
createServer({
	models: {
		transaction: Model,
	},
	seeds(server) {
		server.db.loadData({
			transactions: [
				{
					id: 1,
					title: "Salario",
					type: "deposit",
					category: "Emprego",
					amount: 4000,
					createdAt: new Date(),
				},
			],
		});
	},
	routes() {
		this.namespace = "api";

		this.get("/transactions", () => {
			return this.schema.all("transaction");
		});
		this.post("/transactions", (schema, request) => {
			const data = JSON.parse(request.requestBody);
			return schema.create("transaction", data);
		});
	},
});
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
