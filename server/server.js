import express from "express";
import {Server} from "socket.io";
import http from "http";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

// Routes Imports

// Initialization App
const app = express();
dotenv.config();
const server = http.createServer(app);
const io = new Server(server);

// Middlewares
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

// Routes


// Server listen
const PORT = process.env.PORT;
server.listen(PORT, () =>console.log(`Server is running on port: ${PORT}`));