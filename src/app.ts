import express from "express";
import http from "http";
import { SlateServer } from "./services/slate";
import router from "./routes";

const app = express();
const server = http.createServer(app);

app.use("/", router);

new SlateServer(server);

export default server;
