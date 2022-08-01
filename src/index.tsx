import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { createServer } from "miragejs";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
createServer({
	routes() {
		this.namespace = "api";

		this.get("/transactions", () => {
			return [
				{
					id: 1,
					title: "transactions 1",
					amount: 400,
					type: "deposit",
					category: "Food",
					createAt: new Date(),
				},
			];
		});
	},
});
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
