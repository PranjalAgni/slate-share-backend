import express from "express";
import http from "http";
import { SlateServer } from "./services/slate";
import router from "./routes";

const app = express();

app.use("/", router);

const server = http.createServer(app);

new SlateServer(server);

export default server;
