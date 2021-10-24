import "./infobar.css";
import online from "../../assets/icons/onlineIcon.png";
import close from "../../assets/icons/closeIcon.png";

const InfoBar = ({room}) => {
	return (
		<div className={"infoBar"}>
			<div className={"leftInnerContainer"}>
				<img className={"onlineIcon"} src={online} alt={"online"}/>
				<h3>{room}</h3>
			</div>
			<div className={"rightInnerContainer"}>
				<a href={"/"}><img src={close} alt={"close"}/></a>
			</div>
		</div>
	);
};

export default InfoBar;