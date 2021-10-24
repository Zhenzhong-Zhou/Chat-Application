import {useState} from "react";
import {Link} from "react-router-dom";
import "./join.css";

const Join = () => {
	const [username, setUsername] = useState("");
	const [room, setRoom] = useState("");

	return (
		<div className={"joinOuterContainer"}>
			<div className={"joinInnerContainer"}>
				<h1 className={"heading"}>Join</h1>
				<div><input placeholder={"Username"} className={"joinInput"} type={"text"} onChange={event => setUsername(event.target.value)}/></div>
				<div><input placeholder={"Room"} className={"joinInput mt-20"} type={"text"} onChange={event => setRoom(event.target.value)}/></div>
				<Link onClick={event => (!username || !room) ? event.preventDefault() : null} to={`/chat?username=${username}&room=${room}`}>
					<button className={"button mt-20"} type={"submit"}>Sign In</button>
				</Link>
			</div>
		</div>
	);
};

export default Join;