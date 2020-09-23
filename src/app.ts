import express from "express";
import http from "http";
import { SlateServer } from "./services/slate";

const app = express();
const server = http.createServer(app);

new SlateServer(server);

export default server;
