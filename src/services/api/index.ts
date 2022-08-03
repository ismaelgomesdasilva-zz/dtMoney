import axios from "axios";

export const api = axios.create({
	baseURL: "http://ignite-02-dtmoney.vercel.app/api",
});
