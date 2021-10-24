import {useEffect, useState} from "react";
import queryString from "query-string";
import "./chat.css";
import {io} from "socket.io-client";
import {InfoBar, Input} from "../index";

let socket;

const Chat = ({location}) => {
	const [username, setUsername] = useState("");
	const [room, setRoom] = useState("");
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const ENDPOINT = process.env.REACT_APP_ENDPOINT;

	useEffect(() => {
		const {username, room} = queryString.parse(location.search);
		socket = io(ENDPOINT);
		setUsername(username);
		setRoom(room);
		socket.emit("join", {username, room});
		return () => {
			socket.emit("disconnect");
			socket.off();
		};
	}, [location.search, ENDPOINT]);

	useEffect(() => {
		socket.on("message", (message) => {
			setMessages([...messages, message]);
		});
	}, [messages]);

	const sendMessage = (e) => {
		e.preventDefault();
		if (message) {
			socket.emit("sendMessage", message, () => setMessage(""));
		}
	};

	return (
		<div className={"outerContainer"}>
			<div className={"container"}>
				<InfoBar room={room}/>
				<Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
			</div>
		</div>
	);
};

export default Chat;