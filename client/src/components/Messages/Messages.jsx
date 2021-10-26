import BasicScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message/Message";
import "./messages.css";

const Messages = ({messages, username}) => {
	return (
		<BasicScrollToBottom className={"messages"}>
			{messages.map((message, index) => (
				<div key={index}>
					<Message message={message} username={username}/>
				</div>
			))}
		</BasicScrollToBottom>
	);
};

export default Messages;