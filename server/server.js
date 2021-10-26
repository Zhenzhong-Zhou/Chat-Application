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
import {addUser, getUser, getUsersInRoom, removeUser} from "./controllers/user.js";

// Initialization App
const app = express();
dotenv.config();
const server = createServer(app);
const io = new Server(server, {
	cors: {
		origin: process.env.URL,
		methods: ["GET", "POST"]
	}
});

// Middlewares
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

// Routes
app.use("/", indexRoutes);


// Connect socket.io
io.on("connection", (socket) => {
	socket.on("join", ({username, room}) => {
		const {error, user} = addUser({id: socket.id, username, room});
		socket.emit("message", {user: "admin", text: `${user.username}, welcome to the ${user.room} room!`});
		socket.broadcast.to(user.room).emit("message", {user: "admin", text: `${user.username}, has joined!`});
		socket.join(user.room);
		io.to(user.room).emit("roomData", {room: user.room, users: getUsersInRoom(user.room)});
	});
	socket.on("sendMessage", (message) => {
		const user = getUser(socket.id);
		io.to(user.room).emit("message", {user: user.username, text: message});
		io.to(user.room).emit("roomData", {room: user.room, text: message});
	});
	socket.on("disconnect", () => {
		const user = removeUser(socket.id);
		if (user) {
			io.to(user.room).emit("message", {user: "admin", test: `${user.username} has left.`});
		}
	});
});


// Server listen
const PORT = process.env.PORT;
server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));