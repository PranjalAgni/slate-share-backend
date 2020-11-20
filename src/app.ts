import express from "express";
import http from "http";
import { SlateServer } from "./services/slate";

const app = express();
const server = http.createServer(app);

console.log("This is just a line in develop branch");
new SlateServer(server);

export default server;
