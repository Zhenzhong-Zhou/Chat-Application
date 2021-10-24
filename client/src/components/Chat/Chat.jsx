import {useEffect, useState} from "react";
import queryString from "query-string";
import "./chat.css";
import {io} from "socket.io-client";

let socket;

const Chat = ({location}) => {
	const [username, setUsername] = useState("");
	const [room, setRoom] = useState("");
	const ENDPOINT = process.env.REACT_APP_ENDPOINT;

	useEffect(() => {
		const {username, room} = queryString.parse(location.search);
		socket = io(ENDPOINT);
		setUsername(username);
		setRoom(room);
		socket.emit("join", {username, room});
	}, [location.search, ENDPOINT]);

	return (
		<div>Chat</div>
	);
};

export default Chat;