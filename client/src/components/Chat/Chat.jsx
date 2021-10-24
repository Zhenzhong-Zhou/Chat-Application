import {useEffect, useState} from "react";
import queryString from "query-string";
import "./chat.css";
import {io} from "socket.io-client";

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
	console.log(username, room ,socket)

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
	console.log(message, messages)
	return (
		<div className={"outerContainer"}>
			<div className={"container"}>
				<input value={message} onChange={event => setMessage(event.target.value)} onKeyPress={event => event.key === "Enter" ? sendMessage(event) : null}/>
			</div>
		</div>
	);
};

export default Chat;