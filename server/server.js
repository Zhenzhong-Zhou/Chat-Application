import express from "express";
import {Server} from "socket.io";
import {createServer} from "http";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

// Routes Imports
import indexRoutes from "./routes/router.js"
import {addUser, getUser} from "./controllers/user.js";

// Initialization App
const app = express();
dotenv.config();
const server = createServer(app);
const io = new Server(server, {
	cors: {
		origin: process.env.URL
	}
});

// Connect socket.io
io.on("connection", (socket) => {
	socket.on("join", ({username, room}, callback) => {
		const {error, user} = addUser({id: socket.id, username, room});
		// socket.on("error", () => {
		// 	console.log(error);
		// });
		// if (error) return callback(error);
		console.log("user: ", user)
		socket.emit("message", {user: "admin", text: `${user.username}, welcome to the ${user.room} room!`});
		socket.broadcast.to(user.room).emit("message", {user: "admin", text: `${user.username}, has joined!`});
		socket.join(user.room);
		// callback();
	});
	socket.on("sendMessage", (message, callback) => {
		const user = getUser(socket.id);
		io.to(user.room).emit("message", {user: user.username, text: message});
		// callback();
	});
	socket.on("disconnect", () => {
		console.log("User had left!!");
	});
});

// Middlewares
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

// Routes
app.use("/", indexRoutes);

// Server listen
const PORT = process.env.PORT;
server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));